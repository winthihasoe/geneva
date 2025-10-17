<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class EmergencyIncident extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'incident_description',
        'actions_taken',
        'incident_time',
        'severity',
    ];

    protected $casts = [
        'incident_time' => 'datetime',
        'severity' => 'string',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to get formatted incident time
    public function getFormattedIncidentTime()
    {
        if ($this->incident_time) {
            return $this->incident_time->format('H:i');
        }
        return null;
    }

    // Helper method to get incident date
    public function getIncidentDate()
    {
        if ($this->incident_time) {
            return $this->incident_time->format('Y-m-d');
        }
        return null;
    }

    // Helper method to get time elapsed since incident
    public function getTimeElapsed()
    {
        if ($this->incident_time) {
            return $this->incident_time->diffForHumans();
        }
        return null;
    }

    // Check if incident is critical or high severity
    public function isCritical()
    {
        return in_array($this->severity, ['critical', 'high']);
    }

    // Check if incident is recent (within last 24 hours)
    public function isRecent()
    {
        if ($this->incident_time) {
            return $this->incident_time->diffInHours(now()) <= 24;
        }
        return false;
    }

    // Get severity color for UI
    public function getSeverityColor()
    {
        return match($this->severity) {
            'critical' => '#d32f2f', // Red
            'high' => '#f57c00',      // Orange
            'medium' => '#1976d2',    // Blue
            'low' => '#388e3c',       // Green
            default => '#757575'      // Gray
        };
    }

    // Get severity icon for UI
    public function getSeverityIcon()
    {
        return match($this->severity) {
            'critical' => 'emergency',
            'high' => 'warning',
            'medium' => 'info',
            'low' => 'check_circle',
            default => 'help'
        };
    }

    // Get severity priority score for sorting (higher = more urgent)
    public function getSeverityPriority()
    {
        return match($this->severity) {
            'critical' => 4,
            'high' => 3,
            'medium' => 2,
            'low' => 1,
            default => 0
        };
    }

    // Check if actions were taken
    public function hasActionsTaken()
    {
        return !empty(trim($this->actions_taken));
    }

    // Get incident summary for notifications
    public function getIncidentSummary($maxLength = 100)
    {
        if (strlen($this->incident_description) <= $maxLength) {
            return $this->incident_description;
        }
        
        return substr($this->incident_description, 0, $maxLength) . '...';
    }

    // Scope for critical incidents
    public function scopeCritical($query)
    {
        return $query->where('severity', 'critical');
    }

    // Scope for high priority incidents (critical + high)
    public function scopeHighPriority($query)
    {
        return $query->whereIn('severity', ['critical', 'high']);
    }

    // Scope for recent incidents (last 24 hours)
    public function scopeRecent($query)
    {
        return $query->where('incident_time', '>=', now()->subDay());
    }

    // Scope for incidents within date range
    public function scopeWithinDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('incident_time', [$startDate, $endDate]);
    }

    // Scope for incidents ordered by severity and time
    public function scopeOrderedBySeverity($query)
    {
        return $query->orderByRaw("
            CASE severity 
                WHEN 'critical' THEN 4 
                WHEN 'high' THEN 3 
                WHEN 'medium' THEN 2 
                WHEN 'low' THEN 1 
                ELSE 0 
            END DESC
        ")->orderBy('incident_time', 'desc');
    }

    // Scope for incidents ordered by time
    public function scopeOrderedByTime($query, $careLogId = null)
    {
        $q = $query->orderBy('incident_time', 'desc');
        
        if ($careLogId) {
            $q->where('care_log_id', $careLogId);
        }
        
        return $q;
    }

    // Get emergency incidents statistics for a care log
    public static function getIncidentStats($careLogId)
    {
        $incidents = self::where('care_log_id', $careLogId)->get();
        
        if ($incidents->isEmpty()) {
            return null;
        }
        
        $severityBreakdown = $incidents->groupBy('severity');
        $recentIncidents = $incidents->filter(function($incident) {
            return $incident->isRecent();
        });
        
        return [
            'total_incidents' => $incidents->count(),
            'severity_breakdown' => [
                'critical' => $severityBreakdown->get('critical', collect())->count(),
                'high' => $severityBreakdown->get('high', collect())->count(),
                'medium' => $severityBreakdown->get('medium', collect())->count(),
                'low' => $severityBreakdown->get('low', collect())->count(),
            ],
            'recent_incidents' => $recentIncidents->count(),
            'critical_incidents' => $severityBreakdown->get('critical', collect())->count(),
            'resolved_incidents' => $incidents->filter(function($incident) {
                return $incident->hasActionsTaken();
            })->count(),
            'unresolved_incidents' => $incidents->filter(function($incident) {
                return !$incident->hasActionsTaken();
            })->count(),
            'resolution_rate' => $incidents->count() > 0 ? 
                round(($incidents->filter(fn($i) => $i->hasActionsTaken())->count() / $incidents->count()) * 100, 1) : 0,
            'average_severity_score' => round($incidents->avg(function($incident) {
                return $incident->getSeverityPriority();
            }), 2),
        ];
    }

    // Get all critical incidents across all care logs
    public static function getAllCriticalIncidents($limit = 50)
    {
        return self::critical()
                  ->with('careLog')
                  ->orderBy('incident_time', 'desc')
                  ->limit($limit)
                  ->get();
    }

    // Get recent high priority incidents for dashboard
    public static function getRecentHighPriorityIncidents($hours = 24, $limit = 10)
    {
        return self::highPriority()
                  ->where('incident_time', '>=', now()->subHours($hours))
                  ->with('careLog')
                  ->orderedBySeverity()
                  ->limit($limit)
                  ->get();
    }

    // Get incident trends for reporting
    public static function getIncidentTrends($careLogId = null, $days = 30)
    {
        $query = self::query();
        
        if ($careLogId) {
            $query->where('care_log_id', $careLogId);
        }
        
        $incidents = $query->where('incident_time', '>=', now()->subDays($days))
                          ->get();
        
        // Group by date
        $trendsByDate = $incidents->groupBy(function($incident) {
            return $incident->getIncidentDate();
        });
        
        // Group by severity
        $trendsBySeverity = $incidents->groupBy('severity');
        
        return [
            'date_trends' => $trendsByDate->map(function($incidents, $date) {
                return [
                    'date' => $date,
                    'count' => $incidents->count(),
                    'critical_count' => $incidents->where('severity', 'critical')->count(),
                    'high_count' => $incidents->where('severity', 'high')->count(),
                ];
            })->sortBy('date')->values(),
            'severity_trends' => $trendsBySeverity->map(function($incidents, $severity) {
                return [
                    'severity' => $severity,
                    'count' => $incidents->count(),
                    'resolved_count' => $incidents->filter(fn($i) => $i->hasActionsTaken())->count(),
                ];
            }),
            'total_period_incidents' => $incidents->count(),
            'period_days' => $days,
        ];
    }

    // Check if incident requires immediate attention
    public function requiresImmediateAttention()
    {
        return $this->severity === 'critical' || 
               ($this->severity === 'high' && !$this->hasActionsTaken());
    }

    // Get incident status for reporting
    public function getIncidentStatus()
    {
        return [
            'incident_id' => $this->id,
            'severity' => $this->severity,
            'severity_color' => $this->getSeverityColor(),
            'severity_icon' => $this->getSeverityIcon(),
            'time' => $this->getFormattedIncidentTime(),
            'time_elapsed' => $this->getTimeElapsed(),
            'is_critical' => $this->isCritical(),
            'is_recent' => $this->isRecent(),
            'actions_taken' => $this->hasActionsTaken(),
            'requires_attention' => $this->requiresImmediateAttention(),
            'summary' => $this->getIncidentSummary(),
        ];
    }

    // Validate incident data
    public function validateIncidentData()
    {
        $errors = [];
        
        if (empty(trim($this->incident_description))) {
            $errors[] = 'Incident description is required';
        }
        
        if ($this->isCritical() && !$this->hasActionsTaken()) {
            $errors[] = 'Critical incidents must have actions taken documented';
        }
        
        if ($this->incident_time && $this->incident_time->isFuture()) {
            $errors[] = 'Incident time cannot be in the future';
        }
        
        return $errors;
    }
}

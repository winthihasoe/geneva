<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class MedicationAdministration extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'administration_time',
        'medication_name',
        'dosage',
        'route',
        'notes',
    ];

    protected $casts = [
        'administration_time' => 'datetime:H:i',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to get formatted administration time
    public function getFormattedAdministrationTime()
    {
        if ($this->administration_time) {
            return $this->administration_time->format('H:i');
        }
        return null;
    }

    // Helper method to get full medication description
    public function getFullMedicationDescription()
    {
        $description = $this->medication_name;
        
        if ($this->dosage) {
            $description .= ' (' . $this->dosage . ')';
        }
        
        if ($this->route && $this->route !== 'oral') {
            $description .= ' - ' . ucfirst($this->route);
        }
        
        return $description;
    }

    // Check if medication was actually administered (not skipped)
    public function wasAdministered()
    {
        if (!$this->notes) {
            return true; // Assume administered if no notes
        }
        
        $notes = strtolower($this->notes);
        $skipKeywords = ['skip', 'refuse', 'declined', 'missed', 'not given', 'unavailable'];
        
        foreach ($skipKeywords as $keyword) {
            if (str_contains($notes, $keyword)) {
                return false;
            }
        }
        
        return true;
    }

    // Check if there were side effects reported
    public function hasSideEffects()
    {
        if (!$this->notes) {
            return false;
        }
        
        $notes = strtolower($this->notes);
        $sideEffectKeywords = ['side effect', 'reaction', 'nausea', 'dizziness', 'rash', 'upset stomach', 'drowsy'];
        
        foreach ($sideEffectKeywords as $keyword) {
            if (str_contains($notes, $keyword)) {
                return true;
            }
        }
        
        return false;
    }

    // Get medication route display name
    public function getRouteDisplayName()
    {
        return match($this->route) {
            'oral' => 'By mouth',
            'injection' => 'Injection',
            'topical' => 'Topical (skin)',
            'inhaled' => 'Inhaled',
            'other' => 'Other route',
            default => 'Unknown'
        };
    }

    // Check if medication is overdue (based on typical medication schedules)
    public function isOverdue($toleranceMinutes = 30)
    {
        if (!$this->administration_time) {
            return false;
        }
        
        $scheduledTime = $this->administration_time;
        $now = now();
        
        // If it's the same day and we're past the scheduled time + tolerance
        if ($scheduledTime->isToday()) {
            return $now->greaterThan($scheduledTime->copy()->addMinutes($toleranceMinutes));
        }
        
        // If scheduled time was yesterday or earlier
        return $scheduledTime->isPast();
    }

    // Check if medication is due soon
    public function isDueSoon($reminderMinutes = 15)
    {
        if (!$this->administration_time) {
            return false;
        }
        
        $scheduledTime = $this->administration_time;
        $now = now();
        
        if ($scheduledTime->isToday()) {
            $timeDiff = $now->diffInMinutes($scheduledTime, false);
            return $timeDiff >= 0 && $timeDiff <= $reminderMinutes;
        }
        
        return false;
    }

    // Get medication status
    public function getMedicationStatus()
    {
        if (!$this->wasAdministered()) {
            return 'skipped';
        } elseif ($this->isOverdue()) {
            return 'overdue';
        } elseif ($this->isDueSoon()) {
            return 'due_soon';
        } elseif ($this->administration_time && $this->administration_time->isToday() && now()->greaterThan($this->administration_time)) {
            return 'administered';
        } elseif ($this->administration_time && $this->administration_time->isFuture()) {
            return 'scheduled';
        } else {
            return 'pending';
        }
    }

    // Get status color for UI
    public function getStatusColor()
    {
        return match($this->getMedicationStatus()) {
            'administered' => '#4caf50',    // Green
            'scheduled' => '#2196f3',       // Blue
            'due_soon' => '#ff9800',        // Orange
            'overdue' => '#f44336',         // Red
            'skipped' => '#9e9e9e',         // Gray
            'pending' => '#607d8b',         // Blue Gray
            default => '#757575'            // Gray
        };
    }

    // Scope for medications administered today
    public function scopeToday($query)
    {
        return $query->whereDate('administration_time', today());
    }

    // Scope for overdue medications
    public function scopeOverdue($query, $toleranceMinutes = 30)
    {
        return $query->get()->filter(function($record) use ($toleranceMinutes) {
            return $record->isOverdue($toleranceMinutes);
        });
    }

    // Scope for medications due soon
    public function scopeDueSoon($query, $reminderMinutes = 15)
    {
        return $query->get()->filter(function($record) use ($reminderMinutes) {
            return $record->isDueSoon($reminderMinutes);
        });
    }

    // Scope for administered medications
    public function scopeAdministered($query)
    {
        return $query->get()->filter(function($record) {
            return $record->wasAdministered();
        });
    }

    // Scope for skipped medications
    public function scopeSkipped($query)
    {
        return $query->get()->filter(function($record) {
            return !$record->wasAdministered();
        });
    }

    // Scope for medications with side effects
    public function scopeWithSideEffects($query)
    {
        return $query->get()->filter(function($record) {
            return $record->hasSideEffects();
        });
    }

    // Scope for medications by route
    public function scopeByRoute($query, $route)
    {
        return $query->where('route', $route);
    }

    // Scope for medications ordered by time
    public function scopeOrderedByTime($query, $careLogId = null)
    {
        $q = $query->orderBy('administration_time');
        
        if ($careLogId) {
            $q->where('care_log_id', $careLogId);
        }
        
        return $q;
    }

    // Get medication administration statistics for a care log
    public static function getMedicationStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        $administered = $records->filter(fn($r) => $r->wasAdministered());
        $skipped = $records->filter(fn($r) => !$r->wasAdministered());
        $withSideEffects = $records->filter(fn($r) => $r->hasSideEffects());
        
        // Group by medication name
        $medicationBreakdown = $records->groupBy('medication_name');
        
        // Group by route
        $routeBreakdown = $records->groupBy('route');
        
        return [
            'total_medications' => $records->count(),
            'administered_count' => $administered->count(),
            'skipped_count' => $skipped->count(),
            'side_effects_count' => $withSideEffects->count(),
            'compliance_rate' => $records->count() > 0 ? 
                round(($administered->count() / $records->count()) * 100, 1) : 0,
            'medication_breakdown' => $medicationBreakdown->map(function($meds, $name) {
                return [
                    'medication_name' => $name,
                    'total_doses' => $meds->count(),
                    'administered_doses' => $meds->filter(fn($m) => $m->wasAdministered())->count(),
                    'skipped_doses' => $meds->filter(fn($m) => !$m->wasAdministered())->count(),
                ];
            }),
            'route_breakdown' => $routeBreakdown->map(function($meds, $route) {
                return [
                    'route' => $route,
                    'count' => $meds->count(),
                    'display_name' => $meds->first()->getRouteDisplayName(),
                ];
            }),
            'unique_medications' => $medicationBreakdown->keys()->toArray(),
        ];
    }

    // Get today's medication schedule
    public static function getTodaysSchedule($careLogId = null)
    {
        $query = self::today()->orderBy('administration_time');
        
        if ($careLogId) {
            $query->where('care_log_id', $careLogId);
        }
        
        $records = $query->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        return [
            'total_medications_today' => $records->count(),
            'administered_today' => $records->filter(fn($r) => $r->wasAdministered())->count(),
            'pending_today' => $records->filter(fn($r) => $r->getMedicationStatus() === 'pending')->count(),
            'overdue_today' => $records->filter(fn($r) => $r->isOverdue())->count(),
            'due_soon' => $records->filter(fn($r) => $r->isDueSoon())->count(),
            'schedule' => $records->map(function($record) {
                return [
                    'time' => $record->getFormattedAdministrationTime(),
                    'medication' => $record->getFullMedicationDescription(),
                    'status' => $record->getMedicationStatus(),
                    'notes' => $record->notes,
                ];
            }),
        ];
    }

    // Get medication adherence trends
    public static function getAdherenceTrends($careLogId, $days = 7)
    {
        $records = self::where('care_log_id', $careLogId)
                      ->where('administration_time', '>=', now()->subDays($days))
                      ->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        $dailyBreakdown = $records->groupBy(function($record) {
            return $record->administration_time ? $record->administration_time->format('Y-m-d') : 'unknown';
        });
        
        return [
            'period_days' => $days,
            'total_doses' => $records->count(),
            'administered_doses' => $records->filter(fn($r) => $r->wasAdministered())->count(),
            'overall_compliance' => $records->count() > 0 ? 
                round(($records->filter(fn($r) => $r->wasAdministered())->count() / $records->count()) * 100, 1) : 0,
            'daily_trends' => $dailyBreakdown->map(function($doses, $date) {
                return [
                    'date' => $date,
                    'total_doses' => $doses->count(),
                    'administered_doses' => $doses->filter(fn($d) => $d->wasAdministered())->count(),
                    'compliance_rate' => $doses->count() > 0 ? 
                        round(($doses->filter(fn($d) => $d->wasAdministered())->count() / $doses->count()) * 100, 1) : 0,
                ];
            })->sortBy('date')->values(),
            'side_effects_reported' => $records->filter(fn($r) => $r->hasSideEffects())->count(),
        ];
    }

    // Get upcoming medication reminders
    public static function getUpcomingReminders($careLogId = null, $hours = 24)
    {
        $query = self::where('administration_time', '>=', now())
                    ->where('administration_time', '<=', now()->addHours($hours))
                    ->orderBy('administration_time');
        
        if ($careLogId) {
            $query->where('care_log_id', $careLogId);
        }
        
        return $query->get()->map(function($record) {
            return [
                'time' => $record->getFormattedAdministrationTime(),
                'medication' => $record->getFullMedicationDescription(),
                'route' => $record->getRouteDisplayName(),
                'is_due_soon' => $record->isDueSoon(),
                'minutes_until_due' => $record->administration_time ? 
                    now()->diffInMinutes($record->administration_time, false) : null,
            ];
        });
    }

    // Get medication summary for reporting
    public function getMedicationSummary()
    {
        return [
            'medication_id' => $this->id,
            'time' => $this->getFormattedAdministrationTime(),
            'medication' => $this->getFullMedicationDescription(),
            'route' => $this->getRouteDisplayName(),
            'status' => $this->getMedicationStatus(),
            'status_color' => $this->getStatusColor(),
            'was_administered' => $this->wasAdministered(),
            'has_side_effects' => $this->hasSideEffects(),
            'is_overdue' => $this->isOverdue(),
            'is_due_soon' => $this->isDueSoon(),
            'notes' => $this->notes,
        ];
    }
}

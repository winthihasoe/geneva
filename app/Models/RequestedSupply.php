<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestedSupply extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'item',
        'quantity',
        'purpose',
        'priority',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Scope for high priority supplies
    public function scopeHighPriority($query)
    {
        return $query->whereIn('priority', ['high', 'urgent']);
    }

    // Scope for urgent supplies only
    public function scopeUrgent($query)
    {
        return $query->where('priority', 'urgent');
    }

    // Scope for supplies ordered by priority
    public function scopeOrderedByPriority($query)
    {
        return $query->orderByRaw("
            CASE priority 
                WHEN 'urgent' THEN 1 
                WHEN 'high' THEN 2 
                WHEN 'medium' THEN 3 
                WHEN 'low' THEN 4 
                ELSE 5 
            END
        ");
    }

    // Get supply statistics for a care log
    public static function getSupplyStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        $priorityBreakdown = $records->groupBy('priority');
        
        return [
            'total_supplies' => $records->count(),
            'priority_breakdown' => [
                'urgent' => $priorityBreakdown->get('urgent', collect())->count(),
                'high' => $priorityBreakdown->get('high', collect())->count(),
                'medium' => $priorityBreakdown->get('medium', collect())->count(),
                'low' => $priorityBreakdown->get('low', collect())->count(),
            ],
            'most_requested_items' => $records->groupBy('item')
                ->map(function ($items, $item) {
                    return [
                        'item' => $item,
                        'count' => $items->count(),
                        'priorities' => $items->pluck('priority')->unique()->values()
                    ];
                })
                ->sortByDesc('count')
                ->values()
                ->take(5),
        ];
    }

    // Get all urgent supplies across all care logs
    public static function getAllUrgentSupplies()
    {
        return self::urgent()
                  ->with('careLog')
                  ->orderBy('created_at', 'desc')
                  ->get();
    }

    // Helper method to get priority color for UI
    public function getPriorityColor()
    {
        return match($this->priority) {
            'urgent' => '#d32f2f', // Red
            'high' => '#f57c00',   // Orange
            'medium' => '#1976d2', // Blue
            'low' => '#388e3c',    // Green
            default => '#757575'   // Gray
        };
    }

    // Helper method to check if supply is critical
    public function isCritical()
    {
        return in_array($this->priority, ['urgent', 'high']);
    }
}

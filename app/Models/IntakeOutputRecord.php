<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class IntakeOutputRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'meal_type',
        'meal_time',
        'food_items',
        'amount',
        'amount_unit',
        'assistance_needed',
        'intake_notes',
        'fluid_intake',
        'fluid_intake_unit',
        'dehydration_signs',
        'other_dehydration_signs',
        'output_time',
        'urine_volume',
        'urine_volume_unit',
        'urine_color',
        'bowel_movement',
        'bowel_consistency',
        'output_notes',
    ];

    protected $casts = [
        'meal_time' => 'datetime:H:i',
        'output_time' => 'datetime:H:i',
        'food_items' => 'array',
        'assistance_needed' => 'boolean',
        'amount' => 'integer',
        'fluid_intake' => 'integer',
        'urine_volume' => 'integer',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to get formatted meal time
    public function getFormattedMealTime()
    {
        if ($this->meal_time) {
            return $this->meal_time->format('H:i');
        }
        return null;
    }

    // Helper method to get formatted output time
    public function getFormattedOutputTime()
    {
        if ($this->output_time) {
            return $this->output_time->format('H:i');
        }
        return null;
    }

    // Get meal type display name
    public function getMealTypeDisplayName()
    {
        return match($this->meal_type) {
            'breakfast' => 'Breakfast',
            'mid_morning_snack' => 'Mid-Morning Snack',
            'lunch' => 'Lunch',
            'afternoon_snack' => 'Afternoon Snack',
            'dinner' => 'Dinner',
            'evening_snack' => 'Evening Snack',
            default => ucfirst(str_replace('_', ' ', $this->meal_type ?? ''))
        };
    }

    // Get food items as formatted string
    public function getFormattedFoodItems()
    {
        if ($this->food_items && is_array($this->food_items)) {
            return implode(', ', array_filter($this->food_items));
        }
        return null;
    }

    // Convert amount to milliliters for consistent calculations
    public function getAmountInMl()
    {
        if (!$this->amount || !$this->amount_unit) {
            return null;
        }

        return match($this->amount_unit) {
            'ml' => $this->amount,
            'oz' => round($this->amount * 29.5735), // 1 oz = 29.5735 ml
            'l' => $this->amount * 1000,           // 1 l = 1000 ml
            default => $this->amount
        };
    }

    // Convert fluid intake to milliliters for consistent calculations
    public function getFluidIntakeInMl()
    {
        if (!$this->fluid_intake || !$this->fluid_intake_unit) {
            return null;
        }

        return match($this->fluid_intake_unit) {
            'ml' => $this->fluid_intake,
            'l' => $this->fluid_intake * 1000,      // 1 l = 1000 ml
            'cup' => round($this->fluid_intake * 236.588), // 1 cup = 236.588 ml
            default => $this->fluid_intake
        };
    }

    // Convert urine volume to milliliters for consistent calculations
    public function getUrineVolumeInMl()
    {
        if (!$this->urine_volume || !$this->urine_volume_unit) {
            return null;
        }

        return match($this->urine_volume_unit) {
            'ml' => $this->urine_volume,
            'l' => $this->urine_volume * 1000,      // 1 l = 1000 ml
            default => $this->urine_volume
        };
    }

    // Get formatted amount with unit
    public function getFormattedAmount()
    {
        if ($this->amount && $this->amount_unit) {
            return $this->amount . ' ' . $this->amount_unit;
        }
        return null;
    }

    // Get formatted fluid intake with unit
    public function getFormattedFluidIntake()
    {
        if ($this->fluid_intake && $this->fluid_intake_unit) {
            return $this->fluid_intake . ' ' . $this->fluid_intake_unit;
        }
        return null;
    }

    // Get formatted urine volume with unit
    public function getFormattedUrineVolume()
    {
        if ($this->urine_volume && $this->urine_volume_unit) {
            return $this->urine_volume . ' ' . $this->urine_volume_unit;
        }
        return null;
    }

    // Check if this record has intake data
    public function hasIntakeData()
    {
        return $this->meal_type || $this->food_items || $this->amount || $this->fluid_intake;
    }

    // Check if this record has output data
    public function hasOutputData()
    {
        return $this->output_time || $this->urine_volume || $this->bowel_movement;
    }

    // Check if assistance was needed for eating
    public function neededAssistance()
    {
        return $this->assistance_needed === true;
    }

    // Check if there are signs of dehydration
    public function hasDehydrationSigns()
    {
        return !empty($this->dehydration_signs) && $this->dehydration_signs !== 'none';
    }

    // Get dehydration signs as array
    public function getDehydrationSignsArray()
    {
        if (empty($this->dehydration_signs) || $this->dehydration_signs === 'none') {
            return [];
        }
        
        // Handle comma-separated values
        return array_map('trim', explode(',', $this->dehydration_signs));
    }

    // Check if urine color is concerning
    public function hasAbnormalUrineColor()
    {
        if (!$this->urine_color) {
            return false;
        }
        
        $normalColors = ['pale yellow', 'light yellow', 'yellow', 'clear'];
        $concerningColors = ['dark yellow', 'amber', 'orange', 'red', 'brown', 'cloudy'];
        
        $color = strtolower(trim($this->urine_color));
        
        return in_array($color, $concerningColors);
    }

    // Check if bowel movement occurred
    public function hadBowelMovement()
    {
        return $this->bowel_movement === 'yes';
    }

    // Get bowel consistency status
    public function getBowelConsistencyStatus()
    {
        if (!$this->bowel_consistency) {
            return null;
        }
        
        $consistency = strtolower(trim($this->bowel_consistency));
        
        if (str_contains($consistency, 'hard') || str_contains($consistency, 'constipat')) {
            return 'constipated';
        } elseif (str_contains($consistency, 'loose') || str_contains($consistency, 'diarrhea') || str_contains($consistency, 'liquid')) {
            return 'loose';
        } elseif (str_contains($consistency, 'normal') || str_contains($consistency, 'formed')) {
            return 'normal';
        } else {
            return 'unknown';
        }
    }

    // Scope for intake records only
    public function scopeIntakeOnly($query)
    {
        return $query->where(function($q) {
            $q->whereNotNull('meal_type')
              ->orWhereNotNull('food_items')
              ->orWhereNotNull('amount')
              ->orWhereNotNull('fluid_intake');
        });
    }

    // Scope for output records only
    public function scopeOutputOnly($query)
    {
        return $query->where(function($q) {
            $q->whereNotNull('output_time')
              ->orWhereNotNull('urine_volume')
              ->orWhereNotNull('bowel_movement');
        });
    }

    // Scope for records by meal type
    public function scopeByMealType($query, $mealType)
    {
        return $query->where('meal_type', $mealType);
    }

    // Scope for records with assistance needed
    public function scopeWithAssistance($query)
    {
        return $query->where('assistance_needed', true);
    }

    // Scope for records with dehydration signs
    public function scopeWithDehydrationSigns($query)
    {
        return $query->whereNotNull('dehydration_signs')
                    ->where('dehydration_signs', '!=', '')
                    ->where('dehydration_signs', '!=', 'none');
    }

    // Scope for records ordered by meal time
    public function scopeOrderedByMealTime($query, $careLogId = null)
    {
        $q = $query->orderBy('meal_time');
        
        if ($careLogId) {
            $q->where('care_log_id', $careLogId);
        }
        
        return $q;
    }

    // Scope for records ordered by output time
    public function scopeOrderedByOutputTime($query, $careLogId = null)
    {
        $q = $query->orderBy('output_time');
        
        if ($careLogId) {
            $q->where('care_log_id', $careLogId);
        }
        
        return $q;
    }

    // Get intake and output statistics for a care log
    public static function getIntakeOutputStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        $intakeRecords = $records->filter(fn($r) => $r->hasIntakeData());
        $outputRecords = $records->filter(fn($r) => $r->hasOutputData());
        
        // Calculate total fluid intake in ml
        $totalFluidIntakeMl = $intakeRecords->sum(function($record) {
            return ($record->getFluidIntakeInMl() ?? 0) + ($record->getAmountInMl() ?? 0);
        });
        
        // Calculate total urine output in ml
        $totalUrineOutputMl = $outputRecords->sum(function($record) {
            return $record->getUrineVolumeInMl() ?? 0;
        });
        
        // Group by meal type
        $mealBreakdown = $intakeRecords->whereNotNull('meal_type')->groupBy('meal_type');
        
        return [
            'total_records' => $records->count(),
            'intake_records' => $intakeRecords->count(),
            'output_records' => $outputRecords->count(),
            'total_fluid_intake_ml' => $totalFluidIntakeMl,
            'total_urine_output_ml' => $totalUrineOutputMl,
            'fluid_balance_ml' => $totalFluidIntakeMl - $totalUrineOutputMl,
            'meal_breakdown' => $mealBreakdown->map(function($meals, $type) {
                return [
                    'meal_type' => $type,
                    'display_name' => $meals->first()->getMealTypeDisplayName(),
                    'count' => $meals->count(),
                    'assistance_needed_count' => $meals->where('assistance_needed', true)->count(),
                ];
            }),
            'assistance_needed_percentage' => $intakeRecords->count() > 0 ? 
                round(($intakeRecords->where('assistance_needed', true)->count() / $intakeRecords->count()) * 100, 1) : 0,
            'dehydration_signs_count' => $records->filter(fn($r) => $r->hasDehydrationSigns())->count(),
            'bowel_movements_count' => $outputRecords->where('bowel_movement', 'yes')->count(),
            'abnormal_urine_color_count' => $outputRecords->filter(fn($r) => $r->hasAbnormalUrineColor())->count(),
        ];
    }

    // Get fluid balance trends over time
    public static function getFluidBalanceTrends($careLogId, $days = 7)
    {
        $records = self::where('care_log_id', $careLogId)
                      ->where(function($q) {
                          $q->whereDate('meal_time', '>=', now()->subDays(7))
                            ->orWhereDate('output_time', '>=', now()->subDays(7));
                      })
                      ->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        $dailyBreakdown = [];
        
        for ($i = 0; $i < $days; $i++) {
            $date = now()->subDays($i)->format('Y-m-d');
            $dayRecords = $records->filter(function($record) use ($date) {
                return ($record->meal_time && $record->meal_time->format('Y-m-d') === $date) ||
                       ($record->output_time && $record->output_time->format('Y-m-d') === $date);
            });
            
            $intakeRecords = $dayRecords->filter(fn($r) => $r->hasIntakeData());
            $outputRecords = $dayRecords->filter(fn($r) => $r->hasOutputData());
            
            $dailyIntakeMl = $intakeRecords->sum(function($record) {
                return ($record->getFluidIntakeInMl() ?? 0) + ($record->getAmountInMl() ?? 0);
            });
            
            $dailyOutputMl = $outputRecords->sum(function($record) {
                return $record->getUrineVolumeInMl() ?? 0;
            });
            
            $dailyBreakdown[] = [
                'date' => $date,
                'intake_ml' => $dailyIntakeMl,
                'output_ml' => $dailyOutputMl,
                'balance_ml' => $dailyIntakeMl - $dailyOutputMl,
                'meal_count' => $intakeRecords->whereNotNull('meal_type')->count(),
                'bowel_movements' => $outputRecords->where('bowel_movement', 'yes')->count(),
            ];
        }
        
        return [
            'period_days' => $days,
            'daily_breakdown' => array_reverse($dailyBreakdown),
            'average_daily_intake' => round(collect($dailyBreakdown)->avg('intake_ml'), 0),
            'average_daily_output' => round(collect($dailyBreakdown)->avg('output_ml'), 0),
        ];
    }

    // Get nutritional intake summary
    public static function getNutritionalSummary($careLogId)
    {
        $intakeRecords = self::intakeOnly()
                            ->where('care_log_id', $careLogId)
                            ->get();
        
        if ($intakeRecords->isEmpty()) {
            return null;
        }
        
        $mealBreakdown = $intakeRecords->whereNotNull('meal_type')->groupBy('meal_type');
        $foodItems = $intakeRecords->whereNotNull('food_items')
                                  ->flatMap(function($record) {
                                      return $record->food_items ?? [];
                                  })
                                  ->filter()
                                  ->countBy();
        
        return [
            'total_meals' => $intakeRecords->whereNotNull('meal_type')->count(),
            'meals_with_assistance' => $intakeRecords->where('assistance_needed', true)->count(),
            'meal_types' => $mealBreakdown->keys()->toArray(),
            'most_common_foods' => $foodItems->sortDesc()->take(10)->toArray(),
            'assistance_rate' => $intakeRecords->count() > 0 ? 
                round(($intakeRecords->where('assistance_needed', true)->count() / $intakeRecords->count()) * 100, 1) : 0,
            'unique_food_items' => $foodItems->count(),
        ];
    }

    // Get record summary for reporting
    public function getRecordSummary()
    {
        return [
            'record_id' => $this->id,
            'type' => $this->hasIntakeData() && $this->hasOutputData() ? 'combined' : 
                     ($this->hasIntakeData() ? 'intake' : 'output'),
            'meal_info' => [
                'meal_type' => $this->getMealTypeDisplayName(),
                'meal_time' => $this->getFormattedMealTime(),
                'food_items' => $this->getFormattedFoodItems(),
                'amount' => $this->getFormattedAmount(),
                'assistance_needed' => $this->neededAssistance(),
            ],
            'fluid_info' => [
                'fluid_intake' => $this->getFormattedFluidIntake(),
                'dehydration_signs' => $this->getDehydrationSignsArray(),
            ],
            'output_info' => [
                'output_time' => $this->getFormattedOutputTime(),
                'urine_volume' => $this->getFormattedUrineVolume(),
                'urine_color' => $this->urine_color,
                'abnormal_urine' => $this->hasAbnormalUrineColor(),
                'bowel_movement' => $this->hadBowelMovement(),
                'bowel_consistency' => $this->bowel_consistency,
                'bowel_status' => $this->getBowelConsistencyStatus(),
            ],
            'notes' => [
                'intake_notes' => $this->intake_notes,
                'output_notes' => $this->output_notes,
            ],
        ];
    }
}

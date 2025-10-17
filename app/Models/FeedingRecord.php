<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedingRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'feeding_time',
        'feeding_type',
        'amount',
        'amount_unit',
        'notes',
    ];

    protected $casts = [
        'feeding_time' => 'datetime:H:i',
        'amount' => 'decimal:2',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper methods for unit conversions
    public function getAmountInMl()
    {
        if ($this->amount_unit === 'ml') {
            return $this->amount;
        } elseif ($this->amount_unit === 'oz') {
            return $this->amount * 29.5735; // 1 oz = 29.5735 ml
        } elseif ($this->amount_unit === 'l') {
            return $this->amount * 1000; // 1 l = 1000 ml
        }
        
        return $this->amount; // fallback
    }

    public function getAmountInOz()
    {
        if ($this->amount_unit === 'oz') {
            return $this->amount;
        } elseif ($this->amount_unit === 'ml') {
            return $this->amount / 29.5735; // ml to oz
        } elseif ($this->amount_unit === 'l') {
            return ($this->amount * 1000) / 29.5735; // l to ml to oz
        }
        
        return $this->amount; // fallback
    }

    // Scope for daily feeding totals
    public function scopeDailyTotal($query, $careLogId, $unit = 'ml')
    {
        return $query->where('care_log_id', $careLogId)
                    ->get()
                    ->sum(function ($record) use ($unit) {
                        return $unit === 'ml' ? $record->getAmountInMl() : $record->getAmountInOz();
                    });
    }
}

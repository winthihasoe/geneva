<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VitalSign extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'measurement_time',
        'temperature',
        'temperature_unit',
        'pulse_rate',
        'respiratory_rate',
        'systolic_pressure',
        'diastolic_pressure',
        'spo2',
        'notes',
    ];

    protected $casts = [
        'measurement_time' => 'datetime:H:i',
        'temperature' => 'decimal:1',
        'pulse_rate' => 'integer',
        'respiratory_rate' => 'integer',
        'systolic_pressure' => 'integer',
        'diastolic_pressure' => 'integer',
        'spo2' => 'decimal:2',  // Added SPO2 cast
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to get formatted temperature with unit
    public function getTemperatureFormatted()
    {
        if ($this->temperature) {
            return $this->temperature . '°' . $this->temperature_unit;
        }
        return null;
    }

    // Helper method to convert temperature between units
    public function getTemperatureInCelsius()
    {
        if ($this->temperature) {
            if ($this->temperature_unit === 'F') {
                return round(($this->temperature - 32) * 5/9, 1);
            }
            return $this->temperature; // Already in Celsius
        }
        return null;
    }

    public function getTemperatureInFahrenheit()
    {
        if ($this->temperature) {
            if ($this->temperature_unit === 'C') {
                return round(($this->temperature * 9/5) + 32, 1);
            }
            return $this->temperature; // Already in Fahrenheit
        }
        return null;
    }

    // Helper method to get formatted blood pressure
    public function getBloodPressureFormatted()
    {
        if ($this->systolic_pressure && $this->diastolic_pressure) {
            return $this->systolic_pressure . '/' . $this->diastolic_pressure;
        }
        return null;
    }

    // NEW: Helper method to get formatted SPO2
    public function getSpo2Formatted()
    {
        if ($this->spo2) {
            return $this->spo2 . '%';
        }
        return null;
    }

    // NEW: Determine care type based on vital signs pattern
    public function getCareType()
    {
        // If has blood pressure and SPO2, likely elderly care
        if ($this->systolic_pressure && $this->diastolic_pressure && $this->spo2) {
            return 'elderly';
        }
        // If only has basic vitals (no BP), likely newborn care
        if (!$this->systolic_pressure && !$this->diastolic_pressure && !$this->spo2) {
            return 'newborn';
        }
        return 'unknown';
    }

    // UPDATED: Check if temperature is within normal ranges (care type specific)
    public function isTemperatureNormal()
    {
        $tempInCelsius = $this->getTemperatureInCelsius();
        if ($tempInCelsius) {
            $careType = $this->getCareType();
            
            if ($careType === 'newborn') {
                // Normal range for newborns: 36.5-37.5°C
                return $tempInCelsius >= 36.5 && $tempInCelsius <= 37.5;
            } elseif ($careType === 'elderly') {
                // Normal range for elderly: 36.1-37.2°C (slightly lower baseline)
                return $tempInCelsius >= 36.1 && $tempInCelsius <= 37.2;
            } else {
                // General adult range: 36.1-37.8°C
                return $tempInCelsius >= 36.1 && $tempInCelsius <= 37.8;
            }
        }
        return null;
    }

    // UPDATED: Check if vital signs are within normal ranges (care type specific)
    public function isPulseRateNormal()
    {
        if ($this->pulse_rate) {
            $careType = $this->getCareType();
            
            if ($careType === 'newborn') {
                // Normal range for newborns: 100-160 bpm
                return $this->pulse_rate >= 100 && $this->pulse_rate <= 160;
            } elseif ($careType === 'elderly') {
                // Normal range for elderly: 60-100 bpm (may be lower due to medications)
                return $this->pulse_rate >= 60 && $this->pulse_rate <= 100;
            } else {
                // General adult range: 60-100 bpm
                return $this->pulse_rate >= 60 && $this->pulse_rate <= 100;
            }
        }
        return null;
    }

    public function isRespiratoryRateNormal()
    {
        if ($this->respiratory_rate) {
            $careType = $this->getCareType();
            
            if ($careType === 'newborn') {
                // Normal range for newborns: 30-60 breaths per minute
                return $this->respiratory_rate >= 30 && $this->respiratory_rate <= 60;
            } elseif ($careType === 'elderly') {
                // Normal range for elderly: 12-20 breaths per minute
                return $this->respiratory_rate >= 12 && $this->respiratory_rate <= 20;
            } else {
                // General adult range: 12-20 breaths per minute
                return $this->respiratory_rate >= 12 && $this->respiratory_rate <= 20;
            }
        }
        return null;
    }

    public function isBloodPressureNormal()
    {
        if ($this->systolic_pressure && $this->diastolic_pressure) {
            $careType = $this->getCareType();
            
            if ($careType === 'newborn') {
                // Normal ranges for newborns: Systolic 60-90, Diastolic 30-60
                return ($this->systolic_pressure >= 60 && $this->systolic_pressure <= 90) &&
                       ($this->diastolic_pressure >= 30 && $this->diastolic_pressure <= 60);
            } elseif ($careType === 'elderly') {
                // Normal ranges for elderly: Systolic 90-140, Diastolic 60-90 (slightly higher tolerance)
                return ($this->systolic_pressure >= 90 && $this->systolic_pressure <= 140) &&
                       ($this->diastolic_pressure >= 60 && $this->diastolic_pressure <= 90);
            } else {
                // General adult range: Systolic 90-120, Diastolic 60-80
                return ($this->systolic_pressure >= 90 && $this->systolic_pressure <= 120) &&
                       ($this->diastolic_pressure >= 60 && $this->diastolic_pressure <= 80);
            }
        }
        return null;
    }

    // NEW: Check if SPO2 is within normal range
    public function isSpo2Normal()
    {
        if ($this->spo2) {
            // Normal SPO2: >= 95% for most patients
            // For elderly, >= 92% might be acceptable depending on conditions
            $careType = $this->getCareType();
            
            if ($careType === 'elderly') {
                return $this->spo2 >= 92; // More lenient for elderly
            } else {
                return $this->spo2 >= 95; // Standard for adults/newborns
            }
        }
        return null;
    }

    // NEW: Get vital signs status summary
    public function getVitalSignsStatus()
    {
        return [
            'temperature' => [
                'value' => $this->getTemperatureFormatted(),
                'normal' => $this->isTemperatureNormal(),
                'celsius' => $this->getTemperatureInCelsius(),
            ],
            'pulse_rate' => [
                'value' => $this->pulse_rate ? $this->pulse_rate . ' bpm' : null,
                'normal' => $this->isPulseRateNormal(),
            ],
            'respiratory_rate' => [
                'value' => $this->respiratory_rate ? $this->respiratory_rate . ' breaths/min' : null,
                'normal' => $this->isRespiratoryRateNormal(),
            ],
            'blood_pressure' => [
                'value' => $this->getBloodPressureFormatted(),
                'normal' => $this->isBloodPressureNormal(),
            ],
            'spo2' => [
                'value' => $this->getSpo2Formatted(),
                'normal' => $this->isSpo2Normal(),
            ],
            'care_type' => $this->getCareType(),
            'overall_normal' => $this->areAllVitalSignsNormal(),
        ];
    }

    // NEW: Check if all measured vital signs are normal
    public function areAllVitalSignsNormal()
    {
        $checks = [];
        
        if ($this->temperature) {
            $checks[] = $this->isTemperatureNormal();
        }
        if ($this->pulse_rate) {
            $checks[] = $this->isPulseRateNormal();
        }
        if ($this->respiratory_rate) {
            $checks[] = $this->isRespiratoryRateNormal();
        }
        if ($this->systolic_pressure && $this->diastolic_pressure) {
            $checks[] = $this->isBloodPressureNormal();
        }
        if ($this->spo2) {
            $checks[] = $this->isSpo2Normal();
        }
        
        return !empty($checks) && !in_array(false, $checks);
    }

    // NEW: Scope for newborn care records (no BP/SPO2)
    public function scopeNewbornCare($query)
    {
        return $query->whereNull('systolic_pressure')
                    ->whereNull('diastolic_pressure')
                    ->whereNull('spo2');
    }

    // NEW: Scope for elderly care records (with BP/SPO2)
    public function scopeElderlyCare($query)
    {
        return $query->where(function($q) {
            $q->whereNotNull('systolic_pressure')
              ->orWhereNotNull('diastolic_pressure')
              ->orWhereNotNull('spo2');
        });
    }

    // NEW: Scope for abnormal vital signs
    public function scopeAbnormalVitals($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)
                    ->get()
                    ->filter(function($record) {
                        return !$record->areAllVitalSignsNormal();
                    });
    }

    // Scope for vital signs ordered by time
    public function scopeOrderedByTime($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)
                    ->orderBy('measurement_time');
    }

    // UPDATED: Get vital signs statistics for a care log (enhanced)
    public static function getVitalSignsStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)
                      ->whereNotNull('measurement_time')
                      ->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        // Convert all temperatures to Celsius for consistent statistics
        $temperaturesInCelsius = $records->map(function ($record) {
            return $record->getTemperatureInCelsius();
        })->filter();
        
        // Determine care type from records
        $careTypes = $records->map(function($record) {
            return $record->getCareType();
        })->countBy();
        
        $dominantCareType = $careTypes->keys()->first();
        
        $stats = [
            'total_measurements' => $records->count(),
            'care_type' => $dominantCareType,
            'temperature' => [
                'average_celsius' => $temperaturesInCelsius->count() > 0 ? round($temperaturesInCelsius->avg(), 1) : null,
                'min_celsius' => $temperaturesInCelsius->min(),
                'max_celsius' => $temperaturesInCelsius->max(),
                'normal_count' => $records->filter(fn($r) => $r->isTemperatureNormal())->count(),
            ],
            'pulse_rate' => [
                'average' => $records->whereNotNull('pulse_rate')->count() > 0 ? round($records->whereNotNull('pulse_rate')->avg('pulse_rate')) : null,
                'min' => $records->whereNotNull('pulse_rate')->min('pulse_rate'),
                'max' => $records->whereNotNull('pulse_rate')->max('pulse_rate'),
                'normal_count' => $records->filter(fn($r) => $r->isPulseRateNormal())->count(),
            ],
            'respiratory_rate' => [
                'average' => $records->whereNotNull('respiratory_rate')->count() > 0 ? round($records->whereNotNull('respiratory_rate')->avg('respiratory_rate')) : null,
                'min' => $records->whereNotNull('respiratory_rate')->min('respiratory_rate'),
                'max' => $records->whereNotNull('respiratory_rate')->max('respiratory_rate'),
                'normal_count' => $records->filter(fn($r) => $r->isRespiratoryRateNormal())->count(),
            ],
        ];
        
        // Add blood pressure stats if present (elderly care)
        $bpRecords = $records->whereNotNull('systolic_pressure')->whereNotNull('diastolic_pressure');
        if ($bpRecords->count() > 0) {
            $stats['blood_pressure'] = [
                'systolic' => [
                    'average' => round($bpRecords->avg('systolic_pressure')),
                    'min' => $bpRecords->min('systolic_pressure'),
                    'max' => $bpRecords->max('systolic_pressure'),
                ],
                'diastolic' => [
                    'average' => round($bpRecords->avg('diastolic_pressure')),
                    'min' => $bpRecords->min('diastolic_pressure'),
                    'max' => $bpRecords->max('diastolic_pressure'),
                ],
                'normal_count' => $records->filter(fn($r) => $r->isBloodPressureNormal())->count(),
            ];
        }
        
        // Add SPO2 stats if present (elderly care)
        $spo2Records = $records->whereNotNull('spo2');
        if ($spo2Records->count() > 0) {
            $stats['spo2'] = [
                'average' => round($spo2Records->avg('spo2'), 1),
                'min' => $spo2Records->min('spo2'),
                'max' => $spo2Records->max('spo2'),
                'normal_count' => $records->filter(fn($r) => $r->isSpo2Normal())->count(),
            ];
        }
        
        // Overall health indicators
        $stats['health_indicators'] = [
            'total_normal_readings' => $records->filter(fn($r) => $r->areAllVitalSignsNormal())->count(),
            'abnormal_readings' => $records->filter(fn($r) => !$r->areAllVitalSignsNormal())->count(),
            'normal_percentage' => round(($records->filter(fn($r) => $r->areAllVitalSignsNormal())->count() / $records->count()) * 100, 1),
        ];
        
        return $stats;
    }

    // NEW: Get care type specific data
    public function getCareTypeData()
    {
        return [
            'newborn' => [
                'measurement_time' => $this->measurement_time,
                'temperature' => $this->temperature,
                'temperature_unit' => $this->temperature_unit,
                'pulse_rate' => $this->pulse_rate,
                'respiratory_rate' => $this->respiratory_rate,
                'notes' => $this->notes,
            ],
            'elderly' => [
                'measurement_time' => $this->measurement_time,
                'temperature' => $this->temperature,
                'temperature_unit' => $this->temperature_unit,
                'pulse_rate' => $this->pulse_rate,
                'respiratory_rate' => $this->respiratory_rate,
                'systolic_pressure' => $this->systolic_pressure,
                'diastolic_pressure' => $this->diastolic_pressure,
                'spo2' => $this->spo2,
                'notes' => $this->notes,
            ],
        ];
    }
}

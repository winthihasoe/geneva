<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientFeedback extends Model
{
    protected $table = 'patient_feedbacks';

    public const TYPES = [
        'daily' => 'Daily feedback',
        'monthly' => 'Monthly feedback',
    ];

    public const FOLLOW_UPS = [
        'daily' => [
            'after_1_duty' => 'After 1 duty',
            'one_day_before_completion' => '1 day before duty completion',
            'after_duty_finished' => 'After duty is finished',
        ],
        'monthly' => [
            'after_1_duty' => 'After 1 duty',
            'three_days_before_month' => '3 days before 1 month',
            'after_duty_finished' => 'After duty is finished',
        ],
    ];

    protected $fillable = [
        'patient_id',
        'body',
        'feedback_type',
        'follow_up',
        'recorded_by',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    /**
     * One sheet column for each feedback type and follow-up label.
     *
     * @return list<array{key: string, feedback_type: string, follow_up: string, type_label: string, follow_up_label: string}>
     */
    public static function sheetColumns(): array
    {
        $columns = [];

        foreach (self::FOLLOW_UPS as $type => $followUps) {
            foreach ($followUps as $followUp => $label) {
                $columns[] = [
                    'key' => $type.':'.$followUp,
                    'feedback_type' => $type,
                    'follow_up' => $followUp,
                    'type_label' => self::TYPES[$type],
                    'follow_up_label' => $label,
                ];
            }
        }

        return $columns;
    }

    public function sheetKey(): ?string
    {
        if (! isset(self::FOLLOW_UPS[$this->feedback_type][$this->follow_up])) {
            return null;
        }

        return $this->feedback_type.':'.$this->follow_up;
    }

    public function typeLabel(): ?string
    {
        return self::TYPES[$this->feedback_type] ?? null;
    }

    public function followUpLabel(): ?string
    {
        return self::FOLLOW_UPS[$this->feedback_type][$this->follow_up] ?? null;
    }

    public function scheduleLabel(): ?string
    {
        $label = collect([$this->typeLabel(), $this->followUpLabel()])
            ->filter()
            ->implode(' · ');

        return $label !== '' ? $label : null;
    }

    public function toPresentation(): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'feedback_type' => $this->feedback_type,
            'feedback_type_label' => $this->typeLabel(),
            'follow_up' => $this->follow_up,
            'follow_up_label' => $this->followUpLabel(),
            'staff_name' => $this->recorder->name ?? 'Unknown',
            'recorded_at' => $this->created_at?->format('d-m-Y H:i'),
        ];
    }
}

<?php

namespace App\Models;

use App\Support\CareTypeLabel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseRecord extends Model
{
    use HasFactory;

    public const STATUSES = ['open', 'cv_sent', 'interviewing', 'confirmed', 'on_duty', 'cancelled'];

    public const BRANCHES = ['Yangon', 'Mandalay', 'Naypyidaw'];

    public const LEVELS = ['Skilled', 'Advanced', 'Special Nurse'];

    public const DUTY_TYPES = ['Day', 'Night', 'Day & Night', '24hr'];

    public const CARE_TYPES = ['newborn', 'baby', 'elder', 'maternal'];

    public const LEGACY_CARE_TYPES = ['child'];

    public const PATIENT_SERVICE_AREAS = ['Yangon', 'Mandalay'];

    protected $fillable = [
        'branch',
        'inquiry_at',
        'inquiry_note',
        'care_type',
        'name',
        'address',
        'phone',
        'requested_start',
        'requested_start_date',
        'duration',
        'level',
        'duty_type',
        'cv_sent_at',
        'cv_sent_note',
        'client_response',
        'interview_date',
        'interview_note',
        'confirm_date',
        'confirm_note',
        'deposit_note',
        'duty_start_date',
        'duty_start_note',
        'status',
        'notes',
        'patient_id',
        'source_sheet',
        'source_row',
    ];

    protected $casts = [
        'inquiry_at' => 'datetime',
        'requested_start_date' => 'date',
        'cv_sent_at' => 'datetime',
        'interview_date' => 'date',
        'confirm_date' => 'date',
        'duty_start_date' => 'date',
    ];

    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public static function storedCareTypes(): array
    {
        return array_values(array_unique([
            ...self::CARE_TYPES,
            ...self::LEGACY_CARE_TYPES,
        ]));
    }

    public static function formChoices(array $choices, ?string $current = null): array
    {
        if ($current && ! in_array($current, $choices, true)) {
            $choices[] = $current;
        }

        return $choices;
    }

    /**
     * @return list<string>
     */
    public static function levelNames(mixed $value): array
    {
        if (is_array($value)) {
            $names = collect($value)
                ->map(fn ($name) => trim((string) $name))
                ->filter()
                ->unique()
                ->values()
                ->all();
        } elseif (! is_string($value) || trim($value) === '') {
            $names = [];
        } else {
            $names = collect(explode(',', $value))
                ->map(fn ($name) => trim($name))
                ->filter()
                ->unique()
                ->values()
                ->all();
        }

        $ordered = [];

        foreach (self::LEVELS as $level) {
            if (in_array($level, $names, true)) {
                $ordered[] = $level;
            }
        }

        foreach ($names as $name) {
            if (! in_array($name, $ordered, true)) {
                $ordered[] = $name;
            }
        }

        return $ordered;
    }

    /**
     * @return list<string>
     */
    public static function formLevels(?string $current = null): array
    {
        $choices = self::LEVELS;

        foreach (self::levelNames($current) as $name) {
            if (! in_array($name, $choices, true)) {
                $choices[] = $name;
            }
        }

        return $choices;
    }

    public static function formCareTypes(?string $current = null): array
    {
        if ($current === 'child') {
            return array_map(
                fn (string $type) => $type === 'baby' ? 'child' : $type,
                self::CARE_TYPES
            );
        }

        $types = self::CARE_TYPES;

        if ($current && ! in_array($current, $types, true)) {
            $types[] = $current;
        }

        return $types;
    }

    public function canLinkPatient(): bool
    {
        return $this->patient_id === null
            && in_array($this->status, ['confirmed', 'on_duty'], true);
    }

    public function patientFormDefaults(): array
    {
        $phone = trim((string) $this->phone);
        $phoneFits = $phone !== '' && strlen($phone) <= 15;
        $notes = [];

        if ($this->duration) {
            $notes[] = 'Duration: '.$this->duration;
        }

        if ($this->level) {
            $notes[] = 'Level: '.$this->level;
        }

        if ($this->duty_type) {
            $notes[] = 'Duty: '.$this->duty_type;
        }

        if ($this->confirm_note) {
            $notes[] = 'Confirm: '.$this->confirm_note;
        }

        if ($phone !== '' && ! $phoneFits) {
            $notes[] = 'Phone: '.$phone;
        }

        return [
            'id' => $this->id,
            'type' => CareTypeLabel::patientTypeFromCase($this->care_type),
            'first_name' => $this->name,
            'address' => $this->address ?? '',
            'emergency_contact_phone' => $phoneFits ? $phone : '',
            'service_area' => in_array($this->branch, self::PATIENT_SERVICE_AREAS, true)
                ? $this->branch
                : '',
            'notes' => implode("\n", $notes),
        ];
    }
}

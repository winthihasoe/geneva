<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApply extends Model
{
    use HasFactory;

    public const SOURCES = ['website', 'manual', 'import'];

    public const WEBSITE_STATUSES = ['Pending', 'Contacted', 'Uncontactable', 'Refuse job'];

    public const STATUSES = [
        'pending',
        'contacted',
        'uncontactable',
        'recruit',
        'deny',
        'part_time',
    ];

    public const DECISIONS = self::STATUSES;

    public const BRANCHES = ['Yangon', 'Mandalay', 'Naypyidaw'];

    public const GENDERS = ['Male', 'Female'];

    public function isWebsiteSource(): bool
    {
        return ($this->source ?? 'website') === 'website';
    }

    public function pipelineStatus(): string
    {
        if ($this->isWebsiteSource()) {
            return $this->status ?: 'Pending';
        }

        return self::alignedStatus($this->status ?: $this->decision);
    }

    public function canLinkCv(): bool
    {
        return $this->cv_id === null && $this->pipelineStatus() === 'recruit';
    }

    public function cvFormDefaults(): array
    {
        return [
            'job_apply_id' => $this->id,
            'full_name' => $this->name ?? '',
            'date_of_birth' => optional($this->date_of_birth)->format('Y-m-d') ?? '',
            'gender' => $this->gender ?? '',
            'height' => $this->height,
            'weight' => $this->weight,
            'religion' => $this->religion ?? '',
            'phone' => $this->phone ?? '',
            'email' => $this->email ?? '',
            'line' => $this->line ?? '',
            'current_address' => $this->current_address ?? '',
            'nationality' => $this->nationality ?? '',
        ];
    }

    public static function alignedStatus(?string $value): string
    {
        $normalized = strtolower(trim((string) $value));
        $normalized = preg_replace('/[\s-]+/', '_', $normalized) ?? '';

        $aliases = [
            'pending' => 'pending',
            'contacted' => 'contacted',
            'uncontactable' => 'uncontactable',
            'recruit' => 'recruit',
            'deny' => 'deny',
            'denied' => 'deny',
            'refuse_job' => 'deny',
            'refuse' => 'deny',
            'part_time' => 'part_time',
            'parttime' => 'part_time',
        ];

        return $aliases[$normalized] ?? 'pending';
    }

    protected $fillable = [
        'name',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'nationality',
        'ethnicity',
        'viber',
        'religion',
        'phone',
        'email',
        'line',
        'current_address',
        'service_area',
        'available_townships',
        'status',
        'source',
        'coordinated_by',
        'interviewed_by',
        'cv_reported_date',
        'interview_date',
        'training_start_date',
        'assessment_date',
        'interview_score',
        'interview_score_note',
        'interview_note',
        'decision',
        'assessment_score',
        'training_note',
        'assessment_note',
        'notes',
        'cv_id',
        'source_sheet',
        'source_row',
        'experience',
        'language',
        'passport',
        'visa',
        'certificates',
        'certificate_details',
    ];

    protected $casts = [
        'certificates' => 'array',
        'available_townships' => 'array',
        'date_of_birth' => 'date',
        'cv_reported_date' => 'date',
        'interview_date' => 'date',
        'training_start_date' => 'date',
        'assessment_date' => 'date',
        'interview_score' => 'integer',
    ];

    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function cv()
    {
        return $this->belongsTo(CV::class, 'cv_id');
    }
}

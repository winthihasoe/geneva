<?php

namespace App\Http\Controllers;

use App\Models\CareLogPublicLink;
use App\Models\PatientCaregiverAssignment;
use App\Services\PatientAgeFromDob;
use App\Services\PatientCareTypeMapper;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PublicCareLogController extends Controller
{
    public function show(string $uuid)
    {
        $resolved = $this->resolveActiveLink($uuid);
        if (! $resolved) {
            return $this->invalidLinkResponse();
        }

        ['link' => $link, 'assignment' => $assignment, 'patient' => $patient, 'cv' => $cv] = $resolved;

        $careType = PatientCareTypeMapper::careTypeFromPatient($patient);
        $dobFormatted = $patient->date_of_birth
            ? Carbon::parse($patient->date_of_birth)->format('Y-m-d')
            : null;

        return Inertia::render('Public/PublicCareLogFill', [
            'uuid' => $link->uuid,
            'careType' => $careType,
            'caregiverName' => $cv->full_name ?? 'Caregiver',
            'patient' => [
                'first_name' => $patient->first_name,
                'last_name' => $patient->last_name,
                'date_of_birth' => $dobFormatted,
                'age_display' => PatientAgeFromDob::ageDisplay($dobFormatted, $patient->type),
                'weight_kg' => $patient->weight_kg,
                'height_cm' => $patient->height_cm,
            ],
            'flash' => [
                'success' => session('success'),
                'show_pdf_prompt' => session('show_pdf_prompt'),
                'care_log_data' => session('care_log_data'),
            ],
        ]);
    }

    public function store(Request $request, string $uuid)
    {
        $resolved = $this->resolveActiveLink($uuid);
        if (! $resolved) {
            return $this->invalidLinkResponse();
        }

        ['assignment' => $assignment, 'patient' => $patient] = $resolved;

        $request->attributes->set('public_care_log_context', [
            'cv_id' => $assignment->cv_id,
            'patient_id' => $assignment->patient_id,
        ]);
        $request->attributes->set('public_care_log_uuid', $uuid);

        $careType = PatientCareTypeMapper::careTypeFromPatient($patient);
        $controller = app(CareLogController::class);

        return match ($careType) {
            'newborn' => $controller->storeNewbornCareLog($request),
            'baby' => $controller->storeBabyCareLog($request),
            'maternal' => $controller->storeMaternalCareLog($request),
            'elder' => $controller->storeElderlyCareLog($request),
            default => $this->invalidLinkResponse(),
        };
    }

    public function history(Request $request, string $uuid)
    {
        $resolved = $this->resolveActiveLink($uuid);
        if (! $resolved) {
            return $this->invalidLinkResponse();
        }

        ['assignment' => $assignment, 'link' => $link] = $resolved;

        $logs = DB::table('care_logs')
            ->where('patient_id', $assignment->patient_id)
            ->where('cv_id', $assignment->cv_id)
            ->orderByDesc('care_date')
            ->orderByDesc('id')
            ->paginate(20)
            ->through(fn ($row) => [
                'id' => $row->id,
                'care_date' => $row->care_date,
                'care_type' => $row->care_type,
                'first_name' => $row->first_name,
                'last_name' => $row->last_name,
                'age_display' => $row->age_display,
            ]);

        return Inertia::render('Public/PublicCareLogHistory', [
            'uuid' => $link->uuid,
            'careLogs' => $logs,
        ]);
    }

    public function historyShow(string $uuid, int $careLogId)
    {
        $resolved = $this->resolveActiveLink($uuid);
        if (! $resolved) {
            return $this->invalidLinkResponse();
        }

        ['assignment' => $assignment, 'link' => $link] = $resolved;

        $careLog = DB::table('care_logs')
            ->where('id', $careLogId)
            ->where('patient_id', $assignment->patient_id)
            ->where('cv_id', $assignment->cv_id)
            ->first();

        if (! $careLog) {
            abort(404);
        }

        $careLogController = app(CareLogController::class);
        $careLogData = $careLogController->getCareLogDataForPublic(
            $careLogId,
            (int) $assignment->cv_id,
            (int) $assignment->patient_id,
            $careLog->care_type
        );

        $page = match ($careLog->care_type) {
            'newborn' => 'Caregiver/CareLogs/NewbornCareLog/ShowNewbornCareLogDetails',
            'baby' => 'Caregiver/CareLogs/BabyCareLog/ShowBabyCareLogDetails',
            'maternal' => 'Caregiver/CareLogs/MaternalCareLog/ShowMaternalCareLogDetails',
            'elder' => 'Caregiver/CareLogs/ElderlyCareLog/ShowElderlyCareLogDetails',
            default => abort(404),
        };

        return Inertia::render($page, [
            'careLogData' => $careLogData,
            'publicContext' => [
                'uuid' => $link->uuid,
                'isPublicReadOnly' => true,
            ],
        ]);
    }

    /**
     * @return array{link: CareLogPublicLink, assignment: PatientCaregiverAssignment, patient: \App\Models\Patient, cv: \App\Models\CV}|null
     */
    protected function resolveActiveLink(string $uuid): ?array
    {
        $link = CareLogPublicLink::query()
            ->where('uuid', $uuid)
            ->with(['assignment.patient', 'assignment.cv'])
            ->first();

        if (! $link || ! $link->assignment) {
            return null;
        }

        $assignment = $link->assignment;
        if (! $assignment->isActive()) {
            return null;
        }

        $patient = $assignment->patient;
        $cv = $assignment->cv;
        if (! $patient || ! $cv) {
            return null;
        }

        return compact('link', 'assignment', 'patient', 'cv');
    }

    protected function invalidLinkResponse()
    {
        return Inertia::render('Public/CareLogLinkInvalid')
            ->toResponse(request())
            ->setStatusCode(410);
    }
}

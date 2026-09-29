<?php

namespace App\Support;

use App\Models\CaseRecord;
use App\Models\JobApply;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\RichText\RichText;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PerformanceRecordImporter
{
    /**
     * @return array{recruitment: array{created: int, updated: int, skipped: int}, cases: array{created: int, updated: int, skipped: int}}
     */
    public function importFromPath(string $path): array
    {
        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        if ($extension === 'json') {
            $payload = json_decode((string) file_get_contents($path), true);
            if (! is_array($payload)) {
                throw new \InvalidArgumentException('The JSON file could not be read.');
            }
        } else {
            $payload = $this->parseExcel($path);
        }

        return $this->importPayload($payload);
    }

    /**
     * @return array{recruitment: array<int, array<string, mixed>>, cases: array<int, array<string, mixed>>}
     */
    public function parseExcel(string $path): array
    {
        $spreadsheet = IOFactory::load($path);
        $payload = [
            'recruitment' => [],
            'cases' => [],
        ];

        foreach ($spreadsheet->getWorksheetIterator() as $sheet) {
            $classified = $this->classifySheet($sheet->getTitle());
            if ($classified === null) {
                continue;
            }

            $rows = $this->readSheetRows($sheet);
            if (count($rows) < 2) {
                continue;
            }

            $headers = array_map(fn ($value) => $this->normalizeHeader($value), $rows[0]);

            if ($classified['type'] === 'recruitment') {
                for ($i = 1; $i < count($rows); $i++) {
                    $record = $this->mapRecruitmentRow(
                        $headers,
                        $rows[$i],
                        $classified['branch'],
                        $sheet->getTitle(),
                        $i + 1
                    );
                    if ($record) {
                        $payload['recruitment'][] = $record;
                    }
                }
            } else {
                for ($i = 1; $i < count($rows); $i++) {
                    $record = $this->mapCaseRow(
                        $headers,
                        $rows[$i],
                        $classified['branch'],
                        $sheet->getTitle(),
                        $i + 1
                    );
                    if ($record) {
                        $payload['cases'][] = $record;
                    }
                }
            }
        }

        $spreadsheet->disconnectWorksheets();

        return $payload;
    }

    /**
     * @param  array{recruitment?: array<int, array<string, mixed>>, cases?: array<int, array<string, mixed>>}  $payload
     * @return array{recruitment: array{created: int, updated: int, skipped: int}, cases: array{created: int, updated: int, skipped: int}}
     */
    public function importPayload(array $payload): array
    {
        $summary = [
            'recruitment' => ['created' => 0, 'updated' => 0, 'skipped' => 0],
            'cases' => ['created' => 0, 'updated' => 0, 'skipped' => 0],
        ];

        foreach ($payload['recruitment'] ?? [] as $row) {
            $result = $this->upsertRecruitment($row);
            $summary['recruitment'][$result]++;
        }

        foreach ($payload['cases'] ?? [] as $row) {
            $result = $this->upsertCase($row);
            $summary['cases'][$result]++;
        }

        return $summary;
    }

    /**
     * @param  array<string, mixed>  $row
     */
    private function upsertRecruitment(array $row): string
    {
        $cvReported = PerformanceRecordParser::parseDate($row['cv_reported_date'] ?? null);
        $interview = PerformanceRecordParser::parseDate($row['interview_date'] ?? null);
        $training = PerformanceRecordParser::parseDate($row['training_start'] ?? null);
        $assessment = PerformanceRecordParser::parseDate($row['assessment_date'] ?? null);
        $score = PerformanceRecordParser::parseInterviewScore($row['interview_score'] ?? null);
        $name = PerformanceRecordParser::blank($row['candidate_name'] ?? null);
        $decision = PerformanceRecordParser::parseDecision($row['decision'] ?? null);

        if ($name === null) {
            return 'skipped';
        }

        $pipeline = [
            'coordinated_by' => PerformanceRecordParser::blank($row['coordinated_by'] ?? null),
            'interviewed_by' => PerformanceRecordParser::blank($row['interviewed_by'] ?? null),
            'cv_reported_date' => $cvReported['date'],
            'interview_date' => $interview['date'],
            'training_start_date' => $training['date'],
            'assessment_date' => $assessment['date'],
            'interview_score' => $score['score'],
            'interview_score_note' => $score['note'],
            'interview_note' => $interview['note'],
            'decision' => $decision,
            'status' => JobApply::alignedStatus($decision),
            'assessment_score' => PerformanceRecordParser::blank($row['assessment_score'] ?? null),
            'training_note' => $training['note'],
            'assessment_note' => $assessment['note'],
            'source_sheet' => $row['source_sheet'] ?? null,
            'source_row' => $row['source_row'] ?? null,
        ];

        $existing = $this->findRecruitment([
            ...$pipeline,
            'name' => $name,
            'service_area' => $row['branch'],
        ]);

        if ($existing) {
            $existing->update($pipeline);

            return 'updated';
        }

        JobApply::create([
            ...$pipeline,
            'name' => $name,
            'service_area' => $row['branch'],
            'source' => 'import',
        ]);

        return 'created';
    }

    /**
     * @param  array<string, mixed>  $row
     */
    private function upsertCase(array $row): string
    {
        $inquiry = PerformanceRecordParser::parseDateTime($row['inquiry'] ?? null);
        $fallbackDate = $inquiry['datetime'] ? substr($inquiry['datetime'], 0, 10) : null;
        $cvSent = PerformanceRecordParser::parseDateTime($row['cv_received'] ?? null, $fallbackDate);
        $requested = PerformanceRecordParser::parseDate($row['requested_start'] ?? null);
        $interview = PerformanceRecordParser::parseDate($row['interview_date'] ?? null);
        $confirm = PerformanceRecordParser::parseDate($row['confirm_date'] ?? null);
        $dutyStart = PerformanceRecordParser::parseDate($row['duty_start'] ?? null);
        $name = PerformanceRecordParser::blank($row['name'] ?? null);

        if ($name === null) {
            return 'skipped';
        }

        $attributes = [
            'branch' => $row['branch'],
            'inquiry_at' => $inquiry['datetime'],
            'inquiry_note' => $inquiry['note'],
            'care_type' => PerformanceRecordParser::parseCareType($row['care_type'] ?? null),
            'name' => $name,
            'address' => PerformanceRecordParser::blank($row['address'] ?? null),
            'phone' => PerformanceRecordParser::blank($row['phone'] ?? null),
            'requested_start' => PerformanceRecordParser::blank($row['requested_start'] ?? null),
            'requested_start_date' => $requested['date'],
            'duration' => PerformanceRecordParser::blank($row['duration'] ?? null),
            'level' => PerformanceRecordParser::blank($row['level'] ?? null),
            'duty_type' => PerformanceRecordParser::blank($row['duty_type'] ?? null),
            'cv_sent_at' => $cvSent['datetime'],
            'cv_sent_note' => $cvSent['note'],
            'client_response' => PerformanceRecordParser::blank($row['client_response'] ?? null),
            'interview_date' => $interview['date'],
            'interview_note' => $interview['note'],
            'confirm_date' => $confirm['date'],
            'confirm_note' => $confirm['note'],
            'deposit_note' => PerformanceRecordParser::blank($row['deposit'] ?? null),
            'duty_start_date' => $dutyStart['date'],
            'duty_start_note' => $dutyStart['note'],
            'source_sheet' => $row['source_sheet'] ?? null,
            'source_row' => $row['source_row'] ?? null,
        ];

        $existing = $this->findCase($attributes);

        if ($existing) {
            $attributes['status'] = PerformanceRecordParser::deriveCaseStatus($attributes);
            $existing->update($attributes);

            return 'updated';
        }

        $attributes['status'] = PerformanceRecordParser::deriveCaseStatus($attributes);
        CaseRecord::create($attributes);

        return 'created';
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function findRecruitment(array $attributes): ?JobApply
    {
        if (! empty($attributes['source_sheet']) && ! empty($attributes['source_row'])) {
            $bySource = JobApply::query()
                ->where('source_sheet', $attributes['source_sheet'])
                ->where('source_row', $attributes['source_row'])
                ->first();

            if ($bySource && ! $bySource->isWebsiteSource()) {
                return $bySource;
            }
        }

        $query = JobApply::query()
            ->where('source', '!=', 'website')
            ->where('service_area', $attributes['service_area'])
            ->whereRaw('LOWER(TRIM(name)) = ?', [$this->normalizeName($attributes['name'])]);

        if (! empty($attributes['cv_reported_date'])) {
            $query->whereDate('cv_reported_date', $attributes['cv_reported_date']);
        } else {
            $query->whereNull('cv_reported_date');
        }

        return $query->first();
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function findCase(array $attributes): ?CaseRecord
    {
        if (! empty($attributes['source_sheet']) && ! empty($attributes['source_row'])) {
            $bySource = CaseRecord::query()
                ->where('source_sheet', $attributes['source_sheet'])
                ->where('source_row', $attributes['source_row'])
                ->first();

            if ($bySource) {
                return $bySource;
            }
        }

        $query = CaseRecord::query()
            ->where('branch', $attributes['branch'])
            ->whereRaw('LOWER(TRIM(name)) = ?', [$this->normalizeName($attributes['name'])]);

        if (! empty($attributes['inquiry_at'])) {
            $query->whereDate('inquiry_at', substr($attributes['inquiry_at'], 0, 10));
        } else {
            $query->whereNull('inquiry_at');
        }

        if (! empty($attributes['phone'])) {
            $query->where('phone', $attributes['phone']);
        }

        return $query->first();
    }

    /**
     * @return array{type: string, branch: string}|null
     */
    private function classifySheet(string $title): ?array
    {
        $name = mb_strtolower($title);
        $branch = null;

        if (str_contains($name, 'ygn') || str_contains($name, 'yangon')) {
            $branch = 'Yangon';
        } elseif (str_contains($name, 'mdy') || str_contains($name, 'mandalay')) {
            $branch = 'Mandalay';
        } elseif (str_contains($name, 'npt') || str_contains($name, 'naypyidaw') || str_contains($name, 'nay pyi')) {
            $branch = 'Naypyidaw';
        }

        if ($branch === null) {
            return null;
        }

        if (str_contains($name, 'recruit')) {
            return ['type' => 'recruitment', 'branch' => $branch];
        }

        if (str_contains($name, 'case')) {
            return ['type' => 'cases', 'branch' => $branch];
        }

        return null;
    }

    /**
     * @return array<int, array<int, string|null>>
     */
    private function readSheetRows(Worksheet $sheet): array
    {
        $highestRow = min($sheet->getHighestDataRow(), 5000);
        $highestColumnIndex = min(
            Coordinate::columnIndexFromString($sheet->getHighestDataColumn()),
            20
        );
        $rows = [];

        for ($row = 1; $row <= $highestRow; $row++) {
            $values = [];
            for ($col = 1; $col <= $highestColumnIndex; $col++) {
                $cell = $sheet->getCell(Coordinate::stringFromColumnIndex($col).$row);
                $values[] = $this->cellToString($cell);
            }
            $rows[] = $values;
        }

        return $rows;
    }

    private function cellToString(Cell $cell): ?string
    {
        $value = $cell->getValue();

        if ($value instanceof RichText) {
            $value = $value->getPlainText();
        }

        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value) && ExcelDate::isDateTime($cell)) {
            $date = ExcelDate::excelToDateTimeObject((float) $value);
            $ymd = $date->format('Y-m-d');
            $isExcelEpoch = in_array($ymd, ['1899-12-30', '1899-12-31', '1900-01-00', '1900-01-01'], true);

            if ($isExcelEpoch && $date->format('H:i:s') !== '00:00:00') {
                return $date->format('H:i:s');
            }

            if ($date->format('H:i:s') === '00:00:00') {
                return $date->format('Y-m-d');
            }

            return $date->format('Y-m-d H:i:s');
        }

        if (is_float($value) && $value == (int) $value) {
            return (string) (int) $value;
        }

        $text = trim((string) $value);

        return $text === '' ? null : $text;
    }

    /**
     * @param  array<int, string|null>  $headers
     * @param  array<int, string|null>  $values
     * @return array<string, mixed>|null
     */
    private function mapRecruitmentRow(array $headers, array $values, string $branch, string $sheet, int $rowNumber): ?array
    {
        $name = $this->valueAt($headers, $values, ['candidate name'], 1);
        if (PerformanceRecordParser::blank($name) === null) {
            return null;
        }

        return [
            'source_sheet' => $sheet,
            'source_row' => $rowNumber,
            'branch' => $branch,
            'candidate_name' => $name,
            'cv_reported_date' => $this->valueAt($headers, $values, ['cv reported'], 2),
            'coordinated_by' => $this->valueAt($headers, $values, ['coordinated'], 3),
            'interview_date' => $this->valueAt($headers, $values, ['interview date'], 4, ['interviewed']),
            'interviewed_by' => $this->valueAt($headers, $values, ['interviewed'], 5),
            'interview_score' => $this->valueAt($headers, $values, ['interview score'], 6),
            'decision' => $this->valueAt($headers, $values, ['recruit or deny', 'recruit'], 7),
            'training_start' => $this->valueAt($headers, $values, ['training start', '7 day training'], 8),
            'assessment_date' => $this->valueAt($headers, $values, ['assessment date'], 9),
            'assessment_score' => $this->valueAt($headers, $values, ['score'], 10, ['interview score']),
        ];
    }

    /**
     * @param  array<int, string|null>  $headers
     * @param  array<int, string|null>  $values
     * @return array<string, mixed>|null
     */
    private function mapCaseRow(array $headers, array $values, string $branch, string $sheet, int $rowNumber): ?array
    {
        $hasConfirm = $this->headerIndex($headers, ['confirm date']) !== null;
        $name = $this->valueAt($headers, $values, ['name'], 3, ['candidate']);
        if (PerformanceRecordParser::blank($name) === null) {
            return null;
        }

        return [
            'source_sheet' => $sheet,
            'source_row' => $rowNumber,
            'branch' => $branch,
            'inquiry' => $this->valueAt($headers, $values, ['date & time', 'date and time'], 1),
            'care_type' => $this->valueAt($headers, $values, ['baby or elder', 'care type'], 2),
            'name' => $name,
            'address' => $this->valueAt($headers, $values, ['address'], 4),
            'phone' => $this->valueAt($headers, $values, ['phone'], 5),
            'requested_start' => $this->valueAt($headers, $values, ['start date'], 6, ['duty start']),
            'duration' => $this->valueAt($headers, $values, ['duration'], 7),
            'level' => $this->valueAt($headers, $values, ['level'], 8),
            'duty_type' => $this->valueAt($headers, $values, ['duty'], 9, ['duty start']),
            'cv_received' => $this->valueAt($headers, $values, ['cv received', 'cv sent'], 10),
            'client_response' => $this->valueAt($headers, $values, ['client response'], 11),
            'interview_date' => $this->valueAt($headers, $values, ['interview date', 'interview'], 12, ['interviewed']),
            'confirm_date' => $hasConfirm
                ? $this->valueAt($headers, $values, ['confirm date'], 13)
                : null,
            'deposit' => $this->valueAt($headers, $values, ['deposit'], $hasConfirm ? 14 : 13),
            'duty_start' => $this->valueAt($headers, $values, ['duty start'], $hasConfirm ? 15 : 14),
        ];
    }

    /**
     * @param  array<int, string|null>  $headers
     * @param  array<int, string|null>  $values
     * @param  array<int, string>  $needles
     * @param  array<int, string>  $exclude
     */
    private function valueAt(array $headers, array $values, array $needles, int $fallbackIndex, array $exclude = []): ?string
    {
        $index = $this->headerIndex($headers, $needles, $exclude);

        if ($index === null) {
            $index = $fallbackIndex;
        }

        return $values[$index] ?? null;
    }

    /**
     * @param  array<int, string|null>  $headers
     * @param  array<int, string>  $needles
     * @param  array<int, string>  $exclude
     */
    private function headerIndex(array $headers, array $needles, array $exclude = []): ?int
    {
        foreach ($headers as $index => $header) {
            if ($header === null || $header === '') {
                continue;
            }

            $skip = false;
            foreach ($exclude as $excluded) {
                if (str_contains($header, $excluded)) {
                    $skip = true;
                    break;
                }
            }

            if ($skip) {
                continue;
            }

            foreach ($needles as $needle) {
                if ($header === $needle || str_contains($header, $needle)) {
                    return $index;
                }
            }
        }

        return null;
    }

    private function normalizeHeader(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $normalized = mb_strtolower(preg_replace('/\s+/', ' ', trim($value)) ?? '');

        return $normalized === '' ? null : $normalized;
    }

    private function normalizeName(?string $name): string
    {
        return mb_strtolower(preg_replace('/\s+/', ' ', trim((string) $name)) ?? '');
    }
}

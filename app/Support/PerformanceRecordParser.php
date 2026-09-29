<?php

namespace App\Support;

class PerformanceRecordParser
{
    public static function blank(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $trimmed = trim($value);

        if ($trimmed === '' || $trimmed === '-' || strcasecmp($trimmed, 'none') === 0) {
            return null;
        }

        return $trimmed;
    }

    public static function parseDecision(?string $raw): string
    {
        $value = strtolower(self::blank($raw) ?? '');

        if ($value === '') {
            return 'pending';
        }

        if (str_contains($value, 'part time') || str_contains($value, 'part_time')) {
            return 'part_time';
        }

        if (
            str_contains($value, 'deny')
            || str_contains($value, 'denied')
            || str_contains($value, 'refuse')
        ) {
            return 'deny';
        }

        if (str_contains($value, 'uncontact')) {
            return 'uncontactable';
        }

        if (str_contains($value, 'contact')) {
            return 'contacted';
        }

        if (str_contains($value, 'recruit') || str_contains($value, 'recurit')) {
            return 'recruit';
        }

        return 'pending';
    }

    public static function parseInterviewScore(?string $raw): array
    {
        $value = self::blank($raw);

        if ($value === null) {
            return ['score' => null, 'note' => null];
        }

        if (preg_match('/^\d+$/', $value)) {
            return ['score' => (int) $value, 'note' => null];
        }

        if (preg_match('/\((\s*\d+\s*)\)/', $value, $matches)) {
            return [
                'score' => (int) trim($matches[1]),
                'note' => $value,
            ];
        }

        return ['score' => null, 'note' => $value];
    }

    public static function parseCareType(?string $raw): ?string
    {
        $value = strtolower(self::blank($raw) ?? '');

        if ($value === '') {
            return null;
        }

        if (str_contains($value, 'newborn')) {
            return 'newborn';
        }

        if (str_contains($value, 'maternal')) {
            return 'maternal';
        }

        if (str_contains($value, 'elder')) {
            return 'elder';
        }

        if (str_contains($value, 'baby')) {
            return 'baby';
        }

        if (str_contains($value, 'child')) {
            return 'child';
        }

        return $value;
    }

    /**
     * @return array{date: ?string, note: ?string}
     */
    public static function parseDate(?string $raw): array
    {
        $value = self::blank($raw);

        if ($value === null) {
            return ['date' => null, 'note' => null];
        }

        $extracted = self::extractDate($value);

        if ($extracted === null) {
            return ['date' => null, 'note' => $value];
        }

        $leftover = trim(str_replace($extracted['matched'], '', $value), " \t\n\r\0\x0B/-");

        if ($leftover === '' || preg_match('/^[\s\/.,-]*$/', $leftover)) {
            return ['date' => $extracted['date'], 'note' => null];
        }

        return ['date' => $extracted['date'], 'note' => $value];
    }

    /**
     * @return array{datetime: ?string, note: ?string}
     */
    public static function parseDateTime(?string $raw, ?string $fallbackDate = null): array
    {
        $value = self::blank($raw);

        if ($value === null) {
            return ['datetime' => null, 'note' => null];
        }

        if (preg_match('/^\d{2}:\d{2}(:\d{2})?$/', $value)) {
            if ($fallbackDate) {
                return [
                    'datetime' => $fallbackDate.' '.self::normalizeTime($value),
                    'note' => null,
                ];
            }

            return ['datetime' => null, 'note' => $value];
        }

        $extracted = self::extractDateTime($value);

        if ($extracted === null) {
            $dateOnly = self::extractDate($value);
            if ($dateOnly) {
                $leftover = trim(str_replace($dateOnly['matched'], '', $value), " \t\n\r\0\x0B/-");
                $note = ($leftover === '' || preg_match('/^[\s\/.,-]*$/', $leftover)) ? null : $value;

                return [
                    'datetime' => $dateOnly['date'].' 00:00:00',
                    'note' => $note,
                ];
            }

            return ['datetime' => null, 'note' => $value];
        }

        $leftover = trim(str_replace($extracted['matched'], '', $value), " \t\n\r\0\x0B/-");

        if ($leftover === '' || preg_match('/^[\s\/.,-]*$/', $leftover)) {
            return ['datetime' => $extracted['datetime'], 'note' => null];
        }

        return ['datetime' => $extracted['datetime'], 'note' => $value];
    }

    public static function deriveCaseStatus(array $fields): string
    {
        $response = $fields['client_response'] ?? null;
        $cvSentNote = $fields['cv_sent_note'] ?? null;

        if (self::looksCancelled($response) || self::looksCancelled($cvSentNote)) {
            return 'cancelled';
        }

        if (! empty($fields['duty_start_date'])) {
            return 'on_duty';
        }

        if (! empty($fields['confirm_date']) || self::hasDeposit($fields['deposit_note'] ?? null)) {
            return 'confirmed';
        }

        if (! empty($fields['interview_date'])) {
            return 'interviewing';
        }

        if (! empty($fields['cv_sent_at']) || ! empty($fields['cv_sent_note'])) {
            return 'cv_sent';
        }

        return 'open';
    }

    public static function looksCancelled(?string $text): bool
    {
        $value = self::blank($text);

        if ($value === null) {
            return false;
        }

        $lower = mb_strtolower($value);

        if (preg_match('/cancel+ed|cancelled|canceled|cancle|cancel/i', $lower)) {
            return true;
        }

        if (str_contains($value, 'မခေါ်ဖြစ်') || str_contains($value, 'မခေါ်တော့')) {
            return true;
        }

        if (str_contains($value, 'CV မရ') || str_contains($value, 'CV form မရ')) {
            return true;
        }

        return false;
    }

    private static function hasDeposit(?string $depositNote): bool
    {
        $value = self::blank($depositNote);

        if ($value === null) {
            return false;
        }

        return (bool) preg_match('/\d/', $value);
    }

    /**
     * @return array{date: string, matched: string}|null
     */
    private static function extractDate(string $value): ?array
    {
        if (preg_match('/\b(\d{4}-\d{2}-\d{2})\b/', $value, $matches)) {
            return ['date' => $matches[1], 'matched' => $matches[1]];
        }

        if (preg_match('/\b(\d{1,2})[.](\d{1,2})[.](\d{4})\b/', $value, $matches)) {
            return [
                'date' => self::toIsoDate((int) $matches[1], (int) $matches[2], (int) $matches[3]),
                'matched' => $matches[0],
            ];
        }

        if (preg_match('/\b(\d{1,2})[.](\d{1,2})[.](\d{2})\b/', $value, $matches)) {
            return [
                'date' => self::toIsoDate((int) $matches[1], (int) $matches[2], 2000 + (int) $matches[3]),
                'matched' => $matches[0],
            ];
        }

        if (preg_match('/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/', $value, $matches)) {
            return [
                'date' => self::toIsoDate((int) $matches[1], (int) $matches[2], (int) $matches[3]),
                'matched' => $matches[0],
            ];
        }

        if (preg_match('/\b(\d{1,2})\/(\d{1,2})\.(\d{1,2})\.(\d{2})\b/', $value, $matches)) {
            return [
                'date' => self::toIsoDate((int) $matches[1], (int) $matches[3], 2000 + (int) $matches[4]),
                'matched' => $matches[0],
            ];
        }

        return null;
    }

    /**
     * @return array{datetime: string, matched: string}|null
     */
    private static function extractDateTime(string $value): ?array
    {
        $date = self::extractDate($value);

        if ($date === null) {
            return null;
        }

        $afterDate = substr($value, strpos($value, $date['matched']) + strlen($date['matched']));

        if (preg_match('/^\s*[\/,]?\s*(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?/', $afterDate, $timeMatch)) {
            $hour = (int) $timeMatch[1];
            $minute = (int) $timeMatch[2];
            $second = isset($timeMatch[3]) && $timeMatch[3] !== '' ? (int) $timeMatch[3] : 0;
            $meridiem = $timeMatch[4] ?? null;

            if ($meridiem) {
                $meridiem = strtoupper($meridiem);
                if ($meridiem === 'PM' && $hour < 12) {
                    $hour += 12;
                }
                if ($meridiem === 'AM' && $hour === 12) {
                    $hour = 0;
                }
            }

            return [
                'datetime' => sprintf(
                    '%s %02d:%02d:%02d',
                    $date['date'],
                    $hour,
                    $minute,
                    $second
                ),
                'matched' => $date['matched'].$timeMatch[0],
            ];
        }

        if (preg_match('/^\s+(\d{2}:\d{2}:\d{2})/', $afterDate, $timeMatch)) {
            return [
                'datetime' => $date['date'].' '.$timeMatch[1],
                'matched' => $date['matched'].$timeMatch[0],
            ];
        }

        return [
            'datetime' => $date['date'].' 00:00:00',
            'matched' => $date['matched'],
        ];
    }

    private static function toIsoDate(int $day, int $month, int $year): string
    {
        return sprintf('%04d-%02d-%02d', $year, $month, $day);
    }

    private static function normalizeTime(string $time): string
    {
        $parts = explode(':', $time);

        return sprintf(
            '%02d:%02d:%02d',
            (int) $parts[0],
            (int) ($parts[1] ?? 0),
            (int) ($parts[2] ?? 0)
        );
    }
}

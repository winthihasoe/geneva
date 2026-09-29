<?php

namespace App\Http\Controllers;

use App\Support\PerformanceRecordImporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PerformanceRecordImportController extends Controller
{
    public function store(Request $request, PerformanceRecordImporter $importer)
    {
        $request->validate([
            'file' => ['required', 'file', 'max:10240'],
        ]);

        $file = $request->file('file');
        $extension = strtolower($file->getClientOriginalExtension());

        if (! in_array($extension, ['xlsx', 'xls'], true)) {
            return back()->with('error', 'Please choose an Excel file (.xlsx).');
        }

        try {
            $summary = $importer->importFromPath($file->getRealPath());
        } catch (\Throwable $exception) {
            Log::error('Performance record import failed', [
                'message' => $exception->getMessage(),
            ]);

            return back()->with('error', 'The Excel file could not be imported. Check the sheet names and try again.');
        }

        return back()->with('success', $this->successMessage($summary));
    }

    /**
     * @param  array{recruitment: array{created: int, updated: int, skipped: int}, cases: array{created: int, updated: int, skipped: int}}  $summary
     */
    private function successMessage(array $summary): string
    {
        $recruitment = $summary['recruitment'];
        $cases = $summary['cases'];

        return sprintf(
            'Import finished. Recruitment: %d new, %d updated. Cases: %d new, %d updated.',
            $recruitment['created'],
            $recruitment['updated'],
            $cases['created'],
            $cases['updated']
        );
    }
}

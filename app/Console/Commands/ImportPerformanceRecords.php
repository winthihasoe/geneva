<?php

namespace App\Console\Commands;

use App\Support\PerformanceRecordImporter;
use Illuminate\Console\Command;

class ImportPerformanceRecords extends Command
{
    protected $signature = 'import:performance-records {file? : Path to an Excel workbook or JSON dump}';

    protected $description = 'Import recruitment and new-case rows from an Excel workbook or JSON dump';

    public function handle(PerformanceRecordImporter $importer): int
    {
        $path = $this->argument('file') ?: database_path('data/performance-record.json');

        if (! is_file($path)) {
            $this->error("Import file not found: {$path}");

            return self::FAILURE;
        }

        $summary = $importer->importFromPath($path);

        $this->info(sprintf(
            'Import finished. Recruitment: %d new, %d updated. Cases: %d new, %d updated.',
            $summary['recruitment']['created'],
            $summary['recruitment']['updated'],
            $summary['cases']['created'],
            $summary['cases']['updated']
        ));

        return self::SUCCESS;
    }
}

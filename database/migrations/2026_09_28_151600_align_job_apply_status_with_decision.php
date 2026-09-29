<?php

use App\Models\JobApply;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        JobApply::query()->orderBy('id')->each(function (JobApply $apply) {
            if ($apply->isWebsiteSource()) {
                return;
            }

            $status = JobApply::alignedStatus($apply->status ?: $apply->decision);

            if ($apply->status === $status && $apply->decision === $status) {
                return;
            }

            $apply->forceFill([
                'status' => $status,
                'decision' => $status,
            ])->save();
        });
    }

    public function down(): void
    {
        // Website statuses are never rewritten by this migration.
    }
};

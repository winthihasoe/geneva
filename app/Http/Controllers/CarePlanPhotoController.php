<?php

namespace App\Http\Controllers;

use App\Models\CarePlanPhoto;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Image\Image;

class CarePlanPhotoController extends Controller
{
    public const MAX_EDGE = 1600;

    public const JPEG_QUALITY = 75;

    public function store(Request $request, Patient $patient, string $kind)
    {
        abort_unless(in_array($kind, CarePlanPhoto::KINDS, true), 404);

        $request->validate([
            'photo' => ['required', 'file', 'image', 'mimes:jpeg,jpg,png,webp', 'max:10240'],
        ], [
            'photo.required' => 'Choose a photo to upload.',
            'photo.image' => 'Upload a JPEG, PNG, or WebP photo.',
            'photo.mimes' => 'Upload a JPEG, PNG, or WebP photo.',
            'photo.max' => 'Each photo must be 10 MB or smaller.',
        ]);

        $filename = Str::uuid()->toString().'.jpg';
        $relativePath = "patient-documents/{$patient->id}/{$kind}/{$filename}";
        $upload = $request->file('photo');
        $upload->storeAs("patient-documents/{$patient->id}/{$kind}", $filename, 'local');

        $uploadedBy = $request->user()?->name ?? 'Admin';

        try {
            $this->compressToJpeg(Storage::disk('local')->path($relativePath));

            $photo = DB::transaction(function () use ($patient, $kind, $relativePath, $uploadedBy) {
                Patient::query()->whereKey($patient->id)->lockForUpdate()->first();

                $position = (int) CarePlanPhoto::query()
                    ->where('patient_id', $patient->id)
                    ->where('kind', $kind)
                    ->max('position') + 1;

                return CarePlanPhoto::create([
                    'patient_id' => $patient->id,
                    'kind' => $kind,
                    'position' => $position,
                    'photo_path' => $relativePath,
                    'uploaded_by' => $uploadedBy,
                ]);
            });
        } catch (\Throwable $exception) {
            Storage::disk('local')->delete($relativePath);
            report($exception);

            return response()->json([
                'message' => 'This photo could not be saved. Try another image.',
            ], 422);
        }

        return response()->json($photo->toPresentation());
    }

    public function show(CarePlanPhoto $photo)
    {
        $disk = $this->diskName($photo);
        abort_unless(Storage::disk($disk)->exists($photo->photo_path), 404);

        return Storage::disk($disk)->response($photo->photo_path, null, [
            'Cache-Control' => 'private, max-age=3600',
        ]);
    }

    public function destroy(CarePlanPhoto $photo)
    {
        Storage::disk($this->diskName($photo))->delete($photo->photo_path);
        $photo->delete();

        return back()->with('success', 'Photo deleted.');
    }

    private function compressToJpeg(string $absolutePath): void
    {
        $loaded = Image::load($absolutePath);
        $width = $loaded->getWidth();
        $height = $loaded->getHeight();

        $pipeline = Image::load($absolutePath)
            ->format('jpg')
            ->quality(self::JPEG_QUALITY);

        if ($width >= $height && $width > self::MAX_EDGE) {
            $pipeline->width(self::MAX_EDGE);
        } elseif ($height > self::MAX_EDGE) {
            $pipeline->height(self::MAX_EDGE);
        }

        $pipeline->save($absolutePath);
    }

    private function diskName(CarePlanPhoto $photo): string
    {
        return str_starts_with($photo->photo_path, 'patient-documents/')
            ? 'local'
            : 'public';
    }
}

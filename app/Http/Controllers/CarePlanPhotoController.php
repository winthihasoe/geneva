<?php

namespace App\Http\Controllers;

use App\Models\CarePlanPhoto;
use App\Models\Patient;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;
use Spatie\ImageOptimizer\OptimizerChainFactory;

class CarePlanPhotoController extends Controller
{
    public function uploadPhotos(Request $request, $patientId)
{
    try {
        // Validate that each file in 'photos' is an image
        $request->validate([
            'photos' => 'required|array',
            'photos.*' => 'image|max:10048', // Validate each file as an image, max size 10MB
        ]);

        $patient = Patient::findOrFail($patientId);

        foreach ($request->file('photos') as $photo) {
            // Generate a unique filename
            $filename = uniqid() . '_' . $photo->getClientOriginalName();

            // Move the uploaded photo to 'storage/app/public/photos/carePlans'
            $relativePath = 'photos/carePlans/' . $filename;
            $absolutePath = $photo->storeAs('public/photos/carePlans', $filename);

            // Get the full path of the stored photo
            $absolutePath = Storage::path($relativePath);

            // Resize the image to a width of 600px while maintaining aspect ratio
            Image::load($absolutePath)
                ->width(600)
                ->save();

            // Optimize the resized photo to reduce file size
            $optimizerChain = OptimizerChainFactory::create();
            $optimizerChain->optimize($absolutePath);

            // Save the photo record in the database
            CarePlanPhoto::create([
                'patient_id' => $patient->id,
                'photo_path' => $relativePath, // Store relative path
                'uploaded_by' => auth()->user()->name ?? 'Admin',
            ]);
        }

        return back()->with('success', 'Photos uploaded successfully!');
    } catch (\Exception $e) {
        return back()->with('error', $e->getMessage());
    }
}


    public function getPhotos($patientId)
    {
        $photos = CarePlanPhoto::where('patient_id', $patientId)->get();

        return response()->json($photos);
    }

    public function deletePhoto($photoId)
    {
        $photo = CarePlanPhoto::findOrFail($photoId);

        // Delete file from storage
        Storage::disk('public')->delete($photo->photo_path);

        // Delete from database
        $photo->delete();

        return response()->json(['message' => 'Care plan photo deleted successfully.']);
    }


}

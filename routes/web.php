<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CarePlanController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'index'])->name('home');

Route::get('/services/{name}', [ServiceController::class, 'getServiceByName'])->name('service.pricing');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
     
    
    Route::get('care/start', [CarePlanController::class, 'startCare'])->name('care.start');
    Route::get('baby-care/start', [CarePlanController::class, 'startBabyCare'])->name('care.baby.start');
    Route::get('baby-care/newborn/{name}', [CarePlanController::class, 'newbornCare'])->name('care.newborn.start');
});


Route::middleware(['auth', 'is.caregiver'])->group(function () {
    // Join our team -> create CV
    Route::get('cv/create', [CVController::class, 'createCV'])->name('cv.create');
    Route::post('cv/create', [CVController::class, 'store'])->name('cv.store');
    Route::get('cv/finish', [CVController::class, 'finishCV'])->name('cv.finish');
    
    Route::get('cv', [CVController::class, 'myCV'])->name('cv.show');
    
    Route::get('/certificates', [CertificateController::class, 'show'])->name('certificates.show');
    Route::post('/certificates', [CertificateController::class, 'store'])->name('certificates.store');
    Route::delete('/certificates/{certId}', [CertificateController::class, 'delete'])->name('certificates.delete');
    
    Route::get('/seven-day-training', [PageController::class, 'sevenDaysTraining'])->name('training.sevenDays');
});

Route::prefix('admin')->middleware(['auth', 'is.admin'])->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/cv', [CVController::class, 'adminCVs'])->name('admin.cv.all');
    Route::get('/cv/{cvId}', [CVController::class, 'adminSingleCV'])->name('admin.cv.single');

    // Approve and unapprove CV
    Route::put('cv/{cvId}/approve', [CVController::class, 'approveResume'])->name('admin.cv.approve');
    Route::put('cv/{cvId}/unapprove', [CVController::class, 'unApproveResume'])->name('admin.cv.unapprove');

    // search CV
    Route::get('cv-search-result', [CVController::class, 'adminSearchCV'])->name('admin.cv.search');

    // Update CV level
    Route::post('/cv/{id}/update-level', [CVController::class, 'updateLevel'])->name('cv.update.level');


});

require __DIR__.'/auth.php';

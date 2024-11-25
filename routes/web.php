<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CarePlanController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\JobApplyController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PhoneVerificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'index'])->name('home');

Route::get('/services/{name}', [ServiceController::class, 'getServiceByName'])->name('service.pricing');
Route::get('job-apply', [JobApplyController::class, 'jobApply'])->name('job.apply');
Route::post('job-apply', [JobApplyController::class, 'store'])->name('job.apply.store');
Route::get('job-apply-success', [JobApplyController::class, 'success'])->name('job.apply.success');

Route::middleware('auth', 'is.employer')->group(function () {
    Route::get('care/start', [CarePlanController::class, 'startCare'])->name('care.start');

    // Baby care can choose Newborn care and nanny service
    Route::get('baby-care/start', [CarePlanController::class, 'startBabyCare'])->name('care.baby.start');
    
    // Newborn care
    Route::get('baby-care/newborn', [CarePlanController::class, 'newbornCare'])->name('care.newborn.start');
    
    // Option to choose in Nanny
    Route::get('nanny-care-options', [CarePlanController::class, 'optionNanny'])->name('nanny.options.choose');
    
    // Nanny service only
    Route::get('baby-care/nanny-only', [CarePlanController::class, 'nannyOnly'])->name('care.nanny.start');
    Route::get('baby-care/nanny-maid', [CarePlanController::class, 'nannyMaid'])->name('care.nanny.maid.start');

    // Elder care can choose Elder care only and Elder + Maid
    Route::get('elder-care-options', [CarePlanController::class, 'optionElder'])->name('elder.options.choose');
    Route::get('elder-care/caregiver-only', [CarePlanController::class, 'caregiverOnly'])->name('care.caregiver.start');
    Route::get('elder-care/caregiver-maid', [CarePlanController::class, 'caregiverMaid'])->name('care.caregiver.maid.start');
    
    Route::post('send-otp', [PhoneVerificationController::class, 'sendOtp'])->name('sendOtp');
    Route::post('verify-otp', [PhoneVerificationController::class, 'verifyOtp'])->name('verifyOtp');
    Route::post('save-verified-phone', [PhoneVerificationController::class, 'saveVerifiedPhone'])->name('saveVerifiedPhone');

    Route::post('plan/store', [CarePlanController::class, 'store'])->name('plan.store');

    // Show CV to employer
    Route::get('book-interview/{slug}', [InterviewController::class, 'showCV'])->name('care.cv.shows');
    Route::post('book-interview', [InterviewController::class, 'store'])->name('interview.create');
    Route::get('book/interview/success', [InterviewController::class, 'bookSuccess'])->name('interview.book.success');
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

    // Care plans
    Route::get('/care-plans', [CarePlanController::class, 'adminCarePlans'])->name('admin.care.plans');
    Route::get('/care-plans/{id}', [CarePlanController::class, 'adminSingleCarePlan'])->name('admin.care.plan.detail');

    Route::get('job-applies', [JobApplyController::class, 'adminJobApplies'])->name('admin.job.apply');
    Route::get('job-applies/{id}', [JobApplyController::class, 'adminSingleJobApply'])->name('admin.job.apply.single');
    Route::get('job-search-result', [JobApplyController::class, 'adminSearchJobApply'])->name('admin.job.apply.search');
});

require __DIR__.'/auth.php';

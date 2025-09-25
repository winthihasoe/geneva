<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CarePlanController;
use App\Http\Controllers\CarePlanPhotoController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CgDashboardController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\EmployerDashboardController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\JobApplyController;
use App\Http\Controllers\NewbornBabyCareLogController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PhoneVerificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TrainingCourseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'index'])->name('home');

// How it works for care plan
Route::get('care/start', [CarePlanController::class, 'startCare'])->name('care.start');
route::get('/how-it-works', [PageController::class, 'howItWorks'])->name('how.it.works');

Route::get('/services/{name}', [ServiceController::class, 'getServiceByName'])->name('service.pricing');
Route::get('job-apply', [JobApplyController::class, 'jobApply'])->name('job.apply');
Route::post('job-apply', [JobApplyController::class, 'store'])->name('job.apply.store');
Route::get('job-apply-success', [JobApplyController::class, 'success'])->name('job.apply.success');

// About Us
Route::get('mission-statement', [PageController::class, 'mission'])->name('mission');
Route::get('care-philosophy', [PageController::class, 'philosophy'])->name('philosophy');
Route::get('team-introduction', [PageController::class, 'team'])->name('team');

// Assessment center
Route::get('assessment-center', [AssessmentController::class, 'assessmentCenter'])->name('assessment.show');
Route::post('assessment-submit', [AssessmentController::class, 'submitAssessment'])->name('assessment.submit');
Route::get('assessment-submission-success', [AssessmentController::class, 'assessmentSubmissionSuccess'])->name('assessment.submission.success');

// Training Center
Route::get('training-center', [PageController::class, 'trainingCenter'])->name('training.show'); // Coming soon for now

// Public training course routes (no admin middleware)
Route::get('training-courses', [TrainingCourseController::class, 'index'])->name('training-courses.index');
Route::get('training-courses/{slug}', [TrainingCourseController::class, 'show'])->name('training-courses.show');
Route::get('api/training-courses/featured', [TrainingCourseController::class, 'featured']);

// Contact message 
Route::get('contact-information', [PageController::class, 'contactInfo'])->name('contact.info');
Route::get('customer-service', [PageController::class, 'customerService'])->name('customer.service');
Route::post('contact', [ContactMessageController::class, 'storeMessage'])->name('message.store');

Route::get('contact-messages', [ContactMessageController::class, 'contactMessages'])->name('contact.messages');

// Blog sections
// Maternal And Baby Health Care
Route::get('/blogs/maternal-baby-healthcare', [BlogController::class, 'maternalBabyHealthCare'])->name('blog.maternal.baby.healthcare');
Route::get('/blogs/maternal-baby-healthcare/{section}', [BlogController::class, 'maternalBabyHealthCareSection'])->name('blog.maternal.baby.healthcare.section');


// Elder Health 
Route::get('/blogs/elder-health', [BlogController::class, 'elderHealth'])->name('blog.elder.health');
Route::get('/blogs/elder-health/{section}', [BlogController::class, 'elderHealthSection'])->name('blog.elder.healthcare.section');

// Emergency Health
Route::get('/blogs/emergency-healthcare', [BlogController::class, 'emergencyHealthCare'])->name('blog.emergency.health');
Route::get('/blogs/emergency-healthcare/{section}', [BlogController::class, 'emergencyHealthCareSection'])->name('blog.emergency.healthcare.section');

// Coming Soon --- IGNORE ---
Route::get('/coming-soon', [PageController::class, 'comingSoon'])->name('coming.soon');
// Route::get('elder-health', [BlogController::class, 'elderHealth'])->name('blog.elder');
// Route::get('elder-health/caregiving-skills', [BlogController::class, 'elderCaregivingSkills'])->name('blog.elder.caregiving.skills');
// Route::get('elder-health/elder-health-blogs', [BlogController::class, 'elderHealthBlogs'])->name('blog.elder.health');
// Route::get('elder-health/elder-caregiving-knowledge', [BlogController::class, 'elderCaregivingKnowledge'])->name('blog.elder.caregiving.knlowledge');

// Showing each blog
// Route::get('elder-health/elder-health-blogs/heart-health', [BlogController::class, 'heartHealth'])->name('blog.elder.health.heart');
// Route::get('elder-health/elder-health-blogs/liver-health', [BlogController::class, 'liverHealth'])->name('blog.elder.health.liver');
// Route::get('elder-health/elder-health-blogs/kidney-health', [BlogController::class, 'kidneyHealth'])->name('blog.elder.health.kidney');
// Route::get('elder-health/elder-health-blogs/lungs-health', [BlogController::class, 'lungsHealth'])->name('blog.elder.health.lungs');
// Route::get('elder-health/elder-health-blogs/bone-health', [BlogController::class, 'boneHealth'])->name('blog.elder.health.bone');
// Route::get('elder-health/elder-health-blogs/digestive-health', [BlogController::class, 'digestive'])->name('blog.elder.health.digestive');
// Route::get('elder-health/elder-health-blogs/brain-health', [BlogController::class, 'brain'])->name('blog.elder.health.brain');
// Route::get('elder-health/elder-health-blogs/eye-health', [BlogController::class, 'eyeHealth'])->name('blog.elder.health.eye');
// Route::get('elder-health/elder-health-blogs/diabetes', [BlogController::class, 'diabetes'])->name('blog.elder.health.diabetes');
// Route::get('elder-health/elder-health-blogs/hypertension', [BlogController::class, 'hypertension'])->name('blog.elder.health.hypertension');
// Route::get('elder-health/elder-health-blogs/hearing-health', [BlogController::class, 'hearing'])->name('blog.elder.health.hearing');
// Route::get('elder-health/elder-health-blogs/cancer', [BlogController::class, 'cancer'])->name('blog.elder.health.cancer');
// Route::get('elder-health/elder-health-blogs/physical-exercise', [BlogController::class, 'physicalExercise'])->name('blog.elder.health.physical');
// Route::get('elder-health/elder-health-blogs/nutrition', [BlogController::class, 'nutrition'])->name('blog.elder.health.nutrition');
// Route::get('elder-health/elder-health-blogs/dental-health', [BlogController::class, 'dentalHealth'])->name('blog.elder.health.dental');
// Route::get('elder-health/elder-health-blogs/drug-medication', [BlogController::class, 'drug'])->name('blog.elder.health.drug');

// Show Single Blog
Route::get('blog/single-blog/{slug}', [BlogController::class, 'showSingleBlog'])->name('blog.single');

// Privacy policy
Route::get('privacy-policy', [PageController::class, 'privacyPolicy'])->name('privacyPolicy');

Route::middleware('auth', 'is.employer')->group(function () {
    // Employer dashboard
    Route::get('employer/dashboard', [EmployerDashboardController::class, 'employerDashboard'])->name('employer.dashboard');
    Route::get('employer/profile', [EmployerDashboardController::class, 'editProfile'])->name('employer.profile.edit');
    Route::put('employer/profile', [EmployerDashboardController::class, 'updateProfile'])->name('employer.profile.update');

    // Baby care can choose Newborn care and nanny service
    Route::get('baby-care/start', [CarePlanController::class, 'startBabyCare'])->name('care.baby.start');
    Route::get('maternal-care/start', [CarePlanController::class, 'startMaternalCare'])->name('care.maternal.start');
    Route::get('elder-care/start', [CarePlanController::class, 'startElderCare'])->name('care.elder.start');
    
    // Store or update Care plan
    Route::post('plan/store', [CarePlanController::class, 'store'])->name('plan.store');

    // Showing Matched caregiver 
    Route::get('matching-caregivers/{uuid}', [CarePlanController::class, 'showCVs'])->name('care.cvs.show');
    // Newborn care
    // Route::get('baby-care/newborn', [CarePlanController::class, 'newbornCare'])->name('care.newborn.start');
    
    // Option to choose in Nanny
    // Route::get('nanny-care-options', [CarePlanController::class, 'optionNanny'])->name('nanny.options.choose');
    
    // Nanny service only
    // Route::get('baby-care/nanny-only', [CarePlanController::class, 'nannyOnly'])->name('care.nanny.start');
    // Route::get('baby-care/nanny-maid', [CarePlanController::class, 'nannyMaid'])->name('care.nanny.maid.start');

    // Elder care can choose Elder care only and Elder + Maid
    // Route::get('elder-care-options', [CarePlanController::class, 'optionElder'])->name('elder.options.choose');
    Route::get('elder-care/caregiver-only', [CarePlanController::class, 'caregiverOnly'])->name('care.caregiver.start');
    // Route::get('elder-care/caregiver-maid', [CarePlanController::class, 'caregiverMaid'])->name('care.caregiver.maid.start');
    
    Route::post('send-otp', [PhoneVerificationController::class, 'sendOtp'])->name('sendOtp');
    Route::post('verify-otp', [PhoneVerificationController::class, 'verifyOtp'])->name('verifyOtp');
    Route::post('save-verified-phone', [PhoneVerificationController::class, 'saveVerifiedPhone'])->name('saveVerifiedPhone');


    // Show CV to employer
    Route::get('interview/{slug}/{care_plan?}', [InterviewController::class, 'createInterview'])->name('interview.book.create');
    Route::post('book-interview/store', [InterviewController::class, 'store'])->name('interview.create');
    Route::get('book/interview/success', [InterviewController::class, 'bookSuccess'])->name('interview.book.success');
});


Route::middleware(['auth', 'is.caregiver'])->group(function () {
    // Caregiver dashboard
    Route::get('dashboard', [CgDashboardController::class, 'dashboard'])->name('cg.dashboard');
    
    // Join our team -> create CV
    Route::get('cv/create', [CVController::class, 'createCV'])->name('cv.create');
    Route::post('cv/create', [CVController::class, 'store'])->name('cv.store');
    Route::get('cv/finish', [CVController::class, 'finishCV'])->name('cv.finish');
    
    Route::get('cv/edit', [CVController::class, 'editCV'])->name('cv.edit');
    Route::get('cv', [CVController::class, 'myCV'])->name('cv.show');
    
    // Certificates
    Route::get('certificates', [CertificateController::class, 'show'])->name('certificates.show');
    Route::post('certificates', [CertificateController::class, 'store'])->name('certificate.store');
    Route::put('certificates,/{certId}', [CertificateController::class, 'update'])->name('certificate.update');
    Route::delete('certificates/{certId}', [CertificateController::class, 'delete'])->name('certificate.delete');
    
    // My Experiences
    Route::get('experiences', [ExperienceController::class, 'show'])->name('experiences.show');
    Route::post('experience', [ExperienceController::class, 'store'])->name('experience.store');
    Route::delete('experience/{id}', [ExperienceController::class, 'destroy'])->name('experience.delete');

    Route::get('/seven-day-training', [PageController::class, 'sevenDaysTraining'])->name('training.sevenDays');
    Route::get('/medical-checkup', [PageController::class, 'medicalCheckup'])->name('medical.chekup');

    // Fill Newborn care log
    Route::get('newborn-care-log/fill', [NewbornBabyCareLogController::class, 'fillForm'])->name('newborn.careLog.create');
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
    Route::post('cv/{id}/update-level', [CVController::class, 'updateLevel'])->name('cv.update.level');
    Route::post('cv/{id}/update-status', [CVController::class, 'updateStatus'])->name('cv.update.status');

    // Create CV experience
    Route::post('cv/{id}/experience', [ExperienceController::class, 'adminStoreExperience'])->name('admin.experience.store');
    Route::post('/admin/experience/reorder/{cv}', [ExperienceController::class, 'reorder'])->name('admin.experience.reorder');

    // Patients
    Route::get('patients', [PatientController::class, 'index'])->name('admin.patients');
    Route::get('patients/create', [PatientController::class, 'createPatient'])->name('admin.patient.create');
    Route::post('patients/create', [PatientController::class, 'store'])->name('admin.patient.store');
    Route::get('patients/search-result', [PatientController::class, 'adminSearchPatient'])->name('admin.patient.search');
    Route::get('patients/{id}', [PatientController::class, 'adminSinglePatient'])->name('admin.patient');
    Route::post('patients/{patientId}', [CarePlanPhotoController::class, 'uploadPhotos'])->name('admin.carePlan.photo.upload');
    Route::delete('care-plans-photos/{id}', [CarePlanPhotoController::class, 'deleteCarePlanPhoto'])->name('care.plan.delete');

    // Care plans
    Route::get('/care-plans', [CarePlanController::class, 'adminCarePlans'])->name('admin.care.plans');
    Route::get('/care-plans/{id}', [CarePlanController::class, 'adminSingleCarePlan'])->name('admin.care.plan.detail');

    Route::get('job-applies', [JobApplyController::class, 'adminJobApplies'])->name('admin.job.apply');
    Route::get('job-applies/{id}', [JobApplyController::class, 'adminSingleJobApply'])->name('admin.job.apply.single');
    Route::get('job-search-result', [JobApplyController::class, 'adminSearchJobApply'])->name('admin.job.apply.search');

    // Interview when employer make appointment
    Route::get('interviews', [InterviewController::class, 'index'])->name('admin.interviews');
    Route::get('interviews/search-result', [InterviewController::class, 'adminSearchInterview'])->name('admin.interview.search');
    Route::get('interviews/{id}', [InterviewController::class, 'adminSingleInterview'])->name('admin.interview.single');
    Route::put('interviews/{id}', [InterviewController::class, 'updateInterviewStatus'])->name('admin.interview.status.update');

    // Training Courses 
    Route::get('training-courses', [TrainingCourseController::class, 'adminIndex'])->name('admin.training-courses.index');
    Route::get('training-courses/create', [TrainingCourseController::class, 'create'])->name('training-courses.create');
    Route::post('training-courses', [TrainingCourseController::class, 'store'])->name('training-courses.store');
    Route::get('training-courses/{slug}/edit', [TrainingCourseController::class, 'edit'])->name('training-courses.edit');
    Route::post('training-courses/{slug}', [TrainingCourseController::class, 'update'])->name('training-courses.update');
    Route::delete('training-courses/{slug}', [TrainingCourseController::class, 'destroy'])->name('training-courses.destroy');
    
    Route::patch('training-courses/{slug}/toggle-active', [TrainingCourseController::class, 'toggleActive'])->name('training-courses.toggle-active');
    Route::patch('training-courses/{slug}/toggle-featured', [TrainingCourseController::class, 'toggleFeatured'])->name('training-courses.toggle-featured');
    Route::post('training-courses/{slug}/duplicate', [TrainingCourseController::class, 'duplicate'])->name('training-courses.duplicate');
    Route::post('training-courses/bulk-action', [TrainingCourseController::class, 'bulkAction'])->name('training-courses.bulk-action');
    Route::post('training-courses/reorder', [TrainingCourseController::class, 'reorder'])->name('training-courses.reorder');

    // Blog management
    Route::get('admin/blog-sections', [SectionController::class, 'adminSectionManage'])->name('admin.blog.sections');
    Route::post('admin/blog-sections', [SectionController::class, 'storeSection'])->name('admin.blog.sections.store');
    Route::post('admin/blog-sections/{section}', [SectionController::class, 'updateSection'])->name('admin.blog.sections.update');
    Route::delete('admin/blog-sections/{section}', [SectionController::class, 'deleteSection'])->name('admin.blog.sections.delete');

    // Topics management
    Route::get('admin/topics', [\App\Http\Controllers\TopicController::class, 'adminManage'])->name('admin.topics.manage');
    Route::post('admin/topics', [\App\Http\Controllers\TopicController::class, 'store'])->name('admin.topics.store');
    Route::post('admin/topics/{topic}', [\App\Http\Controllers\TopicController::class, 'update'])->name('admin.topics.update');
    Route::delete('admin/topics/{topic}', [\App\Http\Controllers\TopicController::class, 'destroy'])->name('admin.topics.delete');

    // show blogs
    Route::get('blogs', [BlogController::class, 'adminIndex'])->name('admin.blogs.index');
    // create
    Route::get('admin/blogs/create', [BlogController::class, 'create'])->name('admin.blogs.create');
    Route::post('admin/blogs', [BlogController::class, 'store'])->name('admin.blogs.store');
    // edit
    Route::get('admin/blogs/{blog}/edit', [BlogController::class, 'edit'])->name('admin.blogs.edit');
    Route::post('admin/blogs/{blog}', [BlogController::class, 'update'])->name('admin.blogs.update');
    
    Route::get('blogs/{slug}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    Route::post('blogs/{slug}', [BlogController::class, 'update'])->name('blogs.update');
    Route::delete('blogs/{slug}', [BlogController::class, 'destroy'])->name('blogs.destroy');

    // ---- Skill assessment ----
    Route::get('skill-assessment-submissions', [AssessmentController::class, 'adminAssessments'])->name('admin.assessments');
    
    // ---- contact message ----
    Route::get('contact-message', [ContactMessageController::class, 'contactMessage'])->name('admin.messages');
    Route::get('contact-message/{id}', [ContactMessageController::class, 'adminSingleMessage'])->name('admin.single.message');
      // Mark as Unread
    Route::put('mark-as-unread/{id}', [ContactMessageController::class, 'markAsUnread'])->name('markAsUnread');
    
    // Delete message
    Route::delete('contact-message/{id}', [ContactMessageController::class, 'adminDeleteMessage'])->name('admin.message.delete');
    
    // Store reply message
    Route::post('reply-message/{id}', [ContactMessageController::class, 'storeReplyMessage'])->name('admin.message.reply');
    Route::delete('reply-message/{id}', [ContactMessageController::class, 'adminDeleteReplyMessage'])->name('admin.message.reply.delete');
});

require __DIR__.'/auth.php';

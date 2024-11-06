<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('c_v_s', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('slug')->unique()->nullable()->index();
            $table->string('ha_id', 10)->unique()->nullable();
            // PersonalInfo
            $table->string('full_name');
            $table->string('nickname')->nullable();
            $table->text('introduction')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->nullable();
            $table->smallInteger('height')->unsigned()->nullable();
            $table->decimal('weight', 5, 1)->unsigned()->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('other_nationality')->nullable();
            $table->string('religion')->nullable();
            $table->json('language')->nullable();
            $table->json('hobbies')->nullable();
            $table->text('other_hobbies')->nullable();
            $table->string('wears_glasses')->nullable();
            $table->string('has_tattoo')->nullable();
            $table->json('habits')->nullable();
            $table->text('other_habits')->nullable();

            // Contact info
            $table->string('email')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('line')->nullable();
            $table->string('phone')->nullable();
            $table->date('phone_verify_at')->nullable();
            $table->text('current_address')->nullable();
            $table->text('residential_address')->nullable();
            
            // education ceritificate
            $table->string('education_level')->nullable();
            $table->string('caregiver_qualification')->nullable();
            
            // Family and marital status
            $table->string('marital_status')->nullable();
            $table->text('number_of_children')->nullable();
            $table->text('number_of_siblings')->nullable();
            $table->string('current_location')->nullable();
            $table->string('worked_in_thailand')->nullable();
            
            
            // Your medical history
            $table->json('past_illnesses')->nullable();
            $table->text('other_illness')->nullable();
            
            $table->text('allergies')->nullable();
            $table->text('physical_disability')->nullable();
            $table->json('dietary_restrictions')->nullable();
            $table->string('other_dietary_restrictions')->nullable();
            $table->json('food_handling')->nullable();
            $table->string('other_food_handling')->nullable();
            
            // Required document.
            $table->string('profile_photo')->nullable();
            $table->string('passport')->nullable();
            $table->string('passport_number')->nullable();
            $table->string('passport_type')->nullable();
            $table->string('visa_type')->nullable();
            $table->string('citizenship_certificate')->nullable();
            $table->string('family_member_record')->nullable();

            // experiences records
            $table->string('newborn_experience_years')->nullable();
            $table->string('nanny_experience_years')->nullable();
            $table->string('elder_experience_years')->nullable();
            $table->text('detail_experience')->nullable();

            $table->string('gender_of_patient')->nullable();

            // Caregiver skills
            $table->json('nursing_skills_for_elder')->nullable();
            $table->json('nursing_skills_for_child')->nullable();
            $table->json('types_of_patients_handled')->nullable();
            $table->text('other_types_of_patients_handled')->nullable();
            $table->json('types_of_babies_handled')->nullable();
            $table->text('other_types_of_babies_handled')->nullable();

            // Caregiver Level
            $table->string('level')->nullable();

            // available services and packages
            $table->json('services')->nullable();
            $table->json('package_duration')->nullable();
            $table->json('package')->nullable();
            $table->string('service_area')->nullable();

            // other informations
            $table->string('approved_by')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->timestamp('approved_at')->nullable();
            $table->unsignedTinyInteger('current_step')->nullable();  
            $table->string('status')->nullable();
            $table->boolean('agree_to_terms')->default(false);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('c_v_s');
    }
};

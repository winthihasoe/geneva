<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/SignUp/SignUp');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
  
        // Generate an OTP
        $otp = random_int(100000, 999999);
    
        try{
            // Cache the data temporarily, including the OTP
            $cacheKey = 'user_registration_' . $request->email;
            Cache::put($cacheKey, [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'is_employer' => $request->is_employer,
                'is_caregiver' => $request->is_caregiver,
                'otp' => $otp,
            ], now()->addMinutes(20)); // Set expiration time for 20 minutes

            // Prepare email body
            $body = [
                'FromEmail' => "noreply@genevacaregiver.com",
                'FromName' => "Geneva",
                'Subject' => "Confirm Your Email to Start with Geneva – OTP Enclosed",
                'MJ-TemplateID' => 7558060,
                'MJ-TemplateLanguage' => true,
                'Vars' => ["name" => $request->name, "otp" => $otp],
                'Recipients' => [['Email' => $request->email]]
            ];
            // Send OTP email
            $mj = Mailjet::getClient();
            $response = $mj->post(Resources::$Email, ['body' => $body]);
            // Redirect to OTP verification page
            return redirect()->route('signup.verifyOTP')->with('success', "OTP is sent to your email.");
        }catch (\Exception $e) {
            // Handle errors in sending email
            \Log::error('OTP send error: ' . $e->getMessage());
            return back()->with('error', 'Please Try again!');
        }
    }

    public function showVerifyOtp()
    {
        return Inertia::render('Auth/SignUp/VerifyOTP');
    }

    // Verify OTP code sent from email
    public function verifyOtp(Request $request)
    {
        // Validate the input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'OTP' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Retrieve the cached data for the email
        $cacheKey = 'user_registration_' . $request->email;
        $cachedData = Cache::get($cacheKey);

        // Check if cache exists and retrieve OTP
        if (!$cachedData || $cachedData['otp'] != $request->OTP) {
            return back()->with('error', 'OTP code expired or invalid.');
        }

        // Create the user from cached data
        $user = User::create([
            'name' => $cachedData['name'],
            'email' => $cachedData['email'],
            'password' => $cachedData['password'], // Already hashed in store method
            'is_employer' => $cachedData['is_employer'] ?? false,
            'is_caregiver' => $cachedData['is_caregiver'] ?? false,
            'email_verified_at' => Carbon::now(), // Set the current time
        ]);

        // Log in the user
        Auth::login($user);

        // Clear the cached registration data
        Cache::forget($cacheKey);

    
        return redirect()->route('home')->with('success', 'Welcome to Hearty Aid.');
    }

    public function resendOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // Check if there's existing cached data for this email
        $cacheKey = 'user_registration_' . $request->email;
        $cachedData = Cache::get($cacheKey);

        if (!$cachedData) {
            return back()->withErrors(['email' => 'No registration data found for this email. Please start registration again.']);
        }

        // Generate a new OTP
        $otp = random_int(100000, 999999);

        // Update the cached data with new OTP
        $cachedData['otp'] = $otp;
        Cache::put($cacheKey, $cachedData, now()->addMinutes(10));
       
        try {
            // Prepare email body
            $body = [
                'FromEmail' => "noreply@genevacaregiver.com",
                'FromName' => "Geneva",
                'Subject' => "Confirm Your Email to Start with Geneva – OTP Enclosed",
                'MJ-TemplateID' => 7558060,
                'MJ-TemplateLanguage' => true,
                'Vars' => ["name" => $cachedData['name'], "otp" => $otp],
                'Recipients' => [['Email' => $request->email]]
            ];

            // Send OTP email
            $mj = Mailjet::getClient();
            $response = $mj->post(Resources::$Email, ['body' => $body]);

            return back()->with('success', 'New OTP has been sent to your email.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to send OTP. Please try again.');
        }
    }

}

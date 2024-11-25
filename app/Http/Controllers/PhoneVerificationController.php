<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

class PhoneVerificationController extends Controller
{
    protected $twilio;

    public function __construct()
    {
        $this->twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));
    }

    public function sendOtp(Request $request)
    {
        $request->validate(['phoneNumber' => 'required']);

        try {
            $this->twilio->verify->v2->services(env('TWILIO_VERIFY_SERVICE_SID'))
                ->verifications
                ->create($request->phoneNumber, 'sms');

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phoneNumber' => 'required',
            'otp' => 'required'
        ]);

        try {
            $verification = $this->twilio->verify->v2->services(env('TWILIO_VERIFY_SERVICE_SID'))
                ->verificationChecks
                ->create(['to' => $request->phoneNumber, 'code' => $request->otp]);

            if ($verification->status === 'approved') {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['success' => false], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function saveVerifiedPhone(Request $request)
    {
        $request->validate(['phoneNumber' => 'required']);

        // Save verified phone number in the database
        // Example:
        // User::find(auth()->id())->update(['phone' => $request->phoneNumber]);

        return response()->json(['success' => true, 'message' => 'Phone number saved successfully.']);
    }
}

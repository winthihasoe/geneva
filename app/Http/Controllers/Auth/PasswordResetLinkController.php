<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;
use Illuminate\Support\Str;


class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'No account found for this email.']);
        }

        // Get expire time from config
        $expireMinutes = config('auth.passwords.users.expire', 60);


        // Check if a token already exists and is not expired
        $existingToken = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if ($existingToken) {
            $created = Carbon::parse($existingToken->created_at);
            if ($created->addMinutes($expireMinutes)->isFuture()) {
                return back()->withErrors(['email' => 'Please check your email inbox for the reset link.']);
            } else {
                // Token expired, delete it
                DB::table('password_reset_tokens')
                    ->where('email', $request->email)
                    ->delete();
            }
        }

        $token = Str::random(60);
        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => now(),
        ]);

        $resetLink = route('password.reset', ['token' => $token, 'email' => $user->email]);

        // Use Mailjet to send the reset link
        $mj = Mailjet::getClient();

        $body = [
            'FromEmail' => "accountsupport@heartyaid.com",
            'FromName' => "Hearty Aid",
            'Subject' => "Password Reset Link for Hearty Aid Account",
            'MJ-TemplateID' => 6435164,
            'MJ-TemplateLanguage' => true,
            'Vars' => ["reset_link" => $resetLink],
            'Recipients' => [['Email' => $user->email]]
        ];

        $mj->post(Resources::$Email, ['body' => $body]);

        return back()->with('success', 'Password reset link sent!');
    }
}

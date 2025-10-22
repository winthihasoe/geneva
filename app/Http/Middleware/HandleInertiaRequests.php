<?php

namespace App\Http\Middleware;

use App\Models\CarePlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                ];
            },
            'carePlans' => $this->getCarePlan($request),
            
            // Get Services title from services table
            'services' => DB::table('services')->pluck('name')->toArray(),

            // Get social media links from social_media table and cache for 12 hours
            'socialMediaLinks' => cache()->remember(
                'social_media_links',
                1800,
                fn () => DB::table('social_media')->pluck('name', 'url')->toArray()
            ),

            // Add this for LINE ID
            'lineId' => DB::table('social_media')->where('name', 'LINE')->value('line_id'),
        ];
    }

    private function getCarePlan(Request $request){
        $user = $request->user();
        if($user){
            if($user->is_employer) {
                return CarePlan::where('user_id', $user->id)->get();
            } else {
                return null;
            }
        }
    }
}

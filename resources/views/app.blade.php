<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Geneva | Caregiver Training and Service in Myanmar</title>
        <meta name="description" content="Geneva provides trusted nanny and caregiver services in Myanmar, including professional training for caregivers, baby care, elderly care, and maternal care. Book a qualified caregiver or join our training programs today!">

        <!-- Open Graph / Facebook -->
        <meta property="og:title" content="Geneva | Nanny & Caregiver Service and Training in Myanmar" />
        <meta property="og:description" content="Geneva provides trusted nanny and caregiver services in Myanmar, including professional training for caregivers, baby care, elderly care, and maternal care. Book a qualified caregiver or join our training programs today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:image" content="{{ asset('/images/og-image.png') }}" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Geneva | Caregiver Training and Service in Myanmar" />
        <meta name="twitter:description" content="Geneva provides trusted nanny and caregiver services in Myanmar, including professional training for caregivers, baby care, elderly care, and maternal care. Book a qualified caregiver or join our training programs today!" />
        <meta name="twitter:image" content="{{ asset('/images/og-image.png') }}" />

        @if(request()->is('public/care-log*'))
            @routes('public-care-log')
            @viteReactRefresh
            @vite(\App\Support\ViteLegacy::entries([
                'resources/js/public-care-log.jsx',
                "resources/js/Pages/{$page['component']}.jsx",
            ]))
            {!! \App\Support\ViteLegacy::scripts('resources/js/public-care-log.jsx') !!}
        @else
            @routes
            @viteReactRefresh
            @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @endif
        @inertiaHead

        <!-- website favicon  -->
        <link rel="icon" href="{{ asset('/images/favicon.png') }}" type="image/png"/>

    </head>
    <body class="font-sans antialiased">
        @inertia
        @include('partials.spa-fallback')
    </body>
</html>

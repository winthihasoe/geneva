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

        <style>
            #app-fallback {
                min-height: 100vh;
                margin: 0;
                padding: 24px 16px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-family: Lato, sans-serif;
                color: #334155;
                background: #f8fafc;
            }
            #app-fallback p {
                margin: 0 0 8px;
                font-size: 16px;
                line-height: 1.5;
            }
            #app-fallback .app-fallback-hint {
                font-size: 14px;
                color: #64748b;
            }
            #app:not(:empty) + #app-fallback {
                display: none;
            }
        </style>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <!-- website favicon  -->
        <link rel="icon" href="{{ asset('/images/favicon.png') }}" type="image/png"/>

    </head>
    <body class="font-sans antialiased">
        @inertia
        <div id="app-fallback" role="status">
            <p>Loading care log…</p>
            <p class="app-fallback-hint">If this stays blank, open this link in Chrome.</p>
        </div>
        <noscript>
            <p>This page needs JavaScript. Please enable it or open this link in Chrome.</p>
        </noscript>
    </body>
</html>

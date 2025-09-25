<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Hearty Aid | Nanny & Caregiver Service and Training in Bangkok</title>
        <meta name="description" content="Hearty Aid provides trusted nanny and caregiver services in Bangkok, including professional training for caregivers, baby care, elder care, and maternal care. Book a qualified caregiver or join our training programs today!">

        <!-- Open Graph / Facebook -->
        <meta property="og:title" content="Hearty Aid | Nanny & Caregiver Service and Training in Bangkok" />
        <meta property="og:description" content="Hearty Aid provides trusted nanny and caregiver services in Bangkok, including professional training for caregivers, baby care, elder care, and maternal care. Book a qualified caregiver or join our training programs today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:image" content="{{ asset('/images/og-image.jpg') }}" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hearty Aid | Nanny & Caregiver Service and Training in Bangkok" />
        <meta name="twitter:description" content="Hearty Aid provides trusted nanny and caregiver services in Bangkok, including professional training for caregivers, baby care, elder care, and maternal care. Book a qualified caregiver or join our training programs today!" />
        <meta name="twitter:image" content="{{ asset('/images/og-image.jpg') }}" />

        <!-- <title inertia>{{ config('app.name', 'Laravel') }}</title> -->
        <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2949564643042311"
        crossorigin="anonymous"></script> -->

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&family=Madimi+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Righteous&display=swap" rel="stylesheet">  
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <!-- website favicon  -->
        <link rel="icon" href="{{ asset('/images/favicon.png') }}" type="image/png"/>

    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

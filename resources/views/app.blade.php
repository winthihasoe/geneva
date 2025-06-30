<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334148657355982"
        crossorigin="anonymous"></script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Abel&family=Abhaya+Libre:wght@400;500;600;700;800&family=Abyssinica+SIL&family=Actor&family=Advent+Pro:ital,wght@0,100..900;1,100..900&family=Afacad:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap" rel="stylesheet">        
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Karma:wght@300;400;500;600;700&family=Kavivanar&family=Kavoon&family=Kufam:ital,wght@0,400..900;1,400..900&family=Londrina+Solid:wght@100;300;400;900&family=Madimi+One&family=Mali:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Mina:wght@400;700&display=swap" rel="stylesheet">        @routes
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

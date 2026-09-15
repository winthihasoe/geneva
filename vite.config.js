import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/js/public-care-log.jsx',
            ],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        legacy({
            targets: [
                'Android >= 6',
                'Chrome >= 49',
                'ChromeAndroid >= 49',
                'Safari >= 12',
                'iOS >= 12',
            ],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            modernPolyfills: true,
        }),
    ],
    build: {
        cssTarget: 'chrome61',
    },
});

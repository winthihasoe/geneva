@php
    $isPublicCareLog = request()->is('public/care-log*');
@endphp
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
        max-width: 28em;
    }
    #app-fallback .app-fallback-hint,
    #app-fallback .app-fallback-extra {
        font-size: 14px;
        color: #64748b;
    }
    #js-disabled {
        display: none;
        min-height: 100vh;
        margin: 0;
        padding: 24px 16px;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: Lato, sans-serif;
        color: #334155;
        background: #f8fafc;
    }
    #js-disabled p {
        margin: 0 0 8px;
        font-size: 16px;
        line-height: 1.5;
        max-width: 28em;
    }
    #js-disabled .app-fallback-hint {
        font-size: 14px;
        color: #64748b;
    }
    #app:not(:empty) ~ #app-fallback {
        display: none;
    }
</style>
<div id="app-fallback" role="status">
    <p data-fallback-title>{{ $isPublicCareLog ? 'Loading care log…' : 'Loading…' }}</p>
    <p class="app-fallback-hint" data-fallback-hint>Please wait. This can take a moment on a slow connection.</p>
    <p class="app-fallback-extra" data-fallback-extra hidden></p>
</div>
<noscript>
    <style>
        #app-fallback { display: none !important; }
        #js-disabled { display: flex !important; }
    </style>
    <div id="js-disabled">
        <p>This page needs JavaScript.</p>
        <p class="app-fallback-hint">
            In Chrome tap ⋮ → Settings → Site settings → JavaScript → Allowed, then reload.
            Also turn off Data Saver / Lite mode if it is on.
        </p>
    </div>
</noscript>
<script>
    (function () {
        var fallback = document.getElementById('app-fallback');
        if (!fallback) {
            return;
        }

        var titleEl = fallback.querySelector('[data-fallback-title]');
        var hintEl = fallback.querySelector('[data-fallback-hint]');
        var extraEl = fallback.querySelector('[data-fallback-extra]');
        var supportsModules = 'noModule' in document.createElement('script');

        function setText(title, hint, extra) {
            if (titleEl) {
                titleEl.textContent = title;
            }
            if (hintEl) {
                hintEl.textContent = hint;
            }
            if (extraEl) {
                extraEl.textContent = extra || '';
                extraEl.hidden = !extra;
            }
        }

        if (!supportsModules) {
            setText(
                'Loading a compatible version…',
                'Please wait. If this stays blank, turn on JavaScript and reload.',
                ''
            );
        }

        setTimeout(function () {
            if (!document.getElementById('app-fallback')) {
                return;
            }
            var app = document.getElementById('app');
            if (app && app.childNodes.length) {
                return;
            }
            setText(
                'This page is taking too long to load.',
                'Check your internet, or turn on JavaScript: Chrome menu (⋮) → Settings → Site settings → JavaScript → Allowed. Then reload.',
                'If you opened this from Viber, Facebook, or WeChat, tap ⋮ and choose Open in browser / Open in Chrome.'
            );
        }, 10000);
    })();
</script>

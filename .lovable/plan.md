# Plan: Add Google Analytics (gtag) to the portfolio

1. **Inject the GA tag in `<head>`**
   - In `src/routes/__root.tsx`, add the two GA scripts to the `head()` return:
     - An `async` script tag loading `https://www.googletagmanager.com/gtag/js?id=G-0RRDEM71YJ`.
     - An inline script tag containing the provided `window.dataLayer`, `gtag('js', new Date())`, and `gtag('config', 'G-0RRDEM71YJ')` code.
   - Keep the existing `meta` and `link` entries unchanged.

2. **Add TypeScript globals for `gtag` and `dataLayer`**
   - Add a `declare global` block in `src/routes/__root.tsx` so `window.gtag` and `window.dataLayer` are typed and the route-change tracker compiles cleanly.

3. **Track SPA route changes automatically**
   - Add a small `AnalyticsTracker` component inside `src/routes/__root.tsx` that subscribes to TanStack Router's current pathname.
   - On every pathname change, call `window.gtag('event', 'page_view', { page_path: pathname })` so client-side navigation is recorded as a page view.
   - Only run the effect in the browser (guard against SSR).

4. **Verify**
   - Run the build to confirm no TypeScript or bundling errors.
   - Check the live preview network log to confirm the `gtag/js` script is requested and `dataLayer` events are emitted.

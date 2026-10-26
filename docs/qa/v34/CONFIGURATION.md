# V3.4 Configuration Checklist

## Already configured

- `NEXT_PUBLIC_WHATSAPP_NUMBER` is set locally and the browser verified the handoff number as `60107965236`.
- Favicon, Apple touch icon, app icon, OG image and page metadata are generated and served locally.

## Assistant LLM — currently off

No paid provider was selected and no provider credentials/spend limit were supplied. The FAQ works without them. The adapter accepts these server-side variables for non-production local integration work:

```dotenv
STUDIO_ASSISTANT_LLM_ENABLED=false
STUDIO_ASSISTANT_LLM_ENDPOINT=
STUDIO_ASSISTANT_LLM_API_KEY=
STUDIO_ASSISTANT_LLM_MODEL=
```

Do not switch the feature on in production yet. `getLlmConfig()` fails closed whenever `NODE_ENV=production`, because the current 5-per-minute limiter is process-local and cannot reliably control cost across multiple instances. Before removing that guard, implement a shared limiter, provider spend cap/usage monitoring, and confirm the provider's data-retention terms. The browser must continue to show disclosure and collect opt-in before sending conversation context.

## Inquiry email — not configured

`/api/inquiries` uses Resend only when configured. Add the following server-side values through the deployment environment manager; never commit credentials:

```dotenv
RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=
```

After setup, verify actual inbox delivery and reply-to handling. A configured key or HTTP response alone is not delivery proof. Local QA currently returns HTTP 503 and explicitly says the inquiry was not delivered.

## Local preview

V3.4 production build is served on `http://127.0.0.1:3461`. The stale local process on this original preview port was replaced after verifying it served the old page without the seven sections or assistant. The temporary QA server on 3462 has been stopped. No deployment or push was performed.

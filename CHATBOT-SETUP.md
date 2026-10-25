# Chatbot setup and verification

## Active provider — OpenRouter

The browser calls the same-origin `/api/chat` endpoint. The server sends requests to `https://openrouter.ai/api/v1/chat/completions` using **server-only** `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`. The current selected model is `nvidia/nemotron-3.5-super-vl:free`; it was confirmed in OpenRouter's live model catalog with zero prompt/completion pricing. A live request through the shared handler returned HTTP 200 with the correct MTI University and 3.5 GPA facts on 2026-10-25.

When `OPENROUTER_API_KEY` is configured, OpenRouter is the only provider used. Rejected legacy OmniRoute/Gateway settings cannot block it, and failures never trigger a different paid model. Reasoning is disabled for the short portfolio answers so the output budget goes to the visible response. The browser contains no provider key and has no canned-answer fallback.

Production has `VITE_CHATBOT_ENABLED=true` to show the launcher. To hide the assistant temporarily, set this **public boolean** to `false` and redeploy. Set it back to `true` and redeploy after successful live verification. Never put a credential in a `VITE_` variable.

Earlier on 2026-10-25, runtime logs confirmed OmniRoute HTTP 401 and Vercel AI Gateway HTTP 403 despite the three OmniRoute variables being present in Production. The UI was temporarily hidden until a working provider was available. OpenRouter replaces that rejected path. The legacy integrations remain supported only when OpenRouter is absent.

Replies are instructed to use the latest user's conversational language, with Egyptian Arabic for Arabic questions and the corresponding language for all other questions. Each reply must use one language without a repeated translation or second-language greeting. Technical terms, proper names, URLs, and email addresses may remain in English. A technical-term-only follow-up keeps the established conversation language.

The interface provides separate Arabic and English welcome messages and controls, selected initially from the browser locale and updated when the visitor switches between Arabic and English. It never combines both welcome messages. The chat has a multiline input (Enter to send, Shift+Enter for a new line), accessible controls, mobile sizing, RTL rendering, and a retry action that preserves the failed question without duplicating it.

## Local development

Keep `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` in `.env.vercel.local` (ignored by Git). To preview the launcher locally, also put `VITE_CHATBOT_ENABLED=true` in `.env.local`, which Vite loads for the frontend. Run `npm run dev`. The Vite development middleware reads `.env.vercel.local` on each API request and runs the same handler as Vercel. Existing server environment variables take precedence. Restart after changing externally supplied environment variables.

Run `npm run check:chat` to make real model requests with the configuration read directly from `.env.vercel.local`. The check validates the university/GPA, follow-up context, Arabic, unknown salary, and refusal to fabricate a degree. It stops on the first failure and prints responses/status codes without printing the key. To check the running local HTTP endpoint:

```powershell
npm run check:chat -- --url=http://127.0.0.1:8080/api/chat
```

A remote check does not need a local env file: `npm run check:chat -- --url=https://ibrahim-ai-specialist.vercel.app/api/chat`. GET checks only that the route loads; use POST or this verification command to test generation.

## Vercel

Configure `OPENROUTER_API_KEY` as a secret, `OPENROUTER_MODEL` as a server config value, and `VITE_CHATBOT_ENABLED=true` as a public boolean under the project’s Settings > Environment Variables for the target environment. Redeploy after changes. A local env file is not automatically deployed as production configuration. Never prefix the API key with `VITE_`. Production is configured; other deployment environments need their own settings.

`vercel.json` preserves API routes and gives the chat function 60 seconds; the provider request times out after 40 seconds. The model receives `src/data/ibrahimProfile.json` and up to eight prior conversation messages. Keep that profile current with the portfolio. Error messages and the static welcome text are excluded from history. Requests are serialized in the UI.

The optional legacy `chatbot_api.py` is not used by the website. Use the TypeScript `/api/chat` endpoint for OpenRouter.

## Automated checks

```powershell
npm.cmd run test:chat
npm.cmd run typecheck
npm.cmd run build
```

Automated tests use simulated provider responses to verify behavior, including failures. They do not prove the provider account works; `check:chat` performs that separate live verification.

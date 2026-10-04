# Chatbot setup and verification

The browser calls the same-origin `/api/chat` endpoint. Only the server sends requests to OmniRoute, using `OMNIROUTE_API_URL`, `OMNIROUTE_API_KEY`, and `OMNIROUTE_MODEL`. The browser contains no provider key and has no offline or canned-answer fallback. API failures display an unavailable message.

Replies are instructed to use the latest user's conversational language, with Egyptian Arabic for Arabic questions and the corresponding language for all other questions. Each reply must use one language without a repeated translation or second-language greeting. Technical terms, proper names, URLs, and email addresses may remain in English. A technical-term-only follow-up keeps the established conversation language.

The interface provides separate Arabic and English welcome messages and controls, selected initially from the browser locale and updated when the visitor switches between Arabic and English. It never combines both welcome messages. The chat has a multiline input (Enter to send, Shift+Enter for a new line), accessible controls, mobile sizing, RTL rendering, and a retry action that preserves the failed question without duplicating it.

## Local development

Keep the three variables in `.env.vercel.local` (ignored by Git). Run `npm.cmd run dev`. The Vite development middleware reads that file on each API request and runs the same handler as Vercel. Existing server environment variables take precedence. Restart after changing externally supplied environment variables.

Run `npm.cmd run check:chat` to make real model requests with the configuration in `.env.vercel.local`. The check validates the university/GPA, follow-up context, Arabic, unknown salary, and refusal to fabricate a degree. It stops on the first failure and prints responses/status codes without printing the key. To check the running local HTTP endpoint:

```powershell
node --env-file=.env.vercel.local scripts/check-chatbot.mjs --url=http://127.0.0.1:8080/api/chat
```

Latest live verification on 2026-10-05: the configured OmniRoute key returned HTTP 401 Unauthorized. Real answer accuracy remains unverified until the key is replaced with one accepted by OmniRoute. The code now reports that failure instead of masking it with offline answers. The previous browser implementation contained a hardcoded credential; use a newly issued key in the local file and Vercel.

## Vercel

Import the variables from `.env.vercel.local` under the project's Settings > Environment Variables for Production/Preview, then deploy the code and redeploy after changing variables. A local env file is not automatically deployed as production configuration. Never prefix the key with `VITE_`.

`vercel.json` preserves API routes and gives the chat function 60 seconds; the provider request times out after 40 seconds. The model receives `src/data/ibrahimProfile.json` and up to eight prior conversation messages. Keep that profile current with the portfolio. Error messages and the static welcome text are excluded from history. Requests are serialized in the UI.

The optional legacy `chatbot_api.py` also reads server environment variables or `.env.vercel.local`, uses the same portfolio facts, and has no canned fallback. The website does not require that Python service.

## Automated checks

```powershell
npm.cmd run test:chat
npm.cmd run typecheck
npm.cmd run build
```

Automated tests use simulated provider responses to verify behavior, including failures. They do not prove the provider account works; `check:chat` performs that separate live verification.

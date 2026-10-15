# ROOM 808 — Atlanta Recording Studio Concept

A fictional luxury recording studio website with eight navigable tabs: Home, Studios, Producers, Services, 808 Radio, ECHO AI, About, and Book Session.

## Functionality

- Fully responsive single-page studio experience with hash routing.
- Three fictional studio rooms with hourly rates.
- Four fictional producer/engineer profiles with optional add-on pricing.
- Booking form: local price calculation, date/time validation, same-device collision checks, and localStorage session list/cancellation. **No real bookings, shared inventory, emails, or payments.**
- ECHO: guided demo answers for common studio questions. Includes optional Vercel serverless endpoint `api/echo.js`, which becomes live AI when an `AI_GATEWAY_API_KEY` is configured in Vercel; it does not access any booking database.
- 808 Radio: three original synthesized browser drum loops (Web Audio API), no copyrighted tracks.

## Run locally

A static web server is needed for paths and the client app. For example, from the project directory:

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000. The ECHO guided mode works when the `/api/echo` endpoint is unavailable.

## Deploy

Vercel supports the static files and `api/echo.js` serverless handler. Upload the files to a Vercel project or push them to a new GitHub repository and import that repo into Vercel. No build script required.

For live AI, configure `AI_GATEWAY_API_KEY` (and optionally `AI_GATEWAY_MODEL`) in the project environment; do not commit credentials. Never claim ECHO can access live booking availability.

## Design / sources

Design is original for this fictional studio. Photography is loaded from Unsplash CDN. Fonts load from Google Fonts. All people, studio descriptions, rates, and services are fictional.
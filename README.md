# GoChina

Your China trip, planned from start to finish.

GoChina is an early-stage travel planning MVP for international visitors to China. It combines personalized AI itineraries with bilingual assistance request workflows.

## Implemented

- Trip intake with cities, dates, budget, interests, and travel style.
- OpenAI itinerary generation, Supabase persistence, and trip detail views.
- Async help requests and live-help session creation, acceptance, connection, and ending workflows.
- Traveler and local-assistant pages, plus an agency-request concept page.

Voice/video media, payments, authentication, agency matching, and production access controls are not complete. Session status workflows do not establish actual calls. The PRD describes the broader roadmap, not completed features.

## Stack

Next.js 15, React 19, TypeScript, Supabase/PostgreSQL, and the OpenAI API.

## Run locally

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and supply your own credentials.
3. Configure a Supabase database with the tables used by the application: `trips`, `itineraries`, `help_requests`, and `live_help_sessions`. Database migrations are not yet included; a fresh Supabase project alone is insufficient.
4. Run `npm run dev` and open http://localhost:3000.

Keep the Supabase secret key and OpenAI API key on the server. Local environment files are excluded from Git.

## Validation

- `npx tsc --noEmit`
- `npm run build`

## Routes

- `/` and `/plan`: trip intake
- `/trip/[id]`: saved trip and itinerary
- `/help` and `/help/now`: assistance requests
- `/local`: assistant session queue
- `/call/[id]`: session status interface
- `/agency-request`: agency-request concept

See [the product plan](docs/PRD.md) for proposed scope and future work.

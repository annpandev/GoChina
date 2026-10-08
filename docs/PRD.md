# GoChina — MVP PRD

## 1. Product thesis
International visitors to China face a fragmented travel stack across trip planning, payments, mobile connectivity, maps, transportation, reservations, language, and local services. The product combines AI-first self-service with paid human escalation and trusted travel-service matching.

## 2. Primary user
First-time or infrequent international visitors to China who speak English and need help before and during a trip.

## 3. Core value proposition
**Plan before the trip. Navigate during the trip. Reach a real person when AI is not enough.**

## 4. MVP scope
### A. Free core
- AI itinerary intake and structured trip plan
- First-time China essentials guide
- City guide pages
- Basic travel Q&A

### B. Premium unlocks
- Advanced personalization
- Saved trips
- Shareable itinerary
- Offline trip pack
- Premium AI usage / deeper trip refinement

### C. Human services
- Non-urgent async request: flat fee per task
- Live bilingual assistant: voice first, priced per minute
- Future: video, priority connection, specialist tiers

### D. Travel agency matching
- Traveler submits request
- Platform manually matches 1–3 vetted agencies at first
- Customer pays transparent platform service fee
- Agency pays commission on completed booking

## 5. MVP user journeys
### Journey 1: Plan
Landing → Plan My Trip → intake → AI itinerary → save/share → optional premium upgrade.

### Journey 2: Human escalation
Ask AI → unresolved / urgent → Help Me Now → category → match assistant → voice session → per-minute billing → rating.

### Journey 3: Agency request
Trip plan → Need a custom/private trip? → request form → platform review → agency quotes → traveler selects → service fee + booking → commission.

## 6. Recommended initial pricing experiments
These are test hypotheses, not final pricing.
- Premium Trip Pass: ¥69–¥129 per trip
- Async human task: ¥19–¥59 per request
- Live bilingual help: ¥6–¥10/min, 3-minute minimum
- Agency customer service fee: fixed fee initially, e.g. ¥99–¥299
- Agency commission: 8%–15% of completed booking

## 7. Assistant marketplace supply
Potential supply: bilingual university students, returnees, English teachers, freelancers, hospitality workers.
Do not promise <30 seconds at launch. Show estimated wait time until marketplace liquidity is proven.

## 8. Safety / trust basics
- Assistant identity verification
- Mutual ratings
- Clear recording consent
- No emergency-services positioning
- No medical/legal advice unless appropriately qualified
- Escalation and abuse reporting
- Payment / privacy boundaries

## 9. V1 tech stack
- Next.js + TypeScript
- Postgres / Supabase
- Auth: Supabase Auth or Clerk
- AI: OpenAI API with structured itinerary output
- Realtime: Supabase Realtime initially
- Voice: Twilio or WebRTC provider later
- Payments: Stripe for international users; investigate China-side payout/compliance separately
- Email: Resend
- Analytics: PostHog

## 10. Initial data model
- users
- traveler_profiles
- trips
- itinerary_days
- itinerary_items
- city_guides
- help_requests
- assistants
- assistant_availability
- live_sessions
- service_requests
- agencies
- agency_quotes
- bookings
- payments
- ratings

## 11. Two-week MVP build plan
### Days 1–2
Brand placeholder, repo, database schema, landing page.
### Days 3–4
Trip intake + AI itinerary generation.
### Days 5–6
Trip detail page + save/share.
### Days 7–8
China essentials + city guide templates.
### Days 9–10
Help Me Now request flow + assistant mock queue.
### Days 11–12
Agency request flow + admin review screen.
### Day 13
Payments placeholder, analytics, polish.
### Day 14
Deploy, recruit 5–10 testers, collect feedback.

## 12. What not to build yet
- Flight/hotel inventory
- Full travel-agency marketplace automation
- Guaranteed 30-second response
- Video calling
- Native iOS/Android app
- Dozens of cities
- Complex loyalty/rewards

## 13. Success metrics for first validation
- 20+ real target users test the planner
- 30%+ complete a generated trip plan
- 20%+ click Human Help or Agency Quote intent
- At least 5 users say they would pay for live help
- At least 2 agencies agree to discuss commission-based leads

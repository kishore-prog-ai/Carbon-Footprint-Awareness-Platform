# EcoLoop AI — Keezhadi Terracotta & Raw Iron Edition

A modular Vite + React + Tailwind CSS rebuild of the EcoLoop AI carbon
tracking platform, re-skinned around a culturally rooted "Keezhadi
Terracotta & Raw Iron" palette: deep carbon charcoals, warm earth clays,
and burnished copper accents.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## App lifecycle

`AUTH` → `ONBOARDING` → `DASHBOARD`, orchestrated entirely in `src/App.jsx`.

1. **AuthGate** — biometric / passkey-style entry screen.
2. **Onboarding** — "Establishing Your Structural Baseline" calibration
   funnel. Describing a daily routine plays a terminal data stream and
   derives a personalized `dailyBudget` + starting `usedToday`.
3. **Dashboard** — Hero ring, Omni-Logger, Micro-Action Feed, Eco-Guilds.

## File map

```
src/
  App.jsx                     # state matrix orchestrator
  utils/parser.js             # parseInputToPayload(text) inference logic
  data/mockData.js            # seed ledger / actions / leaderboard data
  components/
    BackgroundPosters.jsx     # ambient line-art cultural canvas
    AuthGate.jsx               # entry screen
    Onboarding.jsx             # calibration funnel
    Header.jsx
    ProgressRing.jsx           # SVG daily-budget gauge
    StatCard.jsx
    OmniLogger.jsx             # free-text + quick-pill logger
    LedgerCard.jsx             # expandable telemetry log + audit trail
    MicroActionFeed.jsx
    EcoGuilds.jsx
    Toast.jsx
tailwind.config.js             # earth / clay palette extension
```

## Palette

| Token       | Hex       |
|-------------|-----------|
| earth-950   | `#0A0807` |
| earth-900   | `#14100E` |
| earth-850   | `#1C1715` |
| earth-800   | `#29221F` |
| earth-700   | `#3D322E` |
| earth-500   | `#6E5A53` |
| clay-400    | `#F09A78` |
| clay-500    | `#E38562` |
| clay-600    | `#BD5B38` |
| clay-700    | `#A64B2A` |

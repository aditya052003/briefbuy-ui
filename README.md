# BriefBuy UI — Emergent design handoff

**Frontend-only React + Vite + TypeScript workspace.** This is a design companion to the existing BriefBuy backend, not the final hackathon submission.

## Start

Node 22.13+; Node 24 recommended for the tests.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
```

No environment variables, API keys, database, server, or Cloudflare account are required. Local preview data is stored in this browser's localStorage. Clear site storage to reset it. There are no AI requests or PayPal payments in this package.

## What is included

- Existing workspace, spending contract, basket cards, catalogue, proof timeline, connection information and responsive styles.
- 15 fictional products and local deterministic planner to exercise UI states.
- Price-change and stock-loss scenarios, replacement generation, invalidated approval and impossible-budget state.
- A preview adapter with the existing backend request/response shape.
- Exact design instructions in `EMERGENT_PROMPT.md` and integration boundary in `API_HANDOFF.md`.

## Upload to your GitHub repository

1. Extract `BriefBuy-frontend-handoff.zip`.
2. Open the extracted `briefbuy-ui` folder. You should see `package.json`, `src`, `public`, and this README.
3. On GitHub, open `aditya052003/briefbuy-ui`, then **Add file → Upload files**.
4. Drag the CONTENTS of the folder into GitHub, not the outer folder and not the ZIP. Existing README/LICENSE may be replaced by these project versions.
5. Commit to `main`. Confirm `package.json` and `src` appear at the repository root.
6. In Emergent, start a new job using its GitHub repository import and select this repository. If the interface differs, inspect the import menu before starting a paid generation.
7. Paste `EMERGENT_PROMPT.md` as the initial task. Ask for one implementation pass; review the preview before requesting more work.
8. Export Emergent's result to this repository and bring that source into Codex for real backend integration.

Do not import the full Cloudflare BriefBuy source into this UI repository. Do not upload node_modules, dist, credentials or `.env` files.

## Design test sequence

Default: three people, $450, keyboard/mouse/headset, wired or wireless.

- Initial basket: Forma Keys + Arc Mouse + Focus Headset, three each. Total $411, free shipping.
- Approve the preview basket.
- Trigger Focus Headset price +$25. The current catalogue total is $486. The old basket must be visibly blocked and approval cleared.
- Repair: highest combined editorial-score basket becomes Forma Keys + Precision Pro + Air Headset, three each, $441. It needs fresh approval. Show both product replacements and the $30 increase from the initial total.
- The $50 budget for three complete kits must show infeasible and no checkout.
- All checkout/capture requests throw in preview; provider flags are always false.

Scores are fictional editorial values, not customer reviews or measured product quality. The frontend checks are for visual behavior only, not security enforcement. The real backend remains authoritative after integration.

MIT License. Original CSS product artwork; Lucide icons carry their respective ISC license.

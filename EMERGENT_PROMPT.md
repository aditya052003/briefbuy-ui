Improve the FRONTEND ONLY of this imported BriefBuy React/Vite/TypeScript project. Read README.md and API_HANDOFF.md first. I have limited credits: make one focused implementation pass, run the existing tests and production build, then stop with the preview and changed-file summary. Do not deploy a paid production app, add services or start additional redesign rounds.

BriefBuy is a purchasing assistant built around spending contracts. Its memorable moment is: $411 approved basket → price increase makes it $486 → checkout blocked → valid $441 replacement → fresh buyer approval. The real backend already exists elsewhere. This repository uses local mock data solely for interface development.

Design goal: a polished, credible purchasing workspace, not a generic marketing landing page. Keep the restrained forest-green, warm-white and sage direction, but substantially improve typography, hierarchy, contrast, spacing and interaction feedback. Aim for a confident finance/productivity app. Avoid purple gradients, excessive glass effects, fabricated metrics and decorative chart filler.

Priorities:
1. Make the active purchasing workflow prominent. Use brief/requirements, basket, and sticky spending contract areas on desktop; stack them clearly on mobile.
2. Add a strong before/after replacement comparison: product changes, quantity, unit price, total change and remaining budget. Our verified recovery changes the mouse and headset; do not invent a different result.
3. Make blocked checkout obvious with the actual failed rule and a clear repair action. Reset and explain approval after any replacement.
4. Improve the purchase-proof timeline with readable event details and expandable evidence snapshots where present.
5. Add a concise in-app walkthrough of the sample scenario, without an autoplay tour or extra AI requests.
6. Polish empty/loading/error/disabled states, keyboard navigation, modal focus and Escape handling, and responsive layouts at 390px, 768px and 1440px. Respect reduced-motion preferences.

Keep the existing local preview adapter and request/response contract. Refactor visual components as needed, but do not change engine.ts, product IDs, prices, scores, scenario semantics or preview-api.ts. Do not add a backend, database, authentication, AI calls, PayPal SDK, API secrets or paid integrations. Do not claim mock checks happen on a server. Keep “UI preview” visible. Payment must remain disabled; never fabricate a payment success or transaction ID. Keep the existing MIT license.

Use existing CSS artwork and Lucide icons; no paid image generation is needed. At the end, run npm test and npm run build, report their real results, identify any untested behavior, and stop. I will review this first version before authorizing further credit-consuming work.

# Boundary for Emergent and Codex

## Emergent: visual work only

`src/App.tsx` calls `previewRequest` from `src/lib/preview-api.ts`. This is a local adapter, not HTTP. It mirrors the original three API endpoints so UI changes can be moved back without rewriting the backend.

Do not change the API operation names, existing fields, types, monetary units or preview state semantics. Keep `src/lib/engine.ts` and `src/lib/preview-api.ts` unchanged. New presentational components and derived display-only comparisons are welcome.

All amounts are integer cents USD. `Product.price`, `Contract.budget`, `Basket.subtotal`, `Basket.shipping`, and `Basket.total` use cents. `money()` formats them. Never derive payment amounts from formatted strings.

## Contract reference

See `src/lib/engine.ts` for exact TypeScript definitions:

- Contract: people, budget, categories, wireless.
- Product: id, name, category, price, stock, score, features, color.
- Basket: items (Product plus quantity), subtotal, shipping, total, score.
- Purchase: id, brief, contract, basket, previous, scenario, status, events, explanation, engine, created; optional paypalOrder, approvalUrl, captureId, approvedFingerprint, revision.
- Event: at, title, detail, type; optional evidence {contract,basket,scenario,approval}.

| Endpoint | Request | Response |
| --- | --- | --- |
| GET `/api/workspace` | None | `{purchases: Purchase[], catalog: Product[], integrations:{ai:boolean,paypal:boolean,model:string|null}}` |
| POST `/api/purchase` | `{brief:string, contract:Contract, ruleBased:boolean}` | Purchase |
| POST `/api/action` | `{id:string, action:'scenario', scenario:'price'|'stock'}` | Purchase |
| POST `/api/action` | `{id:string, action:'repair'|'approve'|'checkout'|'capture', orderId?:string}` | Purchase |

The preview adapter always rejects checkout/capture and always reports integrations false. The real HTTP API returns `{error:string}` with a non-success status on failures.

## Existing full backend (Codex integration step)

The original app uses server API routes with Cloudflare D1 persistence. The backend alone performs provider calls and authoritative validation. For integration, port Emergent's visual components and styles into the original app. Restore the existing fetch request function instead of previewRequest. Do not embed the local planner as the payment authority.

Existing server lifecycle:
- `review → approved → creating → payment → capturing → paid`
- `review / approved → blocked → repair → review`
- `infeasible` cannot approve or pay.

The backend locks baskets after payment creation begins, checks current catalogue contents, binds approval to an exact fingerprint, uses stable PayPal request IDs and verifies order identity/currency/amount/capture status. Preserve these safeguards.

After integration, connection status must come from the backend; do not hard-code true. Replace frontend-preview labels with accurate runtime labels only after restoring the real backend. Keep product catalogue data identified as fictional and sandbox checkout identified as test payments.

The source ZIP for the full backend is separate (`BriefBuy-source.zip`). Never copy server credentials or backend service files into this frontend-only repository.

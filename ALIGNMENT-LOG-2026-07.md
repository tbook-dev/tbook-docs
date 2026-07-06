# Alignment Log — 2026-07 (site ↔ implementation)

Claim-level alignment of this site against the shipped implementation in
`vault-gateway-sdk`. Method: five parallel auditors (one per section group)
verified every claim against source and fixed in place; every fix was then
adversarially re-verified against source by independent reviewers (8 residual
issues found in review were corrected before this landed). Rules: latest
implementation wins · Solana-specific guidance removed (chain-decoupled,
Sui-first; frozen-rail notes kept where the API surface remains) · English
only · operator-tunable on-chain values documented as indicative.

**Totals**: 142 changes — solana-removal: 19, claim-fix: 104, style: 5, new-content: 14

## docs/api-reference/accounts.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| PATCH rule now states exactly one wallet may be added per call | claim-fix | api-server/src/routes/accounts.ts:189-191 rejects >1 wallet per PATCH |
| Replaced 'add a Solana wallet' PATCH example with a KYC-attestation update | solana-removal | Solana rail frozen (catalog.ts:86-90); avoids Solana-specific guidance while chain field stays neutral per policy |

## docs/api-reference/analytics.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| AUM: groupBy default noted, at=latest\|YYYY-MM-DD; share values shown at real 4-decimal precision | claim-fix | analytics.ts:144-190 (share toFixed(4) at :187) |
| Yield: added window field to example, methodology, percentage-string-with-2-decimals warning (do not multiply by 100), and the two-snapshot minimum with its empty-data response | claim-fix | analytics.ts:193-264 (note at :204, window at :263, weightedApy toFixed(2) at :255-260) |

## docs/api-reference/index.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Added POST /webhooks/:id/rotate-secret to the endpoint map | new-content | route exists in api-server/src/routes/webhooks.ts:412 |
| Added che_ prefix row to the Object IDs table for chain-history rows | new-content | account history synthesizes che_<digest>_<seq> ids for non-API chain rows — api-server/src/routes/positions.ts:394 |
| Treasury withdrawal lifecycle corrected to pending_approval → built → submitted → confirmed with expired; removed 'approved'/'rejected' as reachable states | claim-fix | approve transitions directly to built (treasury.ts:311-322); no reject endpoint exists; expired set at treasury.ts:287 |

## docs/api-reference/positions-earnings.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Positions example: removed nonexistent settlementCycle from pending records, 6-dp amounts; added notes that empty/wallet-less vaults are skipped and sharePrice/value can be null | claim-fix | positions.ts:50-72 PositionView (no settlementCycle; sharePrice/value nullable), :150-155 empty filter, :245 wallet skip |
| Solana positions note reframed as legacy rail | solana-removal | rail frozen per catalog.ts:86-90; lazy-settlement behavior itself confirmed at positions.ts:191-234 |
| Earnings assetId query corrected from 'required' to optional with rcusdp default; definitions note cancelled deposits net out and profitRateBps=0 when netInvested ≤ 0 | claim-fix | positions.ts:296 default; :314 cancelled netting; :329 guard |
| History: removed unsupported from=/to= query params; type values corrected to cancel_deposit/treasury_withdrawal; chain rows shown with real che_ ids (not null) and first-page-only merge note; removed unimplemented omnibus warning-event claim | claim-fix | positions.ts:354-411 (query params :359-368, che_ id :394, first-page merge :386); grep found no omnibus warning event anywhere in api-server |
| Portfolio example fixed: totalProfit is currently null (indexer-dependent), positions rows are {assetId, vaultId, value, share} without per-position profit, asOf added; pointed readers to /earnings for profit | claim-fix | positions.ts:415-435 — totalProfit hard-coded null, no profit per position |

## docs/api-reference/sandbox.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Key requirement corrected: secret or test key (tbk_secret_*/tbk_test_*), publishable rejected 403 — not 'tbk_test_ only' | claim-fix | sandbox.ts:38,92 use requireSecretKey which accepts secret and test types (api-key.ts:132-148) |
| Settle reframed as a trigger (operator tooling executes): real 202 body {accepted, requestId, vaultId, note}, sandbox.settle.requested event trail via GET /v1/events, errors documented; removed the '~2 minutes' delivery promise and the Solana-gateway cross-chain-leg narrative | claim-fix | sandbox.ts:38-89 (hook forwarding :51-63, event :72-78, 202 body :80-88); nothing in source guarantees timing; Solana rail frozen |
| Faucet response corrected to real shape: {accountId, results} keyed by chain with gas/usdc instruction strings (Sui testnet gas requested programmatically, Circle faucet link for USDC) — replaced invented funded/usdc-amount array | claim-fix | sandbox.ts:92-133 |

## docs/api-reference/transaction-endpoints.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Documented that intentId/idempotency dedupe exist only for authenticated (org-context) calls | claim-fix | transactions.ts:305-321 records intents only when caller.orgId set; idempotency.ts:35 bypasses anonymous requests |
| Build-error table: added HTTP statuses and insufficient_balance; permission_denied now covers missing kyc/kyb attestation; cycle_closed marked reserved/not emitted | claim-fix | errors.ts:29-44 status map; transactions.ts:191-219 compliance gates; grep shows cycle_closed never emitted (crib docs/api-reference.md:77 confirms) |
| Common response shape: removed settlementCycle echo and 'fees' from summary, added message field, marked summary price fields best-effort | claim-fix | transactions.ts:323-333 response shape; 395-408 best-effort price enrichment; no fees field anywhere in build responses |
| Deposit example updated to real summary {amount, sharePrice, estimatedShares} with message and 6-dp amounts | claim-fix | transactions.ts:375-408 |
| Redeem: summary echoes {shares, mode}; removed phantom summary.estimatedProceeds; instant redeem framed as operator-tunable via live vault read; insufficient_shares replaced with insufficient_balance | claim-fix | transactions.ts:456-475 summary; 424-429 instant gate; insufficient_shares is defined in errors.ts but never emitted — Sui SDK throws INSUFFICIENT_BALANCE (vault-sdk-sui/src/builders.ts:68) mapped at transactions.ts:246-248 |
| Cancel-deposit rewritten: recordId required on Sui rail (per-record), legacy gateway cancels full bucket ignoring recordId; fees disclosed (200 bps rcusdp-sui, 10 bps rcusdp-sol) with reconciliation note; errors corrected to invalid_request for non-cancelable vault or missing recordId (removed unemitted cycle_closed/not_found and the 'while cycle accepting' claim) | claim-fix | transactions.ts:520-577 (cancelable guard :532, recordId guard :540, summary disclosure :566-572); catalog.ts:79,94,118 |
| Confirm documented as requiring any valid API key with {intentId, status} response; GET intent example matches real IntentRecord fields (chain, walletAddress, mode, expiresAt; removed nonexistent fees) | claim-fix | transactions.ts:582-606 requireApiKey + response; store/index.ts:151-171 IntentRecord |

## docs/api-reference/treasury.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Withdrawal lifecycle corrected (pending_approval → built → submitted → confirmed, expired alternate; approval builds immediately; removed rejected/approved states) | claim-fix | treasury.ts:279-322; no reject endpoint; expired at :287 |
| Allowlist create response reduced to real {id, status, activatesAt}; documented lazy activation (flips on next read/use after timelock, webhook fires then); label limit 128 chars | claim-fix | treasury.ts:175-177 response; :63-79 withActivation; :161 label validation |
| GET allowlist: removed false 'Paginated' claim — plain {data:[…]} list | claim-fix | treasury.ts:186-190 takes no limit/cursor |
| Withdrawal create errors corrected: invalid_request for entry still in timelock, not_found for removed/unknown entry; removed insufficient_balance (no balance check at create) | claim-fix | treasury.ts:220-231; no balance validation exists — build failures surface as internal_error at :273-275 |
| Approve response example fixed to {id, status, intentId, transaction} (removed nonexistent summary/expiresAt); noted treasury.withdrawal.approved webhook and invalid_request on late approve | claim-fix | treasury.ts:322 response; :317-321 webhook; :286-289 expiry |
| GET withdrawals: removed unsupported cursor param, added limit default/max; approvals audit shape corrected to {keyId, keyPrefix, at} | claim-fix | treasury.ts:329-337; store/index.ts:259 |

## docs/api-reference/vault-endpoints.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Catalog vaults[] table: cancelable now notes false on xaua-sui; cancelFeeBps documents the 200 bps (2%) rcusdp-sui cancel fee | claim-fix | catalog.ts:74-79 (rcusdp-sui cancelFeeBps 200, on-chain verified per source comment) and catalog.ts:118 (xaua-sui cancelable:false) |
| Added admonition that instant-redeem availability/fee are operator-tunable on-chain — read GET /v1/vaults/:vaultId, do not hard-code catalog numbers | new-content | instantRedeem values are operator-controlled on-chain and the static catalog (catalog.ts:69-73) can lag chain state, per alignment brief |
| GET /v1/assets example fixed: rcusdp-sol status paused, rcusdp-sui cancelFeeBps 200, xaua-sui cancelable false | claim-fix | catalog.ts:74-95, 118 — previous example showed the Solana rail as active and omitted both fee/cancel facts |
| Added 'Legacy Solana rail (frozen)' note: rcusdp-sol deposit/redeem 409 vault_paused, claim/cancel open, legacy /users/:pubkey read endpoints remain | solana-removal | catalog.ts:86-90 pause comment; transactions.ts:155-160 pausedVault guard; vault.ts:100-144 legacy endpoints |
| GET /v1/vaults/:vaultId field table rewritten to the real response; removed nonexistent tvl, currentCycle, addresses, updatedAt and the accepting/processing cycle-status paragraph | claim-fix | vault.ts:59-75 returns vaultId/assetId/symbol/chain/rail/status/currency/sharePrice/apy/minDeposit/settlement/cancelable/requiresWhitelist/paused/asOf only |
| GET /vaults/:vaultId/price example now includes currency | claim-fix | vault.ts:84 returns {vaultId, price, apy, currency, asOf} |

## docs/api-reference/webhook-endpoints.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| URL rule reworded to registration-time rejection of localhost/private/link-local/metadata addresses; documented '*' and namespace wildcards (transaction/account/treasury/vault); POST response includes createdAt | claim-fix | webhooks.ts:86-108 host check, :64-76 subscription validation, :331-340 response |
| GET /v1/webhooks documented as {webhooks:[…]}; rotate-secret response documented as {secret, previousSecretValidUntil} with dual v1-signature grace-window behavior | claim-fix | webhooks.ts:344-354 list shape; :411-424 rotate response; :193-201 dual-signing during 24h grace |
| GET /v1/events corrected: query is after/types/limit (default 50, max 200) not type/from/cursor; response is {events, hasMore} not {data, nextCursor}; event rows include orgId; deliveries shape includes statusCode and pending status; cursoring via after documented | claim-fix | webhooks.ts:426-438; store/memory.ts:170-190 listEvents; store/index.ts:39-45 EventDelivery |

## docs/getting-started/authentication.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Removed nonexistent X-RateLimit-Reset header from rate-limit description; added anonymous 30 req/min row and a note that public catalog reads accept unauthenticated requests with no org context | claim-fix | rate-limit middleware sets only X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After on 429; LIMITS.anonymous = 30 (middleware/rate-limit.ts:18-63); anonymous allowed on public reads (middleware/api-key.ts:81-84) |
| Clarified that positions also require a secret key and that test keys have the same access on sandbox | claim-fix | positions/earnings/transactions/portfolio routes use requireSecretKey which accepts secret or test (routes/positions.ts:274-436; middleware/api-key.ts:132-148) |

## docs/getting-started/client-sdk.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Replaced 'ships at 0.2.0 on npm, @tbook-dev scope' with 'publish set under @tbookdev scope, npm publication pending — install from the monorepo' | claim-fix | packages/*/package.json show all packages at 0.1.0 and unpublished; scope is @tbookdev (vault-sdk-sui/package.json name '@tbookdev/vault-sdk-sui'); brief forbids claiming 0.2.0 is published |
| Removed @tbookdev/vault-sdk (Solana rail) and @tbookdev/vault-react from the packages table; publish set is now vault-sdk-sui + vault-react-sui + vault-node | solana-removal | packages/vault-sdk/package.json and packages/vault-react/package.json are private:true (frozen); publish set confirmed by non-private packages |
| Added short 'Legacy Solana rail (frozen)' admonition: rcusdp-sol paused, deposit/redeem 409 vault_paused, claim/cancel open | solana-removal | rule 3 allows at most a short frozen-rail note; pause behavior per brief and api-server routes |
| Replaced phantom buildDeposit({vault, owner, amount, network}) example with real buildDepositTx(client, cfg, {sender, amount: bigint}) returning {txBytesBase64, message}, plus getSuiVaultConfig and raw-units note | claim-fix | packages/vault-sdk-sui/src/builders.ts:90-113 (buildDepositTx signature), src/config.ts:72 (getSuiVaultConfig), src/builders.ts:23-28 (SuiBuildResult) |
| Removed 'wallet-adapter' (Solana wallet stack) from the browser-signing guidance, kept dapp-kit | solana-removal | rule 3; Sui signing path uses @mysten/dapp-kit (vault-react-sui/src/hooks/use-vault-actions.ts:1) |
| Listed the real vault-sdk-sui export surface: buildQueueRedeemTx/buildInstantRedeemTx/buildCancelDepositTx/buildClaimTx/buildTransferUsdcTx, getUserPosition/getVaultState/getUserRecords, AlphaVault helpers, withRetry | new-content | packages/vault-sdk-sui/src/index.ts:8-48 (verbatim export names) |
| Dropped 'Indicative 0.2.0 surface' hedging; examples now compile against the real SDK | style | surface is no longer indicative — verified against vault-sdk-sui source |

## docs/getting-started/conventions.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Corrected six error HTTP statuses: vault_paused 422→409, below_min_deposit 422→400, cycle_closed 422→409, insufficient_balance 422→400, insufficient_shares 422→400, not_whitelisted 422→403 | claim-fix | STATUS map in lib/errors.ts:29-44 is authoritative: vault_paused 409, below_min_deposit 400, cycle_closed 409, insufficient_balance 400, insufficient_shares 400, not_whitelisted 403 |
| Rewrote error-code meanings: cycle_closed marked reserved/not currently emitted; not_whitelisted tied to on-chain deposit preflight; vault_paused notes claim/cancel stay open; permission_denied covers missing KYC/KYB attestation; insufficient_balance covers missing gas coin | claim-fix | cycle_closed never emitted by any route (grep of routes/*); whitelist preflight → 403 not_whitelisted (routes/transactions.ts:119-146); compliance gates → 403 (routes/transactions.ts:202-219); gas-coin errors → insufficient_balance (routes/transactions.ts:263-269) |
| Error envelope example message aligned to actual server text ('Minimum deposit is 1 USDC') | style | routes/transactions.ts:354 emits 'Minimum deposit is ${minDeposit} USDC' |
| Idempotency section expanded: replay carries Idempotency-Replayed: true header, storage is org-scoped, anonymous requests are not deduplicated, 5xx responses are not cached | claim-fix | middleware/idempotency.ts:21-80 (24h TTL, org scope, anonymous bypass, Idempotency-Replayed header, 5xx not stored) |
| Pagination: removed false 'cursors expire after 24 hours' claim; documented GET /v1/events exception (after/types/limit, default 50, max 200) | claim-fix | cursors are plain entity-id position markers with no expiry (store/memory.ts:282-283, 485-486); events endpoint uses after/types/limit with max 200 (routes/webhooks.ts:427-438) |

## docs/getting-started/index.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Removed Solana devnet/mainnet-beta row from the environments table; added a 'Legacy Solana rail (frozen)' admonition stating rcusdp-sol is paused (deposit/redeem 409 vault_paused, claim/cancel open) | solana-removal | catalog.ts marks rcusdp-sol status 'paused' with freeze comment (packages/api-server/src/lib/catalog.ts:82-95); pausedVault returns 409 vault_paused for deposit/redeem only (routes/transactions.ts:155-160) |
| Softened sandbox settlement row from 'daily, plus on-demand' to 'operator-run cycles, plus on-demand via /v1/sandbox/settle' | claim-fix | sandbox settle is a trigger forwarded to operator tooling, not a scheduled executor; no daily cadence exists in code (routes/sandbox.ts:37-89) |
| Integration-paths table: dropped @tbookdev/vault-sdk (Solana) from Client SDK row, changed React Hooks row from @tbookdev/vault-react to @tbookdev/vault-react-sui | solana-removal | publish set is vault-sdk-sui + vault-node + vault-react-sui; vault-react (Solana) is frozen/private (packages/vault-react-sui/src/index.ts exists; vault-react excluded from publish set) |
| Added note that @tbookdev packages are distributed from the monorepo with npm publication pending | claim-fix | npm publication not yet done — claiming packages are installable from npm would mislead partners (task facts; changesets version line 0.1.0→0.2.0 unpublished) |

## docs/getting-started/quickstart.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Fixed deposit-build response example: removed nonexistent summary.fees, corrected summary to {amount, sharePrice, estimatedShares}, added the real top-level message field, amount now '100' (trailing zeros stripped) | claim-fix | respond() shapes {intentId, vaultId, type, chain, rail, transaction, summary?, message, expiresAt}; deposit summary only carries amount + best-effort sharePrice/estimatedShares (routes/transactions.ts:296-334, 375-408); rawToDecimal strips trailing zeros (lib/sui-client.ts:44-49) |
| Added note that Sui unsigned transactions are valid ~10 minutes and expired builds need a new Idempotency-Key | new-content | TX_TTL_MS.sui = 600_000 (routes/transactions.ts:60-63) |
| Confirm step now shows the actual {intentId, status: "submitted"} response and explains digest-exact vs heuristic indexer matching | claim-fix | bindIntentDigest sets status 'submitted' (store/memory.ts:384-403); indexer matches by digest or wallet/type heuristics (workers/sui-indexer.ts:182-230); indexer runs on ~rate(1 minute) EventBridge schedule (lambda-indexer.ts:4) |
| Settle step: documented 202 + sandbox.settle.requested event and operator-cycle execution instead of promising webhook delivery 'within ~2 minutes' | claim-fix | settle returns 202 {accepted, requestId, vaultId, note} and records sandbox.settle.requested; actual settlement is run by operator tooling (routes/sandbox.ts:38-89) |
| Fixed transaction.deposit.settled webhook example payload: replaced amount/sharePrice/settlementCycle with the real Sui-rail fields {accountId, externalId, vaultId, intentId, recordId, digest, shares} | claim-fix | Sui indexer dispatches deposit.settled with base {accountId, externalId, vaultId, digest, intentId?} + recordId + shares only (workers/sui-indexer.ts:251-296); settlementCycle is a Solana-rail-only field; schema: lib/event-schemas.ts:38 |

## docs/getting-started/react-hooks.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Replaced phantom @tbookdev/vault-react (TBookProvider, useAssets, usePositions, useDeposit) with the real @tbookdev/vault-react-sui package and TBookSuiVaultProvider | claim-fix | packages/vault-react-sui/src/index.ts:8-61 and src/provider.tsx:10 — none of the phantom exports exist; vault-react is private/frozen (package.json private:true) |
| Removed claim of pre-built components (DepositWidget, PortfolioCard, YieldBadge, TransactionHistory); documented the package as headless hooks requiring app-provided dapp-kit + react-query providers | claim-fix | no such components exist in packages/vault-react-sui/src; package doc header (src/index.ts:1-6) states it assumes @mysten/dapp-kit and @tanstack/react-query providers |
| Added compilable setup example (QueryClientProvider > SuiClientProvider > WalletProvider > TBookSuiVaultProvider network='testnet') and deposit example using useSuiVaultBalances + useSuiDeposit.mutate({amount: '100.00'}) | new-content | provider props from src/provider.tsx:4 + src/config.ts:32-42; SuiDepositParams accepts bigint raw or string/number decimal (src/hooks/use-vault-actions.ts:18-21) |
| Added hook reference table: useSuiVaultInfo/useSuiVaultBalances/useSuiUsdcBalance/useSuiTransactionHistory/useSuiDeposit/useSuiRedeem({shares, mode})/useSuiClaim/useSuiCancelDeposit({recordId})/useRefreshSuiVaultData/useTBookSuiVault | new-content | exact export names and param shapes from src/index.ts:38-61 and src/hooks/use-vault-actions.ts:18-37 |
| Documented vaultId default rcusdp-sui, txBuilderMode local-sdk default vs gateway-api (publishableKey + intent confirm), preflight checks on by default, query refresh on success, and amount helpers | new-content | src/config.ts:71 (DEFAULT_SUI_VAULT_ID), :85 (default mode), :105 (preflightChecks ?? true); gateway-api build+confirmIntent path in src/hooks/use-vault-actions.ts:107-117; onSuccess refresh :129 |
| Phrased instant-redeem availability/fees as operator-tunable, read at runtime via useSuiVaultInfo, instead of hard numbers | claim-fix | instantRedeemEnabled/instantRedeemFeeBps are live on-chain fields (src/vault-info.ts:16-20); brief: operator-tunable values must not be hard-coded |
| Fixed release-status admonition: @tbookdev scope, npm publication pending, install from monorepo; dropped 0.2.0-published claim | claim-fix | vault-react-sui/package.json version 0.1.0, not yet on npm |

## docs/getting-started/rest-api.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Reframed transaction formats Sui-first: sui:tx-bytes-base64 primary, solana:tx-base58 labeled as frozen legacy rail | solana-removal | TX_FORMAT map (routes/transactions.ts:64-67) still exposes both, but the Solana rail is paused (catalog.ts:82-95) — legacy note per Sui-first policy |

## docs/getting-started/server-sdk.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Fixed release-status admonition: publication pending / install from monorepo instead of 'ships at 0.2.0' | claim-fix | vault-node/package.json version 0.1.0, unpublished |
| Constructor example now uses secretKey with an 'apiKey accepted as alias' note, and notes webhookSecret is only needed for verification (lazy getter) | claim-fix | vault-node/src/types.ts:9-14 (secretKey canonical, apiKey alias) and src/client.ts:73-88 (lazy webhooks getter throws only on access without secret) |
| Webhook example passes req.body (Buffer) directly to webhooks.verify instead of .toString() | style | verify accepts string \| Buffer (vault-node/src/webhooks.ts:73); t=…,v1=… scheme confirmed at webhooks.ts:82-88 including rotation multi-v1 |
| Moved idempotencyKey out of the buildDeposit body params into the per-call options argument, and added the confirm(built.intentId!, {digest}) + positions.list steps | claim-fix | BuildDepositParams has no idempotencyKey (src/types.ts:79-84); it lives in RequestOptions second arg (src/client.ts:113, src/http.ts:28-37); confirm/get at client.ts:143-147 |
| Documented the full namespace surface: accounts.create/get/list/update, transactions.buildDeposit/buildRedeem/buildClaim/buildCancelDeposit/confirm/get, positions.list/earnings/transactions/portfolio, catalog reads and webhook management | new-content | verbatim from vault-node/src/client.ts:92-225 |
| Added 'Idempotency, retries, errors' section: auto Idempotency-Key with same-key retry and key echoed on results; 30s timeout; 2 retries on network/timeout/429/5xx, never other 4xx; TBookApiError (status/code/message/requestId) and TBookNetworkError | new-content | src/http.ts:39 (RETRIABLE_STATUS), :50-51 (30_000 / 2 defaults), :90-97 (same-key retry), :107-113 (envelope parsing), :142-149 (idempotentPost echo) |
| Added assertSuiTransaction / decodeSuiTransactionSummary mention with optional @mysten/sui peer-dependency note | new-content | exported from vault-node/src/index.ts:14-19 (sui-assert module) |

## docs/getting-started/test-funds.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Intro now says sandbox runs on Sui testnet only; removed the Solana devnet faucet table, replaced with a one-line legacy note (no devnet funds needed; faucet.solana.com only for exiting old balances) | solana-removal | rcusdp-sol paused — no new Solana deposits possible (catalog.ts:82-95); Solana-specific faucet guidance removed per Sui-first rule |
| Faucet description corrected: it requests test gas where a programmatic faucet exists and returns per-chain results with public-faucet links for test USDC — it does not fund USDC itself; noted the secret/test key requirement (publishable → 403) | claim-fix | faucet handler only calls the Sui gas faucet and returns instruction strings pointing to faucet.circle.com for USDC; route uses requireSecretKey (routes/sandbox.ts:92-133) |
| Removed false claim that accepted token types are listed in a vault's 'addresses' field on GET /v1/vaults/:vaultId; note now just says vaults only accept the canonical Circle test USDC coin type | claim-fix | GET /v1/vaults/:vaultId returns vaultId/assetId/symbol/chain/rail/status/currency/sharePrice/apy/minDeposit/settlement/cancelable/requiresWhitelist/paused/asOf — no addresses field (routes/vault.ts:53-76) |
| Settlement section: 'cycles run daily' changed to 'operator-run, plus on demand via POST /v1/sandbox/settle' | claim-fix | no daily scheduler exists; settle endpoint triggers the operator cycle (routes/sandbox.ts:37-89) |
| Pre-funded demo account claim softened from 'ships with your sandbox keys' to 'ask your TBook contact' | claim-fix | not verifiable in source; phrased as an ops request instead of a product guarantee |

## docs/overview/account-models.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Individual wallet guidance: WaaS provider 'with Sui support (e.g. Crossmint or Privy)' — dropped 'support both Sui and Solana' | solana-removal | Sui-first per rule 3; Solana rail frozen (catalog.ts:86-90) |
| Individual compliance: added 403 on missing KYC attestation and 403 not_whitelisted at XAUa deposit build time | claim-fix | routes/transactions.ts:202-219 kyc/kyb gates return permission_denied (403); :119-146 whitelistPreflight returns not_whitelisted (403) for xaua-sui (catalog.ts:120 requiresWhitelist) |
| Omnibus reconciliation: settled webhook carries pool-level shares + recordId (not {amount, shares, sharePrice}); replaced non-existent 'warning event' for out-of-band transactions with the real source:"chain" rows in the transactions history | claim-fix | workers/sui-indexer.ts DepositRecordSettled payload {recordId, shares}; event-schemas.ts:38 has no sharePrice; routes/webhooks.ts:40-62 ALLOWED_EVENTS has no wallet-monitor warning event; routes/positions.ts:385-407 surfaces unmatched chain events with source:"chain" |
| Treasury wallet: 'Sui native multisig' (removed Squads-on-Solana); signing-window note now Sui-only (~10 min, expiresAt on every build response) | solana-removal | rule 3 Solana-specific guidance; routes/transactions.ts:60-63 TX_TTL_MS sui 600_000; :303,332 expiresAt in build response |

## docs/overview/how-it-works.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Replaced two-rail ASCII diagram + 'TBook operates the cross-chain leg' paragraph with Sui-only diagram and a Legacy Solana rail (frozen) admonition | solana-removal | catalog.ts:82-95 rcusdp-sol paused; transactions.ts:149-160 deposit/redeem 409 vault_paused, claim/cancel open; legacy read endpoints still exist (routes/vault.ts:100-144); rule 3 |
| Fixed cycle-observation table: GET /v1/vaults/:vaultId does NOT return currentCycle{number,status,cutoffAt,expectedSettlementAt}; it returns settlement config + live status/paused/sharePrice/apy | claim-fix | routes/vault.ts:53-76 — response fields are vaultId/assetId/symbol/chain/rail/status/currency/sharePrice/apy/minDeposit/settlement/cancelable/requiresWhitelist/paused/asOf; no currentCycle exists anywhere in the server |
| Positions row corrected: settlementCycle is on indexed transaction records, not 'every pending record'; positions carry pending records with recordId | claim-fix | store/index.ts:164 settlementCycle on IntentRecord (set by indexers, workers/solana-indexer.ts:210-342); routes/positions.ts:57-72 PositionView pending records have recordId/amount/shares, no settlementCycle |
| deposit.settled webhook described as carrying exact shares (removed 'and price'); cycle status words accepting/processing de-coded to webhook event names | claim-fix | workers/sui-indexer.ts DepositRecordSettled dispatch: {recordId, shares}; lib/event-schemas.ts:38 — no sharePrice field in payload |
| Instant redeem: '(rcusdp-sui, when enabled)' + note that availability/fee are operator-tunable on-chain, check GET /v1/vaults/rcusdp-sui instead of hard numbers | claim-fix | catalog.ts:72 declares available:true/700bps but chain currently has instant_redeem_enabled=false, fee 1000bps (docs/reports/DEPLOY-VERIFICATION-20260705-120300Z-27daadc.md:56); operator-tunable per task facts |
| 'T+1 for rcUSDP vaults' narrowed to 'T+1 for rcusdp-sui' | claim-fix | catalog.ts:70-71 rcusdp-sui T+1; rcusdp-sol is T+1~3 and paused (catalog.ts:92) |
| Prices section: live NAV refresh scoped to rcUSDP; assets without a wired feed return catalog reference price | claim-fix | routes/vault.ts:21-35 livePrice only enriches rcusdp; catalog.ts:106 XAUa price is a reference value ('issuer NAV API lands with the XAUa workstream') |
| Build step lists exact endpoint names tx/redeem, tx/claim, tx/cancel-deposit | claim-fix | routes/transactions.ts:339,416,484,521 — path is tx/cancel-deposit, not tx/cancel |

## docs/overview/index.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Rail row: removed Solana/CCTP gateway narrative, made sui:direct the primary rail with a short legacy-frozen pointer | solana-removal | Solana rail frozen per catalog.ts:82-95 (rcusdp-sol status: paused, 'Solana rail frozen (2026-07)' comment); rule 3 removes CCTP/bridge narratives |
| Vault row: rcusdp-sui/xaua-sui listed as active, rcusdp-sol marked legacy paused | claim-fix | packages/api-server/src/lib/catalog.ts:67 (rcusdp-sui active), :90 (rcusdp-sol paused), :115 (xaua-sui active) |
| Added 'Legacy Solana rail (frozen)' admonition: deposit/redeem 409 vault_paused, claim/cancel stay open | solana-removal | routes/transactions.ts:149-160 pausedVault applies to deposit/redeem only; claim/cancel-deposit handlers skip it |
| Multisig property: 'on both chains' dropped, now 'on-chain multisig approval' | claim-fix | Solana rail frozen (catalog.ts:86-90); 'both chains' would mislead about active surface |
| On-chain verifiable row: contract addresses are in @tbookdev/vault-sdk-sui config, not 'exposed read-only in the API' | claim-fix | routes/vault.ts:59-75 GET /v1/vaults/:vaultId response contains no contract addresses; ids are baked into vault-sdk-sui config registries (docs/SDK-REFERENCE.md:278,410) |

## docs/overview/security.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Multisig section: removed unverifiable '2-of-3 on both chains' threshold; now 'on-chain multi-signature approval across separated operational roles' | claim-fix | threshold not verifiable from SDK repo; curator/operator roles confirmed in docs/epoch-lifecycle.md:10; 'both chains' misleading with Solana frozen |
| Audit section: removed Solana gateway program audit-gate sentence; XAUa AlphaVault noted as live on testnet, mainnet pending its own audit | solana-removal | Solana rail frozen (catalog.ts:86-90); docs/SDK-REFERENCE.md:410 'ONLY testnet xaua-sui (mainnet AlphaVault pending issuer publish / WS6 audit+NAV-SLA gates)' |
| API protections: SHA-256 key hashing, 24h idempotency replay window, rotation dual-signing during 24h grace, explicit X-RateLimit-*/Retry-After headers | claim-fix | middleware/api-key.ts:105 sha256Hex lookup; middleware/idempotency.ts:22 TTL_MS 24h + replay; routes/webhooks.ts:193-198 dual v1 signatures on rotation; middleware/rate-limit.ts:49-63 headers |
| On-chain verifiability: contract addresses published in @tbookdev/vault-sdk-sui config, not in 'every vault detail response' | claim-fix | routes/vault.ts:59-75 — vault detail response contains no contract addresses |
| 24-hour timelocks reworded: treasury allowlist timelock stated as the API-level verified control, on-chain config timelock stated separately | claim-fix | routes/treasury.ts:36 ACTIVATION_DELAY_MS = 24h, :229 'activates at … (24h timelock)' |

## docs/overview/use-cases.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Catalog comment made generic (removed hard-coded '8.32% APY') | style | routes/assets.ts:26-41 apy is live-enriched at request time; a fixed number would go stale |
| WaaS signing example passes intent.transaction.data with a comment showing the {format:"sui:tx-bytes-base64", data} envelope | claim-fix | routes/transactions.ts:64-67 TX_FORMAT and :329 transaction:{format,data} response shape |
| Step 5: deposit.settled webhook carries externalId, recordId, exact shares (removed sharePrice) | claim-fix | workers/sui-indexer.ts DepositRecordSettled dispatch {recordId, shares}; event-schemas.ts:27-38 TX_BASE + shares, no sharePrice |
| Treasury example: submitToSquadsProposal → submitToMultisigProposal (Sui multisig); added comment that xaua-sui deposits require issuer whitelisting (403 not_whitelisted) | solana-removal | rule 3 (Squads is Solana-specific); catalog.ts:120 requiresWhitelist + transactions.ts:137-145 not_whitelisted preflight |
| Omnibus example: fixed 'webhooooks' typo; booking code uses {recordId, shares} from the event instead of non-delivered sharePrice; reconciliation compares Number(pool.data[0].shares); balance display points at GET /v1/vaults/rcusdp-sui/price for the current sharePrice | claim-fix | event payload per sui-indexer.ts; positions shares are decimal strings (routes/positions.ts:97); price endpoint routes/vault.ts:79-85 |

## docs/resources/changelog.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Contract status table updated from 'v1 — DRAFT / upcoming sandbox release' to implemented status with sandbox access via TBook contact (secret/test key required) | claim-fix | the API server implements the full v1 surface (routes/*.ts); sandbox routes require secret/test key (docs/api-reference.md:832-836) |
| Appended 2026-07 changelog entry summarizing the alignment: Sui-first freeze of rcusdp-sol, vault-node namespaces/idempotency/timeout-retry defaults, vault-react-sui, corrected webhook payloads and polling params, operator-tunable instant redeem, compliance gates | new-content | task requirement; claims verified against vault-node/src/http.ts:50-51 (30s, 2 retries), client.ts, catalog.ts, indexers |
| Removed 'on the draft' wording from the feedback line | style | consistency with the updated implemented status |

## docs/resources/core-flows.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Removed 'currentCycle on the vault' observation point (field does not exist on GET /v1/vaults/:id) | claim-fix | routes/vault.ts:53-76 response has no currentCycle field |
| Deposit cancel step: scoped to rcusdp-sui, documented the 200 bps cancel fee disclosed via summary.cancelFeeBps, and stated xaua-sui cancel returns 400 | claim-fix | lib/catalog.ts:74-79 cancelFeeBps 200 (on-chain verified), :118 cancelable:false; routes/transactions.ts:530-534 (400) and :564-572 (summary discloses fee) |
| Replaced the full Solana gateway-rail deposit section (CCTP bridge narrative, diagram) with a short 'Legacy Solana rail (frozen)' note: 409 vault_paused on deposit/redeem, claim/cancel open, legacy reads working | solana-removal | lib/catalog.ts:82-95 rcusdp-sol status paused with freeze rationale; routes/transactions.ts:148-160 pausedVault semantics |
| Instant redeem: removed hard-coded 700 bps; now says availability and fee are operator-tunable on-chain, read settlement.instantRedeem from GET /v1/vaults/rcusdp-sui | claim-fix | lib/catalog.ts:72 catalog value is a snapshot; on-chain value is operator-tunable (currently diverges), per alignment brief; routes/vault.ts:70 exposes settlement in the vault detail |
| XAUa: added net-of-fee subscription settlement (deposit.confirmed reports net amount + fee), not-cancelable rule (400), and 403 not_whitelisted preflight on deposit builds | claim-fix | workers/sui-indexer.ts:274-287 net_usdc/fee_usdc; routes/transactions.ts:119-146 whitelistPreflight -> 403 not_whitelisted, :530-534 cancel 400; lib/errors.ts:42 |
| Failure table: vault-paused row now says claims AND cancel-deposits still work and builds return 409 vault_paused; rollback row marks gateway rail as legacy | claim-fix | routes/transactions.ts:148-160; lib/errors.ts:37 vault_paused=409; rollback events only from legacy Solana indexer (solana-indexer.ts:337-344) |
| Timing summary table rewritten: rcusdp-sui instant redeem operator-tunable + 200 bps cancel fee; rcusdp-sol marked frozen/paused; xaua-sui not cancelable with 10:00 UTC cutoff on deposit | claim-fix | lib/catalog.ts:62-123 (all values); routes/transactions.ts:148-160, 530-534 |

## docs/resources/glossary.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Rail and Vault entries updated: gateway rail marked legacy/frozen (dropped Circle CCTP narrative), vault examples list rcusdp-sui/xaua-sui with rcusdp-sol noted as frozen | solana-removal | lib/catalog.ts:82-95 Solana rail frozen 2026-07; rule 3 keeps only a short legacy note |
| Transaction intent definition: added terminal statuses failed/expired | claim-fix | store/index.ts:162 status enum built\|submitted\|confirmed\|settled\|failed\|expired |
| Idempotency key definition expanded: 24h org-scoped replay of the original response, 409 idempotency_conflict on body mismatch, Node SDK auto-generates and echoes the key | claim-fix | middleware/idempotency.ts:21-56 (TTL_MS 24h, org scope, conflict); vault-node/src/http.ts:138-146 postIdempotent auto-key + echo |

## docs/resources/onboarding-checklist.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Added sandbox checklist item: wire compliance.kyc.attested / compliance.kyb.attested before first deposit (403 otherwise) | new-content | routes/transactions.ts:202-219 deposit gate for individual/omnibus (kyc) and business (kyb) -> permission_denied 403 |
| Webhook item reframed: verify against real sandbox deliveries triggered via a deposit + POST /v1/sandbox/settle (removed unverifiable 'we will send a test event' promise) | claim-fix | no test-event endpoint exists in routes/webhooks.ts; sandbox settle trigger per vault-gateway-sdk/docs/api-reference.md:838-874 |
| Error-handling item: added 409 vault_paused to the review list | new-content | lib/errors.ts:37; rcusdp-sol returns it today, so partners will encounter it |

## docs/resources/versioning.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| SDK package list corrected to the publishable set (@tbookdev/vault-sdk-sui, vault-node, vault-react-sui) with 'available from the monorepo, npm publication pending'; legacy Solana packages (vault-sdk, vault-react) noted frozen/private | claim-fix | packages/*/package.json: vault-sdk and vault-react have "private": true; publish set per alignment brief (npm publication pending, do not claim published) |

## docs/webhooks/event-types.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| deposit.confirmed example: removed fabricated settlementCycle on Sui rail, added recordId and digest, 6dp amounts; noted XAUa net amount + fee field | claim-fix | workers/sui-indexer.ts:263-287 emits {recordId, amount} (SubscriptionRequested adds fee, net_usdc); settlementCycle only on Solana rail (solana-indexer.ts:254) |
| deposit.settled example: removed sharePrice/settlementCycle/amount (not emitted), added recordId/shares/digest; omnibus guidance now allocates shares and reads GET /v1/vaults/:id/price | claim-fix | workers/sui-indexer.ts:288-296 emits {recordId, shares} only; no sharePrice anywhere in dispatch payloads |
| deposit.cancelled: reason values corrected to "cancelled" \| "rollback" (was "user_cancel"); documented returned amount and fee fields | claim-fix | workers/sui-indexer.ts:297-311 reason:"cancelled" with fee; workers/solana-indexer.ts:264-288 reason:"cancelled"/"rollback" |
| redeem.confirmed/settled: documented shares + estimatedProceeds on confirmed, claimable on settled; dropped hard settlementCycle claim | claim-fix | workers/sui-indexer.ts:312-329 RedeemQueued {shares, estimatedProceeds}, ClaimAllocated {claimable} |
| vault.cycle.* data corrected: cycleKind + totalAmount/mintedShares (deposit) and totalShares/netProceeds/fee (redeem) replace invented totalDeposits/totalRedeems/sharePrice; real example added | claim-fix | workers/sui-indexer.ts:339-355 and workers/solana-indexer.ts:305-344 are the only emitters; field names verified there |
| vault.price.updated: corrected data to vaultId + raw on-chain sync fields with pointer to GET /v1/vaults/:id/price (was price/apy/asOf, not emitted) | claim-fix | workers/sui-indexer.ts:356-358 dispatches {vaultId, raw: fields} |
| vault.paused: noted cancel-deposits also keep working while paused; heading changed to 'Vault events (platform-wide)' | claim-fix | routes/transactions.ts:148-160 pausedVault guards deposit/redeem only; webhooks.ts:14-17 vault.* are platform-wide (orgId=null) |
| Treasury event table corrected: allowlist.activated has no chain field; pending_approval/approved carry {id, accountId, amount, address} (approved does NOT carry intentId); withdrawal.confirmed marked reserved/not yet emitted | claim-fix | routes/treasury.ts:71-75, 250-254, 317-321 dispatch payloads; treasury.withdrawal.confirmed appears only in ALLOWED_EVENTS (webhooks.ts:54), never dispatched |
| Wildcards: added account.* to the accepted namespace list | claim-fix | routes/webhooks.ts:65 EVENT_NAMESPACES = [transaction, account, treasury, vault] |

## docs/webhooks/index.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Added registration rules (HTTPS/public URL only, max 10 endpoints per org) and clarified secret is shown on creation and rotation | claim-fix | api-server/src/routes/webhooks.ts:67 (MAX_WEBHOOKS_PER_ORG=10), :95-108 (validateWebhookUrl), :326-341 (secret on create), :411-424 (secret on rotate) |
| Fixed Node verification example: TBookVaultServer constructor now includes required secretKey; passes raw Buffer; documented WebhookVerificationError | claim-fix | vault-node/src/client.ts:59-66 throws without secretKey/apiKey; vault-node/src/webhooks.ts:73-81 verify accepts string\|Buffer |
| Rewrote Python verify sample to accept multiple v1 entries (dict-based parse silently broke during rotation dual-signing) | claim-fix | api-server/src/routes/webhooks.ts:193-201 signatureHeaderFor emits two v1 entries during 24h grace; verifier must match any |
| Corrected retry trigger: 5xx or 10s timeout retries, 4xx is permanent rejection (was 'non-2xx triggers retries') | claim-fix | api-server/src/store/index.ts:81-92 deliveryOutcome: 4xx -> failed, no retry; webhooks.ts:269 AbortSignal.timeout(10_000) |
| Scoped externalId claim: transaction.* and account.created carry externalId, treasury.* carry accountId; noted vault.* platform-wide fan-out | claim-fix | workers/sui-indexer.ts:251-259 base fields; routes/treasury.ts:71-75,250-254,317-321 payloads lack externalId; webhooks.ts:250-252 audience logic |
| Rotation section: documented {secret, previousSecretValidUntil} response and dual-signed header (two v1 entries, new first) during 24h grace | claim-fix | api-server/src/routes/webhooks.ts:411-424 response shape; :193-201 dual-signing; store/memory.ts:146 24h expiry |

## docs/webhooks/retry-policy.mdx

| Change | Kind | Why (source ref) |
|---|---|---|
| Retry schedule: stated 4 attempts total and that retries run via a durable sweep (minimum delay, not exact clock) | claim-fix | store/index.ts:73-74 WEBHOOK_RETRY_DELAYS_MS [1m,5m,30m], WEBHOOK_MAX_ATTEMPTS=4; webhooks.ts:114-126 sweep |
| Polling example fixed: query param is `types` (comma-separated), not `type`; documented after/limit (default 50, max 200) and {events, hasMore} response with deliveries[] | claim-fix | routes/webhooks.ts:427-438 reads query('types'), limit capped at 200; store/memory.ts:170-190 attaches deliveries |
| Removed unverifiable '30 days retention' claim; replaced with bounded-retention guidance and noted sandbox.settle.requested marker events appear in the poll feed | claim-fix | no retention window exists in source (store/memory.ts:56 keeps last 1000 events; mysql store has no pruning); sandbox marker per routes/sandbox behavior and vault-gateway-sdk/docs/api-reference.md:869-874 |

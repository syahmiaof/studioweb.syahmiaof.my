# V3.4 Security Findings

Assessment date: 2026-10-26. Commands: `npm audit --omit=dev --json` and `npm ls next postcss zod sharp --all`.

## Current production dependency audit

Audit reports 3 vulnerable production dependency records: 1 critical and 2 high.

| Package in installed tree | Installed version | Finding | Reachability / mitigation |
|---|---:|---|---|
| `next` (direct) | 14.2.35 | Critical aggregate, including Windows-hosted App/Pages Router RCE GHSA-p293 and SVG Image Optimizer RCE GHSA-2464, plus other Next advisories | The Windows RCE advisory says affected Windows-hosted apps have no workaround. The local review servers bind to loopback; no production server was started. Next Image Optimization is used for approved local WebP plates; no remote image patterns or user image upload were found. SVG optimizer reachability was not proven safe. Installed `sharp` is 0.35.5, the advisory's stated mitigation for the glibc SVG issue, but this does not close the other Next findings. |
| `next/node_modules/postcss` | 8.4.31 | High aggregate; includes source-map traversal/read advisories for versions at or below 8.5.17 | Project's direct PostCSS is 8.5.31, but Next still resolves a vulnerable nested 8.4.31. PostCSS appears in the build toolchain; no runtime user-supplied CSS parsing path was found. Package remains flagged and needs a dependency-tree fix. |
| `zod` (direct) | 3.25.76 | High: oversized arrays without schema length bounds can consume memory; advisory patched in 4.6.6 | The exposed inquiry API now caps request bodies at 16 KiB, `addons` at 8 entries × 80 chars, and package fields at 80/120 chars. This narrows the input surface but does not replace the patched dependency. |

The top-level PostCSS version is 8.5.31; it is the nested 8.4.31 installed under Next that remains within the affected range. No blanket claim of zero risk is made.

## Temporary controls added

- Assistant API refuses production LLM configuration until a shared limiter is implemented. Local request limits remain process-local and are not presented as production-grade controls.
- LLM POST has a 12 KiB body limit, 8-message history limit, 1,200-character message limit, 12-second provider timeout, consent requirement, price-sensitive request refusal and no message persistence/logging.
- Inquiry API already bounds the request stream to 16 KiB; its Zod array/text bounds are now explicit and unit tested.
- No dependency was upgraded, no `npm audit fix --force` was run, and no deployment/push was made.

## Required isolated remediation

1. Create an isolated dependency-upgrade branch/worktree and inventory framework, React, Node and hosting compatibility.
2. Select a currently supported patched Next.js release. The current npm audit proposes 16.4.3 as a major-version fix; the reviewed advisories state minimum patched releases of 15.5.24 for the Windows RCE and 15.5.28 for SVG RCE. Verify the complete current audit before choosing a target.
3. Upgrade the Next nested PostCSS tree through the patched Next dependency or a compatibility-tested override; rerun `npm ls postcss` and audit.
4. Move Zod to a patched supported version in isolation and rerun inquiry schema/API behavior.
5. Re-run typecheck, lint, units, production build, V3.3/V3.4 browser suites and visual comparison before approving production.

**Production launch remains blocked** until the critical Next finding and high-severity dependency findings are remediated and verified. A Next major upgrade was intentionally not mixed into V3.4 feature work.

## Primary advisories

- [Next.js Windows-hosted RCE — GHSA-p293-qw3h-jr36](https://github.com/advisories/GHSA-p293-qw3h-jr36)
- [Next.js SVG Image Optimizer RCE — GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw)
- [PostCSS source-map path traversal — GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849)
- [Zod oversized array resource exhaustion — GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)

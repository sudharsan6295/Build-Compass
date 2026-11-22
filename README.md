# Build Compass

**Version 0.10 (draft, November 2026).** See the [changelog](CHANGELOG.md). Not yet tested in a live organisation; feedback welcome via GitHub issues.

A vendor-neutral framework for deciding whether an organisation should **build its own software with AI** or keep buying, subscribing to or outsourcing it — and, if the answer is build, for designing, vibe-coding, testing, deploying and supporting it safely.

**Live page:** https://sudharsan6295.github.io/Build-Compass/

## What's inside

- **Layer 0 · Organisation readiness**, set up once: AI policy, approved tools and contract terms, risk tiers (0–3) and promotion triggers, the AI app register, golden path platform, harness baseline, funding model
- **10 product phases** in four stages (Decide → Prepare → Deliver → Run), each collapsible, with key questions, activities, outputs, AI / vibe-coding watch-outs and an exit checklist
- **7 decision gates** (G0–G6) with staged funding: tranche 1 at G2, scale funding at G5 after a pilot
- **7 always-on rails**: security, governance & compliance, platform & golden path, AI harness & tooling, data, cost & FinOps, people & change
- **Build methodology** ("governed vibe engineering"): explore vs engineer mode, the Guided Build Loop, rigour by risk tier, promotion triggers and a fast lane for Tier 0–1
- **14 build principles** to check before development starts
- **Decision toolkit**: an AI-build suitability filter, a TCO calculator with NPV (discounted) comparison and best/worst-case ranges, and a scorecard with knockout criteria, all running in the browser
- **Measure the framework** (DORA, AI-assisted engineering, value and governance metrics) and a **standards mapping** (ISO/IEC 42001, NIST AI RMF, NIST SSDF, OWASP, SLSA, EU AI Act, DPDP and more)
- **Builds on**: credits the prior work it draws from (Gartner Pace Layers, Wardley Mapping, DORA, the Power Platform CoE, Stage-Gate, spec-driven development, NIST/ISO/OWASP)
- **Buy track** and **blend governance** for when the answer is buy
- An **illustrative worked example** you can load into the toolkit
- **Templates** in [`templates/`](templates/): problem brief, staged business case, ADR, AI app register, vendor contract checklist
- **Roles & RACI** and a **glossary**

## Make your own version

All content lives in [`assets/data.js`](assets/data.js). Fork the repository, edit that one file (phases, checks, roles, criteria, glossary) and publish with GitHub Pages. No build step, no dependencies: plain HTML, CSS and JavaScript.

Run locally with any static server, for example:

```
python -m http.server 8000
```

## Publishing on GitHub Pages

Repository → Settings → Pages → Build and deployment → Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**.

---

## Licence

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code: MIT. See [LICENSE](LICENSE). Built with AI assistance.

---

Guidance, not legal or compliance advice. Created by [Sudharsan Balaji](https://sudharsanbalaji.com).

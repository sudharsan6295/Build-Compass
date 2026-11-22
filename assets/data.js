/*
 * Build Compass — framework content.
 * Everything the page shows lives in this one file, so you can fork the repo
 * and reshape the framework for your organisation without touching layout code.
 */
window.FRAMEWORK = {
  stages: [
    { id: "decide",  name: "Decide",  blurb: "Should we own this?",           phases: ["p0", "p1", "p2"] },
    { id: "prepare", name: "Prepare", blurb: "Apply the rules, write the spec", phases: ["p3", "p4"] },
    { id: "deliver", name: "Deliver", blurb: "Build, prove, ship",             phases: ["p5", "p6", "p7"] },
    { id: "run",     name: "Run",     blurb: "Own it for its whole life",      phases: ["p8", "p9"] }
  ],

  /* Layer 0 — done once per organisation, inherited by every product. */
  foundation: {
    id: "l0", num: "L0", stage: "org",
    name: "Organisation readiness", label: "Set up once, reviewed yearly",
    tagline: "Put the shared rules, platform and registers in place before the first product goes through.",
    summary: "Without this layer every product team reinvents its own AI policy, toolset and security, and business teams build unmanaged apps on the side. Set it up once; every product then inherits it, and Phase 03 only covers what is specific to that product.",
    questions: [
      "Which AI tools and models are approved, and under which contract terms?",
      "What do Tier 0 to Tier 3 mean here, with two real examples of each?",
      "Where is every AI-built app registered, including the ones business teams build themselves?",
      "Which standard platform will builders start from?",
      "How are products funded and owned once they are live?"
    ],
    activities: [
      ["AI usage policy", "Approved uses, which data classes may go into prompts, prohibited actions, what is logged."],
      ["Approved tools & contract terms", "Enterprise tiers only: no training on your code or data, IP indemnity, data residency, admin controls. Reviewed quarterly."],
      ["Risk tiers & promotion triggers", "Define Tier 0 (personal or team tools) to Tier 3, and the triggers that move an app into the formal process."],
      ["AI app register", "Every AI-built app listed with owner, tier, data and user count, including citizen-built ones. Registering must take minutes."],
      ["Golden path platform", "Pre-approved starter templates with SSO, logging, pipeline, hosting, secrets and AI rules files already wired in."],
      ["Harness baseline", "Default rules files, permission allow-lists, hooks and approved MCP connectors that every product starts from."],
      ["Roles & skills", "An engineer-of-record pool, an architecture review board, and training in AI-assisted engineering and code review."],
      ["Funding & ownership model", "Fund long-lived product teams rather than one-off projects; agree capex/opex treatment and showback or chargeback to the departments that use each product."],
      ["Standards & metrics baseline", "Map controls to recognised standards (see Standards mapping) and start measuring delivery, AI and value metrics."]
    ],
    outputs: ["AI usage policy", "Approved tool list", "Tier definitions & promotion triggers", "AI app register", "Golden path templates", "Harness baseline", "Funding model", "Metrics baseline"],
    ai: [
      "Shadow AI is the default when this layer is slow or heavy. Make the register and the golden path easier than going around them.",
      "Re-check AI tool terms whenever vendors change plans. “No training on your data” often applies only to enterprise tiers."
    ],
    gate: { id: "L0", name: "Organisation ready" },
    checks: [
      "AI usage policy and approved tool list published",
      "Tier definitions and promotion triggers agreed",
      "AI app register live and announced",
      "Golden path template available with SSO, logging and pipeline",
      "Funding and ownership model agreed with finance"
    ]
  },

  phases: [
    {
      id: "p0", num: "00", stage: "decide",
      name: "Spark & Intake", label: "Product thinking",
      tagline: "Start from the problem, not the tool. Decide if it deserves anyone's time.",
      summary: "Every request — “we need a new tool”, “the vendor won't add this feature”, “can AI build us this?” — comes through one door and is written up the same way, so it can be compared fairly with everything else. Tier 0–1 requests can take the fast lane and cover Phases 00–02 in one sitting.",
      questions: [
        "What problem, for whom, and how do we know it is real?",
        "What happens if we do nothing for 12 months?",
        "Is this a product (used repeatedly by many people) or a one-off report, script or task?",
        "Is something in the AI app register or the application portfolio already doing this?",
        "Does the solution need AI inside it, or only AI to build it? Usually it's the second."
      ],
      activities: [
        ["Problem brief", "One page: problem statement, who is affected, today's workaround, rough cost of the pain."],
        ["Classify the request", "New capability, replacing a vendor product, extending an existing product, or plain automation."],
        ["Portfolio check", "Search the AI app register and the application portfolio: which tools we buy, subscribe to or built already touch this?"],
        ["Name a sponsor", "A business owner who will own the outcome, not just ask for it."]
      ],
      outputs: ["Problem brief", "Request classification", "Named business sponsor"],
      ai: [
        "Not every product should be an AI product. Treat AI in the product (chat, prediction, generation) and AI used to build the product (vibe coding) as two separate decisions with different risks.",
        "A 30-minute vibe-coded demo proves the screen can be drawn, not that the data, security or support will work. Don't let a demo skip the gates."
      ],
      gate: { id: "G0", name: "Worth exploring?" },
      checks: [
        "Problem stated in business terms, without naming a solution",
        "Business sponsor named and committed",
        "Cost of doing nothing estimated, even roughly",
        "Checked against the app register and application portfolio"
      ]
    },
    {
      id: "p1", num: "01", stage: "decide",
      name: "Discover & Analyse", label: "Analysis",
      tagline: "Understand the work, the users, the data and the market before picking a route.",
      summary: "Map how the work is done today, what it costs, what data it touches and what the market already offers. Assign a provisional risk tier here: it changes the cost of every option, so it must exist before the build-vs-buy comparison.",
      questions: [
        "Who are the users, how many are there, and what do they actually do day to day?",
        "What data does it create, read or move, how sensitive is it, and who owns it?",
        "Which systems must it connect to (ERP, PLM, CRM, identity, email)?",
        "What do we pay today in licences, seats, renewals and change requests, and when do contracts end?",
        "What do mature vendors offer, and how far is their roadmap from our need?"
      ],
      activities: [
        ["Process & user research", "Shadow users, map the current workflow, find where time and quality are lost."],
        ["Current-state inventory", "Contracts, renewal dates, notice periods, data-export rights, integration points."],
        ["Market scan", "Three to five credible vendors or SaaS options: demos, pricing, roadmap against must-haves."],
        ["Data & compliance classification", "With the data owner: public, internal, confidential or restricted; residency; regulations such as GDPR, India's DPDP Act and sector rules."],
        ["Provisional risk tier", "Tier 0–3 from data class, user reach and business criticality. A Tier 3 build costs far more than a Tier 1 build."],
        ["Requirements sketch", "Must, should and won't-have, plus non-functional needs: uptime, scale, audit, accessibility."]
      ],
      outputs: ["Current-state process map", "Vendor shortlist with pricing", "Data classification", "Provisional risk tier", "Requirements sketch"],
      ai: [
        "Use AI to speed up research — summarising interviews, comparing vendor documents, drafting process maps — but never paste confidential or personal data into a tool that isn't approved for it.",
        "Check whether vendors are adding AI to their own products. The gap you want to close may close on its own."
      ],
      gate: { id: "G1", name: "Problem validated" },
      checks: [
        "Users interviewed or observed; workflow mapped",
        "Current spend and contract dates known",
        "Data classified with the data owner; obligations listed",
        "Provisional risk tier assigned",
        "At least three options identified, including “do nothing”"
      ]
    },
    {
      id: "p2", num: "02", stage: "decide",
      name: "Choose the Route", label: "Build-vs-buy decision",
      tagline: "Filter out the impossible, then compare what's left on cost ranges, strategic value and risk.",
      summary: "AI has made building much cheaper, but not free: the cost moves from writing code to owning it. This phase removes options that fail a hard requirement, compares the rest, and funds the winner in stages rather than all at once.",
      options: [
        ["Buy", "Licensed off-the-shelf product. Mature and proven; you follow their roadmap."],
        ["Subscribe", "SaaS. Fastest start; cost grows with seats; the vendor controls changes."],
        ["Outsource", "A partner builds it. You pay for every change and depend on their team."],
        ["Extend", "Configure or low-code on a platform you already own (PLM, ERP, Microsoft 365)."],
        ["Build with AI", "Your team builds with AI assistance. You own the roadmap, the code and the support."],
        ["Blend", "Buy the commodity core, build the differentiating edge around it."],
        ["Replace gradually", "Keep the vendor product running and replace it one module at a time behind a stable interface (the strangler pattern)."]
      ],
      suitability: true,
      questions: [
        "Does any option fail a hard requirement outright? Remove it before scoring.",
        "Is this a differentiator for us, or commodity everyone does the same way? Buy commodity, build differentiation.",
        "How often will it need to change? Frequent change favours owning it.",
        "What do best-case and worst-case 3–5 year costs look like for each option, at this product's risk tier?",
        "Do we have, or can we grow, the people to own and support it for its whole life?",
        "What is the exit cost if a vendor triples prices, is acquired or sunsets the product? And if our build fails?"
      ],
      activities: [
        ["Suitability filter & knockouts", "Check the AI-build suitability lists and the knockout criteria in the scorecard. A knocked-out option is not scored."],
        ["TCO model", "Cumulative 3–5 year cost for each option, costed at the risk tier, with best and worst cases, and discounted to today's money (NPV) at your finance team's rate. Use the TCO calculator."],
        ["Weighted scorecard", "Agree criteria and weights first, then score. Use the scorecard in the Decision toolkit."],
        ["Risk review", "Vendor lock-in, key-person risk, security and compliance exposure, delivery risk."],
        ["Staged business case", "Tranche 1 funds design, an MVP and a pilot. Scale funding is released only at Gate G5, once the pilot proves value."]
      ],
      outputs: ["Knockout & suitability check", "TCO model with ranges", "Scored comparison", "Staged business case", "Decision record"],
      ai: [
        "Budget for owning, not just creating. A common rule of thumb puts yearly maintenance at 15–25% of the original build effort; treat it as an assumption to replace with your own data, and expect AI-generated code to sit at the higher end unless it is actively refactored.",
        "Count AI tooling: assistant seats, agent and token usage, and model price changes.",
        "“We can build it in a weekend” is a prototype estimate. Add authentication, permissions, audit, integration, testing and support before comparing."
      ],
      gate: { id: "G2", name: "Investment decision · tranche 1", branch: "Buy, Subscribe or Outsource → hand over to procurement. Build, Blend or Replace gradually → continue to Phase 03 with tranche-1 funding." },
      checks: [
        "Suitability filter and knockout criteria applied",
        "TCO compared over at least three years, at the risk tier, in today's money (NPV), with best and worst cases",
        "Weights agreed before options were scored",
        "Business case approved with success metrics, a kill criterion and a tranche-1 budget",
        "Decision and its reasons recorded"
      ]
    },
    {
      id: "p3", num: "03", stage: "prepare",
      name: "Govern & Guard", label: "Product governance",
      tagline: "Apply the organisation's rules to this product before the first prompt is written.",
      summary: "Layer 0 sets the rules once for everyone. This phase applies them to one product: confirm its tier, register it, configure its harness from the standard baseline, name its people and plan its compliance.",
      questions: [
        "Does the provisional risk tier still hold now that the scope is clearer?",
        "Does this product need anything beyond the Layer 0 harness baseline?",
        "Which regulations apply to the product, and to any AI features inside it (for example EU AI Act risk categories)?",
        "Who is the engineer of record, and for Tier 3, are they independent of the AI builder?"
      ],
      activities: [
        ["Confirm the risk tier", "Re-check the provisional tier with security; it sets review, testing and approval rigour from here on."],
        ["Register the product", "Add it to the AI app register with owner, tier, data classes and expected users."],
        ["Configure the harness", "Start from the Layer 0 baseline; add product-specific rules files, permissions and connectors only where needed."],
        ["Roles & approvals", "Name the product owner, AI builders, engineer of record and security reviewer; agree the RACI."],
        ["Compliance plan", "Privacy impact assessment if personal data is involved; AI-regulation classification if the product contains AI; audit-trail and retention needs."]
      ],
      outputs: ["Confirmed risk tier", "App register entry", "Product harness configuration", "RACI", "Compliance plan"],
      ai: [
        "Agents never hold production credentials. Give them sandboxes, scoped tokens and read-only or synthetic data by default.",
        "For Tier 2 and above, keep AI session logs (prompts, diffs, approvals) so decisions can be audited later.",
        "Generated code can resemble copyleft sources. Run licence scanning, not just security scanning."
      ],
      gate: null,
      checks: [
        "Risk tier confirmed with security",
        "Product listed in the AI app register",
        "Harness configured from the Layer 0 baseline",
        "Engineer of record named (independent of the AI builder for Tier 3)",
        "Privacy and AI-regulation assessments done where they apply"
      ]
    },
    {
      id: "p4", num: "04", stage: "prepare",
      name: "Design & Specify", label: "Design",
      tagline: "Write the spec the AI will build from. In AI-assisted delivery the spec is the real source code.",
      summary: "The quality of AI-generated software follows the quality of its instructions. Precise specs, examples and constraints beat clever prompts. Design starts from the golden path, and every new release re-enters the loop here.",
      questions: [
        "Can each feature be described with acceptance criteria that a tester, or an AI, can check?",
        "Which golden path template fits, and where must we deviate from it?",
        "Who may see and do what? Which system owns each piece of data?",
        "How much data can we afford to lose, and how fast must we be back after an outage?",
        "What could go wrong? Who might misuse it, and what data could leak?"
      ],
      activities: [
        ["Product spec (PRD)", "Goals, non-goals, user stories, acceptance criteria, success metrics."],
        ["Architecture & ADRs", "Start from the golden path. Stack, hosting and integrations recorded as decisions; any deviation needs an ADR and architect approval."],
        ["Access-control model", "Roles, permissions and SSO groups designed now, not bolted on at deployment."],
        ["Data ownership & integration", "System of record for each entity, master-data rules, and the integration pattern (APIs or events) with each connected system."],
        ["Non-functional requirements", "Performance, availability, accessibility, audit, and disaster-recovery targets (RPO and RTO) set by tier."],
        ["Threat model", "A STRIDE-style pass over data flows, turned into security requirements. Use OWASP ASVS levels by tier, and the OWASP Top 10 for LLM apps if the product contains AI."],
        ["Throwaway prototype", "Vibe-code a clickable UI to test the flows with real users quickly, then discard it."],
        ["Context pack for the AI", "Conventions, architecture summary, domain glossary, examples, do and don't rules, kept in the repo (rules files such as CLAUDE.md or AGENTS.md)."],
        ["Sliced backlog", "Thin vertical slices, each small enough to build and genuinely review in about a day."]
      ],
      outputs: ["Spec with acceptance criteria", "ADRs", "Access model", "Data ownership map", "NFRs incl. RPO/RTO", "Threat model", "Validated prototype", "Context pack", "Sliced backlog"],
      ai: [
        "Prototype code is for learning, not shipping. Label prototype repos clearly so nothing drifts into production.",
        "Keep architecture decisions human. Let the AI propose options; a named person chooses and records why."
      ],
      gate: { id: "G3", name: "Ready to build" },
      checks: [
        "Spec has testable acceptance criteria for the first release",
        "Architecture reviewed by the enterprise architect (review board for Tier 2+)",
        "Access model, data ownership and RPO/RTO agreed",
        "Threat model done; security requirements in the backlog",
        "Prototype validated with real users; context pack committed"
      ]
    },
    {
      id: "p5", num: "05", stage: "deliver",
      name: "Build with AI", label: "Development",
      tagline: "Build in small, verified slices, with AI as a fast pair and people as the accountable engineers.",
      summary: "Not waterfall, not plain Scrum: a tight loop of frame, plan, generate, review and verify, repeated for each slice. Phases 04 to 07 repeat for every release. See Build methodology for the full loop.",
      questions: [
        "Is each slice small enough for a person to genuinely review every line the AI wrote?",
        "Are tests written from the spec, not reverse-engineered from the generated code?",
        "Could we fix this at 2 a.m. without the AI?"
      ],
      activities: [
        ["Run the Guided Build Loop", "Frame → Plan → Generate → Review → Verify → Commit & reflect, once per slice."],
        ["Branch and PR per slice", "Pull request for every slice; AI-authored changes labelled as such."],
        ["Automated checks on every commit", "Lint, type-check, unit tests, secret scan, dependency and licence scan."],
        ["Supply-chain controls", "Pinned dependencies, a software bill of materials (SBOM) for every build, and build provenance (SLSA)."],
        ["Maintainability guardrails", "Complexity and duplication thresholds in the pipeline, architecture fitness functions, and 15–20% of capacity reserved for refactoring."],
        ["Human review", "The engineer of record reviews every PR; line-by-line for auth, payments and data access. Tier 3 needs a reviewer who is not the builder."],
        ["Keep docs alive", "Update the context pack and ADRs as the system changes; generate developer docs from the code."],
        ["Weekly demo", "Show working software to the sponsor and users; re-prioritise the backlog."]
      ],
      outputs: ["Working increments", "Reviewed pull requests", "Green pipeline", "SBOM per build", "Up-to-date docs"],
      ai: [
        "Check every new dependency exists and is reputable. AI can invent package names that attackers then register (slopsquatting).",
        "Watch for confident wrongness: plausible code with silent logic errors, missing edge cases or quietly disabled checks.",
        "Never let the AI weaken tests or security checks to get a green build. Treat any change to tests as high-scrutiny.",
        "AI tends to duplicate rather than reuse. Without a refactoring budget, the codebase sprawls within months.",
        "Long sessions drift and forget earlier rules. Start a fresh session per slice and keep rules in files, not in chat."
      ],
      gate: null,
      checks: [
        "Every slice for the release merged through a reviewed PR",
        "Pipeline green: tests, lint, secret, dependency and licence scans",
        "SBOM generated; dependencies pinned",
        "Complexity and duplication within thresholds",
        "Docs and context pack updated"
      ]
    },
    {
      id: "p6", num: "06", stage: "deliver",
      name: "Test & Assure", label: "Testing",
      tagline: "Prove it works, it's safe and real users accept it, regardless of who, or what, wrote it.",
      summary: "AI writes tests fast, but it tends to test what the code does rather than what it should do. Assurance always traces back to the spec.",
      questions: [
        "Does every test trace back to an acceptance criterion?",
        "Has anyone tried to break it: security, bad input, load, misuse?",
        "Will real users sign off that it does their job?",
        "If the product has AI features: how often is it wrong, and what happens when it is?"
      ],
      activities: [
        ["Functional testing", "Unit, integration and end-to-end tests against the acceptance criteria, plus contract tests for every integration."],
        ["Security testing", "Static analysis (SAST), dependency scanning, dynamic testing (DAST) and a penetration test scaled to the tier."],
        ["Non-functional testing", "Performance and load, accessibility (WCAG), browsers and devices, backup restore against the RPO/RTO."],
        ["Migration rehearsal", "Move a copy of real data; reconcile counts and values."],
        ["User acceptance (UAT)", "Business users run realistic scenarios and sign off."],
        ["AI feature evaluation", "Only if the product contains AI: eval sets, accuracy and hallucination rates, prompt-injection and jailbreak tests, bias checks. The eval suite then runs in the pipeline as a regression gate."]
      ],
      outputs: ["Test report traced to requirements", "Security report", "UAT sign-off", "Eval results (if AI features)"],
      ai: [
        "Have a person, or a separate AI session given only the spec, write the test cases, not the session that wrote the code.",
        "Mutation testing or spot-reviews of tests expose weak AI-written tests that always pass."
      ],
      gate: { id: "G4", name: "Ready to release" },
      checks: [
        "All must-have acceptance criteria pass",
        "No open critical or high security findings",
        "UAT signed off by the business owner",
        "Migration rehearsed and reconciled (if replacing a system)",
        "Rollback plan written and tested"
      ]
    },
    {
      id: "p7", num: "07", stage: "deliver",
      name: "Deploy & Pilot", label: "Deployment to production",
      tagline: "Ship repeatably and reversibly, prove value with a pilot, then fund the scale-up.",
      summary: "Production is reached only through the pipeline. A pilot group uses the product for real work against the business-case metrics; their results decide whether tranche-2 funding is released and the product scales.",
      questions: [
        "Can we deploy and roll back with one action and no manual steps?",
        "Did the pilot hit the proof-of-value metrics we set at Gate G2?",
        "How do users switch from the old tool: big bang, phased, or a parallel run?",
        "Who needs to know, be trained, or approve the change?"
      ],
      activities: [
        ["Environments as code", "Dev → test/staging → production. Real production data never sits unmasked in lower environments."],
        ["CI/CD with gates", "Build, test, scan, approve, deploy; artefacts versioned and signed."],
        ["Production hardening", "SSO and role-based access, secrets vault, backups, disaster recovery, logging, monitoring, rate limits."],
        ["Pilot & proof of value", "A pilot group does real work for a fixed period; measure against the business-case metrics."],
        ["Release strategy", "Feature flags, canary or phased rollout; parallel run with the old system where risk is high."],
        ["Change management", "Release notes, training, champions, support readiness, change-board approval where required."],
        ["Vendor exit", "If replacing a product: data export, contract notice and licence ramp-down timed to the cut-over."]
      ],
      outputs: ["Production deployment", "Pilot results", "Release notes", "Trained users", "Runbook", "Vendor exit plan"],
      ai: [
        "AI can draft infrastructure-as-code and pipelines; people approve every change to production config, access rights and networking.",
        "Deployments run from the pipeline, never from someone's AI session. Agent tokens stay out of production."
      ],
      gate: { id: "G5", name: "Pilot proven · scale funding" },
      checks: [
        "Deployed through the pipeline, with no manual production changes",
        "Monitoring, alerts, backups and DR restore verified against RPO/RTO",
        "Support team trained and runbook handed over",
        "Pilot met its proof-of-value metrics; scale funding approved",
        "Old-system cut-over or decommission scheduled"
      ]
    },
    {
      id: "p8", num: "08", stage: "run",
      name: "Operate & Support", label: "Support",
      tagline: "Run it like a product: an owner, a support model and a budget.",
      summary: "Go-live is the day the real cost begins. Owning software means owning its incidents, upgrades and questions, and, if it contains AI, its model behaviour, for as long as it lives.",
      questions: [
        "Who answers when it breaks, during which hours, and how fast?",
        "Can someone other than the original builder understand and fix it?",
        "Are we watching cost (hosting, AI usage) as closely as uptime?",
        "If it contains AI: how do we notice when answers get worse?"
      ],
      activities: [
        ["Support model", "L1 help desk and FAQs, L2 product team, L3 engineer of record; SLAs set by tier."],
        ["Observability", "Uptime, errors, latency and usage, with service-level objectives and alerts."],
        ["Incident management", "Severity levels, on-call rota, blameless post-mortems, including AI incidents such as harmful or wrong outputs."],
        ["Maintenance cadence", "Monthly security patches, dependency and framework upgrades, and the reserved refactoring budget spent, not skipped."],
        ["AI feature operations", "Only if the product contains AI: prompt and model versioning, eval regression on every change, quality and drift monitoring, human review of risky outputs, a plan for model deprecation."],
        ["FinOps", "Hosting, licence and AI token spend tracked against the business case."],
        ["Knowledge continuity", "Runbooks, architecture docs, and at least two people able to support each component."]
      ],
      outputs: ["SLA and support process", "Dashboards", "Incident log", "Maintenance calendar", "Monthly cost report"],
      ai: [
        "AI can triage tickets, explain stack traces and propose fixes. Fixes still go through the same review and pipeline as any other change.",
        "Bus-factor risk is higher with AI-built code. If no person understands a module, schedule a walkthrough or refactor before it fails.",
        "Model providers retire versions on their own timetable. Track deprecation dates like any other end-of-life dependency."
      ],
      gate: null,
      checks: [
        "SLAs defined and measured",
        "Patching, upgrades and refactoring on a calendar",
        "Two or more people can support each component",
        "AI features monitored for quality and drift (if any)",
        "Cost tracked monthly against the business case"
      ]
    },
    {
      id: "p9", num: "09", stage: "run",
      name: "Measure & Evolve", label: "Review & evolve",
      tagline: "Check the investment paid off, then decide: grow, maintain, re-platform or retire.",
      summary: "The business case made promises. This phase checks them, feeds the next release back into Phase 04, and re-asks the build-vs-buy question every year, because the market and the AI tools both move quickly.",
      questions: [
        "Did we hit the success metrics in the business case?",
        "Is total cost tracking to the model, or drifting?",
        "Have licence savings actually landed, or is the old contract still running?",
        "Has the market changed? Is there now a product we should buy instead?"
      ],
      activities: [
        ["Benefits review", "At 3, 6 and 12 months against the business-case metrics. Licence savings count only once the vendor contract has actually ended."],
        ["Engineering metrics", "Delivery, AI-assisted engineering and governance metrics from the Measure section, reviewed each quarter."],
        ["Feedback & next release", "Surveys, usage analytics and feature requests shape the next release, which re-enters at Phase 04."],
        ["Yearly portfolio review", "Re-run the build-vs-buy scorecard; the vendor landscape changes fast."],
        ["Funding & ownership review", "Continue as a funded product team, merge into another product, hand over, or retire."],
        ["Sunset criteria", "When to retire it, and how to exit cleanly: data, users, contracts, register entry."]
      ],
      outputs: ["Benefits realisation report", "Metrics review", "Next-release backlog", "Continue / evolve / retire decision"],
      ai: [
        "Re-evaluate the AI tools themselves. Models and assistants change every few months; refresh approved lists, rules files and harness settings."
      ],
      gate: { id: "G6", name: "Value review" },
      checks: [
        "Success metrics measured and reported to the sponsor",
        "Actual TCO and realised savings compared with the business case",
        "Decision recorded: invest more, maintain, re-platform or retire",
        "Lessons fed back into Layer 0 and this framework"
      ]
    }
  ],

  /* AI-build suitability filter (Phase 02). */
  suitability: {
    good: {
      title: "Good fit to build with AI",
      items: ["Workflow, forms and approval apps", "Dashboards and reporting", "Integration glue between existing systems", "Internal tools and admin consoles", "Document and knowledge utilities", "Prototypes and pilots"]
    },
    caution: {
      title: "Build with extra rigour, or blend",
      items: ["Customer-facing portals", "Apps that write to systems of record", "Complex business rules, pricing or planning", "Products with AI features inside", "High-scale or multi-tenant services"]
    },
    avoid: {
      title: "Don't vibe-build: buy, or engineer conventionally",
      items: ["Identity, authentication and cryptography", "Core financial ledgers and payroll", "Safety-critical or real-time control systems (OT, plant)", "High-performance, low-latency engines", "Regulated medical or safety decisions", "Anything with no accountable long-term owner"]
    }
  },

  rails: [
    {
      id: "security", name: "Security", color: "var(--rail-security)",
      summary: "Secure by design from the first brief to retirement, not a test at the end.",
      controls: [
        "Threat model in Design; security requirements live in the backlog",
        "Least privilege for people, services and AI agents alike",
        "Secrets in a vault; secret scanning on every commit",
        "SAST, dependency (SCA) and licence scanning in the pipeline",
        "SBOM and build provenance for every release",
        "Penetration testing and vulnerability SLAs scaled to the risk tier"
      ]
    },
    {
      id: "governance", name: "Governance & compliance", color: "var(--rail-governance)",
      summary: "Decisions are made at gates, by named people, and leave a trail.",
      controls: [
        "Seven decision gates with named approvers, scaled by tier",
        "AI app register covering every AI-built app, citizen-built included",
        "Decision records for build-vs-buy and architecture (ADRs)",
        "Regulatory mapping: privacy, sector rules, AI regulation",
        "IP and licence policy for AI-generated code; AI tool contract terms",
        "Audit trail of approvals, releases and AI sessions (Tier 2+)"
      ]
    },
    {
      id: "platform", name: "Platform & golden path", color: "var(--rail-platform)",
      summary: "A pre-approved starting point, so the AI generates code inside guardrails from the very first prompt.",
      controls: [
        "One approved starter template per app type: web app, API, integration, dashboard",
        "SSO, role-based access, logging and monitoring built in",
        "Pipeline with tests, scans, SBOM and approvals pre-wired",
        "Secrets vault and environment configuration ready to use",
        "AI rules files and harness settings included in the template",
        "Deviation needs an ADR and architect approval"
      ]
    },
    {
      id: "harness", name: "AI harness & tooling", color: "var(--rail-harness)",
      summary: "The controlled environment the AI works inside: what it knows, what it may touch, and what gets checked.",
      controls: [
        "Approved list of AI tools and models, reviewed quarterly",
        "Context pack and rules files versioned in the repo",
        "Permission allow-lists, sandboxes and scoped tokens for agents",
        "Approved connectors (MCP servers) only; no unvetted plugins",
        "Hooks that block secrets, destructive commands and production access",
        "Session logs and evals to measure assistant quality over time"
      ]
    },
    {
      id: "data", name: "Data", color: "var(--rail-data)",
      summary: "Know what data the product touches, who owns it, and what the AI tools see while building it.",
      controls: [
        "Classification with a named data owner for each data set",
        "Rules for what may and may not go into prompts",
        "One system of record per entity; master-data rules respected",
        "Masked or synthetic data in non-production environments",
        "Residency, retention, deletion and RPO/RTO requirements",
        "Data export rights confirmed with any vendor you leave or keep"
      ]
    },
    {
      id: "cost", name: "Cost & FinOps", color: "var(--rail-cost)",
      summary: "The TCO from Phase 02 is a living number, tracked until the product retires.",
      controls: [
        "3–5 year TCO for every option, discounted (NPV), with best and worst cases",
        "Staged funding: tranche 1 for MVP and pilot, scale funding at G5",
        "AI seat and token spend budgeted and monitored",
        "Savings counted only when a vendor contract actually ends",
        "Showback or chargeback to consuming departments",
        "Kill criterion agreed up front, so stopping is a decision, not a failure"
      ]
    },
    {
      id: "people", name: "People & change", color: "var(--rail-people)",
      summary: "Software is only owned if people understand it. AI shifts the skills needed; it doesn't remove them.",
      controls: [
        "Named owner, engineer of record and support roles for every product",
        "Engineer of record independent of the builder for Tier 3",
        "Training in AI-assisted engineering, review and security",
        "At least two people able to explain and fix every component",
        "Change management for users: champions, training, feedback",
        "Long-lived product teams rather than one-off project teams"
      ]
    }
  ],

  method: {
    intro: "Vibe coding — describing what you want and letting AI write the code — is excellent for exploring ideas. Production software needs the same speed with discipline added. Build Compass calls that governed vibe engineering: AI generates, people decide, and the pipeline verifies.",
    modes: [
      { name: "Explore mode", tone: "explore", when: "Prototypes, spikes, proofs of concept, UI mock-ups",
        rules: ["Vibe freely; speed matters more than structure", "Synthetic or public data only", "Sandboxed, never connected to production", "Code is disposable and labelled as prototype"] },
      { name: "Engineer mode", tone: "engineer", when: "Anything that real users or real data will depend on",
        rules: ["Spec and acceptance criteria first", "Start from the golden path template", "Small slices, every diff reviewed by a person", "Tests, scans and approvals in the pipeline"] }
    ],
    loop: [
      ["Frame", "Pick one slice. Restate its acceptance criteria. Load the context pack."],
      ["Plan", "Ask the AI for a plan first. A person approves the approach before any code is written."],
      ["Generate", "AI writes code and tests in small diffs, inside the sandboxed harness."],
      ["Review", "The engineer of record reads every diff and questions anything they don't understand."],
      ["Verify", "Pipeline runs tests and scans; someone runs the feature for real against the spec."],
      ["Commit & reflect", "Merge through the PR. Add whatever the AI got wrong to the rules files."]
    ],
    tiers: {
      cols: ["", "Tier 0 · Personal / team", "Tier 1 · Low", "Tier 2 · Business-critical", "Tier 3 · Customer-facing / regulated"],
      rows: [
        ["Examples", "A spreadsheet helper, a team tracker, a personal script", "Team utilities, internal dashboards, no sensitive data", "Core internal workflows, internal personal data, ERP/PLM integrations", "Customer portals, financial or health data, regulated processes"],
        ["Path", "Register it; no gates", "Fast lane", "Full framework", "Full framework"],
        ["Data allowed", "Public or the team's own non-sensitive data", "Internal", "Up to confidential", "Restricted, with controls"],
        ["Platform", "Approved low-code or sandbox", "Golden path", "Golden path", "Golden path; deviations need board approval"],
        ["Code review", "Self, with automated checks", "Engineer of record, sampled", "Every PR reviewed", "Every PR; two reviewers on sensitive areas; reviewer independent of the builder"],
        ["Testing", "Owner's own checks", "Automated tests on key paths", "Full test suite and UAT", "Full suite, UAT, performance, accessibility"],
        ["Security", "Approved tools only", "Pipeline scans", "Scans and threat model", "Scans, threat model and independent penetration test"],
        ["AI session logs", "No", "Optional", "Required", "Required and retained per policy"],
        ["Gate approvers", "None (register only)", "Product owner", "Product owner and security", "Product owner, security, architecture board and governance"]
      ]
    },
    triggers: [
      "Used by more than one team, or by more than about 20 people",
      "Touches confidential, personal or customer data",
      "Writes to a system of record (ERP, PLM, CRM, HR, finance)",
      "Exposed outside the organisation",
      "Someone would raise an incident if it broke",
      "Handles money, contracts or regulated decisions"
    ],
    fastlane: [
      ["One-page decision", "Problem, users, data class, buy alternatives checked: Phases 00–02 in one sitting."],
      ["Register it", "Add the app to the AI app register with owner and tier."],
      ["Start from the golden path", "Use the approved template; no custom infrastructure."],
      ["Build through the loop", "The Guided Build Loop and pipeline checks still apply; review can be sampled."],
      ["Product owner releases", "One approver. Review at 6 months, or immediately when a promotion trigger fires."]
    ]
  },

  principles: [
    ["Spec before prompt", "If you can't write the acceptance criteria, the AI can't build it correctly either."],
    ["People own architecture and accountability", "AI proposes; a named person decides and signs off."],
    ["Start from the golden path", "Begin every product from an approved template, never a blank repo."],
    ["Small slices, small diffs", "Anything too big to review properly is too big to merge."],
    ["Never merge what nobody understands", "Understanding is the price of owning code. Pay it at review time, not during an outage."],
    ["Tests come from the spec", "Write tests against what it should do, not what the generated code happens to do."],
    ["Security is a requirement, not a phase", "Threats, permissions and data rules are designed in, then checked automatically."],
    ["Least privilege for agents", "Sandboxes, scoped tokens and allow-lists. No production keys in an AI session."],
    ["No secrets or restricted data in prompts", "Classify first; only approved tools see internal data."],
    ["Verify every dependency", "Confirm each package exists, is maintained and is licensed for your use; keep an SBOM."],
    ["Everything goes through the pipeline", "No hand-deployed fixes, from people or from AI."],
    ["Budget for refactoring", "Reserve 15–20% of capacity to simplify and de-duplicate. AI-generated code sprawls if nobody prunes it."],
    ["Write it down", "Rules in files, decisions in ADRs, so the next session, and the next person, starts informed."],
    ["Design for the day the builder leaves", "Docs, runbooks and a second person who can support every component."]
  ],

  roles: [
    ["Sponsor", "Business owner who funds the product and owns the outcome."],
    ["Product owner", "Owns the problem, backlog, priorities and acceptance."],
    ["AI builder", "Builds the product with AI assistance, slice by slice."],
    ["Engineer of record", "Accountable technical owner who reviews and signs off AI-generated work."],
    ["Enterprise architect", "Owns the golden path and architecture standards; reviews designs and deviations."],
    ["Security", "Threat modelling, security testing, access and secrets."],
    ["Data owner / DPO", "Owns data classification, privacy assessments and data-sharing decisions."],
    ["Governance & legal", "Policy, compliance, IP, licensing and AI tool contract terms."],
    ["Platform / IT ops", "Environments, golden path platform, deployment, monitoring and operations."],
    ["Finance & procurement", "TCO, staged funding, chargeback, vendor contracts and exits."],
    ["Users", "The people whose work the product supports."]
  ],

  // One row per phase, one letter per role above (same order). R = Responsible, A = Accountable,
  // C = Consulted, I = Informed, "" = not involved.
  raci: {
    l0: ["C", "C", "C", "C", "R", "R", "R", "A", "R", "R", "I"],
    p0: ["A", "R", "I", "I", "C", "I", "I", "I", "I", "C", "C"],
    p1: ["A", "R", "C", "C", "C", "C", "R", "C", "C", "C", "C"],
    p2: ["A", "R", "C", "C", "C", "C", "C", "C", "C", "R", "I"],
    p3: ["I", "A", "C", "R", "C", "R", "C", "R", "C", "I", ""],
    p4: ["I", "A", "R", "R", "R", "C", "C", "I", "C", "", "C"],
    p5: ["I", "A", "R", "R", "C", "C", "I", "I", "C", "", "I"],
    p6: ["I", "A", "R", "R", "I", "R", "C", "C", "C", "", "R"],
    p7: ["A", "R", "C", "R", "C", "C", "I", "C", "R", "C", "C"],
    p8: ["I", "A", "C", "R", "I", "C", "C", "I", "R", "C", "C"],
    p9: ["A", "R", "C", "C", "C", "C", "C", "C", "C", "R", "C"]
  },

  // Knockouts are checked before scoring. "kills" is the route the knockout rules out.
  knockouts: [
    ["A regulation, auditor or customer contract requires a certified vendor product", "build"],
    ["It falls in the “don't vibe-build” list of the suitability filter", "build"],
    ["No one can be named as long-term owner and engineer of record", "build"],
    ["No vendor product meets a must-have security, residency or regulatory requirement", "buy"],
    ["No vendor product offers an acceptable data export or exit path", "buy"]
  ],

  scorecard: [
    ["Strategic differentiation", "Commodity, everyone does it the same way", "Core to how we compete or deliver"],
    ["Rate of change", "Stable, rarely changes", "Changes constantly with our business"],
    ["Fit of available products", "A vendor product fits ~90% out of the box", "Nothing on the market fits well"],
    ["AI-build suitability", "In the caution or avoid list", "Clearly in the good-fit list"],
    ["Time to value", "Needed within weeks", "Can wait a few months"],
    ["In-house skills & capacity", "No one to build or own it", "A capable team ready to own it"],
    ["Data sensitivity & control", "Fine for a vendor to hold the data", "Must stay under our control"],
    ["Integration depth", "Standard connectors are enough", "Deep custom integration with our systems"],
    ["Vendor risk & lock-in", "Stable vendor, easy exit", "High price, lock-in or sunset risk"],
    ["Regulatory & audit needs", "Vendor is already certified for them", "We need control a vendor can't give"],
    ["Support & operations readiness", "No one to run it day to day", "Ops and support ready to take it on"]
  ],

  metrics: [
    { name: "Delivery (DORA)", tone: "accent", items: [
      ["Deployment frequency", "How often a release reaches production."],
      ["Lead time for changes", "From commit to running in production."],
      ["Change failure rate", "Share of releases that cause an incident or rollback."],
      ["Time to restore", "How long it takes to recover from a failure."]
    ]},
    { name: "AI-assisted engineering", tone: "ai", items: [
      ["Review rejection rate", "Share of AI-generated PRs sent back. Very low can mean rubber-stamping."],
      ["Escaped defects", "Bugs found in production per release, AI-heavy areas tracked separately."],
      ["Rework and duplication", "Code changed again within 30 days; duplication trend from the pipeline."],
      ["Cost per slice", "People time plus AI tool and token spend per delivered slice."]
    ]},
    { name: "Value", tone: "go", items: [
      ["Realised savings", "Licence cost actually removed, counted only after the vendor contract ends."],
      ["Adoption", "Active users against the target in the business case."],
      ["Process time saved", "Cycle time of the business process before and after."],
      ["TCO vs plan", "Actual cumulative cost against the Phase 02 model."]
    ]},
    { name: "Governance", tone: "gate", items: [
      ["Register coverage", "Share of known AI-built apps listed in the register."],
      ["Tier compliance", "Share of Tier 2+ products with a current threat model, SBOM and named engineer of record."],
      ["Vulnerability age", "Mean age of open critical and high findings."],
      ["Bus factor", "Share of components with at least two people able to support them."]
    ]}
  ],

  standards: [
    ["ISO/IEC 42001", "AI management system: policy, roles, risk, lifecycle controls", "Layer 0, Phase 03, Governance rail"],
    ["NIST AI RMF", "AI risk functions: Govern, Map, Measure, Manage", "Layer 0, Phase 01 (tiering), Phase 06 (evals), Phase 08 (AI operations)"],
    ["NIST SSDF (SP 800-218)", "Secure software development practices", "Security rail, Phases 04–07"],
    ["OWASP ASVS", "Application security verification requirements by level", "Phase 04 (security requirements), Phase 06 (testing)"],
    ["OWASP Top 10 for LLM Applications", "Risks specific to AI features: prompt injection, data leakage and more", "Phase 04 (threat model), Phase 06 (AI evaluation), Phase 08 (AI operations)"],
    ["SLSA", "Software supply-chain integrity and build provenance", "Phase 05 (supply-chain controls), Phase 07 (signed artefacts)"],
    ["ISO/IEC 27001", "Information security management", "Security rail, Data rail, Layer 0"],
    ["EU AI Act", "Risk-based obligations for AI systems placed on the EU market", "Phase 01 (classification), Phase 03 (compliance plan)"],
    ["GDPR / India DPDP Act 2023", "Personal data protection", "Data rail, Phase 01, Phase 03 (privacy impact assessment)"],
    ["DORA metrics", "Software delivery performance measures", "Measure section, Phase 09"],
    ["ITIL 4", "IT service management practices", "Phase 08 (support, incidents, change)"]
  ],

  // Prior work this framework draws on. Build Compass is an independent synthesis, not endorsed by any of these.
  buildsOn: [
    ["Gartner Pace-Layered Application Strategy and “buy, build or blend”", "Build what differentiates, buy systems of record, and expect most answers to be a blend.", "Phase 02, scorecard, the Blend option"],
    ["Wardley Mapping (Simon Wardley)", "Components evolve from custom-built to commodity; build where you are still differentiating.", "Strategic differentiation criterion"],
    ["DORA metrics and the 2025 DORA AI Capabilities Model", "Delivery measures; a clear AI stance, small batches and quality internal platforms amplify AI-assisted development.", "Layer 0, golden path, slices, Measure section"],
    ["Microsoft Power Platform Center of Excellence", "Governing apps built by business users through inventory, environments and graduated controls.", "Tier 0, AI app register, promotion triggers"],
    ["Platform engineering and golden paths", "Paved, pre-approved starting points so teams are safe by default.", "Platform & golden path rail"],
    ["Stage-Gate (Robert G. Cooper)", "Go / kill decisions between stages, with funding tied to evidence.", "Decision gates, staged funding"],
    ["Spec-driven development (e.g. GitHub Spec Kit)", "Specifications as the primary input to AI coding agents.", "Phase 04, “spec before prompt”"],
    ["NIST AI RMF, ISO/IEC 42001, NIST SSDF, OWASP", "Recognised AI-risk, management-system and secure-development guidance.", "See Standards mapping"]
  ],

  glossary: [
    ["Acceptance criteria", "Testable statements of what a feature must do to count as done. The anchor for both AI generation and testing."],
    ["ADR (architecture decision record)", "A short note recording a significant technical decision, the options considered and why one was chosen."],
    ["AI app register", "The organisation's list of every AI-built app, with owner, tier, data and users, including citizen-built ones."],
    ["AI harness", "The controlled environment around an AI coding agent: its rules files, permissions, sandbox, connectors, hooks, logs and the checks its output must pass."],
    ["Build vs buy", "The decision between creating software in-house and acquiring it (licence, subscription or outsourcing)."],
    ["Bus factor", "How many people would have to leave before nobody can maintain a system. Aim for at least two."],
    ["Canary release", "Releasing a change to a small share of users first, watching for problems, then widening."],
    ["Chargeback / showback", "Billing (chargeback) or simply reporting (showback) a product's cost to the departments that use it."],
    ["Citizen developer", "Someone outside IT who builds apps, now often with AI. Managed through Tier 0, the register and promotion triggers."],
    ["Context pack", "The documents an AI needs to build well in your codebase: conventions, architecture, glossary, examples and rules."],
    ["COTS", "Commercial off-the-shelf software, bought and licensed rather than built."],
    ["Decision gate", "A go / no-go checkpoint between phases with explicit criteria and a named approver."],
    ["DORA metrics", "Four delivery measures: deployment frequency, lead time, change failure rate and time to restore."],
    ["Engineer of record", "The person accountable for code quality and sign-off, whoever or whatever wrote the code."],
    ["Evals", "Repeatable test sets that measure how well an AI feature performs: accuracy, safety, consistency."],
    ["Fast lane", "A compressed path for Tier 0–1 products: one-page decision, golden path, one approver."],
    ["Feature flag", "A switch that turns a feature on or off without redeploying, used for safe rollouts."],
    ["FinOps", "The practice of tracking and optimising cloud and tooling spend as an ongoing discipline."],
    ["Fitness function", "An automated check that the architecture still meets a rule, such as no module calling the database directly."],
    ["Golden path", "A pre-approved starter template and platform with security, logging and pipeline built in, so teams start safe by default."],
    ["Governed vibe engineering", "Build Compass's name for AI-assisted delivery with specs, small reviewed slices, automated checks and clear accountability."],
    ["Guardrails", "Controls that keep AI behaviour within safe limits, in the build process or in an AI feature itself."],
    ["Knockout criteria", "Hard requirements checked before scoring. An option that fails one is removed, however well it scores elsewhere."],
    ["LLMOps", "Running AI features in production: prompt and model versioning, evals, monitoring, drift and deprecation."],
    ["NPV (net present value)", "Future costs converted into today's money using a discount rate, so options that spend at different times can be compared fairly."],
    ["MCP (Model Context Protocol)", "An open standard for connecting AI assistants to tools and data sources. Each connector is an access decision."],
    ["Promotion trigger", "A condition, such as touching customer data, that moves an app from Tier 0 into the formal process."],
    ["Prompt injection", "An attack where malicious text in data tricks an AI into ignoring its instructions."],
    ["Proof of value", "A time-boxed pilot that tests a product against its business-case metrics before scale funding is released."],
    ["RACI", "Responsible, Accountable, Consulted, Informed: a grid of who does what."],
    ["Risk tier", "A rating of a product's potential impact (Tier 0–3) that decides how much rigour each phase needs."],
    ["RPO / RTO", "Recovery point objective (how much data you can afford to lose) and recovery time objective (how fast you must be back)."],
    ["SAST / DAST", "Static (code-level) and dynamic (running-app) application security testing."],
    ["SBOM", "Software bill of materials: the list of every component and dependency in a build."],
    ["SCA", "Software composition analysis: scanning third-party dependencies for known vulnerabilities and licences."],
    ["SLA / SLO", "Service-level agreement (a promise to users) and objective (an internal target, such as 99.5% uptime)."],
    ["SLSA", "Supply-chain Levels for Software Artifacts: a framework for proving how and where a build was produced."],
    ["Slice", "A thin, end-to-end piece of functionality small enough to build and review in about a day."],
    ["Slopsquatting", "Attackers registering package names that AI tools tend to invent, so a hallucinated install pulls malware."],
    ["Strangler pattern", "Replacing a system gradually, one module at a time behind a stable interface, until the old one can be switched off."],
    ["System of record", "The one authoritative source for a type of data, such as the ERP for orders. Other systems read or sync from it."],
    ["TCO (total cost of ownership)", "All costs over a product's life: build or licence, hosting, maintenance, support, people and exit."],
    ["Threat model", "A structured look at how a system could be attacked or misused, and what controls prevent it."],
    ["Tranche", "A stage of funding released only when the previous stage has proven its case."],
    ["UAT", "User acceptance testing: real users confirm the product does their job before release."],
    ["Vendor lock-in", "Dependence on a supplier that makes switching costly: proprietary data formats, contracts, integrations."],
    ["Vibe coding", "Building software by describing what you want in natural language and letting AI write the code."]
  ],

  adapt: [
    ["Set up Layer 0", "AI usage policy, approved tools, the app register and a first golden path template. Nothing else works without these."],
    ["Define your tiers", "Write what Tier 0 to Tier 3 mean in your organisation, with two real examples each, and agree the promotion triggers."],
    ["Map to your process", "Rename phases to match your existing SDLC or PMO vocabulary. Keep the gates."],
    ["Name gate approvers", "Who signs each gate at each tier? Write it down once."],
    ["Pilot on one product", "Choose a Tier 1 or 2 candidate, ideally a vendor tool coming up for renewal."],
    ["Measure and refine", "Track the metrics, and after the pilot's value review change whatever slowed you down without adding safety."]
  ]
};

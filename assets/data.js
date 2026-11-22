/*
 * Build Compass — framework content.
 * Everything the page shows lives in this one file, so you can fork the repo
 * and reshape the framework for your organisation without touching layout code.
 */
window.FRAMEWORK = {
  stages: [
    { id: "decide",  name: "Decide",  blurb: "Should we own this?",        phases: ["p0", "p1", "p2"] },
    { id: "prepare", name: "Prepare", blurb: "Set the rules, write the spec", phases: ["p3", "p4"] },
    { id: "deliver", name: "Deliver", blurb: "Build, prove, ship",          phases: ["p5", "p6", "p7"] },
    { id: "run",     name: "Run",     blurb: "Own it for its whole life",   phases: ["p8", "p9"] }
  ],

  phases: [
    {
      id: "p0", num: "00", stage: "decide",
      name: "Spark & Intake", label: "Product thinking",
      tagline: "Start from the problem, not the tool. Decide if it deserves anyone's time.",
      summary: "Every request — “we need a new tool”, “the vendor won't add this feature”, “can AI build us this?” — comes through one door and is written up the same way, so it can be compared fairly with everything else.",
      questions: [
        "What problem, for whom, and how do we know it is real?",
        "What happens if we do nothing for 12 months?",
        "Is this a product (used repeatedly by many people) or a one-off report, script or task?",
        "Is the pain the software itself, or the process around it?",
        "Does the solution need AI inside it, or only AI to build it? Usually it's the second."
      ],
      activities: [
        ["Problem brief", "One page: problem statement, who is affected, today's workaround, rough cost of the pain."],
        ["Classify the request", "New capability, replacing a vendor product, extending an existing product, or plain automation."],
        ["Light inventory", "Which tools we already buy, subscribe to or outsource touch this area?"],
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
        "Not a duplicate of an existing tool or initiative"
      ]
    },
    {
      id: "p1", num: "01", stage: "decide",
      name: "Discover & Analyse", label: "Analysis",
      tagline: "Understand the work, the users, the data and the market before picking a route.",
      summary: "Map how the work is done today, what it costs, what data it touches and what the market already offers. This is the evidence the build-vs-buy decision stands on.",
      questions: [
        "Who are the users, how many are there, and what do they actually do day to day?",
        "What data does it create, read or move, and how sensitive is it?",
        "Which systems must it connect to (ERP, PLM, CRM, identity, email)?",
        "What do we pay today in licences, seats, renewals and change requests, and when do contracts end?",
        "What do mature vendors offer, and how far is their roadmap from our need?"
      ],
      activities: [
        ["Process & user research", "Shadow users, map the current workflow, find where time and quality are lost."],
        ["Current-state inventory", "Contracts, renewal dates, notice periods, data-export rights, integration points."],
        ["Market scan", "Three to five credible vendors or SaaS options: demos, pricing, roadmap against must-haves."],
        ["Data & compliance classification", "Public, internal, confidential or restricted; data residency; regulations such as GDPR, India's DPDP Act and sector rules."],
        ["Requirements sketch", "Must, should and won't-have, plus non-functional needs: uptime, scale, audit, accessibility."]
      ],
      outputs: ["Current-state process map", "Vendor shortlist with pricing", "Data classification", "Requirements sketch"],
      ai: [
        "Use AI to speed up research — summarising interviews, comparing vendor documents, drafting process maps — but never paste confidential or personal data into a tool that isn't approved for it.",
        "Check whether vendors are adding AI to their own products. The gap you want to close may close on its own."
      ],
      gate: { id: "G1", name: "Problem validated" },
      checks: [
        "Users interviewed or observed; workflow mapped",
        "Current spend and contract dates known",
        "Data classified and regulatory obligations listed",
        "At least three options identified, including “do nothing”"
      ]
    },
    {
      id: "p2", num: "02", stage: "decide",
      name: "Build, Buy or Blend", label: "Build-vs-buy decision",
      tagline: "Compare every route on total cost, strategic value and risk, over years rather than months.",
      summary: "AI has made building much cheaper, but not free: the cost moves from writing code to owning it. This phase lays every option side by side and ends in a recorded decision.",
      options: [
        ["Buy", "Licensed off-the-shelf product. Mature and proven; you follow their roadmap."],
        ["Subscribe", "SaaS. Fastest start; cost grows with seats; the vendor controls changes."],
        ["Outsource", "A partner builds it. You pay for every change and depend on their team."],
        ["Extend", "Configure or low-code on a platform you already own (PLM, ERP, Microsoft 365)."],
        ["Build with AI", "Your team builds with AI assistance. You own the roadmap, the code and the support."],
        ["Blend", "Buy the commodity core, build the differentiating edge around it."]
      ],
      questions: [
        "Is this a differentiator for us, or commodity everyone does the same way? Buy commodity, build differentiation.",
        "How often will it need to change? Frequent change favours owning it.",
        "What does 3–5 year total cost look like for each option, including maintenance, hosting, support and our own people's time?",
        "Do we have, or can we grow, the people to own and support it for its whole life?",
        "What is the exit cost if a vendor triples prices, is acquired or sunsets the product? And if our build fails?"
      ],
      activities: [
        ["TCO model", "Cumulative 3–5 year cost for each option. Use the TCO calculator in the Decision toolkit."],
        ["Weighted scorecard", "Agree criteria and weights first, then score. Use the scorecard in the Decision toolkit."],
        ["Risk review", "Vendor lock-in, key-person risk, security and compliance exposure, delivery risk."],
        ["Business case", "Costs, benefits, payback period, success metrics and a kill criterion."]
      ],
      outputs: ["TCO model", "Scored comparison", "Business case with success metrics", "Decision record"],
      ai: [
        "Budget for owning, not just creating. AI can produce an app in weeks, but patching, upgrades and support commonly run at 15–25% of the build effort every year.",
        "Count AI tooling: assistant seats, agent and token usage, and model price changes.",
        "“We can build it in a weekend” is a prototype estimate. Add authentication, permissions, audit, integration, testing and support before comparing."
      ],
      gate: { id: "G2", name: "Investment decision", branch: "Buy, Subscribe or Outsource → hand over to procurement. Build or Blend → continue to Phase 03." },
      checks: [
        "TCO compared over at least three years for each viable option",
        "Weights agreed before options were scored",
        "Business case approved with success metrics and a kill criterion",
        "Decision and its reasons recorded (build, buy, blend or stop)"
      ]
    },
    {
      id: "p3", num: "03", stage: "prepare",
      name: "Govern & Guard", label: "Governance setup",
      tagline: "Set the rules of the road before the first prompt is written.",
      summary: "AI-assisted building moves fast; governance decides where it may go. Set it up once per product, scaled to that product's risk tier.",
      questions: [
        "Which risk tier is this product? It decides how much rigour every later phase needs.",
        "Which AI coding tools and models are approved, and for which data?",
        "Who owns the code, and is AI-generated code acceptable under our IP and licensing policies?",
        "Which regulations apply to the product, and to any AI features inside it (for example EU AI Act risk categories)?",
        "Who is the engineer of record who signs off what the AI produces?"
      ],
      activities: [
        ["Assign a risk tier", "Tier 1 internal and low-risk, Tier 2 business-critical, Tier 3 customer-facing or regulated. See the tier table in the methodology."],
        ["AI usage policy", "Approved tools, what data may go into prompts, prohibited actions, what gets logged."],
        ["Set up the harness", "Configure the coding agent: repository rules file, permission allow-lists, sandbox, approved connectors (MCP), hooks, secret blocking."],
        ["Roles & approvals", "Name the product owner, AI builders, engineer of record and security reviewer; agree the RACI."],
        ["Compliance plan", "Privacy impact assessment if personal data is involved, audit-trail and retention requirements."]
      ],
      outputs: ["Risk tier", "AI usage policy", "Harness configuration", "RACI", "Compliance plan"],
      ai: [
        "Agents never hold production credentials. Give them sandboxes, scoped tokens and read-only or synthetic data by default.",
        "For Tier 2 and above, keep AI session logs (prompts, diffs, approvals) so decisions can be audited later.",
        "Generated code can resemble copyleft sources. Run licence scanning, not just security scanning."
      ],
      gate: null,
      checks: [
        "Risk tier assigned and agreed with security",
        "Approved AI tools and data rules written down and shared",
        "Coding harness configured: rules file, permissions, secret scanning",
        "Engineer of record named"
      ]
    },
    {
      id: "p4", num: "04", stage: "prepare",
      name: "Design & Specify", label: "Design",
      tagline: "Write the spec the AI will build from. In AI-assisted delivery the spec is the real source code.",
      summary: "The quality of AI-generated software follows the quality of its instructions. Precise specs, examples and constraints beat clever prompts every time.",
      questions: [
        "Can each feature be described with acceptance criteria that a tester, or an AI, can check?",
        "What is the architecture, and which decisions must people make rather than the AI?",
        "What could go wrong? Who might misuse it, and what data could leak?",
        "Which non-functional needs matter: performance, availability, accessibility, audit?",
        "If we are replacing a system, how does its data move across?"
      ],
      activities: [
        ["Product spec (PRD)", "Goals, non-goals, user stories, acceptance criteria, success metrics."],
        ["Architecture & ADRs", "Stack, hosting, identity (SSO), data model, integrations. Each major decision written down with its reason."],
        ["Threat model", "A STRIDE-style pass over the data flows, turned into security requirements in the backlog."],
        ["Throwaway prototype", "Vibe-code a clickable UI to test the flows with real users quickly, then discard it."],
        ["Context pack for the AI", "Conventions, architecture summary, domain glossary, examples, do and don't rules, kept in the repo (rules files such as CLAUDE.md or AGENTS.md)."],
        ["Sliced backlog", "Thin vertical slices, each small enough to build and genuinely review in about a day."]
      ],
      outputs: ["Spec with acceptance criteria", "ADRs", "Threat model", "Validated prototype", "Context pack", "Sliced backlog"],
      ai: [
        "Prototype code is for learning, not shipping. Label prototype repos clearly so nothing drifts into production.",
        "Keep architecture decisions human. Let the AI propose options; a named person chooses and records why."
      ],
      gate: { id: "G3", name: "Ready to build" },
      checks: [
        "Spec has testable acceptance criteria for the first release",
        "Architecture and key decisions recorded as ADRs",
        "Threat model done; security requirements in the backlog",
        "Prototype validated with real users",
        "Context pack committed to the repository"
      ]
    },
    {
      id: "p5", num: "05", stage: "deliver",
      name: "Build with AI", label: "Development",
      tagline: "Build in small, verified slices, with AI as a fast pair and people as the accountable engineers.",
      summary: "Not waterfall, not plain Scrum: a tight loop of frame, plan, generate, review and verify, repeated for each slice. See Build methodology for the full loop.",
      questions: [
        "Is each slice small enough for a person to genuinely review every line the AI wrote?",
        "Are tests written from the spec, not reverse-engineered from the generated code?",
        "Could we fix this at 2 a.m. without the AI?"
      ],
      activities: [
        ["Run the Guided Build Loop", "Frame → Plan → Generate → Review → Verify → Commit & reflect, once per slice."],
        ["Branch and PR per slice", "Pull request for every slice; AI-authored changes labelled as such."],
        ["Automated checks on every commit", "Lint, type-check, unit tests, secret scan, dependency and licence scan."],
        ["Human review", "The engineer of record reviews every PR; mandatory line-by-line for auth, payments, data access and anything Tier 3."],
        ["Keep docs alive", "Update the context pack and ADRs as the system changes; generate developer docs from the code."],
        ["Weekly demo", "Show working software to the sponsor and users; re-prioritise the backlog."]
      ],
      outputs: ["Working increments", "Reviewed pull requests", "Green pipeline", "Up-to-date docs"],
      ai: [
        "Check every new dependency exists and is reputable. AI can invent package names that attackers then register (slopsquatting).",
        "Watch for confident wrongness: plausible code with silent logic errors, missing edge cases or quietly disabled checks.",
        "Never let the AI weaken tests or security checks to get a green build. Treat any change to tests as high-scrutiny.",
        "Long sessions drift and forget earlier rules. Start a fresh session per slice and keep rules in files, not in chat."
      ],
      gate: null,
      checks: [
        "Every slice for the release merged through a reviewed PR",
        "Pipeline green: tests, lint, secret, dependency and licence scans",
        "No unreviewed AI-generated code in security-sensitive areas",
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
        ["Functional testing", "Unit, integration and end-to-end tests against the acceptance criteria."],
        ["Security testing", "Static analysis (SAST), dependency scanning, dynamic testing (DAST) and a penetration test scaled to the tier."],
        ["Non-functional testing", "Performance and load, accessibility (WCAG), browsers and devices, backup and restore."],
        ["Migration rehearsal", "Move a copy of real data; reconcile counts and values."],
        ["User acceptance (UAT)", "Business users run realistic scenarios and sign off."],
        ["AI feature evaluation", "Only if the product contains AI: eval sets, accuracy and hallucination rates, prompt-injection and jailbreak tests, bias checks."]
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
      name: "Deploy & Release", label: "Deployment to production",
      tagline: "Ship repeatably, reversibly and visibly.",
      summary: "Production is reached only through the pipeline. People are trained, support is ready, and if a vendor product is being replaced, the exit is timed to the cut-over.",
      questions: [
        "Can we deploy and roll back with one action and no manual steps?",
        "How do users switch from the old tool: big bang, phased, or a parallel run?",
        "Who needs to know, be trained, or approve the change?"
      ],
      activities: [
        ["Environments as code", "Dev → test/staging → production. Real production data never sits unmasked in lower environments."],
        ["CI/CD with gates", "Build, test, scan, approve, deploy; artefacts versioned and signed."],
        ["Production hardening", "SSO and role-based access, secrets vault, backups, logging, monitoring, rate limits."],
        ["Release strategy", "Feature flags, pilot group, canary or phased rollout; parallel run with the old system where risk is high."],
        ["Change management", "Release notes, training, champions, support readiness, change-board approval where required."],
        ["Vendor exit", "If replacing a product: data export, contract notice and licence ramp-down timed to the cut-over."]
      ],
      outputs: ["Production deployment", "Release notes", "Trained users", "Runbook", "Vendor exit plan"],
      ai: [
        "AI can draft infrastructure-as-code and pipelines; people approve every change to production config, access rights and networking.",
        "Deployments run from the pipeline, never from someone's AI session. Agent tokens stay out of production."
      ],
      gate: { id: "G5", name: "Production acceptance" },
      checks: [
        "Deployed through the pipeline, with no manual production changes",
        "Monitoring, alerts and backups verified working",
        "Support team trained and runbook handed over",
        "Pilot users completed real work successfully",
        "Old-system cut-over or decommission scheduled"
      ]
    },
    {
      id: "p8", num: "08", stage: "run",
      name: "Operate & Support", label: "Support",
      tagline: "Run it like a product: an owner, a support model and a budget.",
      summary: "Go-live is the day the real cost begins. Owning software means owning its incidents, upgrades and questions, for as long as it lives.",
      questions: [
        "Who answers when it breaks, during which hours, and how fast?",
        "Can someone other than the original builder understand and fix it?",
        "Are we watching cost (hosting, AI usage) as closely as uptime?"
      ],
      activities: [
        ["Support model", "L1 help desk and FAQs, L2 product team, L3 engineer of record; SLAs set by tier."],
        ["Observability", "Uptime, errors, latency and usage, with service-level objectives and alerts."],
        ["Incident management", "Severity levels, on-call rota, blameless post-mortems."],
        ["Maintenance cadence", "Monthly security patches, dependency and framework upgrades, model version updates."],
        ["FinOps", "Hosting, licence and AI token spend tracked against the business case."],
        ["Knowledge continuity", "Runbooks, architecture docs, and at least two people able to support each component."]
      ],
      outputs: ["SLA and support process", "Dashboards", "Incident log", "Maintenance calendar", "Monthly cost report"],
      ai: [
        "AI can triage tickets, explain stack traces and propose fixes. Fixes still go through the same review and pipeline as any other change.",
        "Bus-factor risk is higher with AI-built code. If no person understands a module, schedule a walkthrough or refactor before it fails."
      ],
      gate: null,
      checks: [
        "SLAs defined and measured",
        "Patching and upgrades on a calendar",
        "Two or more people can support each component",
        "Cost tracked monthly against the business case"
      ]
    },
    {
      id: "p9", num: "09", stage: "run",
      name: "Measure & Evolve", label: "Review & evolve",
      tagline: "Check the investment paid off, then decide: grow, maintain, re-platform or retire.",
      summary: "The business case made promises. This phase checks them, and re-asks the build-vs-buy question every year, because the market and the AI tools both move quickly.",
      questions: [
        "Did we hit the success metrics in the business case?",
        "Is total cost tracking to the model, or drifting?",
        "Has the market changed? Is there now a product we should buy instead?"
      ],
      activities: [
        ["Benefits review", "At 3, 6 and 12 months, against the business case metrics."],
        ["Feedback loop", "Surveys, usage analytics and feature requests feeding the backlog."],
        ["Yearly portfolio review", "Re-run the build-vs-buy scorecard; the vendor landscape changes fast."],
        ["Tech health review", "Technical debt, security posture, dependency age, AI-generated hotspots nobody understands."],
        ["Sunset criteria", "When to retire it, and how to exit cleanly: data, users, contracts."]
      ],
      outputs: ["Benefits realisation report", "Updated roadmap", "Continue / evolve / retire decision"],
      ai: [
        "Re-evaluate the AI tools themselves. Models and assistants change every few months; refresh approved lists, rules files and harness settings."
      ],
      gate: { id: "G6", name: "Value review" },
      checks: [
        "Success metrics measured and reported to the sponsor",
        "Actual TCO compared with the business case",
        "Decision recorded: invest more, maintain, re-platform or retire",
        "Lessons fed back into this framework"
      ]
    }
  ],

  rails: [
    {
      id: "security", name: "Security", color: "var(--rail-security)",
      summary: "Secure by design from the first brief to retirement, not a test at the end.",
      controls: [
        "Threat model in Design; security requirements live in the backlog",
        "Least privilege for people, services and AI agents alike",
        "Secrets in a vault; secret scanning on every commit",
        "SAST, dependency (SCA) and licence scanning in the pipeline",
        "Penetration testing scaled to the risk tier",
        "Patch cadence and vulnerability SLAs in Operate"
      ]
    },
    {
      id: "governance", name: "Governance & compliance", color: "var(--rail-governance)",
      summary: "Decisions are made at gates, by named people, and leave a trail.",
      controls: [
        "Seven decision gates with named approvers",
        "Decision records for build-vs-buy and architecture (ADRs)",
        "Regulatory mapping: privacy, sector rules, AI regulation",
        "IP ownership and licence policy for AI-generated code",
        "Audit trail of approvals, releases and AI sessions (Tier 2+)",
        "Rigour scaled by risk tier, so small tools stay light"
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
      summary: "Know what data the product touches, and what data the AI tools see while building it.",
      controls: [
        "Classification: public, internal, confidential, restricted",
        "Rules for what may and may not go into prompts",
        "Masked or synthetic data in non-production environments",
        "Residency, retention and deletion requirements",
        "Migration plan with reconciliation when replacing a system",
        "Data export rights confirmed with any vendor you leave or keep"
      ]
    },
    {
      id: "cost", name: "Cost & FinOps", color: "var(--rail-cost)",
      summary: "The TCO from Phase 02 is a living number, tracked until the product retires.",
      controls: [
        "3–5 year TCO for every option, not just year one",
        "AI seat and token spend budgeted and monitored",
        "Hosting cost alerts and monthly reviews",
        "Licence ramp-down planned against the cut-over date",
        "Actual-versus-plan review at each value check",
        "Kill criterion agreed up front, so stopping is a decision, not a failure"
      ]
    },
    {
      id: "people", name: "People & change", color: "var(--rail-people)",
      summary: "Software is only owned if people understand it. AI shifts the skills needed; it doesn't remove them.",
      controls: [
        "Named owner, engineer of record and support roles for every product",
        "Training in AI-assisted engineering, review and security",
        "At least two people able to explain and fix every component",
        "Change management for users: champions, training, feedback",
        "Clear career value for reviewers, not just builders",
        "Psychological safety to stop, re-plan or retire"
      ]
    }
  ],

  method: {
    intro: "Vibe coding — describing what you want and letting AI write the code — is excellent for exploring ideas. Production software needs the same speed with discipline added. Build Compass calls that governed vibe engineering: AI generates, people decide, and the pipeline verifies.",
    modes: [
      { name: "Explore mode", tone: "explore", when: "Prototypes, spikes, proofs of concept, UI mock-ups",
        rules: ["Vibe freely; speed matters more than structure", "Synthetic or public data only", "Sandboxed, never connected to production", "Code is disposable and labelled as prototype"] },
      { name: "Engineer mode", tone: "engineer", when: "Anything that real users or real data will depend on",
        rules: ["Spec and acceptance criteria first", "Small slices, every diff reviewed by a person", "Tests, scans and approvals in the pipeline", "Code is owned, documented and supported"] }
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
      cols: ["", "Tier 1 · Low", "Tier 2 · Business-critical", "Tier 3 · Customer-facing / regulated"],
      rows: [
        ["Examples", "Team utilities, internal dashboards, no sensitive data", "Core internal workflows, internal personal data, integrations with ERP/PLM", "Customer portals, financial or health data, regulated processes"],
        ["Code review", "Engineer of record, sampled", "Every PR reviewed", "Every PR reviewed; two reviewers for sensitive areas"],
        ["Testing", "Automated tests on key paths", "Full test suite and UAT", "Full suite, UAT, performance and accessibility"],
        ["Security", "Pipeline scans", "Scans and threat model", "Scans, threat model and independent penetration test"],
        ["AI session logs", "Optional", "Required", "Required and retained per policy"],
        ["Gate approvers", "Product owner", "Product owner and security", "Product owner, security and governance"]
      ]
    }
  },

  principles: [
    ["Spec before prompt", "If you can't write the acceptance criteria, the AI can't build it correctly either."],
    ["People own architecture and accountability", "AI proposes; a named person decides and signs off."],
    ["Small slices, small diffs", "Anything too big to review properly is too big to merge."],
    ["Never merge what nobody understands", "Understanding is the price of owning code. Pay it at review time, not during an outage."],
    ["Tests come from the spec", "Write tests against what it should do, not what the generated code happens to do."],
    ["Security is a requirement, not a phase", "Threats, permissions and data rules are designed in, then checked automatically."],
    ["Least privilege for agents", "Sandboxes, scoped tokens and allow-lists. No production keys in an AI session."],
    ["No secrets or restricted data in prompts", "Classify first; only approved tools see internal data."],
    ["Verify every dependency", "Confirm each package exists, is maintained and is licensed for your use."],
    ["Everything goes through the pipeline", "No hand-deployed fixes, from people or from AI."],
    ["Write it down", "Rules in files, decisions in ADRs, so the next session, and the next person, starts informed."],
    ["Design for the day the builder leaves", "Docs, runbooks and a second person who can support every component."]
  ],

  roles: [
    ["Sponsor", "Business owner who funds the product and owns the outcome."],
    ["Product owner", "Owns the problem, backlog, priorities and acceptance."],
    ["AI builder", "Builds the product with AI assistance, slice by slice."],
    ["Engineer of record", "Accountable technical owner who reviews and signs off AI-generated work."],
    ["Security", "Threat modelling, security testing, access and secrets."],
    ["Governance & legal", "Policy, compliance, privacy, IP and licensing."],
    ["Platform / IT ops", "Environments, deployment, monitoring and operations."],
    ["Finance & procurement", "TCO, budgets, vendor contracts and exits."],
    ["Users", "The people whose work the product supports."]
  ],

  // One row per phase, one letter per role above (same order). R = Responsible, A = Accountable,
  // C = Consulted, I = Informed, "" = not involved.
  raci: {
    p0: ["A", "R", "I", "I", "I", "I", "I", "C", "C"],
    p1: ["A", "R", "C", "C", "C", "C", "C", "C", "C"],
    p2: ["A", "R", "C", "C", "C", "C", "C", "R", "I"],
    p3: ["I", "A", "C", "R", "R", "R", "C", "I", ""],
    p4: ["I", "A", "R", "R", "C", "I", "C", "", "C"],
    p5: ["I", "A", "R", "R", "C", "I", "C", "", "I"],
    p6: ["I", "A", "R", "R", "R", "C", "C", "", "R"],
    p7: ["I", "A", "C", "R", "C", "C", "R", "C", "I"],
    p8: ["I", "A", "C", "R", "C", "I", "R", "C", "C"],
    p9: ["A", "R", "C", "C", "C", "C", "C", "R", "C"]
  },

  scorecard: [
    ["Strategic differentiation", "Commodity, everyone does it the same way", "Core to how we compete or deliver"],
    ["Rate of change", "Stable, rarely changes", "Changes constantly with our business"],
    ["Fit of available products", "A vendor product fits ~90% out of the box", "Nothing on the market fits well"],
    ["3–5 year total cost", "Buying is clearly cheaper", "Building is clearly cheaper"],
    ["Time to value", "Needed within weeks", "Can wait a few months"],
    ["In-house skills & capacity", "No one to build or own it", "A capable team ready to own it"],
    ["Data sensitivity & control", "Fine for a vendor to hold the data", "Must stay under our control"],
    ["Integration depth", "Standard connectors are enough", "Deep custom integration with our systems"],
    ["Vendor risk & lock-in", "Stable vendor, easy exit", "High price, lock-in or sunset risk"],
    ["Regulatory & audit needs", "Vendor is already certified for them", "We need control a vendor can't give"],
    ["Support & operations readiness", "No one to run it day to day", "Ops and support ready to take it on"]
  ],

  glossary: [
    ["Acceptance criteria", "Testable statements of what a feature must do to count as done. The anchor for both AI generation and testing."],
    ["ADR (architecture decision record)", "A short note recording a significant technical decision, the options considered and why one was chosen."],
    ["AI harness", "The controlled environment around an AI coding agent: its rules files, permissions, sandbox, connectors, hooks, logs and the checks its output must pass."],
    ["Build vs buy", "The decision between creating software in-house and acquiring it (licence, subscription or outsourcing)."],
    ["Bus factor", "How many people would have to leave before nobody can maintain a system. Aim for at least two."],
    ["Canary release", "Releasing a change to a small share of users first, watching for problems, then widening."],
    ["Context pack", "The documents an AI needs to build well in your codebase: conventions, architecture, glossary, examples and rules."],
    ["COTS", "Commercial off-the-shelf software, bought and licensed rather than built."],
    ["Decision gate", "A go / no-go checkpoint between phases with explicit criteria and a named approver."],
    ["Engineer of record", "The person accountable for code quality and sign-off, whoever or whatever wrote the code."],
    ["Evals", "Repeatable test sets that measure how well an AI feature performs: accuracy, safety, consistency."],
    ["Feature flag", "A switch that turns a feature on or off without redeploying, used for safe rollouts."],
    ["FinOps", "The practice of tracking and optimising cloud and tooling spend as an ongoing discipline."],
    ["Governed vibe engineering", "Build Compass's name for AI-assisted delivery with specs, small reviewed slices, automated checks and clear accountability."],
    ["Guardrails", "Controls that keep AI behaviour within safe limits, in the build process or in an AI feature itself."],
    ["MCP (Model Context Protocol)", "An open standard for connecting AI assistants to tools and data sources. Each connector is an access decision."],
    ["Prompt injection", "An attack where malicious text in data tricks an AI into ignoring its instructions."],
    ["RACI", "Responsible, Accountable, Consulted, Informed: a grid of who does what."],
    ["Risk tier", "A rating of a product's potential impact that decides how much rigour each phase needs."],
    ["SAST / DAST", "Static (code-level) and dynamic (running-app) application security testing."],
    ["SCA", "Software composition analysis: scanning third-party dependencies for known vulnerabilities and licences."],
    ["SLA / SLO", "Service-level agreement (a promise to users) and objective (an internal target, such as 99.5% uptime)."],
    ["Slice", "A thin, end-to-end piece of functionality small enough to build and review in about a day."],
    ["Slopsquatting", "Attackers registering package names that AI tools tend to invent, so a hallucinated install pulls malware."],
    ["TCO (total cost of ownership)", "All costs over a product's life: build or licence, hosting, maintenance, support, people and exit."],
    ["Threat model", "A structured look at how a system could be attacked or misused, and what controls prevent it."],
    ["UAT", "User acceptance testing: real users confirm the product does their job before release."],
    ["Vendor lock-in", "Dependence on a supplier that makes switching costly: proprietary data formats, contracts, integrations."],
    ["Vibe coding", "Building software by describing what you want in natural language and letting AI write the code."]
  ],

  adapt: [
    ["Pick your tiers", "Decide what Tier 1, 2 and 3 mean in your organisation, with two real examples of each."],
    ["Map to your process", "Rename phases to match your existing SDLC or PMO vocabulary. Keep the gates."],
    ["Name gate approvers", "Who signs each gate at each tier? Write it down once."],
    ["Write the AI usage policy", "Approved tools, data rules, logging and the harness baseline."],
    ["Pilot on one product", "Choose a Tier 1 or 2 candidate, ideally a vendor tool coming up for renewal."],
    ["Review and refine", "After the pilot's value review, change the framework where it slowed you down without adding safety."]
  ]
};

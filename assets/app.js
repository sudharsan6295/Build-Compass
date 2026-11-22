/* Build Compass — renders the framework from assets/data.js. No dependencies. */
(function () {
  "use strict";

  var F = window.FRAMEWORK;
  if (!F) return;

  var STORE_KEY = "bc-checks-v1";
  var ALL = [F.foundation].concat(F.phases);
  var phaseById = {};
  ALL.forEach(function (p) { phaseById[p.id] = p; });
  var stageById = {};
  F.stages.forEach(function (s) { stageById[s.id] = s; });

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function storeGet(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function storeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable: fine */ }
  }
  var checks = storeGet(STORE_KEY, {});

  /* ---------- framework map ---------- */
  function renderMap() {
    var L = F.foundation;
    var html = '<a class="map-layer0" href="#' + L.id + '"><span class="map-layer0-tag">Layer 0 · set up once</span>' +
               '<span class="map-layer0-name">' + esc(L.name) + '</span>' +
               '<span class="map-layer0-items">AI policy · approved tools · tiers · app register · golden path · harness baseline · funding model</span></a>';
    html += '<div class="map">';
    F.stages.forEach(function (stage, si) {
      html += '<div class="map-stage stage-' + stage.id + '">';
      html += '<div class="map-stage-head"><span class="map-stage-num">' + (stage.point ? '<b class="compass-pt">' + stage.point + '</b> ' : '') + 'Stage ' + (si + 1) + '</span>' +
              '<span class="map-stage-name">' + esc(stage.name) + '</span>' +
              '<span class="map-stage-blurb">' + esc(stage.blurb) + '</span></div>';
      html += '<ol class="map-nodes">';
      stage.phases.forEach(function (pid) {
        var p = phaseById[pid];
        html += '<li class="map-item">';
        html += '<a class="map-node" href="#' + p.id + '"><span class="map-node-num">' + p.num + '</span>' +
                '<span class="map-node-text"><span class="map-node-name">' + esc(p.name) + '</span>' +
                '<span class="map-node-label">' + esc(p.label) + '</span></span></a>';
        if (p.gate) {
          html += '<div class="map-gate"><span class="diamond" aria-hidden="true"></span>' +
                  '<span><b>' + p.gate.id + '</b> ' + esc(p.gate.name) + '</span></div>';
          if (p.gate.branch) {
            html += '<div class="map-branch"><span aria-hidden="true">↳</span> Buy / Subscribe / Outsource → <a href="#buy-track">buy track</a></div>';
          }
        }
        html += '</li>';
      });
      html += '</ol></div>';
    });
    html += '<div class="map-loop"><span class="map-loop-icon" aria-hidden="true">↻</span><span><b>Release loop.</b> Phases 04–07 repeat for every release; Phase 09 feeds the next release back into 04. Tier 0–1 products take the <a href="#fast-lane">fast lane</a>.</span></div>';
    html += '</div>';

    html += '<div class="map-rails" aria-label="Always-on rails">';
    html += '<p class="map-rails-title">Always on, across every phase</p>';
    F.rails.forEach(function (r) {
      html += '<a class="map-rail" href="#rail-' + r.id + '" style="--rail:' + r.color + '"><span>' + esc(r.name) + '</span></a>';
    });
    html += '</div>';
    $("map-root").innerHTML = html;
  }

  /* ---------- phases ---------- */
  function list(items, cls) {
    return '<ul class="' + cls + '">' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }

  function phaseLeads(pid) {
    var row = F.raci[pid];
    if (!row) return "";
    var a = [], r = [];
    row.forEach(function (letter, i) {
      if (letter === "A") a.push(F.roles[i][0]);
      if (letter === "R") r.push(F.roles[i][0]);
    });
    return '<p class="leads"><span class="raci-pill raci-A">A</span> ' + esc(a.join(", ")) +
           ' <span class="raci-pill raci-R">R</span> ' + esc(r.join(", ")) + "</p>";
  }

  function suitabilityBlock() {
    var s = F.suitability;
    return '<div class="block block-wide"><h4>AI-build suitability filter</h4><div class="suit">' +
      ["good", "caution", "avoid"].map(function (k) {
        return '<div class="suit-col suit-' + k + '"><p class="suit-title">' + esc(s[k].title) + "</p>" + list(s[k].items, "suit-list") + "</div>";
      }).join("") + "</div></div>";
  }

  function renderPhases() {
    var html = "";
    ALL.forEach(function (p) {
      var stage = p.stage === "org" ? { name: "Layer 0" } : stageById[p.stage];
      if (p.stage === "org") html += '<p class="phase-group">Layer 0 · set up once per organisation</p>';
      if (p.id === "p0") html += '<p class="phase-group">Product phases · run for every product</p>';
      html += '<details class="phase stage-' + p.stage + '" id="' + p.id + '">';
      html += '<summary class="phase-head">' +
                '<span class="phase-num">' + p.num + '</span>' +
                '<span class="phase-title">' +
                  '<span class="phase-meta"><span class="chip chip-stage">' + esc(stage.name) + '</span>' +
                  '<span class="phase-label">' + esc(p.label) + '</span></span>' +
                  '<span class="phase-name">' + esc(p.name) + '</span>' +
                  '<span class="phase-tagline">' + esc(p.tagline) + '</span>' +
                '</span>' +
                '<span class="phase-side">' +
                  (p.gate ? '<span class="chip chip-gate"><span class="diamond sm" aria-hidden="true"></span>' + p.gate.id + " · " + esc(p.gate.name) + "</span>"
                          : '<span class="chip chip-check">Exit checks</span>') +
                  '<span class="progress" data-progress="' + p.id + '"></span>' +
                '</span>' +
                '<span class="chev" aria-hidden="true"></span>' +
              "</summary>";

      html += '<div class="phase-body">';
      html += '<p class="phase-summary">' + esc(p.summary) + "</p>";

      if (p.options) {
        html += '<div class="block block-wide"><h4>The options on the table</h4><div class="options">';
        p.options.forEach(function (o) {
          html += '<div class="option"><b>' + esc(o[0]) + "</b><span>" + esc(o[1]) + "</span></div>";
        });
        html += '</div><p class="tool-links"><a href="#tco">Open the TCO calculator</a> · <a href="#scorecard">Open the scorecard</a></p></div>';
      }
      if (p.suitability) html += suitabilityBlock();

      html += '<div class="phase-grid">';
      html += '<div class="col">';
      html += '<div class="block"><h4>Key questions</h4>' + list(p.questions, "qs") + "</div>";
      html += '<div class="block"><h4>Activities</h4><ul class="acts">' + p.activities.map(function (a) {
        return "<li><b>" + esc(a[0]) + "</b><span>" + esc(a[1]) + "</span></li>";
      }).join("") + "</ul></div>";
      html += "</div>";

      html += '<div class="col">';
      html += '<div class="block"><h4>Outputs</h4><ul class="outputs">' + p.outputs.map(function (o) {
        return "<li>" + esc(o) + "</li>";
      }).join("") + "</ul></div>";
      html += '<div class="block block-ai"><h4><span class="ai-dot" aria-hidden="true"></span>AI &amp; vibe-coding watch-outs</h4>' + list(p.ai, "ai-list") + "</div>";

      var gateTitle = p.gate ? "Gate " + p.gate.id + ": " + esc(p.gate.name) : "Exit checks";
      html += '<div class="block block-gate"><h4>' + gateTitle + "</h4><ul class=\"checks\">";
      p.checks.forEach(function (c, i) {
        var cid = p.id + "-c" + i;
        html += '<li><label><input type="checkbox" data-check="' + cid + '" data-phase="' + p.id + '"' + (checks[cid] ? " checked" : "") + "><span>" + esc(c) + "</span></label></li>";
      });
      html += "</ul>";
      if (p.gate && p.gate.branch) html += '<p class="branch-note">' + esc(p.gate.branch) + "</p>";
      html += "</div>";

      html += '<div class="block block-roles"><h4>Who leads</h4>' + phaseLeads(p.id) + '<a class="small-link" href="#raci">Full RACI</a></div>';
      html += "</div></div></div></details>";
    });
    $("phases-root").innerHTML = html;
    updateProgress();
  }

  function updateProgress() {
    var total = 0, done = 0;
    ALL.forEach(function (p) {
      var d = 0;
      p.checks.forEach(function (_, i) { if (checks[p.id + "-c" + i]) d++; });
      total += p.checks.length; done += d;
      var el = document.querySelector('[data-progress="' + p.id + '"]');
      if (el) {
        el.textContent = d + "/" + p.checks.length;
        el.classList.toggle("is-done", d === p.checks.length);
        el.setAttribute("aria-label", d + " of " + p.checks.length + " checks done");
      }
    });
    var o = $("overall-progress");
    if (o) o.textContent = done + " of " + total + " checks ticked";
  }

  /* ---------- methodology ---------- */
  function loopSvg(steps) {
    var cx = 180, cy = 180, R = 122, r = 42, n = steps.length;
    var out = '<svg class="loop" viewBox="0 0 360 360" role="img" aria-label="The Guided Build Loop: ' +
              esc(steps.map(function (s) { return s[0]; }).join(", then ")) + ', then back to the start">';
    out += '<defs><marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="loop-arrowhead"/></marker></defs>';
    var gap = Math.asin((r + 8) / R);
    for (var i = 0; i < n; i++) {
      var a1 = -Math.PI / 2 + (i * 2 * Math.PI) / n + gap;
      var a2 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n - gap;
      out += '<path class="loop-arc" marker-end="url(#arrow)" d="M' + (cx + R * Math.cos(a1)).toFixed(1) + "," + (cy + R * Math.sin(a1)).toFixed(1) +
             " A" + R + "," + R + " 0 0 1 " + (cx + R * Math.cos(a2)).toFixed(1) + "," + (cy + R * Math.sin(a2)).toFixed(1) + '"/>';
    }
    steps.forEach(function (s, i) {
      var a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      var x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      var words = s[0].split(" ");
      var lines = words.length > 1 ? [words[0] + (words[1] === "&" ? " &" : ""), words.slice(words[1] === "&" ? 2 : 1).join(" ")] : [s[0]];
      out += '<g class="loop-node"><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r + '"/>';
      out += '<text x="' + x.toFixed(1) + '" y="' + (y - (lines.length > 1 ? 14 : 8)).toFixed(1) + '" class="loop-num">' + (i + 1) + "</text>";
      lines.forEach(function (ln, li) {
        out += '<text x="' + x.toFixed(1) + '" y="' + (y + 6 + li * 13 - (lines.length > 1 ? 4 : 0)).toFixed(1) + '" class="loop-label">' + esc(ln) + "</text>";
      });
      out += "</g>";
    });
    out += '<text x="180" y="174" class="loop-center">Per slice</text><text x="180" y="192" class="loop-center-sub">~1 day</text>';
    return out + "</svg>";
  }

  function renderMethod() {
    var m = F.method;
    var html = '<p class="section-intro">' + esc(m.intro) + "</p>";

    html += '<h3 class="sub">Two speeds</h3><div class="modes">';
    m.modes.forEach(function (mode) {
      html += '<div class="mode mode-' + mode.tone + '"><p class="mode-name">' + esc(mode.name) + '</p><p class="mode-when">' + esc(mode.when) + "</p>" + list(mode.rules, "mode-rules") + "</div>";
    });
    html += '</div><p class="fineprint">Moving code from explore mode to engineer mode means rebuilding it through the loop below, not promoting the prototype.</p>';

    html += '<h3 class="sub">The Guided Build Loop</h3><div class="loop-wrap">' + loopSvg(m.loop) + '<ol class="loop-steps">';
    m.loop.forEach(function (s) { html += "<li><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></li>"; });
    html += "</ol></div>";

    html += '<h3 class="sub" id="tiers">Rigour scales with risk tier</h3><div class="table-wrap"><table class="tiers"><thead><tr>';
    m.tiers.cols.forEach(function (c, i) { html += '<th scope="col"' + (i ? ' class="tier-' + i + '"' : "") + ">" + esc(c) + "</th>"; });
    html += "</tr></thead><tbody>";
    m.tiers.rows.forEach(function (row) {
      html += "<tr>" + row.map(function (cell, i) { return i ? "<td>" + esc(cell) + "</td>" : '<th scope="row">' + esc(cell) + "</th>"; }).join("") + "</tr>";
    });
    html += "</tbody></table></div>";

    html += '<div class="method-pair">';
    html += '<div class="mini-panel"><h3 class="sub" id="triggers">Promotion triggers</h3><p class="fineprint">Any one of these moves a Tier 0 app into the formal process. Business teams can build freely until a trigger fires.</p>' + list(m.triggers, "trigger-list") + "</div>";
    html += '<div class="mini-panel"><h3 class="sub" id="fast-lane">Fast lane · Tier 0–1</h3><ol class="lane">';
    m.fastlane.forEach(function (s) { html += "<li><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></li>"; });
    html += "</ol></div></div>";
    $("method-root").innerHTML = html;
  }

  /* ---------- principles, rails, adapt ---------- */
  function renderPrinciples() {
    $("principles-root").innerHTML = F.principles.map(function (p) {
      return "<li><b>" + esc(p[0]) + "</b><span>" + esc(p[1]) + "</span></li>";
    }).join("");
  }

  function renderRails() {
    $("rails-root").innerHTML = F.rails.map(function (r) {
      return '<details class="rail" id="rail-' + r.id + '" style="--rail:' + r.color + '">' +
             '<summary><span class="rail-bar" aria-hidden="true"></span><span class="rail-text"><span class="rail-name">' + esc(r.name) + '</span>' +
             '<span class="rail-summary">' + esc(r.summary) + '</span></span><span class="chev" aria-hidden="true"></span></summary>' +
             list(r.controls, "rail-controls") + "</details>";
    }).join("");
  }

  function renderAdapt() {
    $("adapt-root").innerHTML = F.adapt.map(function (a) {
      return "<li><b>" + esc(a[0]) + "</b><span>" + esc(a[1]) + "</span></li>";
    }).join("");
  }

  /* ---------- toolkit: TCO calculator ---------- */
  var TCO_FIELDS = {
    buy: [
      ["users", "Users / seats", 50, 1],
      ["seat", "Price per seat per year", 600, 10],
      ["impl", "One-time implementation", 15000, 1000],
      ["rise", "Yearly price increase (%)", 7, 1],
      ["changes", "Change requests & customisation per year", 8000, 1000],
      ["admin", "Internal admin & integration staff per year", 6000, 1000],
      ["exit", "Exit / migration cost (end of horizon)", 15000, 1000]
    ],
    build: [
      ["months", "Initial build effort (person-months)", 6, 1],
      ["rate", "Cost per person-month", 8000, 500],
      ["overrun", "Overrun allowance on the build (%)", 30, 5],
      ["internal", "Product owner & reviewer time per year", 10000, 1000],
      ["security", "Security testing & audits per year", 5000, 500],
      ["aitools", "AI tooling per year", 3000, 500],
      ["hosting", "Hosting & infrastructure per year", 6000, 500],
      ["maint", "Maintenance per year (% of build) *", 20, 1],
      ["support", "Support & operations per year", 12000, 1000],
      ["decom", "Decommissioning (end of horizon)", 10000, 1000]
    ]
  };

  function field(group, f) {
    var id = "tco-" + group + "-" + f[0];
    return '<label class="field" for="' + id + '"><span>' + esc(f[1]) + '</span><input id="' + id + '" type="number" min="0" step="' + f[3] + '" value="' + f[2] + '" data-tco="' + group + "." + f[0] + '"></label>';
  }

  function renderToolkit() {
    var html = '<div class="tool" id="tco"><h3 class="tool-title">TCO calculator <span>Buy or subscribe vs build with AI</span></h3>';
    html += '<div class="tco-inputs">';
    html += '<fieldset class="fs fs-buy"><legend>Buy / subscribe</legend>' + TCO_FIELDS.buy.map(function (f) { return field("buy", f); }).join("") + "</fieldset>";
    html += '<fieldset class="fs fs-build"><legend>Build with AI</legend>' + TCO_FIELDS.build.map(function (f) { return field("build", f); }).join("") + "</fieldset>";
    html += '<fieldset class="fs fs-common"><legend>Horizon</legend>' +
            '<label class="field" for="tco-years"><span>Years to compare</span><input id="tco-years" type="range" min="1" max="7" value="5" data-tco="years"><output id="tco-years-out">5</output></label>' +
            '<label class="field" for="tco-unc"><span>Uncertainty on build costs (±%)</span><input id="tco-unc" type="number" min="0" max="90" step="5" value="25" data-tco="unc"></label>' +
            '<label class="field" for="tco-rate"><span>Discount rate (% a year) †</span><input id="tco-rate" type="number" min="0" max="40" step="0.5" value="10" data-tco="disc"></label>' +
            '<label class="field" for="tco-basis"><span>Compare in</span><select id="tco-basis" data-tco="basis"><option value="npv" selected>Today\'s money (NPV)</option><option value="nominal">Nominal (undiscounted)</option></select></label>' +
            '<label class="field" for="tco-cur"><span>Currency symbol</span><select id="tco-cur" data-tco="cur"><option>₹</option><option selected>$</option><option>€</option><option>£</option></select></label>' +
            '<p class="fineprint">Build year 1 includes the build plus overrun; maintenance starts in year 2. Buy year 1 includes implementation. Exit and decommissioning land in the final year. Buy-side uncertainty is taken as half the build figure, since vendor prices are more predictable.</p>' +
            '<p class="fineprint">* A common rule of thumb is 15–25% a year. Treat it as an assumption; AI-generated code tends toward the high end unless refactored.</p>' +
            '<p class="fineprint">† Use your finance team\'s rate (often the cost of capital). Costs are treated as paid at the start of each year: year 1 is today\'s money, year 2 is divided by (1 + rate), year 3 by (1 + rate)², and so on. Discounting gives less weight to later costs. Building spends most of its money in year 1, so in today’s money it usually looks relatively more expensive than its nominal total suggests.</p></fieldset>';
    html += "</div>";
    html += '<div class="tco-result" aria-live="polite"><p class="verdict" id="tco-verdict"></p><div class="chart-wrap" id="tco-chart"></div><div class="table-wrap" id="tco-table"></div></div></div>';

    html += '<div class="tool" id="scorecard"><h3 class="tool-title">Build-vs-buy scorecard <span>Knockouts, then 11 weighted criteria</span></h3>';
    html += '<p class="fineprint">Step 1: tick any knockout that applies. A knocked-out route is not scored. Step 2: agree the weights (how much each criterion matters), then slide each criterion toward the side the evidence supports. Cost is left out on purpose: it has its own calculator above, and scoring it here would count it twice.</p>';
    html += '<fieldset class="knockouts"><legend>Knockout criteria</legend>';
    F.knockouts.forEach(function (k, i) {
      html += '<label><input type="checkbox" data-knock="' + i + '" data-kills="' + k[1] + '"><span>' + esc(k[0]) +
              ' <em class="kills kills-' + k[1] + '">rules out ' + (k[1] === "build" ? "building" : "buying") + "</em></span></label>";
    });
    html += "</fieldset>";
    html += '<div class="score-scale" aria-hidden="true"><span>← Favours buying</span><span>Favours building →</span></div>';
    html += '<div class="score-rows">';
    F.scorecard.forEach(function (c, i) {
      html += '<div class="score-row"><div class="score-name">' + esc(c[0]) + '</div>' +
              '<div class="score-slider"><span class="end end-buy">' + esc(c[1]) + '</span>' +
              '<input type="range" min="-2" max="2" step="1" value="0" data-score="' + i + '" aria-label="' + esc(c[0]) + ': from favours buying to favours building">' +
              '<span class="end end-build">' + esc(c[2]) + "</span></div>" +
              '<label class="score-weight"><span>Weight</span><select data-weight="' + i + '" aria-label="Weight for ' + esc(c[0]) + '"><option value="0">Ignore</option><option value="1">Low</option><option value="2" selected>Medium</option><option value="3">High</option></select></label></div>';
    });
    html += '</div><div class="score-result" aria-live="polite"><div class="meter"><span class="meter-zone z-buy">Buy</span><span class="meter-zone z-blend">Blend</span><span class="meter-zone z-build">Build</span><span class="meter-needle" id="meter-needle"></span></div><p class="verdict" id="score-verdict"></p>' +
            '<button type="button" class="btn btn-quiet" id="score-reset">Reset scorecard</button></div></div>';

    $("toolkit-root").innerHTML = html;
  }

  function fmt(n, cur) {
    var abs = Math.abs(n), s;
    if (abs >= 1e7 && cur === "₹") s = (n / 1e7).toFixed(2) + " Cr";
    else if (abs >= 1e5 && cur === "₹") s = (n / 1e5).toFixed(1) + " L";
    else if (abs >= 1e6) s = (n / 1e6).toFixed(2) + "M";
    else if (abs >= 1e3) s = (n / 1e3).toFixed(0) + "k";
    else s = Math.round(n).toString();
    return cur + s;
  }

  function readTco() {
    var v = { buy: {}, build: {} };
    document.querySelectorAll("[data-tco]").forEach(function (el) {
      var key = el.getAttribute("data-tco");
      if (key === "cur") v.cur = el.value;
      else if (key === "years") v.years = parseInt(el.value, 10) || 5;
      else if (key === "unc") { var u = parseFloat(el.value); v.unc = isFinite(u) ? Math.min(Math.max(u, 0), 90) / 100 : 0.25; }
      else if (key === "disc") { var r = parseFloat(el.value); v.disc = isFinite(r) ? Math.min(Math.max(r, 0), 40) / 100 : 0.1; }
      else if (key === "basis") v.basis = el.value === "nominal" ? "nominal" : "npv";
      else {
        var parts = key.split(".");
        var num = parseFloat(el.value);
        v[parts[0]][parts[1]] = isFinite(num) && num >= 0 ? num : 0;
      }
    });
    return v;
  }

  function computeTco() {
    var v = readTco(), b = v.buy, d = v.build, u = v.unc == null ? 0.25 : v.unc;
    var rate = v.disc == null ? 0.1 : v.disc, npv = v.basis !== "nominal";
    var buildCost = d.months * d.rate * (1 + d.overrun / 100);
    var rows = [], nb = 0, nd = 0, pb = 0, pd = 0, breakEven = null;
    for (var y = 1; y <= v.years; y++) {
      var last = y === v.years;
      var buyYear = b.users * b.seat * Math.pow(1 + b.rise / 100, y - 1) + b.changes + b.admin + (y === 1 ? b.impl : 0) + (last ? b.exit : 0);
      var buildYear = d.internal + d.security + d.aitools + d.hosting + d.support +
                      (y === 1 ? buildCost : buildCost * d.maint / 100) + (last ? d.decom : 0);
      var df = 1 / Math.pow(1 + rate, y - 1); // start-of-year convention: year 1 is today's money
      nb += buyYear; nd += buildYear; pb += buyYear * df; pd += buildYear * df;
      var cbY = npv ? pb : nb, cdY = npv ? pd : nd;
      if (breakEven === null && cdY <= cbY) breakEven = y;
      rows.push({ y: y, buyYear: buyYear, buildYear: buildYear, nb: nb, nd: nd, pb: pb, pd: pd, cb: cbY, cd: cdY,
                  cbLo: cbY * (1 - u / 2), cbHi: cbY * (1 + u / 2), cdLo: cdY * (1 - u), cdHi: cdY * (1 + u) });
    }
    $("tco-years-out").textContent = v.years;

    var end = rows[rows.length - 1], cb = end.cb, cd = end.cd;
    var diff = cb - cd, verdict, c = v.cur;
    var basisText = npv ? " in today's money (NPV at " + +(rate * 100).toFixed(2) + "%)" : " in nominal terms";
    if (Math.abs(diff) < 0.05 * Math.max(cb, cd)) {
      verdict = "Expected cost over " + v.years + " years" + basisText + " is about the same for both routes (" + fmt(cb, c) + " vs " + fmt(cd, c) + ").";
    } else if (diff > 0) {
      verdict = "Expected" + basisText + ": building is cheaper by <b>" + fmt(diff, c) + "</b> over " + v.years + " years (" + fmt(cd, c) + " vs " + fmt(cb, c) + ")" +
                (breakEven ? ", dropping below buying in <b>year " + breakEven + "</b>." : ".");
    } else {
      verdict = "Expected" + basisText + ": buying is cheaper by <b>" + fmt(-diff, c) + "</b> over " + v.years + " years (" + fmt(cb, c) + " vs " + fmt(cd, c) + ").";
    }
    verdict += '<span class="verdict-range">' + (npv
      ? "Undiscounted, the totals are buy " + fmt(end.nb, c) + " vs build " + fmt(end.nd, c) + "."
      : "In today's money at " + +(rate * 100).toFixed(2) + "%, the totals are buy " + fmt(end.pb, c) + " vs build " + fmt(end.pd, c) + ".") + "</span>";
    var overlap = end.cdLo <= end.cbHi && end.cbLo <= end.cdHi;
    var signal = diff < 0 ? "Building would need a strategic reason beyond cost." : "Cost is a real argument for building.";
    if (u > 0) {
      verdict += '<span class="verdict-range">Range: build ' + fmt(end.cdLo, c) + "–" + fmt(end.cdHi, c) + ", buy " + fmt(end.cbLo, c) + "–" + fmt(end.cbHi, c) + ". " +
                 (overlap ? "The ranges overlap, so cost alone doesn't settle it: let the scorecard and risk decide."
                          : "The ranges don't overlap. " + signal) + "</span>";
    } else {
      verdict += '<span class="verdict-range">No uncertainty set, so no range is shown. Real estimates are rarely this precise.</span>';
    }
    $("tco-verdict").innerHTML = verdict;
    $("tco-chart").innerHTML = tcoChart(rows, c, npv ? "cumulative cost in today's money" : "cumulative cost, undiscounted");

    var t = '<table class="tco-table"><thead><tr><th scope="col">Year</th><th scope="col">Buy (year)</th><th scope="col">Build (year)</th><th scope="col">Buy (cumulative)</th><th scope="col">Build (cumulative)</th><th scope="col">Buy (NPV, cumulative)</th><th scope="col">Build (NPV, cumulative)</th></tr></thead><tbody>';
    rows.forEach(function (r) {
      t += '<tr><th scope="row">Y' + r.y + "</th><td>" + fmt(r.buyYear, c) + "</td><td>" + fmt(r.buildYear, c) + "</td><td>" + fmt(r.nb, c) + "</td><td>" + fmt(r.nd, c) + "</td><td>" + fmt(r.pb, c) + "</td><td>" + fmt(r.pd, c) + "</td></tr>";
    });
    $("tco-table").innerHTML = t + "</tbody></table>";
  }

  function tcoChart(rows, cur, basisLabel) {
    var W = 640, H = 260, L = 64, Rp = 20, T = 18, B = 34;
    var max = 0;
    rows.forEach(function (r) { max = Math.max(max, r.cbHi, r.cdHi); });
    if (max <= 0) max = 1;
    var n = rows.length;
    function x(i) { return n === 1 ? (L + (W - Rp)) / 2 : L + (i * (W - L - Rp)) / (n - 1); }
    function y(val) { return T + (H - T - B) * (1 - val / max); }
    var s = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Cumulative cost by year, buy versus build, with best and worst-case bands">';
    for (var k = 0; k <= 4; k++) {
      var val = (max * k) / 4, yy = y(val);
      s += '<line class="grid-line" x1="' + L + '" x2="' + (W - Rp) + '" y1="' + yy.toFixed(1) + '" y2="' + yy.toFixed(1) + '"/>';
      s += '<text class="axis" x="' + (L - 8) + '" y="' + (yy + 4).toFixed(1) + '" text-anchor="end">' + esc(fmt(val, cur)) + "</text>";
    }
    rows.forEach(function (r, i) {
      s += '<text class="axis" x="' + x(i).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle">Y' + r.y + "</text>";
    });
    function band(lo, hi, cls) {
      if (n < 2) return "";
      var top = rows.map(function (r, i) { return x(i).toFixed(1) + "," + y(r[hi]).toFixed(1); });
      var bottom = rows.slice().reverse().map(function (r, j) { return x(n - 1 - j).toFixed(1) + "," + y(r[lo]).toFixed(1); });
      return '<polygon class="band ' + cls + '" points="' + top.concat(bottom).join(" ") + '"/>';
    }
    function line(key, cls) {
      var pts = rows.map(function (r, i) { return x(i).toFixed(1) + "," + y(r[key]).toFixed(1); });
      var out = '<polyline class="series ' + cls + '" points="' + pts.join(" ") + '"/>';
      rows.forEach(function (r, i) { out += '<circle class="dot ' + cls + '" cx="' + x(i).toFixed(1) + '" cy="' + y(r[key]).toFixed(1) + '" r="4"/>'; });
      return out;
    }
    s += band("cbLo", "cbHi", "b-buy") + band("cdLo", "cdHi", "b-build");
    s += line("cb", "s-buy") + line("cd", "s-build");
    s += "</svg>";
    s += '<div class="legend"><span class="key k-buy"></span>Buy / subscribe <span class="key k-build"></span>Build with AI <span class="legend-note">' + esc(basisLabel || "cumulative cost") + ' · shaded = best to worst case</span></div>';
    return s;
  }

  /* ---------- toolkit: scorecard ---------- */
  function computeScore() {
    var killed = { build: false, buy: false };
    document.querySelectorAll("[data-knock]").forEach(function (k) { if (k.checked) killed[k.getAttribute("data-kills")] = true; });

    var sum = 0, wsum = 0;
    F.scorecard.forEach(function (_, i) {
      var s = parseInt(document.querySelector('[data-score="' + i + '"]').value, 10);
      var w = parseInt(document.querySelector('[data-weight="' + i + '"]').value, 10);
      sum += s * w; wsum += w;
    });
    var score = wsum ? sum / wsum : 0; // -2 … +2
    var meter = document.querySelector(".meter");
    var v;
    if (killed.build && killed.buy) {
      v = "<b>Stop.</b> Knockouts rule out both building and buying. Revisit the requirements, or look at extending a platform you already own.";
      score = 0;
    } else if (killed.build) {
      v = "<b>Buy</b> (knockout). Building is ruled out, so scores don't apply. Choose and integrate a product well, or engineer conventionally with specialists if nothing on the market fits.";
      score = -2;
    } else if (killed.buy) {
      v = "<b>Build or Blend</b> (knockout). No acceptable vendor route exists. Check the TCO and suitability filter, then take it to Gate G2.";
      score = 2;
    } else if (!wsum) {
      v = "All criteria are set to Ignore. Give at least one a weight.";
    } else if (score >= 0.6) {
      v = "Leans <b>Build</b> (score " + score.toFixed(2) + " on a −2 to +2 scale). Check the TCO ranges agree, then take it to Gate G2 with a staged business case.";
    } else if (score <= -0.6) {
      v = "Leans <b>Buy</b> (score " + score.toFixed(2) + "). Owning this is unlikely to pay back; put the effort into choosing and integrating a product well.";
    } else {
      v = "Leans <b>Blend</b> (score " + score.toFixed(2) + "). Buy the commodity core and build the differentiating edge, or replace the vendor gradually.";
    }
    meter.classList.toggle("is-knocked", killed.build || killed.buy);
    $("meter-needle").style.left = ((score + 2) / 4) * 100 + "%";
    $("score-verdict").innerHTML = v;
  }

  /* ---------- RACI ---------- */
  function renderRaci() {
    var html = '<p class="section-intro">' + F.roles.length + ' roles carry the framework. In a small organisation one person may hold several, with one exception: for Tier 3 the engineer of record must be independent of the AI builder.</p>';
    html += '<dl class="roles">';
    F.roles.forEach(function (r) { html += "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; });
    html += "</dl>";
    html += '<p class="raci-legend"><span class="raci-pill raci-R">R</span> Responsible: does the work <span class="raci-pill raci-A">A</span> Accountable: signs off <span class="raci-pill raci-C">C</span> Consulted <span class="raci-pill raci-I">I</span> Informed</p>';
    html += '<div class="table-wrap"><table class="raci-table"><thead><tr><th scope="col">Phase</th>';
    F.roles.forEach(function (r) { html += '<th scope="col"><span>' + esc(r[0]) + "</span></th>"; });
    html += "</tr></thead><tbody>";
    ALL.forEach(function (p) {
      html += '<tr><th scope="row"><a href="#' + p.id + '">' + p.num + " " + esc(p.name) + "</a></th>";
      F.raci[p.id].forEach(function (letter) {
        html += "<td>" + (letter ? '<span class="raci-pill raci-' + letter + '">' + letter + "</span>" : '<span class="raci-none" aria-label="not involved">·</span>') + "</td>";
      });
      html += "</tr>";
    });
    html += "</tbody></table></div>";
    $("raci-root").innerHTML = html;
  }

  /* ---------- metrics & standards ---------- */
  function renderMetrics() {
    $("metrics-root").innerHTML = F.metrics.map(function (g) {
      return '<div class="metric-group tone-' + g.tone + '"><p class="metric-name">' + esc(g.name) + '</p><dl>' +
        g.items.map(function (m) { return "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>"; }).join("") + "</dl></div>";
    }).join("");
  }

  function renderStandards() {
    var html = '<div class="table-wrap"><table class="standards"><thead><tr><th scope="col">Standard</th><th scope="col">What it covers</th><th scope="col">Where it shows up in Build Compass</th></tr></thead><tbody>';
    F.standards.forEach(function (s) {
      html += '<tr><th scope="row">' + esc(s[0]) + "</th><td>" + esc(s[1]) + "</td><td>" + esc(s[2]) + "</td></tr>";
    });
    $("standards-root").innerHTML = html + "</tbody></table></div>";
  }

  function renderCredits() {
    var html = '<div class="table-wrap"><table class="standards"><thead><tr><th scope="col">Source</th><th scope="col">Idea borrowed</th><th scope="col">Where it shows up</th></tr></thead><tbody>';
    F.buildsOn.forEach(function (b) {
      html += '<tr><th scope="row" class="wrap">' + esc(b[0]) + "</th><td>" + esc(b[1]) + "</td><td>" + esc(b[2]) + "</td></tr>";
    });
    $("credits-root").innerHTML = html + "</tbody></table></div>";
  }

  /* ---------- buy track, worked example, outcomes, templates ---------- */
  function renderBuyTrack() {
    var t = F.buyTrack;
    var html = '<p class="section-intro">' + esc(t.intro) + '</p><ol class="lane buy-steps">';
    t.steps.forEach(function (s) { html += "<li><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></li>"; });
    html += '</ol><div class="method-pair">';
    html += '<div class="mini-panel block-gate"><h3 class="sub">Checklist before signing</h3><ul class="checks">';
    t.checks.forEach(function (c, i) {
      var cid = "buy-c" + i;
      html += '<li><label><input type="checkbox" data-check="' + cid + '" data-phase="buy"' + (checks[cid] ? " checked" : "") + "><span>" + esc(c) + "</span></label></li>";
    });
    html += '</ul></div><div class="mini-panel"><h3 class="sub">If you blend</h3>' + list(t.blend, "trigger-list") + "</div></div>";
    $("buy-root").innerHTML = html;
    $("buy-root").addEventListener("change", function (e) {
      var c = e.target;
      if (!c.matches || !c.matches("[data-check]")) return;
      var id = c.getAttribute("data-check");
      if (c.checked) checks[id] = true; else delete checks[id];
      storeSet(STORE_KEY, checks);
    });
  }

  function renderExample() {
    var x = F.example;
    var html = '<p class="section-intro"><b>' + esc(x.title) + '.</b> ' + esc(x.note) + '</p><ol class="example-steps">';
    x.steps.forEach(function (s) { html += "<li><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></li>"; });
    html += '</ol><button type="button" class="btn" id="load-example">Load this example into the toolkit</button>';
    $("example-root").innerHTML = html;
    $("load-example").addEventListener("click", loadExample);
  }

  function setVal(id, v) { var el = $(id); if (el) el.value = v; }
  function loadExample() {
    var t = F.example.tco;
    Object.keys(t.buy).forEach(function (k) { setVal("tco-buy-" + k, t.buy[k]); });
    Object.keys(t.build).forEach(function (k) { setVal("tco-build-" + k, t.build[k]); });
    setVal("tco-years", t.years); setVal("tco-rate", t.disc); setVal("tco-unc", t.unc); setVal("tco-basis", "npv");
    document.querySelectorAll("[data-knock]").forEach(function (k) { k.checked = false; });
    F.example.scores.forEach(function (v, i) { var el = document.querySelector('[data-score="' + i + '"]'); if (el) el.value = v; });
    document.querySelectorAll("[data-weight]").forEach(function (w) { w.value = 2; });
    computeTco();
    computeScore();
    go("tco", true);
  }

  function renderOutcomes() {
    $("outcomes-root").innerHTML = F.outcomes.map(function (o) {
      return '<div class="outcome"><b>' + esc(o[0]) + "</b><span>" + esc(o[1]) + "</span></div>";
    }).join("");
  }

  function renderTemplates() {
    var base = "https://github.com/sudharsan6295/Build-Compass/blob/main/";
    $("templates-root").innerHTML = F.templates.map(function (t) {
      return '<li><a href="' + base + t[2] + '" rel="noopener">' + esc(t[0]) + '</a><span class="chip chip-check">' + esc(t[1]) + "</span></li>";
    }).join("");
  }

  /* ---------- glossary ---------- */
  function renderGlossary() {
    $("glossary-root").innerHTML = F.glossary.map(function (g) {
      return '<div class="term" data-term="' + esc((g[0] + " " + g[1]).toLowerCase()) + '"><dt>' + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd></div>";
    }).join("");
    $("glossary-filter").addEventListener("input", function (e) {
      var q = e.target.value.trim().toLowerCase(), shown = 0;
      document.querySelectorAll(".term").forEach(function (el) {
        var hit = !q || el.getAttribute("data-term").indexOf(q) !== -1;
        el.hidden = !hit;
        if (hit) shown++;
      });
      $("glossary-empty").hidden = shown > 0;
    });
  }

  /* ---------- navigation ---------- */
  var NAV = [
    ["map", "Framework map"],
    ["phases", "Phases", ALL.map(function (p) { return [p.id, p.num + " " + p.name]; })],
    ["buy-track", "If you buy"],
    ["example", "Worked example"],
    ["method", "Build methodology"],
    ["principles", "Build principles"],
    ["rails", "Always-on rails"],
    ["toolkit", "Decision toolkit"],
    ["metrics", "Measure the framework"],
    ["standards", "Standards mapping"],
    ["credits", "Builds on"],
    ["templates", "Templates"],
    ["raci", "Roles & RACI"],
    ["glossary", "Glossary"],
    ["adapt", "Make it your own"]
  ];

  function renderNav() {
    var html = "", opts = '<option value="">Jump to…</option>';
    NAV.forEach(function (n) {
      html += '<li><a href="#' + n[0] + '" data-nav="' + n[0] + '">' + esc(n[1]) + "</a>";
      opts += '<option value="' + n[0] + '">' + esc(n[1]) + "</option>";
      if (n[2]) {
        html += '<ol class="sub-nav">';
        n[2].forEach(function (c) {
          html += '<li><a href="#' + c[0] + '" data-nav="' + c[0] + '">' + esc(c[1]) + "</a></li>";
          opts += '<option value="' + c[0] + '"> ' + esc(c[1]) + "</option>";
        });
        html += "</ol>";
      }
      html += "</li>";
    });
    $("sidenav-list").innerHTML = html;
    var sel = $("jump-select");
    sel.innerHTML = opts;
    sel.addEventListener("change", function () {
      if (sel.value) { go(sel.value, true); sel.value = ""; }
    });
  }

  function openTarget(id) {
    var el = $(id);
    if (!el) return null;
    if (el.tagName === "DETAILS") el.open = true;
    var parent = el.parentElement;
    while (parent) {
      if (parent.tagName === "DETAILS") parent.open = true;
      parent = parent.parentElement;
    }
    return el;
  }

  function go(id, push) {
    var el = openTarget(id);
    if (!el) return;
    el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    if (push) { try { history.pushState(null, "", "#" + id); } catch (e) {} }
    var focusable = el.querySelector("summary") || el;
    if (focusable && focusable.focus) focusable.focus({ preventScroll: true });
  }

  function bindLinks() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      if (!id || id === "main") return;
      if (id === "top") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); try { history.pushState(null, "", location.pathname); } catch (er) {} return; }
      if (!$(id)) return;
      e.preventDefault();
      go(id, true);
    });
    window.addEventListener("popstate", function () {
      var id = location.hash.slice(1);
      if (id) go(id, false);
    });
  }

  function scrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll("[data-nav]").forEach(function (a) { links[a.getAttribute("data-nav")] = a; });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      NAV.forEach(function (n) {
        if (visible[n[0]]) current = current || n[0];
        if (n[2]) n[2].forEach(function (c) { if (visible[c[0]]) current = c[0]; });
      });
      if (!current) return;
      Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-active", k === current); });
    }, { rootMargin: "-80px 0px -60% 0px" });
    NAV.forEach(function (n) {
      if ($(n[0])) io.observe($(n[0]));
      if (n[2]) n[2].forEach(function (c) { if ($(c[0])) io.observe($(c[0])); });
    });
  }

  /* ---------- theme & misc ---------- */
  function bindTheme() {
    $("theme-toggle").addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bc-theme", next); } catch (e) {}
    });
  }

  function bindToolbar() {
    document.querySelector(".toolbar").addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-action]");
      if (!btn) return;
      var action = btn.getAttribute("data-action");
      var phases = document.querySelectorAll(".phase");
      if (action === "expand") phases.forEach(function (d) { d.open = true; });
      if (action === "collapse") phases.forEach(function (d) { d.open = false; });
      if (action === "reset") {
        if (btn.getAttribute("data-armed") !== "1") {
          btn.setAttribute("data-armed", "1");
          btn.textContent = "Click again to clear";
          setTimeout(function () { btn.removeAttribute("data-armed"); btn.textContent = "Clear checklists"; }, 3000);
          return;
        }
        checks = {};
        storeSet(STORE_KEY, checks);
        document.querySelectorAll("[data-check]").forEach(function (c) { c.checked = false; });
        btn.removeAttribute("data-armed");
        btn.textContent = "Clear checklists";
        updateProgress();
      }
    });
    $("phases-root").addEventListener("change", function (e) {
      var c = e.target;
      if (!c.matches || !c.matches("[data-check]")) return;
      var id = c.getAttribute("data-check");
      if (c.checked) checks[id] = true; else delete checks[id];
      storeSet(STORE_KEY, checks);
      updateProgress();
    });
  }

  function bindToolkit() {
    var root = $("toolkit-root");
    root.addEventListener("input", function (e) {
      if (e.target.hasAttribute("data-tco")) computeTco();
      if (e.target.hasAttribute("data-score") || e.target.hasAttribute("data-weight")) computeScore();
    });
    root.addEventListener("change", function (e) {
      if (e.target.hasAttribute("data-tco")) computeTco();
      if (e.target.hasAttribute("data-weight") || e.target.hasAttribute("data-knock")) computeScore();
    });
    $("score-reset").addEventListener("click", function () {
      document.querySelectorAll("[data-knock]").forEach(function (k) { k.checked = false; });
      document.querySelectorAll("[data-score]").forEach(function (s) { s.value = 0; });
      document.querySelectorAll("[data-weight]").forEach(function (s) { s.value = 2; });
      computeScore();
    });
    computeTco();
    computeScore();
  }

  function bindToTop() {
    var btn = $("to-top");
    window.addEventListener("scroll", function () { btn.hidden = window.scrollY < 900; }, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- boot ---------- */
  renderMap();
  renderPhases();
  renderMethod();
  renderPrinciples();
  renderRails();
  renderToolkit();
  renderMetrics();
  renderStandards();
  renderCredits();
  renderBuyTrack();
  renderExample();
  renderOutcomes();
  renderTemplates();
  renderRaci();
  renderGlossary();
  renderAdapt();
  renderNav();
  bindLinks();
  bindTheme();
  bindToolbar();
  bindToolkit();
  bindToTop();
  scrollSpy();

  if (location.hash.length > 1) {
    var initial = location.hash.slice(1);
    requestAnimationFrame(function () { go(initial, false); });
  }
})();

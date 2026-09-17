"use client";

import { useEffect } from "react";

type Tab = {
  chapter: string;
  eye: string;
  title: string;
  body: string;
  next: string;
  nextTab: string;
  image?: "hero" | "pano";
  map?: boolean;
  sample?: string;
  plans?: boolean;
  detail: string;
  facts: [string, string][];
  note: string;
};

const imgs = {
  hero: "https://app-uploads.krea.ai/3903c167-8051-48da-8d33-24525a87c388/1789552165728-.png",
  pano: "https://app-uploads.krea.ai/3903c167-8051-48da-8d33-24525a87c388/1789552168862-.jpeg",
};

const tabs: Record<string, Tab> = {
  project: { chapter: "01 / Project", eye: "01 / Project overview", title: "A private <em>horizon.</em>", body: "Sea-facing residences, made for an unhurried life.", next: "Location", nextTab: "location", image: "hero", detail: "Residence proposition", facts: [["Configuration", "Four-bedroom"], ["Outlook", "Sea-facing"], ["Floor", "Two homes"], ["Experience", "Private"]], note: "Use approved data in the production sales suite." },
  location: { chapter: "02 / Location", eye: "02 / The address", title: "The sea, <em>at your edge.</em>", body: "Understand the coast, then the city around it.", next: "Architecture", nextTab: "architecture", map: true, detail: "Location lens", facts: [["Coast", "Arabian Sea"], ["Lens", "Beaches"], ["Map", "Supplied"], ["Journey", "Versova"]], note: "Select map categories in the production build." },
  architecture: { chapter: "03 / Architecture", eye: "03 / Project story", title: "Made for the <em>horizon.</em>", body: "Form, material and a long view.", next: "Arrival", nextTab: "arrival", image: "pano", sample: "Sample content area · Replace with approved architecture story", detail: "Architecture layer", facts: [["Exterior", "Approved CGI"], ["Material", "Approved story"], ["Scale", "Project detail"], ["View", "Sea-facing"]], note: "Sample labels only; no unverified project claims." },
  arrival: { chapter: "04 / Arrival", eye: "04 / The first moment", title: "Arrival, <em>unhurried.</em>", body: "A calm first transition into the home.", next: "Residences", nextTab: "residences", image: "hero", sample: "Sample content area · Add approved arrival imagery", detail: "Arrival sequence", facts: [["Moment", "Approach"], ["Layer", "Lobby"], ["Purpose", "Orientation"], ["Media", "Approved CGI"]], note: "Prototype structure awaiting approved assets." },
  residences: { chapter: "05 / Residences", eye: "05 / The residence", title: "Beyond the <em>view.</em>", body: "Explore the rooms, privacy and outlook.", next: "View & 360", nextTab: "tour", image: "pano", detail: "Residence 01 · sample presentation", facts: [["Configuration", "Four-bedroom"], ["Outlook", "Sea-facing"], ["Floor", "Two homes"], ["Plan layer", "Sample A"]], note: "Connect plans, areas and specifications once approved." },
  tour: { chapter: "06 / View & 360", eye: "06 / Spatial walkthrough", title: "Move through <em>the view.</em>", body: "Tap a point to move through the experience.", next: "Amenities", nextTab: "amenities", image: "pano", sample: "Prototype panorama · supplied visual", detail: "Spatial journey", facts: [["01", "Arrival"], ["02", "Terrace"], ["03", "Residence"], ["04", "Amenities"]], note: "Each scene should link to a buyer decision." },
  amenities: { chapter: "07 / Amenities", eye: "07 / Everyday rituals", title: "A day by <em>the sea.</em>", body: "Morning, day, evening.", next: "Plans", nextTab: "plans", image: "hero", sample: "Sample content area · Load approved amenity imagery", detail: "Amenity story", facts: [["01", "Morning"], ["02", "Day"], ["03", "Evening"], ["Flow", "Buyer-led"]], note: "Only show confirmed amenities and features." },
  plans: { chapter: "08 / Plans", eye: "08 / Residence plan", title: "The view, <em>in plan.</em>", body: "Tap each zone to understand the home.", next: "Inventory", nextTab: "inventory", image: "pano", sample: "Prototype plan · not approved", plans: true, detail: "Sample plan focus", facts: [["Current", "Living"], ["Suite", "Privacy"], ["Terrace", "Sea edge"], ["Source", "Concept"]], note: "Replace with approved floor plans and area schedules." },
  inventory: { chapter: "09 / Inventory", eye: "09 / Choose your home", title: "Find your <em>home.</em>", body: "Match preferences to an available residence.", next: "Private preview", nextTab: "book", image: "pano", sample: "Sample inventory · no live availability", detail: "Residence selection", facts: [["Residence", "Sample 01"], ["Configuration", "Four-bedroom"], ["Status", "TBC"], ["Availability", "Live data"]], note: "Connect authorised inventory, availability and pricing only." },
};

export default function SalesSuite() {
  // Same behaviour as the original inline script; listeners are torn down on
  // unmount so React Strict Mode's double-mount doesn't bind them twice.
  useEffect(() => {
    const ac = new AbortController();
    const opt = { signal: ac.signal };
    const timers: number[] = [];
    const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector(s) as T;
    const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];
    const hero = $<HTMLImageElement>("#hero"),
      map = $("#map"),
      mapWash = $("#map-wash"),
      entry = $("#entry"),
      drawer = $("#drawer"),
      nav = $$(".nav button"),
      plan = $("#plan-overlay"),
      planControls = $("#plan-controls"),
      spots = $("#hotspots"),
      detail = $("#detail"),
      sound = $("#sound"),
      sea = $<HTMLAudioElement>("#sea"),
      atlas = $("#atlas"),
      atlasScrim = $("#atlas-scrim"),
      launcher = $("#nav-launcher");
    let audio = false;
    let ctx: AudioContext | undefined;

    function tick() {
      if (!audio) return;
      try {
        ctx = ctx || new AudioContext();
        const o = ctx.createOscillator(),
          g = ctx.createGain();
        o.frequency.value = 150;
        g.gain.setValueAtTime(0.03, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.1);
      } catch {}
    }
    function setSound(on: boolean) {
      audio = on;
      sound.setAttribute("aria-pressed", String(on));
      sound.innerHTML = '<i class="sound-dot"></i>' + (on ? "Sound on" : "Sound off");
      if (on) sea.play().catch(() => setSound(false));
      else sea.pause();
    }
    function facts(list: [string, string][]) {
      $("#details").innerHTML = list.map((x) => "<div><dt>" + x[0] + "</dt><dd>" + x[1] + "</dd></div>").join("");
    }
    function closeAtlas() {
      atlas.classList.remove("open");
      atlasScrim.classList.remove("show");
      launcher.setAttribute("aria-expanded", "false");
      atlas.setAttribute("aria-hidden", "true");
      document.body.classList.remove("atlas-active");
    }
    function openAtlas() {
      atlas.classList.add("open");
      atlasScrim.classList.add("show");
      launcher.setAttribute("aria-expanded", "true");
      atlas.setAttribute("aria-hidden", "false");
      document.body.classList.add("atlas-active");
    }
    function show(tab: string) {
      if (tab === "book") {
        closeAtlas();
        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");
        return;
      }
      closeAtlas();
      const d = tabs[tab];
      if (tab !== "project" || entry.classList.contains("out")) entry.classList.add("out");
      nav.forEach((b) => {
        const yes = b.dataset.tab === tab;
        b.classList.toggle("active", yes);
        b.toggleAttribute("aria-current", yes);
      });
      $("#chapter").textContent = d.chapter;
      $("#eyebrow").textContent = d.eye;
      $("#title").innerHTML = d.title;
      $("#bodycopy").textContent = d.body;
      $("#next").innerHTML = d.next + " <b>→</b>";
      $("#next").dataset.next = d.nextTab;
      $("#sample").textContent = d.sample || "";
      $("#detail-label").textContent = d.detail;
      $("#detail-note").textContent = d.note;
      facts(d.facts);
      const isMap = !!d.map;
      map.classList.toggle("show", isMap);
      mapWash.classList.toggle("show", isMap);
      hero.classList.toggle("show", !isMap);
      if (!isMap) {
        hero.style.opacity = "0";
        timers.push(
          window.setTimeout(() => {
            hero.src = imgs[d.image!];
            hero.style.objectPosition =
              tab === "arrival" || tab === "amenities"
                ? "82% 50%"
                : tab === "residences" || tab === "tour" || tab === "plans" || tab === "inventory"
                  ? "66% 50%"
                  : "70% 50%";
            hero.style.opacity = "1";
          }, 100),
        );
      }
      plan.classList.toggle("show", !!d.plans);
      planControls.hidden = !d.plans;
      spots.style.display = tab === "tour" ? "block" : "none";
      detail.style.display = tab === "tour" ? "none" : "block";
      tick();
    }

    launcher.addEventListener("click", openAtlas, opt);
    $("#atlas-close").addEventListener("click", closeAtlas, opt);
    atlasScrim.addEventListener("click", closeAtlas, opt);
    $("#enter").addEventListener(
      "click",
      () => {
        entry.classList.add("out");
        setSound(true);
        tick();
      },
      opt,
    );
    sound.addEventListener("click", () => setSound(!audio), opt);
    nav.forEach((b) => b.addEventListener("click", () => show(b.dataset.tab!), opt));
    $$("[data-jump]").forEach((b) => b.addEventListener("click", () => show(b.dataset.jump!), opt));
    $("#next").addEventListener("click", () => show($("#next").dataset.next!), opt);
    $("#book").addEventListener("click", () => show("book"), opt);
    $("#close").addEventListener(
      "click",
      () => {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
      },
      opt,
    );
    $$("[data-plan]").forEach((b) =>
      b.addEventListener(
        "click",
        () => {
          const z = b.dataset.plan;
          $$("[data-plan]").forEach((x) => x.classList.toggle("active", x === b));
          $$<SVGPathElement>(".plan-zone").forEach((x) => x.classList.toggle("active", x.dataset.zone === z));
          $("#detail-label").textContent = "Sample plan / " + z;
          tick();
        },
        opt,
      ),
    );
    $$<SVGPathElement>(".plan-zone").forEach((z) =>
      z.addEventListener(
        "click",
        () => {
          $('[data-plan="' + z.dataset.zone + '"]').click();
        },
        opt,
      ),
    );
    $("#preview-form").addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        $("#success").classList.add("show");
        tick();
      },
      opt,
    );
    show("project");

    return () => {
      ac.abort();
      timers.forEach(clearTimeout);
      sea.pause();
      ctx?.close().catch(() => {});
    };
  }, []);

  return (
    <main className="gallery" aria-label="Beach Queen Versova 360 sales suite prototype">
      <section className="entry" id="entry">
        <div className="entry-inner">
          <small>Beach Queen · Versova</small>
          <h1>HORIZON</h1>
          <p>A detailed sales-suite journey, designed for buyers to explore the project with their advisor.</p>
          <button type="button" id="enter">Begin the tour</button>
        </div>
        <span className="entry-foot">Design concept · supplied project visuals + sample content</span>
      </section>
      <div className="shell">
        <aside className="rail" aria-label="Beach Queen project map">
          <button className="nav-launcher" type="button" id="nav-launcher" aria-label="Open project map" aria-expanded="false" aria-controls="atlas">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="7.5" />
              <path d="M12 1.8v3.1M12 19.1v3.1M1.8 12h3.1M19.1 12h3.1M12 8.7v6.6M8.7 12h6.6" />
            </svg>
            <span>Project map</span>
          </button>
          <div className="atlas-scrim" id="atlas-scrim"></div>
          <section className="atlas" id="atlas" aria-label="Beach Queen detailed project map" aria-hidden="true">
            <header className="atlas-head">
              <div>
                <p>Beach Queen · Versova</p>
                <strong>Explore<br />Beach Queen</strong>
              </div>
              <button className="atlas-close" type="button" id="atlas-close">Close ×</button>
            </header>
            <div className="atlas-group">
              <p>The project</p>
              <nav className="nav" aria-label="Project chapters">
                <button className="active" type="button" data-tab="project" aria-current="page"><i>01</i><span>Project</span></button>
                <button type="button" data-tab="location"><i>02</i><span>Location</span></button>
                <button type="button" data-tab="architecture"><i>03</i><span>Architecture</span></button>
                <button type="button" data-tab="arrival"><i>04</i><span>Arrival</span></button>
              </nav>
            </div>
            <div className="atlas-group">
              <p>The home</p>
              <nav className="nav">
                <button type="button" data-tab="residences"><i>05</i><span>Residences</span></button>
                <button type="button" data-tab="tour"><i>06</i><span>View &amp; 360</span></button>
                <button type="button" data-tab="plans"><i>08</i><span>Plans</span></button>
                <button type="button" data-tab="inventory"><i>09</i><span>Inventory</span></button>
              </nav>
            </div>
            <div className="atlas-group">
              <p>The life</p>
              <nav className="nav">
                <button type="button" data-tab="amenities"><i>07</i><span>Amenities</span></button>
              </nav>
            </div>
            <p className="atlas-note"><b>Sales-suite navigation</b>Select a scene to continue.</p>
          </section>
        </aside>
        <section className="stage">
          <img className="stage-img show" id="hero" src={imgs.hero} width={1536} height={864} alt="Supplied Beach Queen project visual" />
          <img className="map-img" id="map" src="https://app-uploads.krea.ai/3903c167-8051-48da-8d33-24525a87c388/1789552171884-.png" width={1600} height={900} alt="Supplied Beach Queen Versova location map" />
          <div className="wash"></div>
          <div className="map-wash" id="map-wash"></div>
          <div className="tide"></div>
          <header className="top">
            <p className="chapter" id="chapter">01 / Project</p>
            <div className="top-actions">
              <button type="button" id="sound" aria-pressed="false"><i className="sound-dot"></i>Sound off</button>
              <button className="book" type="button" id="book">Private preview</button>
            </div>
          </header>
          <div className="copy">
            <p className="eyebrow" id="eyebrow">01 / Project overview</p>
            <h2 id="title">A private <em>horizon.</em></h2>
            <p id="bodycopy">Sea-facing residences, made for an unhurried life.</p>
            <span className="sample-chip" id="sample"></span>
            <div className="plan-buttons" id="plan-controls" hidden>
              <button className="active" type="button" data-plan="Living">Living</button>
              <button type="button" data-plan="Suite">Suite</button>
              <button type="button" data-plan="Terrace">Terrace</button>
            </div>
            <button className="cta" type="button" id="next">Location <b>→</b></button>
          </div>
          <div className="hotspots" id="hotspots">
            <button className="hotspot h1" type="button" data-jump="tour"><i>+</i><span>Move through</span></button>
            <button className="hotspot h2" type="button" data-jump="residences"><i>+</i><span>Enter residence</span></button>
            <button className="hotspot h3" type="button" data-jump="amenities"><i>+</i><span>Discover day</span></button>
          </div>
          <aside className="detail-card" id="detail">
            <p id="detail-label">Residence proposition</p>
            <dl id="details">
              <div><dt>Configuration</dt><dd>Four-bedroom</dd></div>
              <div><dt>Outlook</dt><dd>Sea-facing</dd></div>
              <div><dt>Floor</dt><dd>Two homes</dd></div>
              <div><dt>Experience</dt><dd>Private</dd></div>
            </dl>
            <p className="note" id="detail-note">Use approved data in the production sales suite.</p>
          </aside>
          <div className="plan-overlay" id="plan-overlay" aria-label="Sample residence plan illustration">
            <svg viewBox="0 0 500 400" role="img" aria-label="Sample conceptual floor plan">
              <path d="M38 36H386L463 117V355H38Z" fill="rgba(6,25,35,.84)" stroke="#f0ece5" strokeWidth="2" />
              <path className="plan-zone active" data-zone="Living" d="M63 61H270V215H63Z" fill="rgba(203,162,101,.28)" stroke="#cba265" strokeWidth="1.5" />
              <path className="plan-zone" data-zone="Suite" d="M285 61H368V215H285Z" fill="rgba(240,236,229,.1)" stroke="#cba265" strokeWidth="1.5" />
              <path className="plan-zone" data-zone="Terrace" d="M63 230H438V329H63Z" fill="rgba(240,236,229,.1)" stroke="#cba265" strokeWidth="1.5" />
              <text x="95" y="142" fill="#f0ece5" fontFamily="Arial" fontSize="16" letterSpacing="2">LIVING</text>
              <text x="296" y="142" fill="#f0ece5" fontFamily="Arial" fontSize="14" letterSpacing="2">SUITE</text>
              <text x="192" y="285" fill="#f0ece5" fontFamily="Arial" fontSize="15" letterSpacing="2">TERRACE</text>
              <text x="63" y="382" fill="#cba265" fontFamily="Arial" fontSize="11" letterSpacing="2">SAMPLE PLAN LAYER · FOR DESIGN APPROVAL</text>
            </svg>
          </div>
          <aside className="drawer" id="drawer" aria-hidden="true">
            <button className="close" type="button" id="close">Close ×</button>
            <form id="preview-form">
              <p className="eyebrow">Private preview</p>
              <h3>Continue the <em>conversation.</em></h3>
              <p>Leave your details to prepare a private preview with the sales team.</p>
              <label>Your name<input name="name" required autoComplete="name" placeholder="Name" /></label>
              <label>Email address<input name="email" required type="email" autoComplete="email" placeholder="name@email.com" /></label>
              <button className="submit" type="submit">Prepare my preview</button>
              <div className="success" id="success" role="status">Your private preview request is ready for the sales team.</div>
            </form>
          </aside>
        </section>
      </div>
      <audio id="sea" loop preload="metadata" src="https://app-uploads.krea.ai/audio/02f87075-afe7-4760-893b-0ce154542d7c.mp3"></audio>
    </main>
  );
}

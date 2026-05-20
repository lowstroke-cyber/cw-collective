/* components.jsx — composed components for the Collective website kit. */

/* ---------- Top Nav ---------- */
function Nav({ route, onNavigate }) {
  const items = [
    ["music",     "Music"],
    ["video",     "Video"],
    ["programme", "Live"],
    ["about",     "About"],
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 36px",
      background: "rgba(11,9,8,0.72)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--rule)",
    }}>
      <a href="#/" onClick={e => { e.preventDefault(); onNavigate("home"); }}
         style={{ border: 0, textDecoration: "none" }}>
        <Wordmark size="md" />
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {items.map(([id, label]) => (
          <a key={id} href={"#/" + id}
             onClick={e => { e.preventDefault(); onNavigate(id); }}
             style={{
               fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500,
               letterSpacing: "0.02em",
               color: route === id ? "var(--halo-100)" : "var(--halo-300)",
               textDecoration: "none", border: 0,
               paddingBottom: 2,
               borderBottom: route === id ? "1px solid var(--brass-500)" : "1px solid transparent",
               transition: "color 180ms ease, border-color 180ms ease",
             }}>{label}</a>
        ))}
        <button aria-label="Search"
                style={{ background: "transparent", border: 0, color: "var(--halo-200)", cursor: "pointer", padding: 6 }}>
          <Icon name="search" size={18} />
        </button>
      </nav>
    </header>
  );
}

/* ---------- Footer colophon ---------- */
function Footer() {
  return (
    <footer style={{ padding: "64px 36px 32px", background: "var(--night-900)" }}>
      <BrassRule style={{ marginBottom: 32 }} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 32, alignItems: "start",
      }}>
        <div>
          <Wordmark size="md" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6,
                      color: "var(--halo-300)", marginTop: 14, maxWidth: 32 + "ch" }}>
            A working ensemble led by saxophonist and arranger Christopher White. Based in London since 1996.
          </p>
        </div>
        {[
          ["Listen", [["Bandcamp", window.LINKS.bandcamp], ["Spotify", window.LINKS.spotify], ["Apple Music", window.LINKS.apple]]],
          [["Follow", [["Instagram", window.LINKS.instagram], ["Facebook", window.LINKS.facebook]]]][0],
          ["Contact",[[window.LINKS.email, `mailto:${window.LINKS.email}`], ["Longspaces (mgmt)", null]]],
        ].map(([head, lines]) => (
          <div key={head}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          color: "var(--halo-200)", marginBottom: 12 }}>{head}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0,
                         fontFamily: "var(--font-ui)", fontSize: 13, lineHeight: 1.9,
                         color: "var(--halo-300)" }}>
              {lines.map(([label, href]) => (
                <li key={label}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener"
                       style={{ color: "var(--halo-300)", textDecoration: "none", border: 0 }}>{label}</a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48,
                    fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--halo-400)" }}>
        <span>© CWC MMXXVI · A working ensemble</span>
        <span>Mastered at half-speed · London W1</span>
      </div>
    </footer>
  );
}

/* ---------- Player (footer, wired to playerApi) ---------- */
function Player({ playerApi }) {
  if (!playerApi) return null;
  const { state, togglePlay, prev, next, seek, playTrack } = playerApi;
  const fp = window.RELEASES && window.RELEASES.find(r => r.slug === "fisher-point");
  const hasTrack = state.trackIdx >= 0;
  // Default display when nothing is loaded: first track of Fisher Point.
  const displayTitle    = hasTrack ? state.title    : (fp ? fp.tracks[0].title : "");
  const displaySubtitle = hasTrack ? state.subtitle : (fp ? `${fp.title} · 01` : "");
  const totalSec = state.duration || 0;
  const curSec   = state.position || 0;
  const pos      = totalSec > 0 ? curSec / totalSec : 0;
  const fmt = s => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s/60), r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2,"0")}`;
  };

  return (
    <div style={{
      position: "sticky", bottom: 0, zIndex: 40,
      background: "rgba(11,9,8,0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "1px solid var(--rule)",
      padding: "14px 36px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 24,
      alignItems: "center",
    }}>
      {/* Track info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 220 }}>
        <div style={{ width: 44, height: 44, background: "#0B0908",
                      border: "1px solid var(--rule)", overflow: "hidden",
                      borderRadius: 2 }}>
          {fp && fp.sleeve ? (
            <img src={fp.sleeve} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic",
                         fontSize: 15, color: "var(--halo-100)" }}>{displayTitle}</span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 11,
                         letterSpacing: "0.06em", color: "var(--halo-300)" }}>{displaySubtitle}</span>
        </div>
      </div>

      {/* Transport + scrubber */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "stretch" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 22, alignItems: "center" }}>
          <button onClick={prev} style={transportBtn} aria-label="Previous"><Icon name="prev" size={18}/></button>
          <button onClick={togglePlay} style={{ ...transportBtn, color: "var(--halo-100)" }} aria-label={state.isPlaying ? "Pause" : "Play"}>
            <Icon name={state.isPlaying ? "pause" : "play"} size={22}/>
          </button>
          <button onClick={next} style={transportBtn} aria-label="Next"><Icon name="next" size={18}/></button>
          {state.isPlaying ? <LiveIndicator>Live</LiveIndicator> : null}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 44px", alignItems: "center", gap: 10 }}>
          <span style={timeStyle}>{fmt(curSec)}</span>
          <div onClick={e => {
                 const r = e.currentTarget.getBoundingClientRect();
                 seek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
               }}
               style={{ height: 2, background: "var(--rule-strong)", position: "relative", cursor: "pointer" }}>
            <div style={{ position: "absolute", inset: 0, width: `${pos*100}%`, background: "var(--brass-500)" }}/>
            <div style={{ position: "absolute", top: -3, left: `calc(${pos*100}% - 4px)`,
                          width: 8, height: 8, borderRadius: "50%", background: "var(--brass-300)" }}/>
          </div>
          <span style={{ ...timeStyle, textAlign: "right" }}>{fmt(totalSec)}</span>
        </div>
      </div>

      {/* Volume — visual only for now */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", color: "var(--halo-300)" }}>
        <Icon name="volume" size={18}/>
        <div style={{ width: 80, height: 2, background: "var(--rule-strong)", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, width: "62%", background: "var(--halo-200)" }}/>
        </div>
      </div>
    </div>
  );
}
const transportBtn = {
  background: "transparent", border: 0, color: "var(--halo-200)",
  cursor: "pointer", padding: 4, display: "inline-flex", alignItems: "center",
};
const timeStyle = {
  fontFamily: "var(--font-mono)", fontSize: 11, fontVariantNumeric: "tabular-nums",
  color: "var(--halo-400)",
};

/* ---------- Section wrapper ---------- */
function Section({ eyebrow, title, children, max, style, dividerBrass }) {
  return (
    <section style={{ padding: "96px 36px", maxWidth: 1280, margin: "0 auto", ...style }}>
      {eyebrow || title ? (
        <div style={{ marginBottom: 48 }}>
          {dividerBrass ? <BrassRule style={{ marginBottom: 18 }}/> : <HairRule style={{ marginBottom: 18 }}/>}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16 }}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : <span/>}
            {title ? (
              <h2 style={{ fontFamily: "var(--font-display-bold)", fontWeight: 800, fontSize: 48,
                           lineHeight: 0.95, letterSpacing: "-0.01em", textTransform: "uppercase",
                           color: "var(--halo-100)", margin: 0,
                           textAlign: "right", flex: 1, minWidth: 260 }}>{title}</h2>
            ) : null}
          </div>
        </div>
      ) : null}
      <div style={{ maxWidth: max || "100%" }}>{children}</div>
    </section>
  );
}

/* ---------- ReleaseCard ---------- */
function ReleaseCard({ release, onClick, featured }) {
  const palettes = {
    "night-pieces":  ["#1A1612","#3D2A1A","#C9A24A"],
    "vespers":       ["#0F1A28","#14233A","#7A8A6E"],
    "after-hours":   ["#2A1820","#5C1A1F","#E2C57E"],
    "small-rooms":   ["#1A1A1A","#0A0A0A","#ADA294"],
    "score-quiet":   ["#1A1512","#2A1F18","#C95B2E"],
    "soho-three":    ["#221710","#0B0908","#C9A24A"],
  };
  const [bg1,bg2,acc] = palettes[release.slug] || palettes["night-pieces"];
  const hasPhoto = !!release.sleeve;
  return (
    <a href={`#/release/${release.slug}`} onClick={e => { e.preventDefault(); onClick && onClick(release); }}
       style={{ textDecoration: "none", border: 0, color: "inherit",
                display: "block", gridColumn: featured ? "span 2" : "auto" }}>
      <div style={{
        aspectRatio: featured ? "16 / 9" : "1 / 1",
        background: hasPhoto ? "#0B0908" : `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
        position: "relative", overflow: "hidden",
        borderRadius: 2,
      }}>
        {/* photo, if any */}
        {hasPhoto ? (
          <img src={release.sleeve} alt=""
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: release.sleevePos || "center" }}/>
        ) : (
          <div style={{ position: "absolute", inset: 0,
                        background: `radial-gradient(60% 80% at 50% 45%, ${acc}22, transparent 70%)` }}/>
        )}
        {/* protection gradient bottom-up so type reads */}
        {hasPhoto ? (
          <div style={{ position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(11,9,8,0.85) 0%, rgba(11,9,8,0.25) 45%, rgba(11,9,8,0) 75%)" }}/>
        ) : null}
        {/* typeset cover */}
        <div style={{ position: "absolute", inset: 0, padding: 28,
                      display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.30em",
                        textTransform: "uppercase", color: hasPhoto ? "var(--brass-300)" : acc }}>
            CWC—{release.cat}
          </div>
          <div style={{ fontFamily: "var(--font-display-bold)", fontWeight: 800,
                        fontSize: featured ? 56 : 26, lineHeight: 0.88, color: "var(--halo-100)",
                        letterSpacing: "-0.01em", textTransform: "uppercase",
                        textShadow: hasPhoto ? "0 2px 24px rgba(0,0,0,0.6)" : "none" }}>{release.title}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, alignItems: "baseline" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--halo-100)" }}>{release.title}</div>
          <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 14, color: "var(--halo-300)", marginTop: 2 }}>{release.subtitle}</div>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--halo-400)" }}>{release.year}</span>
      </div>
    </a>
  );
}

/* ---------- Tracklist (wired to playerApi when given) ---------- */
function Tracklist({ tracks, releaseSlug, playerApi }) {
  const playingIdx = playerApi && playerApi.state.releaseSlug === releaseSlug
    ? playerApi.state.trackIdx : -1;
  const isPlaying = playerApi ? playerApi.state.isPlaying : false;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {tracks.map((t, i) => {
          const isCur     = i === playingIdx;
          const showPause = isCur && isPlaying;
          const onClick   = () => playerApi && playerApi.playTrack(releaseSlug, i);
          return (
            <tr key={i} style={{ borderTop: "1px solid var(--rule)", cursor: playerApi ? "pointer" : "default" }}
                onClick={onClick}
                onMouseEnter={e => e.currentTarget.style.background = "var(--night-700)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "12px 0", color: "var(--halo-400)", fontFamily: "var(--font-mono)", fontSize: 12, width: 40 }}>
                {String(i+1).padStart(2, "0")}
              </td>
              <td style={{ padding: "12px 0", width: 28 }}>
                <span style={{ color: isCur ? "var(--brass-500)" : "var(--halo-300)",
                               display: "inline-flex", alignItems: "center" }}>
                  <Icon name={showPause ? "pause" : "play"} size={14}/>
                </span>
              </td>
              <td style={{ padding: "12px 14px",
                           fontFamily: "var(--font-body)", fontStyle: "italic",
                           fontSize: 18, color: isCur ? "var(--halo-100)" : "var(--halo-200)",
                           borderLeft: isCur ? "2px solid var(--brass-500)" : "2px solid transparent" }}>
                {t.title}
              </td>
              <td style={{ padding: "12px 0", textAlign: "right",
                           fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--halo-300)",
                           fontVariantNumeric: "tabular-nums" }}>
                {t.time}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ---------- ProgrammeRow ---------- */
function ProgrammeRow({ event }) {
  const tagColor = { "On sale": "var(--brass-600)", "Few left": "var(--ember-500)", "Sold out": "var(--halo-400)" }[event.status] || "var(--halo-300)";
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "110px 1fr auto auto",
      gap: 32, padding: "22px 0",
      borderBottom: "1px solid var(--rule)",
      alignItems: "center",
      cursor: "pointer",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "var(--night-700)"}
    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--halo-200)", letterSpacing: "0.02em" }}>{event.date}</div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 26, color: "var(--halo-100)", lineHeight: 1.1 }}>{event.venue}</div>
        <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 15, color: "var(--halo-300)", marginTop: 4 }}>{event.sub}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--halo-300)" }}>{event.city}</div>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500,
                       letterSpacing: "0.20em", textTransform: "uppercase",
                       color: tagColor }}>{event.status}</span>
        <Icon name="arrowRight" size={18} style={{ color: "var(--halo-300)" }}/>
      </div>
    </div>
  );
}

/* ---------- PressQuote ---------- */
function PressQuote({ quote, source }) {
  return (
    <figure style={{ margin: 0, position: "relative", padding: "0 0 0 0", maxWidth: 56 + "ch" }}>
      <span style={{ position: "absolute", top: -22, left: -34,
                     fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
                     fontSize: 110, lineHeight: 1, color: "var(--brass-500)", opacity: 0.85 }}>&ldquo;</span>
      <blockquote style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400,
                           fontSize: 28, lineHeight: 1.25, color: "var(--halo-100)",
                           margin: 0, textWrap: "balance" }}>{quote}</blockquote>
      <figcaption style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500,
                           letterSpacing: "0.22em", textTransform: "uppercase",
                           color: "var(--halo-300)", marginTop: 18 }}>{source}</figcaption>
    </figure>
  );
}

Object.assign(window, { Nav, Footer, Player, Section, ReleaseCard, Tracklist, ProgrammeRow, PressQuote });

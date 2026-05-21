/* screens.jsx — Christopher White Collective website
   Single recording (Fisher Point EP). No film/TV section. Honest placeholders
   where real content is still pending. */

/* ---------- Data ---------- */
const PHOTO = {
  velvet:    "./assets/photography/cw-velvet-seated.jpg",
  velvetSax: "./assets/photography/cw-velvet-sax.jpg",
  portrait:  "./assets/photography/cw-portrait-sax.jpg",
  pianoSax:  "./assets/photography/cw-piano-sax.jpg",
  amber:     "./assets/photography/cw-multi-amber.jpg",
  pianoBW:   "./assets/photography/cw-piano-bw.jpg",
  playing:   "./assets/photography/cw-playing-multi.jpg",
};
window.PHOTO = PHOTO;

const LINKS = {
  bandcamp:  "https://christopherwhitecollective.bandcamp.com/",
  spotify:   "https://open.spotify.com/artist/4KKiSxn0c5E4ZHqMvBvsSR?si=4fIhzwDoTWK4OvSih3oUPw",
  apple:     "https://music.apple.com/gb/artist/christopher-white/7032426",
  instagram: "https://www.instagram.com/christopher.white_/",
  facebook:  "https://www.facebook.com/chriswhitemusic",
  email:     "management@longspaces.com",
};
window.LINKS = LINKS;

const FISHER_POINT = {
  slug:  "fisher-point",
  title: "Fisher Point",
  format: "EP",
  year:  2025,
  releaseDate: "1 October 2025",
  sleeve: "./assets/photography/fisher-point-sleeve.jpg",
  titleBakedIn: true,
  subtitle: "Four pieces · seven players",
  tracks: [
    { title: "Fisher Point",              time: "6:23", src: "./assets/audio/01-fisher-point.mp3" },
    { title: "Cymbal Rush",               time: "6:32", src: "./assets/audio/02-cymbal-rush.mp3" },
    { title: "On Green Dolphin Street",   time: "9:26", src: "./assets/audio/03-on-green-dolphin-street.mp3" },
    { title: "The Slow Down",             time: "4:45", src: "./assets/audio/04-the-slow-down.mp3" },
  ],
  notes: "Four pieces by Christopher White, performed by a septet of saxophone, guitar, piano, bass, drums, and strings. Released 1 October 2025.",
  personnel: [
    ["Christopher White", "Saxophone"],
    ["Dave Delarre",      "Guitar"],
    ["Oli Hayhurst",      "Bass"],
    ["Alex Hutton",       "Piano"],
    ["Neil Bullock",      "Drums"],
    ["Ruby Colley",       "Violin"],
    ["Bryony James",      "Cello"],
  ],
  credits: [
    ["Produced by",         "Christopher White"],
    ["Recording engineer",  "Marc McCouig"],
    ["Mix engineer",        "Aaron Nevezie"],
    ["Mastered by",         "Alex De Turk"],
  ],
};

const RELEASES = [FISHER_POINT];
window.RELEASES = RELEASES;

const COLLABORATORS = [
  "Van Morrison", "Paul McCartney", "Billy Ocean", "Paul Anka", "Taj Mahal",
  "Noel Gallagher", "George Benson", "Gregory Porter", "Michael Bublé",
  "Bobby Womack", "Mavis Staples", "Maceo Parker",
];


/* ---------- A small sleeve-renderer used in three places ---------- */
function Sleeve({ release, size = 1, onClick }) {
  // Renders the album sleeve. Honors `titleBakedIn` — if the artwork
  // already carries the title, we render the photo alone with no overlay.
  const baked = release.titleBakedIn && release.sleeve;
  const padding = size === 2 ? 40 : 28;
  const titleSize = size === 2 ? 80 : 64;
  return (
    <a href={`#/release/${release.slug}`} onClick={e => { e.preventDefault(); onClick && onClick(release); }}
       style={{ border: 0, textDecoration: "none", display: "block" }}>
      <div style={{
        aspectRatio: "1 / 1",
        background: "#0B0908",
        position: "relative", overflow: "hidden", borderRadius: 2,
        boxShadow: "0 32px 64px -24px rgba(0,0,0,0.7)",
      }}>
        {release.sleeve ? (
          <img src={release.sleeve} alt=""
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}/>
        ) : (
          <div style={{ position: "absolute", inset: 0,
                        background: "linear-gradient(135deg,#1A1612 0%, #3D2A1A 100%)" }}/>
        )}
        {!baked && release.sleeve ? (
          <div style={{ position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(11,9,8,0.78) 0%, rgba(11,9,8,0.15) 50%, rgba(11,9,8,0) 80%)" }}/>
        ) : null}
        {!baked ? (
          <div style={{ position: "absolute", inset: 0, padding,
                        display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.32em",
                          textTransform: "uppercase", color: "var(--brass-300)" }}>
              {release.format || "Album"}
            </div>
            <div style={{ fontFamily: "var(--font-display-bold)", fontWeight: 800,
                          fontSize: titleSize, lineHeight: 0.86, color: "var(--halo-100)",
                          letterSpacing: "-0.02em", textTransform: "uppercase",
                          textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>{release.title}</div>
          </div>
        ) : null}
      </div>
    </a>
  );
}


/* =================================================================
   HOME
   ================================================================= */
function HomeScreen({ onNavigate, onPickRelease, heroPhoto = "velvetSax", grain = 0.10 }) {
  return (
    <main data-screen-label="Home">
      {/* HERO */}
      <section className="cwc-hero" style={{ position: "relative", minHeight: "92vh",
                        padding: "120px 36px 80px",
                        display: "flex", flexDirection: "column", justifyContent: "flex-end",
                        overflow: "hidden", background: "var(--night-900)" }}>
        <img src={PHOTO[heroPhoto] || PHOTO.velvetSax} alt=""
             style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "65% center", opacity: 0.95 }}/>
        <div style={{ position: "absolute", inset: 0,
                      background: "linear-gradient(95deg, rgba(11,9,8,0.92) 0%, rgba(11,9,8,0.55) 38%, rgba(11,9,8,0.15) 65%, rgba(11,9,8,0) 100%)" }}/>
        <div style={{ position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(11,9,8,0.85) 0%, rgba(11,9,8,0) 55%)" }}/>
        <div style={{ position: "absolute", inset: 0,
                      backgroundImage: "url(./assets/grain.svg)",
                      opacity: grain, mixBlendMode: "overlay", pointerEvents: "none" }}/>

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 36 }}>
            <LiveIndicator>New EP · Fisher Point</LiveIndicator>
          </div>

          <h1 style={{ fontFamily: "var(--font-display-bold)", fontWeight: 800,
                       fontSize: "clamp(56px, 8.5vw, 136px)", lineHeight: 0.88,
                       letterSpacing: "-0.02em", textTransform: "uppercase",
                       color: "var(--halo-100)", margin: 0,
                       textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}>
            Jazz.<br/>
            Ambient.<br/>
            Cinematic.
          </h1>

          <div className="cwc-hero-bottom" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48,
                        marginTop: 56, alignItems: "end" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 20, lineHeight: 1.55,
                        color: "var(--halo-100)", maxWidth: 44 + "ch", margin: 0 }}>
              The Christopher White Collective explores the intersection of jazz, ambient, and cinematic sounds.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <Button onClick={() => onPickRelease(FISHER_POINT)}>Listen — Fisher Point</Button>
              <Button variant="secondary" href={LINKS.bandcamp}>Bandcamp <Icon name="external" size={14}/></Button>
            </div>
          </div>

          <div className="cwc-photo-credit" style={{ position: "absolute", bottom: -56, right: 0,
                        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em",
                        color: "var(--halo-400)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Photograph — Alice Denny, 2026
          </div>
        </div>
      </section>

      {/* CURRENT RELEASE */}
      <Section eyebrow="Out now · October 2025" title="Fisher Point" dividerBrass>
        <div className="cwc-grid-2" style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 64, alignItems: "center" }}>
          <Sleeve release={FISHER_POINT} size={2} onClick={onPickRelease}/>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 22, lineHeight: 1.65,
                        color: "var(--halo-200)", margin: 0 }}>
              {FISHER_POINT.notes}
            </p>
            <div style={{ display: "flex", gap: 18, marginTop: 32 }}>
              <Button onClick={() => onPickRelease(FISHER_POINT)}>Full tracklist</Button>
              <Button variant="ghost" href={LINKS.bandcamp}>Bandcamp <Icon name="external" size={14}/></Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}


/* =================================================================
   MUSIC
   ================================================================= */
function MusicScreen({ onPickRelease }) {
  return (
    <main data-screen-label="Music">
      <Section eyebrow={`${FISHER_POINT.format} · October 2025`} title="Music" dividerBrass>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 20, lineHeight: 1.6,
                    color: "var(--halo-200)", maxWidth: 56 + "ch", marginBottom: 56 }}>
          The Collective's current recording. Available on Bandcamp and the major streaming services.
        </p>
        <div className="cwc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          <Sleeve release={FISHER_POINT} size={2} onClick={onPickRelease}/>
          <div style={{ paddingTop: 12 }}>
            <Eyebrow>{FISHER_POINT.format} · {FISHER_POINT.year}</Eyebrow>
            <h2 className="cwc-big-title" style={{ fontFamily: "var(--font-display-bold)", fontWeight: 800,
                         fontSize: 72, lineHeight: 0.9, letterSpacing: "-0.02em",
                         textTransform: "uppercase",
                         color: "var(--halo-100)", margin: "12px 0 0" }}>{FISHER_POINT.title}</h2>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 18,
                        color: "var(--halo-200)", marginTop: 12 }}>{FISHER_POINT.subtitle}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.65,
                        color: "var(--halo-300)", marginTop: 24 }}>{FISHER_POINT.notes}</p>
            <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
              <Button onClick={() => onPickRelease(FISHER_POINT)}>Full tracklist</Button>
              <Button variant="ghost" href={LINKS.bandcamp}>Bandcamp <Icon name="external" size={14}/></Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}


/* =================================================================
   RELEASE DETAIL
   ================================================================= */
function ReleaseScreen({ release, onNavigate, playerApi }) {
  const r = release || FISHER_POINT;
  const tracks = r.tracks || [];
  return (
    <main data-screen-label={`Release · ${r.title}`}>
      <Section style={{ paddingTop: 64 }}>
        <button onClick={() => onNavigate("music")}
                style={{ background: "transparent", border: 0, color: "var(--halo-300)",
                         fontFamily: "var(--font-ui)", fontSize: 12, letterSpacing: "0.18em",
                         textTransform: "uppercase", cursor: "pointer", display: "inline-flex",
                         gap: 8, alignItems: "center", padding: 0, marginBottom: 36 }}>
          ← Back to music
        </button>

        <div className="cwc-grid-2" style={{ display: "grid", gridTemplateColumns: "5fr 6fr", gap: 64, alignItems: "start" }}>
          {/* Sleeve */}
          <div>
            <Sleeve release={r}/>
            <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
              <Button href={LINKS.bandcamp}>Listen on Bandcamp <Icon name="external" size={14}/></Button>
              <Button variant="secondary" href={LINKS.spotify}>Spotify</Button>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--halo-400)", marginTop: 16, letterSpacing: "0.06em" }}>
              Cover artwork — Christopher White Collective
            </div>
          </div>

          {/* Content */}
          <div>
            <Eyebrow>{r.format} · {r.releaseDate || r.year}</Eyebrow>
            <h1 className="cwc-big-title" style={{ fontFamily: "var(--font-display-bold)", fontWeight: 800,
                         fontSize: 80, lineHeight: 0.88, letterSpacing: "-0.02em",
                         textTransform: "uppercase",
                         color: "var(--halo-100)", margin: "10px 0 14px" }}>{r.title}</h1>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 20,
                        color: "var(--halo-200)", margin: 0 }}>{r.subtitle}</p>

            <BrassRule style={{ margin: "32px 0 18px" }}/>

            <Tracklist tracks={tracks} releaseSlug={r.slug} playerApi={playerApi}/>

            {r.personnel ? (
              <div style={{ marginTop: 56 }}>
                <Eyebrow>Personnel</Eyebrow>
                <div style={{ marginTop: 16 }}>
                  {r.personnel.map(([name, role]) => (
                    <div key={name} className="cwc-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                                             gap: 16, padding: "10px 0",
                                             borderBottom: "1px solid var(--rule)" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 18,
                                     color: "var(--halo-100)" }}>{name}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic",
                                     fontSize: 15, color: "var(--halo-300)" }}>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {r.credits ? (
              <div style={{ marginTop: 40 }}>
                <Eyebrow>Credits</Eyebrow>
                <div style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 12,
                              color: "var(--halo-200)", lineHeight: 2, letterSpacing: "0.02em" }}>
                  {r.credits.map(([role, name]) => (
                    <div key={role} className="cwc-row-2" style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16 }}>
                      <span style={{ color: "var(--halo-400)" }}>{role}</span>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {r.notes ? (
              <div style={{ marginTop: 40 }}>
                <Eyebrow>Notes</Eyebrow>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.65,
                            color: "var(--halo-200)", marginTop: 16, maxWidth: 60 + "ch" }}>{r.notes}</p>
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  );
}


/* =================================================================
   LIVE
   ================================================================= */
const LIVE_DATES = [
  {
    dayLabel: "Sat 4 Jul",
    year: "2026",
    time: "20:00",
    venue: "Karamel",
    city: "Wood Green, London",
    postcode: "N22 6UJ",
    link: "https://www.musicglue.com/karamel/events/2026-07-04-the-christopher-white-collective-karamel",
    status: "Tickets",
  },
  {
    dayLabel: "Tue 4 Aug", year: "2026", time: "18:00",
    venue: "Goat Ledge", city: "Saint Leonards", postcode: "TN37 6FA",
    link: "https://www.goatledge.com/", status: "Free entry",
  },
  {
    dayLabel: "Sun 9 Aug", year: "2026", time: "13:30",
    venue: "Barnaby's", city: "Hastings", postcode: "TN34 1HL",
    link: "https://barnabyslounge.co.uk/", status: "Free entry",
  },
];
window.LIVE_DATES = LIVE_DATES;

const PAST_DATES_2026 = [
  {
    dayLabel: "Thu 14 May", year: "2026", time: "21:30",
    venue: "The Elgar Room · Royal Albert Hall", city: "London", postcode: "SW7 2AP",
    link: "https://www.royalalberthall.com/tickets/",
  },
  {
    dayLabel: "Fri 13 Mar", year: "2026", time: "19:30",
    venue: "The Verdict", city: "Brighton", postcode: "BN2 0JB",
    link: "https://www.verdictjazz.com/tickets",
  },
  {
    dayLabel: "Thu 26 Feb", year: "2026", time: "20:00",
    venue: "NUR Restaurant & Lounge", city: "Hastings", postcode: "TN34 1HL",
    link: null, lineup: "Featured guest",
  },
  {
    dayLabel: "Fri 20 Feb", year: "2026", time: "19:30",
    venue: "Kino-Teatr", city: "Saint Leonards", postcode: "TN38 0EG",
    link: "https://www.ticketsource.co.uk/kinoteatr/t-zogvkky", lineup: "With Samaki Afrobeat",
  },
  {
    dayLabel: "Sun 15 Feb", year: "2026", time: "13:30",
    venue: "Barnaby's", city: "Hastings", postcode: "TN34 1HL",
    link: null,
  },
];
window.PAST_DATES_2026 = PAST_DATES_2026;

function BookingForm() {
  const [data, setData] = useState({ name: "", email: "", venue: "", when: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const update = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div style={{ borderTop: "1px solid var(--brass-500)", paddingTop: 24 }}>
        <Eyebrow>Sent</Eyebrow>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 24,
                    color: "var(--halo-100)", marginTop: 12, lineHeight: 1.3 }}>
          Thank you — your enquiry is on its way. We'll reply within a few working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Field label="Your name"           value={data.name}    onChange={update("name")}/>
      <Field label="Your email"          value={data.email}   onChange={update("email")} type="email"/>
      <Field label="Venue or promoter"   value={data.venue}   onChange={update("venue")}/>
      <Field label="When"                value={data.when}    onChange={update("when")} placeholder="Approximate date or window"/>
      <Field label="Anything else"       value={data.message} onChange={update("message")} placeholder="Optional"/>
      <div style={{ marginTop: 8, display: "flex", gap: 16, alignItems: "center" }}>
        <Button onClick={submit}>{status === "sending" ? "Sending…" : "Send enquiry"}</Button>
        {status === "error" ? (
          <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 14, color: "var(--ember-500)" }}>
            Couldn't send. Try emailing management@longspaces.com directly.
          </span>
        ) : null}
      </div>
    </form>
  );
}

function ProgrammeScreen() {
  // shared row renderer for both upcoming + past
  const renderRow = (ev, i, isPast = false) => {
    const tagColor = isPast
      ? "var(--halo-400)"
      : (ev.status === "Tickets" ? "var(--brass-300)" : "var(--halo-300)");
    const tagLabel = isPast ? "Played" : ev.status;
    const baseColor = isPast ? "var(--halo-400)" : "var(--halo-100)";
    const subColor  = isPast ? "var(--halo-400)" : "var(--halo-300)";
    const RowTag = ev.link ? "a" : "div";
    const rowProps = ev.link
      ? { href: ev.link, target: "_blank", rel: "noopener" }
      : {};
    return (
      <RowTag key={i} {...rowProps} className="cwc-progrow"
         style={{ display: "grid", gridTemplateColumns: "150px 1fr auto auto",
                  gap: 32, padding: "24px 0",
                  borderTopWidth: i === 0 ? 1 : 0, borderTopStyle: "solid",
                  borderTopColor: "var(--rule-strong)",
                  borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "var(--rule)",
                  alignItems: "center",
                  textDecoration: "none", color: "inherit", border: 0,
                  transition: "background 180ms ease",
                  opacity: isPast ? 0.7 : 1 }}
         onMouseEnter={ev.link ? (e => e.currentTarget.style.background = "var(--night-700)") : undefined}
         onMouseLeave={ev.link ? (e => e.currentTarget.style.background = "transparent") : undefined}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: baseColor,
                         letterSpacing: "0.02em" }}>{ev.dayLabel}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--halo-400)",
                         letterSpacing: "0.04em" }}>{ev.year} · {ev.time}</span>
        </div>
        <div>
          <div className="cwc-progrow-venue" style={{ fontFamily: "var(--font-display-bold)", fontWeight: 800,
                        fontSize: isPast ? 28 : 36,
                        lineHeight: 0.95, letterSpacing: "-0.015em", textTransform: "uppercase",
                        color: baseColor }}>{ev.venue}</div>
          <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 15,
                        color: subColor, marginTop: 6 }}>
            {ev.city} · {ev.postcode}{ev.lineup ? ` — ${ev.lineup}` : ""}
          </div>
        </div>
        <span className="cwc-prog-status" style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500,
                       letterSpacing: "0.22em", textTransform: "uppercase",
                       color: tagColor }}>{tagLabel}</span>
        {ev.link
          ? <Icon name="arrowRight" size={18} style={{ color: isPast ? "var(--halo-400)" : "var(--halo-300)" }}/>
          : <span style={{ width: 18 }}/>}
      </RowTag>
    );
  };

  return (
    <main data-screen-label="Live">
      <Section eyebrow="Upcoming" title="Live" dividerBrass>
        <div>{LIVE_DATES.map((ev, i) => renderRow(ev, i, false))}</div>
      </Section>

      <Section eyebrow="Past · 2026" title="Programme">
        <div>{PAST_DATES_2026.map((ev, i) => renderRow(ev, i, true))}</div>
      </Section>

      <Section eyebrow="Booking" title="For promoters">
        <div className="cwc-grid-2-loose" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", paddingLeft: 32 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.65,
                      color: "var(--halo-200)", margin: 0, maxWidth: 44 + "ch" }}>
            The Collective performs as a quartet, quintet, or with strings. Enquiries for private and venue performances are welcomed.
          </p>
          <BookingForm/>
        </div>
      </Section>
    </main>
  );
}


/* =================================================================
   ABOUT
   ================================================================= */
function AboutScreen() {
  return (
    <main data-screen-label="About">
      <Section eyebrow="Christopher White" title="A working ensemble" dividerBrass>
        <div className="cwc-grid-2-loose" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 64, paddingLeft: 32 }}>
          <div style={{
            aspectRatio: "4 / 5",
            background: "#0B0908",
            position: "relative", overflow: "hidden", borderRadius: 2,
          }}>
            <img src={PHOTO.portrait} alt="Christopher White"
                 style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "center 25%" }}/>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "38%",
                          background: "linear-gradient(to top, rgba(11,9,8,0.85), transparent)" }}/>
            <div style={{ position: "absolute", left: 24, bottom: 22 }}>
              <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 14,
                             color: "var(--halo-200)" }}>Christopher White, 2026</span>
            </div>
            {/* vertical photo credit — mirrors the hero */}
            <div style={{ position: "absolute", right: 12, bottom: 22,
                          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em",
                          color: "var(--halo-400)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              Photograph — Alice Denny, 2026
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 22, lineHeight: 1.65,
                        color: "var(--halo-100)", margin: 0 }}>
              Christopher White served for many years as the musical director, arranger, and saxophonist for Van Morrison, and has been a presence in the London music scene since moving to the UK nearly three decades ago.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.65,
                        color: "var(--halo-200)", marginTop: 24 }}>
              As a saxophonist, he has performed and recorded with a remarkable range of artists including Paul McCartney, Billy Ocean, Paul Anka, Taj Mahal, Noel Gallagher, George Benson, Gregory Porter, Michael Bublé, Bobby Womack, Mavis Staples, and Maceo Parker.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.65,
                        color: "var(--halo-200)", marginTop: 24 }}>
              Christopher composes for film and television and leads his own ensemble, <span style={{ fontStyle: "italic" }}>Christopher White Collective</span> — a project that explores the intersection of jazz, ambient, and cinematic sound worlds.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Contact" title="Get in touch" dividerBrass>
        <div className="cwc-contact-grid" style={{ paddingLeft: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 20, lineHeight: 1.6, color: "var(--halo-200)", margin: 0 }}>
              The Collective is represented by <span style={{ color: "var(--halo-100)" }}>Longspaces</span>.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 16, lineHeight: 1.6, color: "var(--halo-300)", marginTop: 14, maxWidth: 44 + "ch" }}>
              For bookings, press, and general enquiries.
            </p>
            <a href={`mailto:${LINKS.email}`}
               style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--brass-300)", marginTop: 22, display: "inline-block", letterSpacing: "0.02em", border: 0, textDecoration: "none" }}>
              {LINKS.email}
            </a>
          </div>
          <div>
            <Eyebrow>Elsewhere</Eyebrow>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column" }}>
              {[
                ["Instagram",   LINKS.instagram],
                ["Facebook",    LINKS.facebook],
                ["Bandcamp",    LINKS.bandcamp],
                ["Spotify",     LINKS.spotify],
                ["Apple Music", LINKS.apple],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener"
                   style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
                            padding: "14px 0", borderBottom: "1px solid var(--rule)",
                            fontFamily: "var(--font-display)", fontSize: 22, color: "var(--halo-100)",
                            textDecoration: "none", border: 0, borderBottom: "1px solid var(--rule)" }}>
                  <span>{label}</span>
                  <Icon name="external" size={14} style={{ color: "var(--halo-400)" }}/>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

/* =================================================================
   VIDEO
   ================================================================= */
// Replace each entry's `id` with the YouTube video ID once received.
// Keep entries with empty ids — they render as styled placeholders so the
// page composition stays intact while content is pending.
const VIDEOS = [
  { id: "n3L0ZnX3vHI" },
  { id: "2m5QvcWVHsM" },
  { id: "buNXkFRImyM" },
  { id: "3ri4FOkwMew" },
  { id: "4rwfmE9Unvs" },
  { id: "1coTm6noh6w" },
  { id: "tVykuY53KCQ" },
  { id: "mxvn74g01Pk" },
  { id: "M1OrHb84Xj4" },
  { id: "hjWqUWP0G_M" },
];
window.VIDEOS = VIDEOS;

function VideoScreen() {
  const [idx, setIdx] = useState(0);
  const [titles, setTitles] = useState(() => VIDEOS.map(() => null));
  const v = VIDEOS[idx];
  const go = (delta) => setIdx((i) => (i + delta + VIDEOS.length) % VIDEOS.length);

  // keyboard arrows for flicking
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "ArrowRight") go(+1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fetch YouTube titles via noembed (CORS-friendly oEmbed wrapper).
  useEffect(() => {
    let cancelled = false;
    Promise.all(VIDEOS.map(vid =>
      fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid.id}`)
        .then(r => r.ok ? r.json() : null)
        .then(j => (j && j.title) || null)
        .catch(() => null)
    )).then(t => { if (!cancelled) setTitles(t); });
    return () => { cancelled = true; };
  }, []);

  return (
    <main data-screen-label="Video">
      <Section eyebrow="Watch" title="Video" dividerBrass>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* MAIN PLAYER */}
          <div style={{
            aspectRatio: "16 / 9",
            background: "#0B0908",
            position: "relative", overflow: "hidden", borderRadius: 2,
            boxShadow: "0 32px 64px -24px rgba(0,0,0,0.7)",
            border: "1px solid var(--rule)",
          }}>
            {v.id ? (
              <iframe
                key={v.id}
                src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0,
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                            gap: 14,
                            background: "linear-gradient(135deg, #1A1612 0%, #0B0908 100%)" }}>
                <div style={{ position: "absolute", inset: 0,
                              background: "radial-gradient(50% 60% at 50% 50%, rgba(201,162,74,0.10), transparent 70%)" }}/>
                <Icon name="play" size={40} style={{ color: "var(--halo-300)" }}/>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 11,
                              letterSpacing: "0.30em", textTransform: "uppercase",
                              color: "var(--halo-400)" }}>Placeholder · awaiting video</div>
              </div>
            )}
          </div>

          {/* COUNTER + TRANSPORT */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--halo-100)",
                             fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>
                {String(idx + 1).padStart(2, "0")}
                <span style={{ color: "var(--halo-400)" }}> / {String(VIDEOS.length).padStart(2, "0")}</span>
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 14,
                             color: "var(--halo-300)" }}>{titles[idx] || "Live performance — Christopher White Collective"}</span>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <button onClick={() => go(-1)} aria-label="Previous video"
                      style={transportPill}><Icon name="prev" size={18}/></button>
              <button onClick={() => go(+1)} aria-label="Next video"
                      style={transportPill}><Icon name="next" size={18}/></button>
            </div>
          </div>

          {/* THUMBNAIL GRID */}
          <div className="cwc-video-thumbs" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {VIDEOS.map((thumb, i) => {
              const isCur = i === idx;
              return (
                <button key={i} onClick={() => setIdx(i)}
                        style={{ background: "transparent", border: 0, padding: 0,
                                 cursor: "pointer", textAlign: "left",
                                 opacity: isCur ? 1 : 0.65, transition: "opacity 180ms ease" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = isCur ? 1 : 0.65}>
                  <div style={{
                    aspectRatio: "16 / 9",
                    background: thumb.id ? "#000" : "linear-gradient(135deg, #1A1612 0%, #0B0908 100%)",
                    position: "relative", overflow: "hidden", borderRadius: 2,
                    outline: isCur ? "1px solid var(--brass-500)" : "1px solid var(--rule)",
                    outlineOffset: isCur ? 2 : 0,
                  }}>
                    {thumb.id ? (
                      <img src={`https://img.youtube.com/vi/${thumb.id}/hqdefault.jpg`} alt=""
                           loading="lazy"
                           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}/>
                    ) : (
                      <div style={{ position: "absolute", inset: 0,
                                    display: "grid", placeItems: "center", color: "var(--halo-400)" }}>
                        <Icon name="play" size={20}/>
                      </div>
                    )}
                    {isCur ? (
                      <div style={{ position: "absolute", inset: 0,
                                    background: "linear-gradient(to top, rgba(11,9,8,0.55) 0%, transparent 60%)" }}/>
                    ) : null}
                    <div style={{ position: "absolute", left: 8, bottom: 6,
                                  fontFamily: "var(--font-mono)", fontSize: 10,
                                  letterSpacing: "0.06em",
                                  color: isCur ? "var(--brass-300)" : "var(--halo-200)",
                                  textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500,
                                letterSpacing: "0.01em",
                                color: isCur ? "var(--halo-100)" : "var(--halo-300)",
                                marginTop: 10, lineHeight: 1.35,
                                display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2,
                                overflow: "hidden" }}>
                    {titles[i] || "—"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Section>
    </main>
  );
}
const transportPill = {
  background: "transparent",
  border: "1px solid var(--rule-strong)",
  color: "var(--halo-200)",
  width: 44, height: 44, borderRadius: 2,
  cursor: "pointer",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  transition: "color 180ms ease, border-color 180ms ease",
};


Object.assign(window, { HomeScreen, MusicScreen, ReleaseScreen, ProgrammeScreen, AboutScreen, VideoScreen });

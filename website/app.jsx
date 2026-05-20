/* app.jsx — top-level shell + hash router for the website UI kit. */

const { useState, useEffect, useRef } = React;

function parseHash() {
  const h = window.location.hash || "#/";
  const m = h.match(/^#\/release\/([^/?]+)/);
  if (m) return { route: "release", slug: m[1] };
  const r = h.replace(/^#\//, "") || "home";
  return { route: r, slug: null };
}

/* ---------- useAudioPlayer ----------
   A small global player. One <Audio> element, one piece of state.
   Any component that wants playback calls playerApi.playTrack(slug, idx)
   — the Tracklist + footer Player share the same source of truth. */
function useAudioPlayer() {
  const audioRef = useRef(null);
  if (!audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";
  }
  const a = audioRef.current;

  const [state, setState] = useState({
    releaseSlug: null,
    trackIdx: -1,
    title: "",
    subtitle: "",
    isPlaying: false,
    position: 0,
    duration: 0,
  });

  useEffect(() => {
    const onTime = () => setState(s => ({ ...s, position: a.currentTime }));
    const onLoad = () => setState(s => ({ ...s, duration: a.duration }));
    const onPlay = () => setState(s => ({ ...s, isPlaying: true }));
    const onPause = () => setState(s => ({ ...s, isPlaying: false }));
    const onEnd = () => {
      // auto-advance within current release
      setState(s => {
        const rel = window.RELEASES.find(r => r.slug === s.releaseSlug);
        if (!rel || s.trackIdx + 1 >= rel.tracks.length) {
          return { ...s, isPlaying: false, position: 0 };
        }
        // fire-and-forget the advance after returning current state
        setTimeout(() => playTrack(s.releaseSlug, s.trackIdx + 1), 0);
        return s;
      });
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoad);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoad);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playTrack = (releaseSlug, idx) => {
    const release = window.RELEASES.find(r => r.slug === releaseSlug);
    if (!release) return;
    const track = release.tracks[idx];
    if (!track || !track.src) return;

    setState(s => {
      // Same track → toggle
      if (s.releaseSlug === releaseSlug && s.trackIdx === idx) {
        if (a.paused) a.play().catch(() => {});
        else         a.pause();
        return s;
      }
      // New track → load and play
      a.src = track.src;
      a.currentTime = 0;
      a.play().catch(() => {});
      return {
        ...s,
        releaseSlug, trackIdx: idx,
        title: track.title,
        subtitle: `${release.title} · ${String(idx + 1).padStart(2, "0")}`,
        isPlaying: true,
        position: 0,
        duration: 0,
      };
    });
  };

  const togglePlay = () => {
    // Nothing loaded? Start at first track of Fisher Point.
    if (state.trackIdx === -1) {
      playTrack("fisher-point", 0);
      return;
    }
    if (a.paused) a.play().catch(() => {});
    else         a.pause();
  };

  const goRelative = (delta) => {
    if (state.releaseSlug === null) {
      playTrack("fisher-point", 0);
      return;
    }
    const release = window.RELEASES.find(r => r.slug === state.releaseSlug);
    if (!release) return;
    const len = release.tracks.length;
    const nextIdx = (state.trackIdx + delta + len) % len;
    playTrack(state.releaseSlug, nextIdx);
  };

  const seek = (pct) => {
    if (a.duration) a.currentTime = Math.max(0, Math.min(a.duration, a.duration * pct));
  };

  return {
    state,
    playTrack,
    togglePlay,
    prev: () => goRelative(-1),
    next: () => goRelative(+1),
    seek,
  };
}

function App() {
  const [state, setState] = useState(parseHash());
  const playerApi = useAudioPlayer();

  useEffect(() => {
    const onHash = () => setState(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const onNavigate = (route) => {
    window.location.hash = "#/" + (route === "home" ? "" : route);
  };
  const onPickRelease = (release) => {
    window.location.hash = "#/release/" + release.slug;
  };

  const activeNav = state.route === "release" ? "music" : state.route;
  const release   = state.route === "release"
    ? (window.RELEASES.find(r => r.slug === state.slug) || window.RELEASES[0])
    : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--night-800)", display: "flex", flexDirection: "column" }}>
      <Nav route={activeNav} onNavigate={onNavigate}/>
      <div style={{ flex: 1 }}>
        {state.route === "home"      && <HomeScreen      onNavigate={onNavigate} onPickRelease={onPickRelease} playerApi={playerApi}/>}
        {state.route === "music"     && <MusicScreen     onPickRelease={onPickRelease}/>}
        {state.route === "video"     && <VideoScreen/>}
        {state.route === "release"   && <ReleaseScreen   release={release} onNavigate={onNavigate} playerApi={playerApi}/>}
        {state.route === "programme" && <ProgrammeScreen/>}
        {state.route === "about"     && <AboutScreen/>}
      </div>
      <Footer/>
      <Player playerApi={playerApi}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

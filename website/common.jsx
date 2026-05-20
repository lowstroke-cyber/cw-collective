/* common.jsx — primitives used across the Collective website kit.
   Loaded into window so the next scripts can use them. */

const { useState, useEffect, useRef } = React;

/* ---------- Icon (Lucide-style inline SVG, 1.5px stroke) ---------- */
function Icon({ name, size = 18, stroke = 1.5, style }) {
  const paths = {
    play: <polygon points="6 3 20 12 6 21 6 3" />,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    prev: <><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></>,
    next: <><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></>,
    volume: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    external: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    youtube: <><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></>,
    bandcamp: <><path d="M3 5h18l-6 14H3z"/></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke}
         strokeLinecap="round" strokeLinejoin="round"
         style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      {paths[name] || null}
    </svg>
  );
}

/* ---------- Button ---------- */
function Button({ variant = "primary", surface = "night", children, onClick, href, style }) {
  const base = {
    fontFamily: "var(--font-ui)",
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: "0.04em",
    padding: "12px 22px",
    borderRadius: 2,
    border: 0,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    transition: "all 180ms ease",
  };
  const styles = {
    night: {
      primary:   { background: "var(--halo-100)", color: "var(--night-900)" },
      secondary: { background: "transparent", color: "var(--halo-100)", border: "1px solid var(--rule-strong)" },
      ghost:     { background: "transparent", color: "var(--halo-100)", padding: "12px 0", borderBottom: "1px solid var(--brass-500)", borderRadius: 0 },
    },
    paper: {
      primary:   { background: "var(--ink-900)", color: "var(--paper-50)" },
      secondary: { background: "transparent", color: "var(--ink-900)", border: "1px solid var(--ink-900)" },
      ghost:     { background: "transparent", color: "var(--ink-900)", padding: "12px 0", borderBottom: "1px solid var(--brass-600)", borderRadius: 0 },
    },
  };
  const merged = { ...base, ...styles[surface][variant], ...style };
  const Tag = href ? "a" : "button";
  return (
    <Tag style={merged} onClick={onClick} href={href}
         onMouseEnter={e => { if (variant === "primary") e.currentTarget.style.background = surface === "night" ? "var(--brass-300)" : "var(--wine-700)"; }}
         onMouseLeave={e => { if (variant === "primary") e.currentTarget.style.background = surface === "night" ? "var(--halo-100)" : "var(--ink-900)"; }}>
      {children}
    </Tag>
  );
}

/* ---------- Field (under-rule input) ---------- */
function Field({ label, type = "text", value, onChange, placeholder, surface = "night" }) {
  const [focused, setFocused] = useState(false);
  const onNight = surface === "night";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 500, fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: onNight ? "var(--halo-300)" : "var(--ink-500)",
      }}>{label}</span>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          background: "transparent",
          border: 0,
          borderBottom: `1px solid ${focused ? "var(--brass-500)" : (onNight ? "var(--rule-strong)" : "rgba(26,21,18,0.22)")}`,
          padding: "10px 0",
          color: onNight ? "var(--halo-100)" : "var(--ink-900)",
          fontFamily: "var(--font-body)",
          fontSize: 18,
          outline: "none",
        }}
      />
    </label>
  );
}

/* ---------- LiveIndicator ---------- */
function LiveIndicator({ children = "Now Playing" }) {
  return (
    <span className="cwc-live">
      <span className="cwc-live-dot" />
      {children}
    </span>
  );
}

/* ---------- Eyebrow + Rule ---------- */
function Eyebrow({ children, surface = "night", style }) {
  return (
    <div style={{
      fontFamily: "var(--font-ui)",
      fontWeight: 500, fontSize: 12, letterSpacing: "0.20em",
      textTransform: "uppercase",
      color: surface === "night" ? "var(--halo-300)" : "var(--ink-500)",
      ...style,
    }}>{children}</div>
  );
}

function BrassRule({ style }) {
  return <div style={{ height: 1, background: "var(--brass-500)", ...style }} />;
}

function HairRule({ surface = "night", style }) {
  return <div style={{ height: 1, background: surface === "night" ? "var(--rule)" : "rgba(26,21,18,0.10)", ...style }} />;
}

/* ---------- Wordmark (inline so it picks up currentColor) ---------- */
function Wordmark({ size = "md", surface = "night" }) {
  const onNight = surface === "night";
  const heroSize = { sm: 18, md: 22, lg: 56, xl: 96 }[size] || 22;
  const subSize  = { sm: 8,  md: 9,  lg: 12, xl: 14 }[size] || 9;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
      <span style={{
        fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
        fontSize: heroSize, color: onNight ? "var(--halo-100)" : "var(--ink-900)",
        letterSpacing: "-0.01em",
      }}>Christopher White</span>
      <span style={{
        fontFamily: "var(--font-ui)", fontWeight: 500,
        fontSize: subSize, letterSpacing: "0.32em", textTransform: "uppercase",
        color: onNight ? "var(--halo-300)" : "var(--ink-700)",
        marginTop: size === "lg" || size === "xl" ? 8 : 4,
      }}>Collective</span>
    </div>
  );
}

Object.assign(window, { Icon, Button, Field, LiveIndicator, Eyebrow, BrassRule, HairRule, Wordmark });

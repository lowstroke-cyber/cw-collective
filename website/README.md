# Website UI kit — Christopher White Collective

This is the high-fidelity recreation of the **cwc.london** website (working title). It demonstrates the Collective's brand applied to the primary product: a marketing / information / music site. Open `index.html` to see the click-thru.

## Screens
- **Home** — hero with wordmark, current release, residency banner, next dates strip, footer.
- **Music** — discography grid (releases) + a featured release block + Bandcamp-style player chrome.
- **Release detail** — full tracklist with player, liner notes, personnel, press quotes.
- **Programme** — gig listings by month, with status pills (on sale, few left, sold out).
- **About** — bio, selected collaborators list, contact panel.

## Components (JSX files)
- `Nav.jsx` — sticky top nav with backdrop blur.
- `Footer.jsx` — colophon footer with brass top rule.
- `Player.jsx` — persistent footer player chrome (mocked, non-functional but interactive).
- `LiveIndicator.jsx` — ember pulse pill.
- `Button.jsx`, `Field.jsx` — primitive controls.
- `Tracklist.jsx` — table component with current-track brass marker.
- `ReleaseCard.jsx`, `ProgrammeRow.jsx`, `PressQuote.jsx`, `Section.jsx` — content blocks.
- `Screens.jsx` — the five screen compositions, each a default export.
- `App.jsx` — router + shell.

## How to read
`index.html` loads React + Babel, then `common.jsx`, then `components.jsx`, then `screens.jsx`, then `app.jsx`. Each script writes its exports to `window` so the next script can pick them up. State is hash-routed (`#/music`, `#/release/night-pieces`, etc).

## Caveats
- **No real photography.** Hero and release artwork are typeset placeholders that demonstrate the layout — replace with real shots when available.
- **Player is non-functional.** It's pure chrome to show the always-on element style.
- **Bio copy is a credible placeholder** based on the brief; the brand owner should rewrite.

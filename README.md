# Doge Whale Game

Browser game for **DWHL** holders: fly a doge-whale through pipes, fight enemy whales, and (in the full suite) use spinner / lottery / store overlays.

Static HTML + Canvas — no build step required.

## Quick start

```bash
# Option A — any static server from the repo root
npx --yes serve .
# then open http://localhost:3000/

# Option B — Python
python3 -m http.server 8080
# then open http://localhost:8080/

# Option C — npm scripts
npm start
```

Or open `index.html` in a modern browser (some browsers restrict local audio / CORS for remote images).

| Entry | Description |
|-------|-------------|
| [`index.html`](./index.html) | Root entry → `game/index.html` |
| [`game/index.html`](./game/index.html) | Canonical playable entry → [`playable1.html`](./playable1.html) |
| [`game/full-suite.html`](./game/full-suite.html) | Full UI suite entry → [`woekinggame.html`](./woekinggame.html) |
| [`playable1.html`](./playable1.html) | **Canonical playable build** (combat + animations + CDN sprites) |
| [`woekinggame.html`](./woekinggame.html) | Full suite (play + spinner + lottery + store + admin + leaderboard) |

## Controls

- **Space / ↑** — jump / flap
- **↓** — dive
- **F** — fire
- **S** — special attack (when power is charged)
- On-screen buttons for mobile

## Project structure

```
.
├── index.html              # Root redirect → game/
├── package.json            # Optional static-serve scripts
├── .gitignore
├── playable1.html          # Canonical playable (self-contained)
├── woekinggame.html        # Full suite (legacy typo filename preserved)
├── game/
│   ├── index.html          # Entry → ../playable1.html
│   └── full-suite.html     # Entry → ../woekinggame.html
├── src/js/                 # Extracted whale animation modules
│   ├── animation_integration.js
│   ├── main_whale_swim.js
│   ├── main_whale_attack.js
│   ├── enemy_whale_swim.js
│   └── enemy_whale_attack.js
└── prototypes/             # Named entry points → legacy root prototypes
    └── README.md
```

> Note: playable HTML files are self-contained (animations inlined). `src/js/` holds the extracted counterparts for future modularization — not yet wired into the HTML builds.

> Note: large legacy HTML builds remain at repo root (byte-identical). `game/` and `prototypes/` provide stable entry names and redirects without changing gameplay.

## Roadmap (cleanup follow-ups)

1. Move `playable1.html` → `game/playable.html` and `woekinggame.html` → `game/full-suite.html` as byte-identical copies; then delete root duplicates / fix the `woekinggame` typo in the path.
2. Wire `src/js/` into the playable HTML (drop duplicated inline animation blocks).
3. Vendor or host whale sprites in-repo (today: CDN URLs; full-suite also has broken local `/home/ubuntu/...` image paths).
4. Relocate remaining root prototypes (`dogewhale1.html`, `master.html`, `playable.html`, spinner/lottery HTML) fully under `prototypes/` and remove root copies.
5. Split CSS / JS from monolith HTML without changing gameplay.
6. Add a minimal smoke check (load page, canvas present).
7. Clarify spinner / lottery / store as demo UI vs on-chain (no secrets / no wallet keys in this repo).

## License

No license file yet — all rights reserved by the repository owner unless stated otherwise.

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
```

Or open `index.html` / `game/index.html` directly in a modern browser (some browsers restrict local audio / CORS for remote images).

| Entry | Description |
|-------|-------------|
| [`index.html`](./index.html) | Redirects to the canonical playable game |
| [`game/index.html`](./game/index.html) | **Canonical playable** (combat + animations + CDN sprites) |
| [`game/full-suite.html`](./game/full-suite.html) | Full UI suite (play + spinner + lottery + store + admin + leaderboard) |

## Controls

- **Space / ↑** — jump / flap  
- **↓** — dive  
- **F** — fire  
- **S** — special attack (when power is charged)  
- On-screen buttons for mobile

## Project structure

```
.
├── index.html                 # Entry redirect
├── package.json               # Optional static-serve scripts
├── game/
│   ├── index.html             # Canonical playable build
│   └── full-suite.html        # Full feature suite build
├── src/js/                    # Extracted whale animation modules
│   ├── animation_integration.js
│   ├── main_whale_swim.js
│   ├── main_whale_attack.js
│   ├── enemy_whale_swim.js
│   └── enemy_whale_attack.js
└── prototypes/                # Earlier / experimental HTML builds
    └── README.md
```

> Note: the playable HTML files are currently self-contained (animations inlined). The `src/js/` modules are the extracted counterparts for future modularization — they are not yet wired into `game/*.html`.

## Roadmap (cleanup follow-ups)

1. Wire `src/js/` into `game/index.html` (drop duplicated inline animation blocks).  
2. Vendor or host whale sprites in-repo (today: CDN / broken local `/home/ubuntu/...` paths in full-suite).  
3. Split CSS / JS from monolith HTML without changing gameplay.  
4. Add a minimal automated smoke check (load page, canvas present).  
5. Clarify spinner / lottery / store as demo UI vs on-chain (no secrets / no wallet keys in this repo).

## License

No license file yet — all rights reserved by the repository owner unless stated otherwise.

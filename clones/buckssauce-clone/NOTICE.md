# NOTICE — vendored & rebranded

This template is an internal Axelnova rebrand of an upstream MIT project.

- **Upstream:** https://github.com/JCodesMore/ai-website-cloner-template
- **Upstream author / copyright:** JCodesMore — © 2025 (see `LICENSE`, retained unmodified)
- **License:** MIT (permits private use, modification, and rebranding; requires keeping the
  copyright + license notice, which `LICENSE` does)
- **Vendored from commit:** `8dd9cb47dde0d49fec06ee1d69bedd04840f3c95`

## Changes made in this internal copy
- Renamed package/project to `axelnova-web-cloner`; README rebranded to Axelnova.
- Removed non-Claude AI-harness configs (`.cursor`, `.codex`, `.gemini`, `.aider`, `.augment`,
  `.continue`, `.opencode`, `.windsurf`, `.amazonq`, `.clinerules`, `.windsurfrules`, `GEMINI.md`,
  and `.github/copilot-*` + `.github/skills/`) since Axelnova runs Claude Code only. Re-running
  `scripts/sync-*.mjs`/`.sh` would regenerate them.
- Dropped upstream `.git` history (lives as a subfolder of `axelnova-tools`).

The `/clone-website` skill is also vendored separately at
`axelnova-tools/skills/web/clone-website` (that copy has its own `SOURCE.md`).

## Refresh from upstream
```bash
tmp=$(mktemp -d) && git clone --depth 1 https://github.com/JCodesMore/ai-website-cloner-template "$tmp"
# review upstream changes, then selectively copy what you want, preserving this NOTICE.md,
# the rebranded README.md/package.json, and the Claude-only trimming. Update the commit SHA above.
```

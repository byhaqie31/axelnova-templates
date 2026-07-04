# Axelnova Web Cloner

> **Axelnova internal template.** A pre-scaffolded Next.js 16 + shadcn/ui + Tailwind v4 project
> for reverse-engineering any website into a clean, modern codebase with Claude Code.
> Trimmed to Claude-only (other AI-harness configs removed). Vendored inside `axelnova-tools`.

## Use it

This is a **starting-point project you copy**, not a skill you run in place. To clone a site:

```bash
# 1. Copy the template out to a fresh project
cp -R ~/Developer/axelnova-tools/templates/axelnova-web-cloner ~/Developer/my-clone
cd ~/Developer/my-clone && git init && npm install

# 2. Launch Claude Code with Browser MCP, then run the skill
claude --chrome
# inside Claude Code:
/clone-website https://target-site.com
```

The `/clone-website` skill inspects the site, extracts design tokens + assets, writes
component specs, and dispatches parallel builder agents to rebuild every section. The skill
itself is also installed **globally** via `axelnova-tools` (`skills/web/clone-website`), so
`/clone-website` is available in any compatible Next.js project — this template just gives you
the scaffold it expects.

## Requirements

- **Claude Code** with a Browser MCP (`claude --chrome`) — the skill drives a real browser.
- **Node ≥ 24** (`npm install` before first run).
- The Next.js 16 + shadcn/ui + Tailwind v4 base — already scaffolded here.

## Stack

Next.js 16 (App Router, React 19, TypeScript strict) · shadcn/ui (Radix + Tailwind v4, oklch
tokens) · Lucide icons · Docker support. See `AGENTS.md` for the full working contract the
agents follow, and `docs/research/INSPECTION_GUIDE.md` for what gets captured.

## Credits & license

Based on **[ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)**
by **JCodesMore**, MIT-licensed. The original `LICENSE` (© 2025 JCodesMore) is retained in this
folder as required. Rebranding is internal only — see `NOTICE.md` for provenance and how to pull
upstream updates. Use only for legitimate work (migrations, recovering lost source, learning) —
never to impersonate or pass off others' work as original.

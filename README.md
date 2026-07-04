# axelnova-templates

Axelnova's **library of project templates and website clones** — one repo, synced across every device via git.

## Layout

```
templates/                       ← reusable project starters (copy one to begin a new project)
└── fullstack-nuxt-laravel/      Nuxt 4 + Laravel 11 + Puppeteer PDF monorepo (Docker + VPS deploy)

clones/                          ← generated website clones (output of the clone-website skill)
└── buckssauce-clone/            Next.js clone of buckssauce.com
```

## Use on a new device

```bash
git clone https://github.com/byhaqie31/axelnova-templates.git ~/Developer/axelnova-templates
```

Then, for whichever project you want to run, install its deps first (`node_modules` is **not** committed):

```bash
cd ~/Developer/axelnova-templates/clones/buckssauce-clone
npm install && npm run dev
```

## Add a new website clone

Build it standalone first (so the clone-website skill's git-worktree builders work), then drop the finished result in here:

```bash
# 1. scaffold + clone in a temp working folder
cp -R ~/Developer/axelnova-tools/templates/axelnova-web-cloner ~/Developer/_wip-clone
cd ~/Developer/_wip-clone && npm install
#    connect Chrome, then run:  /clone-website https://target.com/

# 2. when it's done, archive it into this repo (drop the working .git)
rm -rf ~/Developer/_wip-clone/.git
mv ~/Developer/_wip-clone ~/Developer/axelnova-templates/clones/target-clone
git add clones/target-clone && git commit -m "Add clone: target.com"
```

## Notes

- **Not a deployable repo.** The old root deploy pipeline (`deploy.yml`, `build-check.yml`) was moved under `templates/fullstack-nuxt-laravel/.github/` — preserved for that template, but inert here (GitHub Actions only runs workflows at the repo root). This repo is a passive library; pushing it deploys nothing.
- `node_modules/` and `.next/` are gitignored — run `npm install` per project, per device.

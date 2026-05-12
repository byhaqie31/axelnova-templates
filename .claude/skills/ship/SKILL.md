---
name: ship
description: Branch + commit + push + open PR in one go. Use when the user wants to ship current changes — phrases like "ship this", "create branch, commit, push, and PR", "let's get this merged", "open a PR with these changes". Assumes commits aren't made yet — staged or unstaged changes are in the working tree.
---

# Ship: branch → commit → push → PR

## When to use
User has uncommitted changes (staged or unstaged) and wants them on a new branch with a PR opened against the default branch.

## Workflow

1. **Inspect state** — run in parallel:
   - `git status` (see what's staged/unstaged)
   - `git branch --show-current` (where we are)
   - `git log -3 --oneline` (recent commit message style)
   - `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'` (default base branch)

2. **Branch decision**:
   - If on default branch (main/master/uat): create a new branch — name it `<prefix>/<kebab-summary>` where prefix is `feat`/`fix`/`chore`/`docs` based on the change.
   - If already on a feature branch: ask user "Continue committing to this branch or create a new one?"
   - Use `git stash` → `git checkout -b <new>` → `git stash pop` to move uncommitted work.

3. **Stage and commit**:
   - If changes span multiple concerns, propose splitting into multiple commits and stage them one group at a time.
   - Use HEREDOC for commit messages — match repo's existing style (Conventional Commits is common: `feat:`, `fix:`, etc.).
   - Never include `Co-Authored-By` unless the user explicitly asks.
   - Never include sensitive files (`.env`, credentials, keys).

4. **Push**:
   - `git push -u origin <branch>` (always set upstream on first push).

5. **PR**:
   - `gh pr create --title "..." --body "..."` using HEREDOC.
   - Title: under 70 chars, mirrors first commit message.
   - Body: `## Summary` (1–3 bullets), then `## Test plan` (markdown checklist).
   - Output the PR URL.

6. **Stop after PR is opened** — do NOT auto-merge. Tell the user to wait for CI and offer to monitor + merge once green.

## Edge cases
- **Repo uses UAT flow** (e.g. roofly): if `origin/uat` exists, PR base should be `uat`, not `main`. Check via `git ls-remote --heads origin uat`.
- **Branch protection**: never force-push, never skip hooks. If CI fails, fix and push a new commit — don't amend.
- **Dirty checkout on protected branch**: stash → branch → pop → commit. Confirm before stashing if there's a lot of unstaged work.

## Anti-patterns
- Don't run `git add .` or `git add -A` blindly — list files explicitly.
- Don't `git commit --amend` after the first push.
- Don't include large binary files or lockfiles unless intentional (`package-lock.json` is usually fine; `dist/` or `node_modules/` is not).

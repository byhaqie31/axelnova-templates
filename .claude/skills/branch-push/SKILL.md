---
name: branch-push
description: Branch + commit + push, no PR. Use when the user wants to share WIP without opening a PR yet — phrases like "create branch, commit, push", "push this to a new branch", "save my work to a branch but don't PR yet". Stops before `gh pr create`.
---

# Branch-push: branch → commit → push (no PR)

## When to use
User has uncommitted changes and wants them on a remote branch — but isn't ready to open a PR yet (still iterating, want CI to run first, or wants a colleague to review the branch first).

## Workflow

Identical to `ship` skill **except**:
- Stop after `git push -u origin <branch>`.
- Do NOT call `gh pr create`.
- After pushing, output the GitHub URL that GitHub returns in the push response — usually `https://github.com/<owner>/<repo>/pull/new/<branch>`. The user can click that when they're ready.

## Steps

1. **Inspect state** in parallel: `git status`, `git branch --show-current`, `git log -3 --oneline`, default branch detection.

2. **Branch**:
   - If on default branch: create new branch via `git stash` → `git checkout -b <prefix>/<summary>` → `git stash pop`.
   - If already on a feature branch: ask whether to continue or branch off.

3. **Commit**:
   - HEREDOC commit message, Conventional Commits style.
   - Split into multiple commits if changes span concerns.

4. **Push**:
   - `git push -u origin <branch>`.

5. **Output** the "create PR" URL that GitHub returns — that's it. Stop.

## Don't
- Don't run `gh pr create`.
- Don't auto-merge anything.
- Don't force-push.
- Don't skip hooks.

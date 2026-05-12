---
name: sync-main
description: Pull latest from the default branch (or UAT, for repos that use it) and rebase the current feature branch onto it. Use when the user says "sync with main", "rebase onto main", "catch up to main", "my branch is behind", or after a long break from a feature branch.
---

# Sync-main: rebase current feature branch onto latest integration branch

## When to use
A feature branch has fallen behind the integration branch (`main` or `uat`) and needs to catch up before pushing more work or merging.

## Pre-checks

1. **Working tree must be clean.** If dirty, stash with a labelled message:
   ```bash
   git stash push -m "sync-main-wip"
   ```
   Pop it at the end. If there's substantial unstaged work, ask the user before stashing.

2. **Detect the integration branch**:
   ```bash
   git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'
   ```
   Then check if `origin/uat` also exists — if yes (roofly), use `uat` instead of `main` since features merge to UAT first per that repo's flow.

3. **If currently on the integration branch**: just `git pull --ff-only` and exit. No rebase needed.

## Workflow (on a feature branch)

1. **Fetch latest**:
   ```bash
   git fetch origin
   ```

2. **Check how far behind we are**:
   ```bash
   git rev-list HEAD..origin/<base> --count    # commits we're missing
   git rev-list origin/<base>..HEAD --count    # commits we have on top
   ```
   Report this to the user.

3. **If zero commits behind**: nothing to do. Report and exit.

4. **Rebase**:
   ```bash
   git rebase origin/<base>
   ```

5. **Handle conflicts**: if rebase hits a conflict, STOP and tell the user. Don't auto-abort, don't auto-skip. Output:
   - Which file(s) conflict
   - Suggested next steps: resolve manually, then `git add <file>` + `git rebase --continue`, or `git rebase --abort` to back out.

6. **After successful rebase**: pop the stash if one was created.

## Force-push warning

If the branch was previously pushed to `origin`, the rebase rewrites local history → next push will need `--force-with-lease`. **Always warn the user before force-pushing** and confirm. Use `--force-with-lease`, never plain `--force`:

```bash
git push --force-with-lease
```

`--force-with-lease` aborts if someone else pushed to the branch since you last fetched — safer than blind `--force`.

## Don't
- Don't `git rebase --force-rebase` or `--rebase-merges` unless the user explicitly asks.
- Don't auto-resolve conflicts.
- Don't plain `--force` push.
- Don't rebase if the branch is shared and other people are working on it — use `git merge` instead and warn the user.

## Output
End with a one-line summary:
```
Rebased <feature-branch> onto origin/<base> (was N behind, now up to date).
```
And mention the force-push hint if applicable.

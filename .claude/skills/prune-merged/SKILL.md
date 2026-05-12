---
name: prune-merged
description: Delete local branches that have already been merged on the remote, and prune stale remote refs. Use when the user says "clean up local branches", "delete merged branches", "prune", "remove branches that are already merged".
---

# Prune merged branches

## When to use
After PRs get merged on GitHub, the remote branch is usually auto-deleted, but the local tracking branches stay around forever cluttering `git branch`. This skill cleans them up safely.

## Workflow

1. **Sync with remote and prune dead remote refs**:
   ```bash
   git fetch --all --prune
   ```
   The `--prune` removes `origin/feat-xyz` refs whose remote branch no longer exists.

2. **List local branches whose remote tracking branch is gone** (the "[gone]" branches — these are the safe-to-delete candidates):
   ```bash
   git branch -vv | awk '/: gone]/ { print $1 }'
   ```
   Show the list to the user.

3. **Also list locally-merged branches** as a secondary candidate set:
   ```bash
   git branch --merged <default-branch> | grep -vE "^\*|^\s*<default-branch>$"
   ```
   Where `<default-branch>` comes from `git symbolic-ref refs/remotes/origin/HEAD`.

4. **Confirm with user** before deleting if more than 3 branches will go. For 0–3 just proceed.

5. **Delete each safely**:
   ```bash
   git branch -d <branch>
   ```
   Use `-d` (safe — refuses if not fully merged). Never `-D` (force) unless the user explicitly confirms per branch.

6. **If `-d` refuses** for a branch (says "not fully merged"), tell the user that specific branch — let them decide whether to force-delete it. Don't auto-force.

## Don't
- Don't delete the current branch (you'd detach HEAD). Check `git branch --show-current` first; switch to default branch if currently on one of the to-be-deleted ones.
- Don't delete the default branch (main/master/uat).
- Don't use `-D` (force) without explicit per-branch user confirmation.
- Don't touch remote branches (`git push origin --delete`) — leave that to GitHub auto-cleanup.

## Output
End with a one-line summary:
```
Pruned N local branches: <name1>, <name2>, ...
Kept: <name>, <name> (not fully merged — review before forcing)
```

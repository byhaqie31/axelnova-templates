---
name: pr
description: Open a PR for the current branch. Use when commits are already pushed and the user just needs the PR. Triggered by "create PR", "open a PR", "PR this branch", "make a PR for what I pushed". Skips branching, commits, and pushing — assumes those are done.
---

# PR: open a PR for the current branch

## When to use
Commits are already on a pushed branch. User just wants the GitHub PR created.

## Pre-checks
1. `git status` — confirm clean working tree (no uncommitted changes that should be in the PR). If dirty, ask user whether to commit + push first (`ship` or `branch-push` skill) before opening the PR.
2. `git branch --show-current` — confirm not on default branch.
3. `git rev-list origin/<default>..HEAD --count` — confirm there are commits ahead of default branch. If zero, abort with a friendly error.
4. `gh pr list --head <current-branch> --json number,state --jq '.[]'` — confirm no open PR already exists for this branch. If one exists, output its URL and stop.
5. `git rev-list origin/<branch>..HEAD --count` — if non-zero, commits aren't pushed yet. `git push` first.

## Draft the PR

1. Get the diff summary: `git log origin/<default>..HEAD --oneline` and `git diff origin/<default>...HEAD --stat`.
2. Title: under 70 chars. If there's exactly one commit on the branch, use that commit's message as the title. If multiple, summarise.
3. Body via HEREDOC:
   ```
   ## Summary
   <1–3 bullets explaining the why, not just the what>
   
   ## Test plan
   <markdown checklist of what to verify>
   ```
4. Detect the base branch:
   - Default: `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'`
   - If repo uses UAT flow (origin/uat exists), default base = uat.

## Open

```bash
gh pr create --base <base> --title "..." --body "$(cat <<'EOF'
## Summary
- ...

## Test plan
- [ ] ...
EOF
)"
```

Output the PR URL.

## Don't
- Don't auto-merge.
- Don't include `Co-Authored-By` unless asked.
- Don't add emoji-heavy "🚀 Generated with Claude" footers unless the user wants them.

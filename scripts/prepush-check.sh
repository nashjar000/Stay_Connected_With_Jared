#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Running pre-push security check..."

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git is required." >&2
  exit 2
fi

secret_pattern='(SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*["'\''`]?[A-Za-z0-9._-]{20,}["'\''`]?|SUPABASE_SERVICE_ROLE_KEY=[A-Za-z0-9._-]{20,}|AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN (RSA|OPENSSH|EC|DSA) PRIVATE KEY-----|AIza[0-9A-Za-z\-_]{35})'

# Scan tracked files in HEAD/worktree
tracked_hits="$(git --no-pager grep -nEI "$secret_pattern" -- . ':!README.md' ':!QUICK_START.md' ':!SUPABASE_SETUP.md' || true)"

# Scan staged diff only for added lines (new stuff not yet in tracked grep)
staged_hits="$(git --no-pager diff --cached --unified=0 | grep -E '^\+' | grep -Ev '^\+\+\+' | grep -nEI "$secret_pattern" || true)"

if [[ -n "$tracked_hits" || -n "$staged_hits" ]]; then
  echo ""
  echo "Potential secret(s) detected. Push blocked."
  [[ -n "$tracked_hits" ]] && { echo ""; echo "Tracked file hits:"; echo "$tracked_hits"; }
  [[ -n "$staged_hits" ]] && { echo ""; echo "Staged diff hits:"; echo "$staged_hits"; }
  echo ""
  echo "Fix/remove those values, then run this check again."
  exit 1
fi

if [[ -f "js/config.js" ]]; then
  if git ls-files --error-unmatch js/config.js >/dev/null 2>&1; then
    echo "ERROR: js/config.js is tracked by git. Remove it from the index before push." >&2
    echo "Run: git rm --cached js/config.js" >&2
    exit 1
  fi
fi

echo "PASS: No obvious secrets found in tracked or staged content."

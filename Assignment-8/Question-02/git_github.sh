#!/usr/bin/env bash
# Q8(b): remote repository, clone, modify, stage, commit, push.
# A local bare repo stands in for GitHub so the script runs offline.
# With GitHub: create an empty repo, then use its URL in place of $REMOTE.
set -e
APP="$(cd "$(dirname "$0")" && pwd)/app.py"
WORK="$(mktemp -d)"; cd "$WORK"
REMOTE="$WORK/remote.git"

echo "--- create remote repository"
git init -q --bare -b main "$REMOTE"
git clone -q "$REMOTE" local && cd local
git config user.name "Demo"; git config user.email "demo@example.com"

echo "--- add project files, stage, commit, push"
cp "$APP" app.py
echo "flask>=3.0" > requirements.txt
git add . && git status --short
git commit -q -m "Add Flask student management app"
git push -q -u origin main

echo "--- modify a file, stage, commit, push the update"
echo "# Student Information Management System" > README.md
git add README.md && git commit -q -m "Add README"
git push -q
git log --oneline
git remote -v
echo "Remote has: $(git --git-dir="$REMOTE" log --oneline | wc -l | tr -d ' ') commits"

#!/usr/bin/env bash
# Q8(a): Git branch management on the Flask Student Information Management System.
# Runs in a throwaway directory, so it never touches this repository.
set -e
APP="$(cd "$(dirname "$0")" && pwd)/app.py"
WORK="$(mktemp -d)"; cd "$WORK"

git init -q -b main
git config user.name "Demo"; git config user.email "demo@example.com"
cp "$APP" app.py
git add app.py && git commit -q -m "Add Flask student management app"

echo "--- create and switch to a feature branch"
git branch feature-title
git switch feature-title
sed -i.bak 's/<h1>Student Information Management System/<h1>SIMS: Student Information Management System/' app.py && rm app.py.bak
git commit -qam "Update page heading"
git branch

echo "--- switch back and merge"
git switch main
git merge feature-title
git log --oneline --graph --all

echo "--- delete the merged branch"
git branch -d feature-title
git branch
echo "Demo repo: $WORK"

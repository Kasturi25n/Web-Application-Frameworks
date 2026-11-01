#!/usr/bin/env bash
# Q8(c): full Git workflow: init, track, stage, commit, branch, merge,
# remote management and collaboration (two clones of one shared remote).
set -e
APP="$(cd "$(dirname "$0")" && pwd)/app.py"
WORK="$(mktemp -d)"; cd "$WORK"

git init -q --bare -b main remote.git
echo "--- 1. initialise and track files"
git init -q -b main alice && cd alice
git config user.name "Alice"; git config user.email "alice@example.com"
cp "$APP" app.py
git status --short
git add app.py && git commit -q -m "Add course registration app"

echo "--- 2. remote repository management"
git remote add origin "$WORK/remote.git"
git remote -v
git push -q -u origin main

echo "--- 3. branching and merging"
git switch -q -c feature-more-courses
sed -i.bak 's/"CS104": "Operating Systems"/"CS104": "Operating Systems", "CS105": "Networks"/' app.py && rm app.py.bak
git commit -qam "Add CS105 course"
git switch -q main && git merge -q feature-more-courses && git branch -d feature-more-courses
git push -q

echo "--- 4. collaboration: Bob clones, commits, pushes; Alice pulls"
cd "$WORK" && git clone -q remote.git bob && cd bob
git config user.name "Bob"; git config user.email "bob@example.com"
echo "# Course Registration" > README.md
git add README.md && git commit -q -m "Add README" && git push -q
cd "$WORK/alice" && git pull -q
git log --format='%h %an: %s'

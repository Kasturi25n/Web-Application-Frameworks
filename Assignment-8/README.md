# Assignment 8: Web Application Framework

**Course:** Web Application Framework  

---

## 📌 Overview

Week-8: Flask applications used to demonstrate Git and GitHub workflows.

| # | Question | Flask app | Git script |
|---|---|---|---|
| 1 | (a) Student Information Management: create, switch, merge, delete branches | `Question-01/app.py` | `Question-01/git_branches.sh` |
| 2 | (b) Student Information Management: remote repo, clone, modify, stage, commit, push | `Question-02/app.py` | `Question-02/git_github.sh` |
| 3 | (c) Online Student Course Registration: full Git workflow | `Question-03/app.py` | `Question-03/git_workflow.sh` |

---

## 🚀 How to Run

```bash
cd Assignment-8
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python Question-01/app.py          # Flask app, http://127.0.0.1:5000
bash Question-01/git_branches.sh   # prints every Git command's output
```

Each script runs in a temporary directory, so it never changes this repository. Scripts 2 and 3 use a local bare
repository as the "remote" so they work offline. For real GitHub, create an empty repository and use its URL instead:

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

---

## 📋 Git Commands Covered

- **Q1:** `git init`, `git branch`, `git switch`, `git merge`, `git branch -d`, `git log --graph`
- **Q2:** `git clone`, `git add`, `git commit`, `git push -u`, `git remote -v`
- **Q3:** `git init`, `git status`, `git add`, `git commit`, `git remote add`, `git switch -c`, `git merge`, `git pull`, plus a second clone acting as a collaborator

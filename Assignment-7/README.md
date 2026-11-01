# Assignment 7: Web Application Framework

**Course:** Web Application Framework  

---

## 📌 Overview

Python web applications built with Flask (Week-7 (a) and (b)).

| # | Question | Part | File |
|---|---|---|---|
| 1 | Student Management System: form + validation + details | 7(a) | `Question-01/app.py` |
| 2 | Hospital Appointment System: form + validation + confirmation | 7(a) | `Question-02/app.py` |
| 3 | Student Information Management: Flask + SQLite CRUD | 7(b) | `Question-03/app.py` |
| 4 | Employee Management: form, save to database, list records | 7(b) | `Question-04/app.py` |

---

## 🚀 How to Run

```bash
cd Assignment-7
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python Question-01/app.py      # then open http://127.0.0.1:5000
```

Replace `Question-01` with `Question-02`, `Question-03` or `Question-04` to run the others.
Q3 and Q4 create their SQLite file (`students.db`, `employees.db`) next to the script on first use.

---

## 📋 Validation Rules

- **Q1:** name letters only and required; department required.
- **Q2:** patient name letters only; doctor required; date valid and not in the past; contact exactly 10 digits.
- **Q3:** name, department and an email containing `@` are required; Create, Read, Update (Edit) and Delete are all supported.
- **Q4:** name and designation required; salary a positive number; email contains `@`.

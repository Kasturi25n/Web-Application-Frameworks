import os
import sqlite3

from flask import Flask, g, redirect, render_template_string, request, url_for

app = Flask(__name__)
DB = os.path.join(os.path.dirname(__file__), "employees.db")

PAGE = """
<!doctype html>
<title>Employee Management System</title>
<style>body{font-family:sans-serif;max-width:640px;margin:2rem auto}table{width:100%;border-collapse:collapse}
td,th{border-bottom:1px solid #ccc;padding:.4rem;text-align:left}input{padding:.4rem}.err{color:#b00020}</style>
<h1>Employee Management System</h1>
<form method="post">
  <input name="name" placeholder="Name" value="{{ form.name }}">
  <input name="designation" placeholder="Designation" value="{{ form.designation }}">
  <input name="salary" placeholder="Salary" value="{{ form.salary }}">
  <input name="email" placeholder="Email" value="{{ form.email }}">
  <button>Save</button>
</form>
{% for e in errors %}<p class="err">{{ e }}</p>{% endfor %}
<h2>Stored employees</h2>
<table><tr><th>ID</th><th>Name</th><th>Designation</th><th>Salary</th><th>Email</th></tr>
{% for e in employees %}
<tr><td>{{ e.id }}</td><td>{{ e.name }}</td><td>{{ e.designation }}</td><td>{{ e.salary }}</td><td>{{ e.email }}</td></tr>
{% else %}<tr><td colspan="5">No employees yet.</td></tr>{% endfor %}
</table>
"""


def db():
    if "db" not in g:
        g.db = sqlite3.connect(DB)
        g.db.row_factory = sqlite3.Row
        g.db.execute(
            "CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,"
            " designation TEXT NOT NULL, salary REAL NOT NULL, email TEXT NOT NULL)"
        )
    return g.db


@app.teardown_appcontext
def close_db(_):
    conn = g.pop("db", None)
    if conn:
        conn.close()


@app.route("/", methods=["GET", "POST"])
def index():
    form = dict.fromkeys(["name", "designation", "salary", "email"], "")
    errors = []
    if request.method == "POST":
        form = {k: request.form.get(k, "").strip() for k in form}
        if not form["name"]:
            errors.append("Name is required.")
        if not form["designation"]:
            errors.append("Designation is required.")
        try:
            if float(form["salary"]) <= 0:
                raise ValueError
        except ValueError:
            errors.append("Salary must be a positive number.")
        if "@" not in form["email"]:
            errors.append("A valid email is required.")
        if not errors:
            db().execute("INSERT INTO employees (name, designation, salary, email) VALUES (?, ?, ?, ?)",
                         (form["name"], form["designation"], float(form["salary"]), form["email"]))
            db().commit()
            return redirect(url_for("index"))
    employees = db().execute("SELECT * FROM employees ORDER BY id").fetchall()
    return render_template_string(PAGE, form=form, errors=errors, employees=employees)


if __name__ == "__main__":
    app.run(debug=True)

import os
import sqlite3

from flask import Flask, g, redirect, render_template_string, request, url_for

app = Flask(__name__)
DB = os.path.join(os.path.dirname(__file__), "students.db")

PAGE = """
<!doctype html>
<title>Student Information Management System</title>
<style>body{font-family:sans-serif;max-width:640px;margin:2rem auto}table{width:100%;border-collapse:collapse}
td,th{border-bottom:1px solid #ccc;padding:.4rem;text-align:left}input{padding:.4rem}.err{color:#b00020}</style>
<h1>Student Information Management System</h1>
<form method="post" action="{{ url_for('save') }}">
  <input type="hidden" name="id" value="{{ edit.id if edit else '' }}">
  <input name="name" placeholder="Name" value="{{ edit.name if edit else '' }}">
  <input name="department" placeholder="Department" value="{{ edit.department if edit else '' }}">
  <input name="email" placeholder="Email" value="{{ edit.email if edit else '' }}">
  <button>{{ 'Update' if edit else 'Add' }}</button>
  {% if edit %}<a href="{{ url_for('index') }}">Cancel</a>{% endif %}
</form>
{% if error %}<p class="err">{{ error }}</p>{% endif %}
<table><tr><th>ID</th><th>Name</th><th>Department</th><th>Email</th><th></th></tr>
{% for s in students %}
<tr><td>{{ s.id }}</td><td>{{ s.name }}</td><td>{{ s.department }}</td><td>{{ s.email }}</td>
<td><a href="{{ url_for('index', edit=s.id) }}">Edit</a>
<form method="post" action="{{ url_for('delete', sid=s.id) }}" style="display:inline"><button>Delete</button></form></td></tr>
{% else %}<tr><td colspan="5">No students yet.</td></tr>{% endfor %}
</table>
"""


def db():
    if "db" not in g:
        g.db = sqlite3.connect(DB)
        g.db.row_factory = sqlite3.Row
        g.db.execute(
            "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT,"
            " name TEXT NOT NULL, department TEXT NOT NULL, email TEXT NOT NULL)"
        )
    return g.db


@app.teardown_appcontext
def close_db(_):
    conn = g.pop("db", None)
    if conn:
        conn.close()


@app.route("/")
def index(error=None):
    edit = None
    if request.args.get("edit"):
        edit = db().execute("SELECT * FROM students WHERE id = ?", (request.args["edit"],)).fetchone()
    students = db().execute("SELECT * FROM students ORDER BY id").fetchall()
    return render_template_string(PAGE, students=students, edit=edit, error=error)


@app.route("/save", methods=["POST"])
def save():
    f = {k: request.form.get(k, "").strip() for k in ("id", "name", "department", "email")}
    if not (f["name"] and f["department"] and "@" in f["email"]):
        return index(error="Name, department and a valid email are required.")
    if f["id"]:
        db().execute("UPDATE students SET name=?, department=?, email=? WHERE id=?",
                     (f["name"], f["department"], f["email"], f["id"]))
    else:
        db().execute("INSERT INTO students (name, department, email) VALUES (?, ?, ?)",
                     (f["name"], f["department"], f["email"]))
    db().commit()
    return redirect(url_for("index"))


@app.route("/delete/<int:sid>", methods=["POST"])
def delete(sid):
    db().execute("DELETE FROM students WHERE id = ?", (sid,))
    db().commit()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)

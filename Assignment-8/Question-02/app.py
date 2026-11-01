from flask import Flask, redirect, render_template_string, request, url_for

app = Flask(__name__)
students = []  # in-memory list, enough for demonstrating Git

PAGE = """
<!doctype html>
<title>Student Information Management System</title>
<style>body{font-family:sans-serif;max-width:560px;margin:2rem auto}input{padding:.4rem}
td,th{border-bottom:1px solid #ccc;padding:.4rem;text-align:left}table{width:100%}.err{color:#b00020}</style>
<h1>Student Information Management System</h1>
<form method="post">
  <input name="roll" placeholder="Roll no" value="{{ form.roll }}">
  <input name="name" placeholder="Name" value="{{ form.name }}">
  <input name="branch" placeholder="Branch" value="{{ form.branch }}">
  <button>Add</button>
</form>
{% for e in errors %}<p class="err">{{ e }}</p>{% endfor %}
<table><tr><th>Roll</th><th>Name</th><th>Branch</th></tr>
{% for s in students %}<tr><td>{{ s.roll }}</td><td>{{ s.name }}</td><td>{{ s.branch }}</td></tr>
{% else %}<tr><td colspan="3">No students yet.</td></tr>{% endfor %}</table>
"""


@app.route("/", methods=["GET", "POST"])
def index():
    form = dict.fromkeys(["roll", "name", "branch"], "")
    errors = []
    if request.method == "POST":
        form = {k: request.form.get(k, "").strip() for k in form}
        if not all(form.values()):
            errors.append("All fields are required.")
        elif any(s["roll"] == form["roll"] for s in students):
            errors.append("Roll number already exists.")
        else:
            students.append(form)
            return redirect(url_for("index"))
    return render_template_string(PAGE, form=form, errors=errors, students=students)


if __name__ == "__main__":
    app.run(debug=True)

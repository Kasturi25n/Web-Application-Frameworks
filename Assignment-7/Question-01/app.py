from flask import Flask, render_template_string, request

app = Flask(__name__)

PAGE = """
<!doctype html>
<title>Student Management System</title>
<style>body{font-family:sans-serif;max-width:480px;margin:2rem auto}label{display:block;margin-top:1rem}
input{width:100%;padding:.4rem}.err{color:#b00020}.ok{background:#e8f5e9;padding:1rem;margin-top:1rem}</style>
<h1>Student Management System</h1>
<form method="post">
  <label>Student name <input name="name" value="{{ form.name }}"></label>
  <label>Department <input name="department" value="{{ form.department }}"></label>
  {% for e in errors %}<p class="err">{{ e }}</p>{% endfor %}
  <button style="margin-top:1rem">Submit</button>
</form>
{% if student %}
<div class="ok"><h2>Student details</h2>
<p>Name: {{ student.name }}</p><p>Department: {{ student.department }}</p></div>
{% endif %}
"""


@app.route("/", methods=["GET", "POST"])
def index():
    form = {"name": "", "department": ""}
    errors, student = [], None
    if request.method == "POST":
        form = {k: request.form.get(k, "").strip() for k in form}
        if not form["name"].replace(" ", "").isalpha():
            errors.append("Name is required and must contain only letters.")
        if not form["department"]:
            errors.append("Department is required.")
        if not errors:
            student = form
    return render_template_string(PAGE, form=form, errors=errors, student=student)


if __name__ == "__main__":
    app.run(debug=True)

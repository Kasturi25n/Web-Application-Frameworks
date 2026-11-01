from flask import Flask, redirect, render_template_string, request, url_for

app = Flask(__name__)
COURSES = {"CS101": "Python Programming", "CS102": "Web Frameworks", "CS103": "Databases", "CS104": "Operating Systems"}
registrations = {}  # student name -> set of course codes

PAGE = """
<!doctype html>
<title>Online Student Course Registration</title>
<style>body{font-family:sans-serif;max-width:560px;margin:2rem auto}input,select{padding:.4rem}.err{color:#b00020}</style>
<h1>Online Student Course Registration</h1>
<form method="post">
  <input name="student" placeholder="Student name">
  <select name="course">{% for code, title in courses.items() %}<option value="{{ code }}">{{ code }} - {{ title }}</option>{% endfor %}</select>
  <button>Register</button>
</form>
{% if error %}<p class="err">{{ error }}</p>{% endif %}
<h2>Registrations</h2>
<ul>{% for student, codes in registrations.items() %}<li>{{ student }}: {{ codes | sort | join(', ') }}</li>
{% else %}<li>None yet.</li>{% endfor %}</ul>
"""


@app.route("/", methods=["GET", "POST"])
def index():
    error = None
    if request.method == "POST":
        student, course = request.form.get("student", "").strip(), request.form.get("course")
        if not student or course not in COURSES:
            error = "Student name and a valid course are required."
        elif course in registrations.get(student, set()):
            error = f"{student} is already registered for {course}."
        else:
            registrations.setdefault(student, set()).add(course)
            return redirect(url_for("index"))
    return render_template_string(PAGE, courses=COURSES, registrations=registrations, error=error)


if __name__ == "__main__":
    app.run(debug=True)

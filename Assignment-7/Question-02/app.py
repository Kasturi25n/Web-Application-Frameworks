import re
from datetime import date

from flask import Flask, render_template_string, request

app = Flask(__name__)

PAGE = """
<!doctype html>
<title>Hospital Appointment System</title>
<style>body{font-family:sans-serif;max-width:480px;margin:2rem auto}label{display:block;margin-top:1rem}
input{width:100%;padding:.4rem}.err{color:#b00020}.ok{background:#e8f5e9;padding:1rem;margin-top:1rem}</style>
<h1>Hospital Appointment System</h1>
<form method="post">
  <label>Patient name <input name="patient" value="{{ form.patient }}"></label>
  <label>Doctor <input name="doctor" value="{{ form.doctor }}"></label>
  <label>Appointment date <input type="date" name="date" value="{{ form.date }}"></label>
  <label>Contact number <input name="contact" value="{{ form.contact }}"></label>
  {% for e in errors %}<p class="err">{{ e }}</p>{% endfor %}
  <button style="margin-top:1rem">Book appointment</button>
</form>
{% if appt %}
<div class="ok"><h2>Appointment confirmed</h2>
<p>Patient: {{ appt.patient }}</p><p>Doctor: Dr. {{ appt.doctor }}</p>
<p>Date: {{ appt.date }}</p><p>Contact: {{ appt.contact }}</p></div>
{% endif %}
"""


def validate(form):
    errors = []
    if not form["patient"].replace(" ", "").isalpha():
        errors.append("Patient name is required and must contain only letters.")
    if not form["doctor"]:
        errors.append("Doctor is required.")
    try:
        if date.fromisoformat(form["date"]) < date.today():
            errors.append("Appointment date cannot be in the past.")
    except ValueError:
        errors.append("A valid appointment date is required.")
    if not re.fullmatch(r"\d{10}", form["contact"]):
        errors.append("Contact number must be exactly 10 digits.")
    return errors


@app.route("/", methods=["GET", "POST"])
def index():
    form = dict.fromkeys(["patient", "doctor", "date", "contact"], "")
    errors, appt = [], None
    if request.method == "POST":
        form = {k: request.form.get(k, "").strip() for k in form}
        errors = validate(form)
        if not errors:
            appt = form
    return render_template_string(PAGE, form=form, errors=errors, appt=appt)


if __name__ == "__main__":
    app.run(debug=True)

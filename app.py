import os
from flask import Flask, request, jsonify, render_template
import google.generativeai as genai

# Directly set API key here
API_KEY = "AIzaSyDuvkkZs9fS-uefYCeG7uRvfD8WUhBxCrs"

# Configure the Gemini model
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("models/gemini-1.5-pro")


app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "Empty input"}), 400

    try:
        response = model.generate_content(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        print("Error:", str(e))  # Log to console
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
import os
from google.generativeai import configure, GenerativeModel

API_KEY = os.getenv("API_KEY")

configure(api_key=API_KEY)

model = GenerativeModel("gemini-pro")

async def get_genai_response(prompt: str) -> str:
    chat = model.start_chat(history=[])
    response = chat.send_message(prompt)
    return response.text

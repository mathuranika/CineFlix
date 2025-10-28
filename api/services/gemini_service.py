import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../../.env.local"))

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("models/gemini-2.5-flash")

def extract_movie_query(user_query: str):
    prompt = f"""
    The user said: "{user_query}".
    Identify the movie title or keywords they are referring to.
    Respond with a short, clear movie name or key terms only.
    """
    response = model.generate_content(prompt)
    return response.text.strip()

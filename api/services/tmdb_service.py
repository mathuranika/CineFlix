import os
import requests
from dotenv import load_dotenv

# Load from root .env.local
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../../.env.local"))

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_ACCESS_TOKEN = os.getenv("TMDB_ACCESS_TOKEN")

BASE_URL = "https://api.themoviedb.org/3"


def _get_headers():
    """Return correct TMDB headers depending on available credentials."""
    headers = {"accept": "application/json"}
    if TMDB_ACCESS_TOKEN:
        headers["Authorization"] = f"Bearer {TMDB_ACCESS_TOKEN}"
    return headers


def search_movie(movie_name: str):
    """Search TMDB for a movie by name."""
    url = f"{BASE_URL}/search/movie"
    params = {"query": movie_name, "include_adult": "false"}
    
    # If API key available, use it in params; otherwise use Bearer token
    if TMDB_API_KEY:
        params["api_key"] = TMDB_API_KEY

    response = requests.get(url, headers=_get_headers(), params=params)
    response.raise_for_status()
    return response.json()


def get_movie_details(movie_id: int):
    """Fetch detailed info about a specific movie."""
    url = f"{BASE_URL}/movie/{movie_id}"
    params = {"api_key": TMDB_API_KEY} if TMDB_API_KEY else {}
    response = requests.get(url, headers=_get_headers(), params=params)
    response.raise_for_status()
    return response.json()


def get_similar_movies(movie_id: int):
    """Fetch similar movies to the given movie."""
    url = f"{BASE_URL}/movie/{movie_id}/similar"
    params = {"api_key": TMDB_API_KEY} if TMDB_API_KEY else {}
    response = requests.get(url, headers=_get_headers(), params=params)
    response.raise_for_status()
    return response.json()

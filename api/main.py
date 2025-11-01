from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.tmdb_service import search_movie, get_similar_movies
from services.gemini_service import extract_movie_query

app = FastAPI(title="CineFlix Backend", version="1.0")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://cineflix-vert.vercel.app/"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to CineFlix 🎬"}

@app.get("/search/")
def movie_search(query: str):
    interpreted_query = extract_movie_query(query)
    search_results = search_movie(interpreted_query)

    if not search_results.get("results") or len(search_results["results"]) == 0:
        return {
            "error": "No movies found.",
            "query": query,
            "interpreted_query": interpreted_query,
            "main_movie": None,
            "similar_movies": []
        }

    # Get the top search result
    top_movie = search_results["results"][0]
    movie_id = top_movie["id"]
    
    # Get similar movies
    similar = get_similar_movies(movie_id)

    return {
        "query": query,
        "interpreted_query": interpreted_query,
        "main_movie": top_movie,
        "similar_movies": similar.get("results", [])[:5],
    }

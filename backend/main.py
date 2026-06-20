import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

try:
    from .routes import auth, dashboard, ai
except ImportError:
    from routes import auth, dashboard, ai

load_dotenv()

app = FastAPI(title="INOLAS API")

# Configure CORS
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Assistant"])

@app.get("/")
def root():
    return {"message": "Welcome to INOLAS API"}


@app.get("/health")
def health():
    return {"status": "ok"}

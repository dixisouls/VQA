"""
Main FastAPI application entry point
"""
import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager

from app.routers import vqa
from app.services.model_service import ModelService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize model service in a lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    logger.info("Loading VQA model...")
    app.state.model_service = ModelService()
    app.state.model_service.load_model()
    logger.info("VQA model loaded successfully")
    yield
    # Clean up resources on shutdown
    logger.info("Shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="VizWiz VQA API",
    description="API for Visual Question Answering on images",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory if it exists
static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Include routers
app.include_router(vqa.router)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring the service"""
    if not hasattr(app.state, "model_service") or not app.state.model_service.is_model_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "healthy", "model_loaded": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
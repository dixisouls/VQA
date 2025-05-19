"""
Configuration settings for the application
"""
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from pathlib import Path

# Load .env file if it exists
load_dotenv()

class Settings(BaseSettings):
    """Application settings"""
    # App settings
    APP_NAME: str = "VizWiz VQA API"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Model settings
    MODEL_PATH: str = os.getenv("MODEL_PATH", "./models/vqa_model_best.pt")
    TEXT_MODEL: str = os.getenv("TEXT_MODEL", "bert-base-uncased")
    VISION_MODEL: str = os.getenv("VISION_MODEL", "google/vit-base-patch16-384")
    HUGGINGFACE_TOKEN: str = os.getenv("HUGGINGFACE_TOKEN", "")
    
    # API settings
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # Storage settings
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    MAX_SESSION_AGE: int = 60 * 30  # 30 minutes
    
    # CORS settings
    ALLOW_ORIGINS: list[str] = ["*"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Global settings instance
settings = Settings()

# Ensure upload directory exists
Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
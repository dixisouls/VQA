"""
Session management service for VQA application
"""
import os
import uuid
import logging
import time
from datetime import datetime, timedelta
from typing import Dict, Optional
from fastapi import UploadFile
from pathlib import Path

from app.config import settings

logger = logging.getLogger(__name__)

class Session:
    """Object representing a user session"""
    def __init__(self, session_id: str, image_path: str):
        self.session_id = session_id
        self.image_path = image_path
        self.created_at = datetime.now()
        self.last_accessed = datetime.now()
        self.questions = []  # History of questions for this session
    
    def is_expired(self) -> bool:
        """Check if the session has expired"""
        expiry_time = self.last_accessed + timedelta(seconds=settings.MAX_SESSION_AGE)
        return datetime.now() > expiry_time
    
    def update_access_time(self):
        """Update the last accessed time"""
        self.last_accessed = datetime.now()
    
    def add_question(self, question: str, answer: Dict):
        """Add a question and its answer to the session history"""
        self.questions.append({
            "question": question,
            "answer": answer,
            "timestamp": datetime.now().isoformat()
        })
        self.update_access_time()

class SessionService:
    """Service for managing user sessions"""
    
    def __init__(self):
        """Initialize the session service"""
        self.sessions: Dict[str, Session] = {}
        self.ensure_upload_dir()
        
        # Start a background cleanup task
        self._cleanup_sessions()
    
    def ensure_upload_dir(self):
        """Ensure the upload directory exists"""
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    def create_session(self, file: UploadFile) -> str:
        """
        Create a new session for the user
        
        Args:
            file (UploadFile): The uploaded image file
            
        Returns:
            str: The session ID
        """
        # Generate a unique session ID
        session_id = str(uuid.uuid4())
        
        # Create a unique filename
        timestamp = int(time.time())
        file_extension = Path(file.filename).suffix
        filename = f"{timestamp}_{session_id}{file_extension}"
        
        # Save the uploaded file
        file_path = os.path.join(settings.UPLOAD_DIR, filename)
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        
        # Create and store the session
        self.sessions[session_id] = Session(session_id, file_path)
        
        logger.info(f"Created new session {session_id} with image {file_path}")
        return session_id
    
    def get_session(self, session_id: str) -> Optional[Session]:
        """
        Get a session by ID
        
        Args:
            session_id (str): The session ID
            
        Returns:
            Optional[Session]: The session, or None if not found or expired
        """
        session = self.sessions.get(session_id)
        
        if session is None:
            return None
        
        if session.is_expired():
            self._remove_session(session_id)
            return None
        
        session.update_access_time()
        return session
    
    def _remove_session(self, session_id: str):
        """
        Remove a session and its associated file
        
        Args:
            session_id (str): The session ID
        """
        session = self.sessions.pop(session_id, None)
        if session:
            try:
                # Remove the image file
                if os.path.exists(session.image_path):
                    os.remove(session.image_path)
                    logger.info(f"Removed session file {session.image_path}")
            except Exception as e:
                logger.error(f"Error removing session file: {e}")
    
    def _cleanup_sessions(self):
        """Clean up expired sessions"""
        expired_sessions = [
            session_id for session_id, session in self.sessions.items()
            if session.is_expired()
        ]
        
        for session_id in expired_sessions:
            self._remove_session(session_id)
        
        if expired_sessions:
            logger.info(f"Cleaned up {len(expired_sessions)} expired sessions")
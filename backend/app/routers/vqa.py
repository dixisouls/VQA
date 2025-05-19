"""
API router for VQA endpoints
"""
import logging
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.services.session_service import SessionService
from app.services.model_service import ModelService

logger = logging.getLogger(__name__)

# Initialize router
router = APIRouter(
    prefix="/api/vqa",
    tags=["vqa"],
)

# Models for request/response
class QuestionRequest(BaseModel):
    """Model for question request"""
    session_id: str
    question: str

class AnswerResponse(BaseModel):
    """Model for answer response"""
    answer: str
    answer_confidence: float
    is_answerable: bool
    answerable_confidence: float

class SessionHistoryItem(BaseModel):
    """Model for session history item"""
    question: str
    answer: AnswerResponse
    timestamp: str

class SessionResponse(BaseModel):
    """Model for session response"""
    session_id: str
    history: List[SessionHistoryItem]

# Dependency for services
session_service = SessionService()

@router.post("/upload", response_model=dict)
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = None
):
    """
    Upload an image and create a new session
    
    Args:
        file (UploadFile): The image file to upload
        
    Returns:
        dict: The session ID
    """
    # Validate image file
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Create a new session
        session_id = session_service.create_session(file)
        
        return {"session_id": session_id}
    
    except Exception as e:
        logger.error(f"Error uploading image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ask", response_model=AnswerResponse)
async def ask_question(
    request: Request,
    question_request: QuestionRequest
):
    """
    Ask a question about the uploaded image
    
    Args:
        question_request (QuestionRequest): The question request
        
    Returns:
        AnswerResponse: The answer
    """
    # Get the model service from app state
    model_service = request.app.state.model_service
    
    # Get the session
    session = session_service.get_session(question_request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired")
    
    try:
        # Make prediction
        result = model_service.predict(session.image_path, question_request.question)
        
        # Add to session history
        session.add_question(question_request.question, result)
        
        return result
    
    except Exception as e:
        logger.error(f"Error processing question: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/session/{session_id}", response_model=SessionResponse)
async def get_session(
    request: Request,
    session_id: str
):
    """
    Get session information including question history
    
    Args:
        session_id (str): The session ID
        
    Returns:
        SessionResponse: The session information
    """
    # Get the session
    session = session_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired")
    
    return {
        "session_id": session.session_id,
        "history": session.questions
    }

@router.post("/session/{session_id}/complete")
async def complete_session(
    request: Request,
    session_id: str
):
    """
    Mark a session as complete and clean up resources
    
    Args:
        session_id (str): The session ID
        
    Returns:
        dict: Success message
    """
    # Check if session exists
    session = session_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired")
    
    # Complete the session (delete image but keep session data temporarily)
    success = session_service.complete_session(session_id)
    
    if success:
        return {"message": "Session completed successfully, resources cleaned up"}
    else:
        raise HTTPException(status_code=500, detail="Failed to complete session")

@router.delete("/session/{session_id}")
async def reset_session(
    request: Request,
    session_id: str
):
    """
    Reset (delete) a session to start fresh
    
    Args:
        session_id (str): The session ID
        
    Returns:
        dict: Success message
    """
    # Check if session exists
    session = session_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found or expired")
    
    # Remove the session
    session_service._remove_session(session_id)
    
    return {"message": "Session reset successfully"}
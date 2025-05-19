"""
Model service for handling VQA model operations
"""
import os
import json
import logging
import torch
from PIL import Image
from transformers import AutoTokenizer, ViTImageProcessor
from huggingface_hub import hf_hub_download, login

from app.config import settings
from app.models.vqa_model import VQAModel

logger = logging.getLogger(__name__)

class ModelService:
    """Service for loading and running the VQA model"""
    
    def __init__(self):
        """Initialize the model service"""
        self.model = None
        self.processor = None
        self.tokenizer = None
        self.config = None
        self.answer_vocab = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"Using device: {self.device}")
        
        # Try to login to Hugging Face if token is provided
        if settings.HUGGINGFACE_TOKEN:
            try:
                login(token=settings.HUGGINGFACE_TOKEN)
                logger.info("Successfully logged in to Hugging Face Hub")
            except Exception as e:
                logger.error(f"Error logging in to Hugging Face Hub: {e}")
    
    def _check_model_exists(self):
        """Check if the model file exists locally"""
        return os.path.exists(settings.MODEL_PATH)
    
    def _download_model_from_hub(self):
        """Download the model from Hugging Face Hub if not present locally"""
        try:
            # Create the directory if it doesn't exist
            os.makedirs(os.path.dirname(settings.MODEL_PATH), exist_ok=True)
            
            logger.info(f"Downloading model from {settings.HF_MODEL_REPO} to {settings.MODEL_PATH}")
            
            # Download the model file from Hugging Face
            hf_hub_download(
                repo_id=settings.HF_MODEL_REPO,
                filename=settings.HF_MODEL_FILENAME,
                local_dir=os.path.dirname(settings.MODEL_PATH),
                local_dir_use_symlinks=False
            )
            
            # Rename the downloaded file to match the expected path if needed
            downloaded_path = os.path.join(os.path.dirname(settings.MODEL_PATH), settings.HF_MODEL_FILENAME)
            if downloaded_path != settings.MODEL_PATH:
                os.rename(downloaded_path, settings.MODEL_PATH)
                
            logger.info(f"Model downloaded successfully to {settings.MODEL_PATH}")
            return True
        except Exception as e:
            logger.error(f"Error downloading model from Hugging Face Hub: {e}")
            return False
    
    def load_model(self):
        """Load the VQA model from the specified path or download it if not present"""
        try:
            # Check if model exists locally
            if not self._check_model_exists():
                logger.info(f"Model not found at {settings.MODEL_PATH}")
                
                # Download the model from Hugging Face Hub
                if not self._download_model_from_hub():
                    logger.error("Failed to download model from Hugging Face Hub")
                    return False
            
            logger.info(f"Loading model from {settings.MODEL_PATH}")
            checkpoint = torch.load(settings.MODEL_PATH, map_location=self.device)
            
            # Extract configuration
            self.config = checkpoint['config']
            
            # Get vocabulary
            if 'answer_vocab' in checkpoint:
                self.answer_vocab = checkpoint['answer_vocab']
                logger.info("Using vocabulary from model checkpoint")
            else:
                logger.error("Error: No vocabulary found in model checkpoint")
                raise ValueError("No vocabulary found in model checkpoint")
            
            # Initialize model
            self.model = VQAModel(self.config, len(self.answer_vocab['answer_to_idx']))
            self.model.load_state_dict(checkpoint['model_state_dict'])
            self.model.to(self.device)
            self.model.eval()
            
            # Initialize preprocessors
            self.processor = ViTImageProcessor.from_pretrained(self.config['vision_model'])
            self.tokenizer = AutoTokenizer.from_pretrained(self.config['text_model'])
            
            logger.info("Model loaded successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            return False
    
    def is_model_loaded(self):
        """Check if the model is loaded"""
        return self.model is not None and self.processor is not None and self.tokenizer is not None
    
    def predict(self, image_path, question):
        """
        Make a prediction for the given image and question
        
        Args:
            image_path (str): Path to the image file
            question (str): Question about the image
            
        Returns:
            dict: Prediction results
        """
        if not self.is_model_loaded():
            logger.error("Model not loaded")
            raise RuntimeError("Model not loaded")
        
        try:
            # Preprocess image
            image = Image.open(image_path).convert('RGB')
            image_encoding = self.processor(images=image, return_tensors="pt")
            image_encoding = {k: v.to(self.device) for k, v in image_encoding.items()}
            
            # Preprocess question
            question_encoding = self.tokenizer(
                question,
                padding='max_length',
                truncation=True,
                max_length=128,
                return_tensors='pt'
            )
            question_encoding = {k: v.to(self.device) for k, v in question_encoding.items()}
            
            # Get predictions
            with torch.no_grad():
                outputs = self.model(image_encoding, question_encoding)
                
                answer_logits = outputs['answer_logits']
                answerable_logits = outputs['answerable_logits']
                
                answer_idx = torch.argmax(answer_logits, dim=1).item()
                answerable_idx = torch.argmax(answerable_logits, dim=1).item()
                
                # Convert string index to int for dictionary lookup
                answer = self.answer_vocab['idx_to_answer'][str(answer_idx)]
                is_answerable = bool(answerable_idx)
                
                # Get confidence scores
                answer_probs = torch.softmax(answer_logits, dim=1)[0]
                answerable_probs = torch.softmax(answerable_logits, dim=1)[0]
                
                answer_confidence = float(answer_probs[answer_idx].item())
                answerable_confidence = float(answerable_probs[answerable_idx].item())
            
            return {
                'answer': answer,
                'answer_confidence': answer_confidence,
                'is_answerable': is_answerable,
                'answerable_confidence': answerable_confidence
            }
            
        except Exception as e:
            logger.error(f"Error during prediction: {e}")
            raise
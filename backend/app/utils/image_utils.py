"""
Utility functions for image processing
"""
import os
import logging
from PIL import Image
import io
import base64
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

def validate_image(image_path: str) -> bool:
    """
    Validate if a file is a valid image
    
    Args:
        image_path (str): Path to the image file
        
    Returns:
        bool: True if valid, False otherwise
    """
    try:
        with Image.open(image_path) as img:
            img.verify()
        return True
    except Exception as e:
        logger.error(f"Image validation failed: {e}")
        return False

def resize_image(image_path: str, max_size: Tuple[int, int] = (1024, 1024)) -> Optional[str]:
    """
    Resize an image if it's larger than max_size
    
    Args:
        image_path (str): Path to the image file
        max_size (Tuple[int, int]): Maximum width and height
        
    Returns:
        Optional[str]: Path to the resized image or None if failed
    """
    try:
        with Image.open(image_path) as img:
            # Only resize if the image is larger than max_size
            if img.width > max_size[0] or img.height > max_size[1]:
                # Calculate new size while maintaining aspect ratio
                ratio = min(max_size[0] / img.width, max_size[1] / img.height)
                new_size = (int(img.width * ratio), int(img.height * ratio))
                
                # Resize the image
                resized_img = img.resize(new_size, Image.LANCZOS)
                
                # Save the resized image
                resized_path = os.path.splitext(image_path)[0] + "_resized" + os.path.splitext(image_path)[1]
                resized_img.save(resized_path)
                return resized_path
            
            # No need to resize
            return image_path
            
    except Exception as e:
        logger.error(f"Image resizing failed: {e}")
        return None

def image_to_base64(image_path: str) -> Optional[str]:
    """
    Convert an image to base64 string
    
    Args:
        image_path (str): Path to the image file
        
    Returns:
        Optional[str]: Base64 encoded image string or None if failed
    """
    try:
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            return encoded_string
    except Exception as e:
        logger.error(f"Base64 conversion failed: {e}")
        return None
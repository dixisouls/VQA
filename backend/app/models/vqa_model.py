"""
Model implementation for VQA
"""
import os
import json
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel, AutoConfig, ViTImageProcessor, ViTModel

class VQAModel(nn.Module):
    """Vision-Language model for Visual Question Answering"""
    def __init__(self, config, num_answers):
        super(VQAModel, self).__init__()
        self.config = config
        self.num_answers = num_answers
        
        # Vision encoder
        self.vision_config = AutoConfig.from_pretrained(config['vision_model'])
        self.vision_encoder = ViTModel.from_pretrained(config['vision_model'])
        
        # Text encoder
        self.text_config = AutoConfig.from_pretrained(config['text_model'])
        self.text_encoder = AutoModel.from_pretrained(config['text_model'])
        
        # Projection layers
        self.vision_projection = nn.Linear(
            self.vision_config.hidden_size, config['hidden_size']
        )
        self.text_projection = nn.Linear(
            self.text_config.hidden_size, config['hidden_size']
        )
        
        # Multimodal fusion
        self.fusion = nn.Sequential(
            nn.Linear(2 * config['hidden_size'], config['hidden_size']),
            nn.LayerNorm(config['hidden_size']),
            nn.GELU(),
            nn.Dropout(config['dropout'])
        )
        
        # Answer prediction
        self.classifier = nn.Sequential(
            nn.Linear(config['hidden_size'], config['hidden_size']),
            nn.LayerNorm(config['hidden_size']),
            nn.GELU(),
            nn.Dropout(config['dropout']),
            nn.Linear(config['hidden_size'], num_answers)
        )
        
        # Answerable prediction
        self.answerable_classifier = nn.Sequential(
            nn.Linear(config['hidden_size'], config['hidden_size'] // 2),
            nn.LayerNorm(config['hidden_size'] // 2),
            nn.GELU(),
            nn.Dropout(config['dropout']),
            nn.Linear(config['hidden_size'] // 2, 2)  # Binary classification
        )
        
    def forward(self, image_encodings, question_encodings):
        """Forward pass of the model"""
        # Process image
        vision_outputs = self.vision_encoder(**image_encodings)
        vision_embeds = vision_outputs.last_hidden_state[:, 0]  # CLS token
        vision_embeds = self.vision_projection(vision_embeds)
        
        # Process text
        text_outputs = self.text_encoder(**question_encodings)
        text_embeds = text_outputs.last_hidden_state[:, 0]  # CLS token
        text_embeds = self.text_projection(text_embeds)
        
        # Combine modalities
        multimodal_features = torch.cat([vision_embeds, text_embeds], dim=1)
        fused_features = self.fusion(multimodal_features)
        
        # Predict answers and answerable
        answer_logits = self.classifier(fused_features)
        answerable_logits = self.answerable_classifier(fused_features)
        
        return {
            'answer_logits': answer_logits,
            'answerable_logits': answerable_logits,
            'fused_features': fused_features
        }
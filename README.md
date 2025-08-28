# VizWiz Visual Question Answering System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-vizwiz.vercel.app-blue?style=flat-square&logo=vercel)](https://vizwiz.vercel.app/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?style=flat-square&logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-blue?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)

A cutting-edge Visual Question Answering (VQA) system that combines computer
vision and natural language processing to answer questions about images. Built
with state-of-the-art deep learning models including Vision Transformer (ViT)
and BERT, trained on the VizWiz dataset.

## 🌟 Live Demo

**Try it now:** [https://vizwiz.vercel.app/](https://vizwiz.vercel.app/)

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Model Details](#-model-details)

## ✨ Features

### Core Functionality

- **Visual Question Answering**: Upload images and ask natural language
  questions
- **Answer Confidence Scoring**: Get confidence metrics for each answer
- **Answerability Detection**: Determine if questions can be answered from the
  image
- **Session Management**: Ask multiple questions about the same image

### User Experience

- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **Dark/Light Mode**: Full theme support with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Visualization**: Live confidence indicators and answer
  visualization
- **Question History**: Track and review previous questions and answers

### Technical Features

- **State-of-the-Art Models**: Vision Transformer (ViT) + BERT architecture
- **RESTful API**: FastAPI backend with comprehensive documentation
- **Production Ready**: Dockerized deployment with proper error handling
- **Model Architecture Visualization**: Interactive diagram of the VQA pipeline

## 📁 Project Structure

```
vizwiz/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   ├── utils/              # Utility functions
│   │   └── ...
│   ├── public/                 # Static assets
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Frontend documentation
│
├── backend/                     # FastAPI backend application
│   ├── app/
│   │   ├── models/             # Model definitions
│   │   ├── routers/            # API route definitions
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   └── main.py             # FastAPI application entry point
│   ├── models/                 # Trained model files
│   ├── uploads/                # Image upload directory
│   ├── requirements.txt        # Python dependencies
│   └── README.md               # Backend documentation
│
├── run.sh                      # Development startup script
└── README.md                   # This file
```

## 🏗️ Architecture

The VizWiz system follows a modern microservices architecture:

### Frontend (React + TailwindCSS)

- **React 18+** with functional components and hooks
- **TailwindCSS** for responsive, utility-first styling
- **Framer Motion** for smooth animations and transitions
- **React Router** for client-side routing
- **Axios** for API communication

### Backend (FastAPI + PyTorch)

- **FastAPI** for high-performance API development
- **PyTorch** for deep learning model inference
- **Vision Transformer (ViT)** for image feature extraction
- **BERT** for natural language understanding
- **Custom VQA Model** with dual-output architecture

### Model Pipeline

1. **Image Processing**: Vision Transformer extracts visual features
2. **Text Processing**: BERT encodes question text into semantic embeddings
3. **Multimodal Fusion**: Combines vision and text features
4. **Answer Classification**: Predicts answers from learned vocabulary
5. **Answerability Detection**: Determines if questions are answerable

## 🚀 Quick Start

### Using the Convenience Script

```bash
# Clone the repository
git clone https://github.com/dixisouls/vizwiz.git
cd vizwiz

# Make the script executable
chmod +x run.sh

# Run both frontend and backend
./run.sh

# Or run individually
./run.sh backend    # Backend only
./run.sh frontend   # Frontend only
```

### Manual Setup

See the [Installation](#installation) section for detailed setup instructions.

## 📦 Installation

### Prerequisites

- **Python 3.8+**
- **Node.js 16+**
- **npm or yarn**

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create necessary directories
mkdir -p models uploads

# Place your trained model in the models directory
# Update .env file with your configuration
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🎯 Usage

### Web Interface

1. Visit [https://vizwiz.vercel.app/](https://vizwiz.vercel.app/) or your local
   development server
2. Upload an image using the upload component
3. Type your question in natural language
4. Get instant answers with confidence scores
5. Ask follow-up questions about the same image

### API Usage

```python
import requests

# Upload image
files = {'image': open('image.jpg', 'rb')}
response = requests.post('http://localhost:8000/api/vqa/upload', files=files)
session_id = response.json()['session_id']

# Ask question
data = {
    'session_id': session_id,
    'question': 'What color is the car in the image?'
}
response = requests.post('http://localhost:8000/api/vqa/ask', json=data)
result = response.json()

print(f"Answer: {result['answer']}")
print(f"Confidence: {result['confidence']:.2f}")
print(f"Answerable: {result['answerable']}")
```

## 📖 API Documentation

### Base URL

- **Development**: `http://localhost:8000`
- **Production**: Your deployed backend URL

### Endpoints

| Method   | Endpoint                        | Description                       |
| -------- | ------------------------------- | --------------------------------- |
| `GET`    | `/health`                       | Health check                      |
| `POST`   | `/api/vqa/upload`               | Upload image and create session   |
| `POST`   | `/api/vqa/ask`                  | Ask question about uploaded image |
| `GET`    | `/api/vqa/session/{session_id}` | Get session information           |
| `DELETE` | `/api/vqa/session/{session_id}` | Reset session                     |

### Interactive Documentation

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🛠️ Development

### Running in Development Mode

```bash
# Backend (with auto-reload)
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend (with hot-reload)
cd frontend
npm start
```

## 🧠 Model Details

### Architecture Components

- **Vision Encoder**: Vision Transformer (ViT) for image feature extraction
- **Text Encoder**: BERT for question text processing
- **Multimodal Fusion**: Concatenation and neural layers for feature combination
- **Answer Classifier**: Predicts answers from learned vocabulary
- **Answerability Classifier**: Determines if questions can be answered
- **End-to-End Training**: Joint training on VizWiz dataset

### Training Dataset

The model is trained on the **VizWiz dataset**, which contains:

**Dataset Source**: @https://www.kaggle.com/datasets/lhanhsin/vizwiz

- Real-world images taken by visually impaired individuals
- Natural language questions about image content
- Human-annotated answers and answerability labels
- Diverse scenarios and visual challenges

### Performance Metrics

- **Answer Accuracy**: Measures correct answer prediction
- **Answerability Accuracy**: Measures correct answerability detection
- **Confidence Calibration**: Alignment between confidence scores and accuracy

## Acknowledgments

- **VizWiz Dataset**: For providing real-world visual question answering data
- **Hugging Face Transformers**: For pre-trained models and utilities
- **React Community**: For excellent frontend frameworks and libraries
- **FastAPI**: For the high-performance API framework

## 📧 Contact

**GitHub**: [@dixisouls](https://github.com/dixisouls)

---

<div align="center">
  <strong>Experience AI-powered visual understanding at <a href="https://vizwiz.vercel.app/">vizwiz.vercel.app</a></strong>
</div>

# VizWiz Visual Question Answering API

This repository contains a FastAPI backend for a Visual Question Answering (VQA)
system trained on the VizWiz dataset.

## Features

- Upload images and ask questions about them
- Get answers with confidence scores
- Session management for asking multiple questions about the same image
- Health check endpoint for monitoring
- API documentation with Swagger UI

## Project Structure

```
project_root/
├── app/
│   ├── main.py               # Main FastAPI application
│   ├── models/               # Model definitions
│   │   ├── __init__.py
│   │   └── vqa_model.py      # VQA model implementation
│   ├── routers/              # API route definitions
│   │   ├── __init__.py
│   │   └── vqa.py            # VQA-related endpoints
│   ├── services/             # Business logic
│   │   ├── __init__.py
│   │   ├── model_service.py  # Model loading and inference
│   │   └── session_service.py # Session management
│   ├── utils/                # Utility functions
│   │   ├── __init__.py
│   │   └── image_utils.py    # Image processing utilities
│   └── config.py             # Application configuration
├── models/                   # Directory for model files
├── uploads/                  # Directory for uploaded images
├── .env                      # Environment variables
└── requirements.txt          # Project dependencies
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dixisouls/vizwiz-vqa-api.git
cd vizwiz-vqa-api
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create necessary directories:

```bash
mkdir -p models uploads
```

5. Place your trained model in the `models` directory.

6. Update the `.env` file with your configuration.

## Running the Application

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at http://localhost:8000.

API documentation is available at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Health Check

```
GET /health
```

Returns the health status of the API.

### Upload Image

```
POST /api/vqa/upload
```

Upload an image and create a new session.

### Ask Question

```
POST /api/vqa/ask
```

Ask a question about an uploaded image.

### Get Session

```
GET /api/vqa/session/{session_id}
```

Get session information including question history.

### Reset Session

```
DELETE /api/vqa/session/{session_id}
```

Reset a session to start fresh.

## Environment Variables

- `DEBUG`: Enable debug mode (default: False)
- `MODEL_PATH`: Path to the trained model (default: ./models/vqa_model_best.pt)
- `TEXT_MODEL`: Name of the text model (default: bert-base-uncased)
- `VISION_MODEL`: Name of the vision model (default:
  google/vit-base-patch16-384)
- `HUGGINGFACE_TOKEN`: Hugging Face API token
- `UPLOAD_DIR`: Directory for uploaded images (default: ./uploads)

## License

[MIT License](LICENSE)

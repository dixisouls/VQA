# VizWiz Visual QA Frontend

This repository contains the frontend for a Visual Question Answering (VQA)
system built with React and TailwindCSS. This application allows users to upload
images, ask questions about them, and get AI-powered answers.

## Features

- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **Dark Mode**: Full support for light and dark modes
- **Responsive Design**: Works on desktops, tablets, and mobile devices
- **Model Architecture Visualization**: Visual representation of the VQA model
- **Real-time Confidence Visualization**: Visual indicators for answer
  confidence
- **Question History**: Track previous questions and answers

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/dixisouls/vizwiz-frontend.git
cd vizwiz-frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm start
```

The application will be available at http://localhost:3000.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Page footer
│   ├── LoadingAnimation.jsx # Loading indicators
│   ├── ModelArchitecture.jsx # Model visualization
│   ├── QuestionForm.jsx # Question input form
│   ├── ResultVisualization.jsx # Answer visualization
│   └── UploadComponent.jsx # Image upload component
├── pages/               # Application pages
│   ├── Home.jsx         # Landing page
│   ├── Inference.jsx    # Main VQA interface
│   ├── About.jsx        # About page
│   └── NotFound.jsx     # 404 page
├── utils/               # Utility functions
│   ├── api.js           # API communication
│   ├── animations.js    # Animation presets
│   ├── session.js       # Session management
│   └── theme.js         # Theme utilities
├── App.js               # Main application component
├── App.css              # Global styles
├── index.js             # Application entry point
└── index.css            # TailwindCSS imports and custom utilities
```

## Connecting to the Backend

The frontend is configured to communicate with the backend API at `/api/vqa`.
You can adjust the proxy settings in `package.json` if needed:

```json
{
  "proxy": "http://localhost:8000"
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized static files in the `build` directory that can be
deployed to any static web hosting service.

## Integration with the VizWiz VQA API

This frontend works with the
[VizWiz VQA API](https://github.com/dixisouls/vizwiz-vqa-api) which provides the
backend functionality for image analysis and question answering.

## Technologies Used

- **React**: UI library
- **React Router**: Page routing
- **Framer Motion**: Animations
- **TailwindCSS**: Styling
- **Axios**: API communication

## License

[MIT License](LICENSE)

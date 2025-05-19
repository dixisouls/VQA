import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ModelArchitecture = () => {
  const svgRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Add animation to connection paths when component mounts
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll(".architecture-connection");
      paths.forEach((path) => {
        // Get the length of the path
        const length = path.getTotalLength();

        // Set up the animation
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = "dash 2s ease-in-out forwards";
      });
    }
  }, []);

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        VizWiz Model Architecture
      </h2>

      <div className="relative overflow-auto">
        <svg ref={svgRef} viewBox="0 0 1000 500" className="w-full h-auto">
          {/* Background Grid */}
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(100, 100, 100, 0.1)"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Input Nodes */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="50"
              y="150"
              width="150"
              height="80"
              rx="10"
              fill="#bae6fd"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <text
              x="125"
              y="190"
              textAnchor="middle"
              fill="#075985"
              fontWeight="bold"
            >
              Image Input
            </text>
            {/* Simple image icon instead of external placeholder */}
            <g transform="translate(105, 160)">
              <rect
                x="0"
                y="0"
                width="40"
                height="30"
                rx="2"
                fill="#0ea5e9"
                fillOpacity="0.3"
              />
              <circle cx="30" cy="10" r="5" fill="#0ea5e9" fillOpacity="0.6" />
              <polyline
                points="0,30 15,15 25,20 40,5"
                stroke="#0ea5e9"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </motion.g>

          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="50"
              y="270"
              width="150"
              height="80"
              rx="10"
              fill="#ddd6fe"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            <text
              x="125"
              y="310"
              textAnchor="middle"
              fill="#5b21b6"
              fontWeight="bold"
            >
              Question Input
            </text>
            <text
              x="125"
              y="330"
              textAnchor="middle"
              fill="#5b21b6"
              fontSize="12"
            >
              Text Query
            </text>
          </motion.g>

          {/* Vision Encoder */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="280"
              y="150"
              width="160"
              height="80"
              rx="10"
              fill="#e0f2fe"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <text
              x="360"
              y="180"
              textAnchor="middle"
              fill="#075985"
              fontWeight="bold"
            >
              Vision Encoder
            </text>
            <text
              x="360"
              y="200"
              textAnchor="middle"
              fill="#0c4a6e"
              fontSize="12"
            >
              ViT Model
            </text>
          </motion.g>

          {/* Text Encoder */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="280"
              y="270"
              width="160"
              height="80"
              rx="10"
              fill="#ede9fe"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            <text
              x="360"
              y="300"
              textAnchor="middle"
              fill="#5b21b6"
              fontWeight="bold"
            >
              Text Encoder
            </text>
            <text
              x="360"
              y="320"
              textAnchor="middle"
              fill="#4c1d95"
              fontSize="12"
            >
              BERT Model
            </text>
          </motion.g>

          {/* Projection Layers */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="520"
              y="150"
              width="140"
              height="80"
              rx="10"
              fill="#e0f2fe"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <text
              x="590"
              y="180"
              textAnchor="middle"
              fill="#075985"
              fontWeight="bold"
            >
              Vision Projection
            </text>
            <text
              x="590"
              y="200"
              textAnchor="middle"
              fill="#0c4a6e"
              fontSize="12"
            >
              Linear Layer
            </text>
          </motion.g>

          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="520"
              y="270"
              width="140"
              height="80"
              rx="10"
              fill="#ede9fe"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            <text
              x="590"
              y="300"
              textAnchor="middle"
              fill="#5b21b6"
              fontWeight="bold"
            >
              Text Projection
            </text>
            <text
              x="590"
              y="320"
              textAnchor="middle"
              fill="#4c1d95"
              fontSize="12"
            >
              Linear Layer
            </text>
          </motion.g>

          {/* Fusion Layer */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="700"
              y="200"
              width="140"
              height="100"
              rx="10"
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <text
              x="770"
              y="235"
              textAnchor="middle"
              fill="#92400e"
              fontWeight="bold"
            >
              Multimodal Fusion
            </text>
            <text
              x="770"
              y="255"
              textAnchor="middle"
              fill="#78350f"
              fontSize="12"
            >
              Concat + Linear
            </text>
            <text
              x="770"
              y="275"
              textAnchor="middle"
              fill="#78350f"
              fontSize="12"
            >
              + LayerNorm + GELU
            </text>
          </motion.g>

          {/* Output Layers */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="900"
              y="150"
              width="150"
              height="80"
              rx="10"
              fill="#d1fae5"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text
              x="975"
              y="180"
              textAnchor="middle"
              fill="#047857"
              fontWeight="bold"
            >
              Answer Classifier
            </text>
            <text
              x="975"
              y="200"
              textAnchor="middle"
              fill="#064e3b"
              fontSize="12"
            >
              Linear + LayerNorm
            </text>
          </motion.g>

          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="900"
              y="270"
              width="150"
              height="80"
              rx="10"
              fill="#fee2e2"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <text
              x="975"
              y="300"
              textAnchor="middle"
              fill="#b91c1c"
              fontWeight="bold"
            >
              Answerable Classifier
            </text>
            <text
              x="975"
              y="320"
              textAnchor="middle"
              fill="#991b1b"
              fontSize="12"
            >
              Binary Classification
            </text>
          </motion.g>

          {/* Connection Lines */}
          {/* Image Flow */}
          <path
            d="M 200 190 L 280 190"
            stroke="#0ea5e9"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />
          <path
            d="M 440 190 L 520 190"
            stroke="#0ea5e9"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />
          <path
            d="M 660 190 L 685 225"
            stroke="#0ea5e9"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />

          {/* Text Flow */}
          <path
            d="M 200 310 L 280 310"
            stroke="#8b5cf6"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />
          <path
            d="M 440 310 L 520 310"
            stroke="#8b5cf6"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />
          <path
            d="M 660 310 L 685 275"
            stroke="#8b5cf6"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />

          {/* Output Flow */}
          <path
            d="M 840 225 L 870 225 L 870 190 L 900 190"
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />
          <path
            d="M 840 275 L 870 275 L 870 310 L 900 310"
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />

          {/* Annotations */}
          <motion.g variants={itemVariants}>
            <text
              x="125"
              y="130"
              textAnchor="middle"
              fill="#475569"
              fontWeight="bold"
              className="dark:fill-gray-300"
            >
              Inputs
            </text>
          </motion.g>

          <motion.g variants={itemVariants}>
            <text
              x="360"
              y="130"
              textAnchor="middle"
              fill="#475569"
              fontWeight="bold"
              className="dark:fill-gray-300"
            >
              Encoders
            </text>
          </motion.g>

          <motion.g variants={itemVariants}>
            <text
              x="590"
              y="130"
              textAnchor="middle"
              fill="#475569"
              fontWeight="bold"
              className="dark:fill-gray-300"
            >
              Projections
            </text>
          </motion.g>

          <motion.g variants={itemVariants}>
            <text
              x="770"
              y="180"
              textAnchor="middle"
              fill="#475569"
              fontWeight="bold"
              className="dark:fill-gray-300"
            >
              Fusion
            </text>
          </motion.g>

          <motion.g variants={itemVariants}>
            <text
              x="975"
              y="130"
              textAnchor="middle"
              fill="#475569"
              fontWeight="bold"
              className="dark:fill-gray-300"
            >
              Outputs
            </text>
          </motion.g>
        </svg>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          Model Components
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <motion.li variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-2 bg-blue-300 rounded"></div>
            <div>
              <span className="font-medium">Vision Encoder:</span> Uses a Vision
              Transformer (ViT) to process the image input and create
              embeddings.
            </div>
          </motion.li>

          <motion.li variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-2 bg-purple-300 rounded"></div>
            <div>
              <span className="font-medium">Text Encoder:</span> Uses a BERT
              model to process the text question and create embeddings.
            </div>
          </motion.li>

          <motion.li variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-2 bg-yellow-300 rounded"></div>
            <div>
              <span className="font-medium">Multimodal Fusion:</span> Combines
              vision and text features through concatenation and additional
              layers.
            </div>
          </motion.li>

          <motion.li variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-2 bg-green-300 rounded"></div>
            <div>
              <span className="font-medium">Answer Classifier:</span> Predicts
              the answer from a vocabulary of possible answers.
            </div>
          </motion.li>

          <motion.li variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-2 bg-red-300 rounded"></div>
            <div>
              <span className="font-medium">Answerable Classifier:</span>{" "}
              Determines if the question can be answered based on the image.
            </div>
          </motion.li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ModelArchitecture;

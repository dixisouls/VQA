import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ModelVisualization = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  // Add animation to connection paths when component mounts
  useEffect(() => {
    if (svgRef.current && isInView) {
      const paths = svgRef.current.querySelectorAll(".architecture-connection");
      paths.forEach((path, index) => {
        // Get the length of the path
        const length = path.getTotalLength();

        // Set up the animation
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        // Add animation with staggered delay
        path.style.animation = `dash 2s ${index * 0.2}s ease-in-out forwards`;
      });
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="relative overflow-auto">
        {/* Increased viewBox width from 1000 to 1200 to ensure all elements fit properly */}
        <svg ref={svgRef} viewBox="0 0 1200 500" className="w-full h-auto">
          {/* Background */}
          <defs>
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

            <linearGradient
              id="visionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient
              id="fusionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient
              id="answerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient
              id="answerableGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow effects */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            className="dark:opacity-30"
          />

          {/* Input Nodes */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="50"
              y="150"
              width="150"
              height="80"
              rx="10"
              fill="rgba(14, 165, 233, 0.15)"
              stroke="#0ea5e9"
              strokeWidth="2"
              className="dark:fill-blue-900/20"
            />
            <text
              x="125"
              y="175"
              textAnchor="middle"
              fill="#075985"
              fontWeight="bold"
              className="dark:fill-blue-300"
            >
              Image Input
            </text>
            <g transform="translate(105, 190)">
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
              fill="rgba(139, 92, 246, 0.15)"
              stroke="#8b5cf6"
              strokeWidth="2"
              className="dark:fill-purple-900/20"
            />
            <text
              x="125"
              y="300"
              textAnchor="middle"
              fill="#5b21b6"
              fontWeight="bold"
              className="dark:fill-purple-300"
            >
              Question Input
            </text>
            <text
              x="125"
              y="320"
              textAnchor="middle"
              fill="#5b21b6"
              fontSize="12"
              className="dark:fill-purple-300"
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
              fill="url(#visionGradient)"
              stroke="#0ea5e9"
              strokeWidth="2"
              className="dark:fill-blue-900/20"
              filter="url(#glow)"
            />
            <text
              x="360"
              y="175"
              textAnchor="middle"
              fill="#075985"
              fontWeight="bold"
              className="dark:fill-blue-300"
            >
              Vision Encoder
            </text>
            <text
              x="360"
              y="195"
              textAnchor="middle"
              fill="#0c4a6e"
              fontSize="12"
              className="dark:fill-blue-300"
            >
              Vision Transformer
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
              fill="url(#textGradient)"
              stroke="#8b5cf6"
              strokeWidth="2"
              className="dark:fill-purple-900/20"
              filter="url(#glow)"
            />
            <text
              x="360"
              y="295"
              textAnchor="middle"
              fill="#5b21b6"
              fontWeight="bold"
              className="dark:fill-purple-300"
            >
              Text Encoder
            </text>
            <text
              x="360"
              y="315"
              textAnchor="middle"
              fill="#4c1d95"
              fontSize="12"
              className="dark:fill-purple-300"
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
              fill="rgba(14, 165, 233, 0.15)"
              stroke="#0ea5e9"
              strokeWidth="2"
              className="dark:fill-blue-900/20"
            />
            <text
              x="590"
              y="175"
              textAnchor="middle"
              fill="#075985"
              fontWeight="bold"
              className="dark:fill-blue-300"
            >
              Vision Projection
            </text>
            <text
              x="590"
              y="195"
              textAnchor="middle"
              fill="#0c4a6e"
              fontSize="12"
              className="dark:fill-blue-300"
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
              fill="rgba(139, 92, 246, 0.15)"
              stroke="#8b5cf6"
              strokeWidth="2"
              className="dark:fill-purple-900/20"
            />
            <text
              x="590"
              y="295"
              textAnchor="middle"
              fill="#5b21b6"
              fontWeight="bold"
              className="dark:fill-purple-300"
            >
              Text Projection
            </text>
            <text
              x="590"
              y="315"
              textAnchor="middle"
              fill="#4c1d95"
              fontSize="12"
              className="dark:fill-purple-300"
            >
              Linear Layer
            </text>
          </motion.g>

          {/* Fusion Layer - Increased width from 140px to 170px */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="700"
              y="200"
              width="170"
              height="100"
              rx="10"
              fill="url(#fusionGradient)"
              stroke="#f59e0b"
              strokeWidth="2"
              className="dark:fill-amber-900/20"
              filter="url(#glow)"
            />
            <text
              x="785"
              y="230"
              textAnchor="middle"
              fill="#92400e"
              fontWeight="bold"
              className="dark:fill-amber-300"
            >
              Multimodal Fusion
            </text>
            <text
              x="785"
              y="250"
              textAnchor="middle"
              fill="#78350f"
              fontSize="12"
              className="dark:fill-amber-300"
            >
              Concat + Linear
            </text>
            <text
              x="785"
              y="270"
              textAnchor="middle"
              fill="#78350f"
              fontSize="12"
              className="dark:fill-amber-300"
            >
              LayerNorm + GELU
            </text>
          </motion.g>

          {/* Output Layers - Adjusted positioning to maintain spacing */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="950"
              y="150"
              width="160"
              height="80"
              rx="10"
              fill="url(#answerGradient)"
              stroke="#10b981"
              strokeWidth="2"
              className="dark:fill-emerald-900/20"
              filter="url(#glow)"
            />
            <text
              x="1030"
              y="175"
              textAnchor="middle"
              fill="#047857"
              fontWeight="bold"
              className="dark:fill-emerald-300"
            >
              Answer Classifier
            </text>
            <text
              x="1030"
              y="195"
              textAnchor="middle"
              fill="#064e3b"
              fontSize="12"
              className="dark:fill-emerald-300"
            >
              Linear + LayerNorm
            </text>
          </motion.g>

          {/* Answerable Classifier - Increased width from 150px to 180px */}
          <motion.g variants={itemVariants} className="architecture-node">
            <rect
              x="950"
              y="270"
              width="180"
              height="80"
              rx="10"
              fill="url(#answerableGradient)"
              stroke="#ef4444"
              strokeWidth="2"
              className="dark:fill-red-900/20"
              filter="url(#glow)"
            />
            <text
              x="1040"
              y="295"
              textAnchor="middle"
              fill="#b91c1c"
              fontWeight="bold"
              className="dark:fill-red-300"
            >
              Answerable Classifier
            </text>
            <text
              x="1040"
              y="315"
              textAnchor="middle"
              fill="#991b1b"
              fontSize="12"
              className="dark:fill-red-300"
            >
              Binary Classification
            </text>
          </motion.g>

          {/* Connection Lines - Updated to match the new positions */}
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
            d="M 660 190 L 700 225"
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
            d="M 660 310 L 700 275"
            stroke="#8b5cf6"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />

          {/* Output Flow - Updated to match the new positions */}
          <path
            d="M 870 225 L 910 225 L 910 190 L 950 190"
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />
          <path
            d="M 870 275 L 910 275 L 910 310 L 950 310"
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
            className="architecture-connection"
          />

          {/* Data flow animations */}
          <motion.circle
            cx="200"
            cy="190"
            r="4"
            fill="#0ea5e9"
            className="architecture-data-point"
            animate={{
              x: [0, 80, 0],
              opacity: [1, 0.7, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              times: [0, 0.5, 1],
            }}
          />

          <motion.circle
            cx="200"
            cy="310"
            r="4"
            fill="#8b5cf6"
            className="architecture-data-point"
            animate={{
              x: [0, 80, 0],
              opacity: [1, 0.7, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              times: [0, 0.5, 1],
              delay: 0.5,
            }}
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
              x="785"
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
              x="1040"
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

      <div className="mt-12 card p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-surface-800 dark:text-white mb-4">
          Model Architecture Explained
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <motion.div variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-3 rounded-full bg-brand-500 dark:bg-brand-600 flex-shrink-0"></div>
            <div>
              <span className="font-medium">Vision Encoder</span>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                Uses a Vision Transformer (ViT) to process image inputs into
                rich visual embeddings that capture objects, spatial
                relationships, and visual attributes.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-3 rounded-full bg-accent-500 dark:bg-accent-600 flex-shrink-0"></div>
            <div>
              <span className="font-medium">Text Encoder</span>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                Utilizes a BERT model to process question text into semantic
                embeddings that understand the intent and context of the query.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-3 rounded-full bg-amber-500 dark:bg-amber-600 flex-shrink-0"></div>
            <div>
              <span className="font-medium">Multimodal Fusion</span>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                Combines vision and text features through concatenation and
                neural layers to create a unified understanding of the image and
                question.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-3 rounded-full bg-emerald-500 dark:bg-emerald-600 flex-shrink-0"></div>
            <div>
              <span className="font-medium">Answer Classifier</span>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                Processes the fused representation to predict the most likely
                answer from a vocabulary of possible answers learned during
                training.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-3 rounded-full bg-red-500 dark:bg-red-600 flex-shrink-0"></div>
            <div>
              <span className="font-medium">Answerable Classifier</span>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                Determines if the question can be answered based on the image
                content, preventing the model from guessing when information is
                insufficient.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="w-4 h-4 mt-1 mr-3 rounded bg-gradient-to-r from-brand-500 to-accent-500 flex-shrink-0"></div>
            <div>
              <span className="font-medium">End-to-End Training</span>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                The entire architecture is trained jointly on the VizWiz
                dataset, allowing all components to work together harmoniously
                for optimal performance.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModelVisualization;

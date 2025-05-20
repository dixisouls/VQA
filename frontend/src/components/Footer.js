import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 pt-12 pb-8 relative z-10"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-accent-500 dark:from-brand-400 dark:to-accent-400">
                VizWiz
              </span>
              <span className="ml-2 text-surface-700 dark:text-surface-300">
                Visual QA
              </span>
            </Link>
            <p className="mt-4 text-sm text-surface-600 dark:text-surface-400">
              Intelligent Visual Question Answering powered by state-of-the-art
              deep learning models.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a
                href="https://github.com/dixisouls/vizwiz-vqa-api"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-surface-500 hover:text-surface-800 dark:hover:text-surface-200 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.a>
              <motion.a
                href="https://huggingface.co/dixisouls"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-surface-500 hover:text-surface-800 dark:hover:text-surface-200 transition-colors"
                aria-label="Hugging Face"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9999 0C5.37992 0 0 5.37992 0 11.9999C0 18.6199 5.37992 24 11.9999 24C18.6199 24 24 18.6199 24 11.9999C24 5.37992 18.6199 0 11.9999 0ZM9.14449 18.5141C8.34492 18.2264 7.78869 17.5449 7.21148 16.3079C7.13745 16.1442 7.19675 15.9529 7.33793 15.8554C7.47912 15.758 7.67435 15.782 7.79358 15.9118C8.3295 16.5136 8.91361 16.8132 9.47954 16.8132C10.1071 16.8132 10.583 16.4493 10.9321 15.7679C11.0065 15.6115 11.1848 15.5364 11.3526 15.5807C11.5205 15.625 11.6333 15.7795 11.6333 15.9529C11.6333 17.4233 10.8485 18.3222 9.14449 18.5141ZM14.8553 18.5141C13.1514 18.3222 12.3666 17.4233 12.3666 15.9529C12.3666 15.7795 12.4794 15.625 12.6472 15.5807C12.8151 15.5364 12.9934 15.6115 13.0678 15.7679C13.4169 16.4493 13.8928 16.8132 14.5203 16.8132C15.0862 16.8132 15.6703 16.5136 16.2062 15.9118C16.3255 15.782 16.5207 15.758 16.6619 15.8554C16.8031 15.9529 16.8624 16.1442 16.7884 16.3079C16.2112 17.5449 15.6549 18.2264 14.8553 18.5141ZM5.90499 15.7531C5.77358 15.7531 5.65726 15.6747 5.61185 15.5507L4.18227 11.5689C4.14866 11.4754 4.16441 11.3724 4.22375 11.2921C4.28305 11.2119 4.37744 11.1647 4.47541 11.1647H7.49285C7.65022 11.1647 7.77752 11.292 7.77752 11.4494C7.77752 11.6068 7.65022 11.7341 7.49285 11.7341H4.80413L6.19813 15.5746C6.24354 15.7041 6.20232 15.851 6.09314 15.9301C6.03695 15.9678 5.97083 15.7531 5.90499 15.7531ZM17.8248 15.7531C17.7589 15.7531 17.6928 15.9678 17.6366 15.9301C17.5275 15.851 17.4862 15.7041 17.5316 15.5746L18.9256 11.7341H16.2369C16.0795 11.7341 15.9522 11.6068 15.9522 11.4494C15.9522 11.292 16.0795 11.1647 16.2369 11.1647H19.2544C19.3523 11.1647 19.4467 11.2119 19.506 11.2921C19.5654 11.3724 19.5811 11.4754 19.5475 11.5689L18.118 15.5507C18.0726 15.6747 17.9562 15.7531 17.8248 15.7531ZM10.3561 11.1647H13.3737C13.531 11.1647 13.6583 11.292 13.6583 11.4494C13.6583 11.6068 13.531 11.7341 13.3737 11.7341H10.3561C10.1987 11.7341 10.0714 11.6068 10.0714 11.4494C10.0714 11.292 10.1987 11.1647 10.3561 11.1647ZM8.05662 9.68578C8.14442 9.59798 8.14442 9.45553 8.05662 9.36773C7.96882 9.27993 7.82637 9.27993 7.73857 9.36773C7.17267 9.93363 6.69679 10.0214 6.11958 9.66839C5.62781 9.36773 5.51203 8.95572 5.53801 8.60272C5.53939 8.57533 5.5422 8.54792 5.54647 8.52078C5.72775 8.21321 5.81555 7.85329 5.81555 7.44818C5.81555 6.04057 4.67123 4.89626 3.26362 4.89626C2.63552 4.89626 2.00742 5.15592 1.55442 5.57483C1.37172 5.75753 1.37172 6.0582 1.55442 6.24089C1.73711 6.42359 2.03778 6.42359 2.22047 6.24089C2.5145 5.94686 2.8896 5.75673 3.26362 5.75673C4.19609 5.75673 4.95507 6.5157 4.95507 7.44818C4.95507 7.69211 4.89781 7.92935 4.78897 8.14204C4.55173 8.53127 4.02682 8.9433 3.34972 8.9433C3.10577 8.9433 2.89309 9.15598 2.89309 9.39993C2.89309 9.64388 3.10577 9.85656 3.34972 9.85656C4.31319 9.85656 5.06532 9.36773 5.34096 8.86011C5.69395 9.57276 6.32206 9.65364 6.51164 9.75346C6.83322 9.93363 7.35814 10.5185 8.05662 9.68578ZM16.2623 9.36773C16.1745 9.27993 16.0321 9.27993 15.9442 9.36773C15.8564 9.45553 15.8564 9.59798 15.9442 9.68578C16.6427 10.5185 17.1676 9.93363 17.4892 9.75346C17.6788 9.65364 18.3069 9.57276 18.6599 8.86011C18.9355 9.36773 19.6877 9.85656 20.6511 9.85656C20.8951 9.85656 21.1078 9.64388 21.1078 9.39993C21.1078 9.15598 20.8951 8.9433 20.6511 8.9433C19.974 8.9433 19.4491 8.53127 19.2119 8.14204C19.103 7.92935 19.0458 7.69211 19.0458 7.44818C19.0458 6.5157 19.8048 5.75673 20.7372 5.75673C21.1112 5.75673 21.4863 5.94686 21.7804 6.24089C21.9631 6.42359 22.2637 6.42359 22.4464 6.24089C22.6291 6.0582 22.6291 5.75753 22.4464 5.57483C21.9934 5.15592 21.3654 4.89626 20.7372 4.89626C19.3296 4.89626 18.1853 6.04057 18.1853 7.44818C18.1853 7.85329 18.2731 8.21321 18.4544 8.52078C18.4587 8.54792 18.4615 8.57533 18.4629 8.60272C18.4888 8.95572 18.373 9.36773 17.8813 9.66839C17.304 10.0214 16.8282 9.93363 16.2623 9.36773ZM11.4492 6.40397C10.7525 6.40397 10.166 6.95329 10.166 7.6071C10.166 8.27666 10.6972 8.81022 11.4492 8.81022C12.1459 8.81022 12.7323 8.26092 12.7323 7.6071C12.7323 6.95329 12.2012 6.40397 11.4492 6.40397Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Resources Column */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://github.com/dixisouls/vizwiz-vqa-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/docs/transformers/model_doc/vit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
                >
                  Vision Transformer
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/docs/transformers/model_doc/bert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
                >
                  BERT Model
                </a>
              </li>
              <li>
                <a
                  href="https://pytorch.org/docs/stable/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
                >
                  PyTorch
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Links Column */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/inference"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
                >
                  Inference
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://github.com/dixisouls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/dixisouls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12S6.615 21.75 12 21.75 21.75 17.385 21.75 12 17.385 2.25 12 2.25zm0 8.625c1.036 0 1.875-.84 1.875-1.875S13.036 7.125 12 7.125s-1.875.84-1.875 1.875S10.964 10.875 12 10.875zm0 0"
                      fill="currentColor"
                    />
                  </svg>
                  Hugging Face
                </a>
              </li>
              <li>
                <a
                  href="https://dockerhub.com/u/dixisouls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.983 11.078h2.119a.186.186 0 00.186-.185V8.774a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v2.119c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.342a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v2.119c0 .102.082.186.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.059a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v2.119c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.059a.185.185 0 00-.185-.185h-2.12a.185.185 0 00-.184.185v2.119c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.059a.185.185 0 00-.185-.185h-2.12a.186.186 0 00-.183.185v2.119c0 .102.082.186.185.186m2.955 2.716h2.118a.186.186 0 00.185-.186V8.774a.185.185 0 00-.185-.186h-2.118a.185.185 0 00-.185.186v2.119c0 .102.082.185.185.185m-2.955 0h2.12a.185.185 0 00.184-.186V8.774a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v2.119c0 .102.082.185.185.185m-2.953 0h2.119a.185.185 0 00.185-.186V8.774a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.184.186v2.119c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V8.774a.186.186 0 00-.185-.186H1.186a.186.186 0 00-.186.186v2.119c0 .102.083.185.186.185M21.99 13.194c-.047-.641-.299-1.139-.793-1.495l-.447-.327c-.566-.354-.575-.354-1.087-.122-.507.224-.516.23-1.122-.124-.603-.356-.612-.356-1.211-.124-.6.232-.61.236-1.209-.12-.607-.357-.618-.357-1.219-.12-.606.238-.617.243-1.22-.111-.608-.36-.624-.363-1.237-.122-.558.226-.57.233-1.098-.145-.308-.219-.614-.36-.875-.432l-.597.598c.216.165.488.296.763.488.57.384.576.384 1.191.138.577-.223.617-.215 1.215.123.592.336.617.338 1.21.111.6-.236.626-.234 1.209.118.589.354.618.355 1.221.122.602-.234.624-.232 1.229.122.594.349.606.351 1.194.119.62-.24.63-.234 1.235.124.606.357.612.357 1.09.126.468-.224.609-.025.708.328.189.689-.219 1.368-1.275 1.368-.701 0-1.301-.346-1.301-.945 0-.102-.35-.197-.75-.197h-4.445c-.414 0-.75.094-.75.196 0 .599-.6.945-1.301.945-1.052 0-1.466-.687-1.275-1.368.195-.697.822-.611.877-1.086.056-.474.019-2.744-.129-3.293-.148-.547.021-1.5.5-1.96.449-.426 1.133-.753 1.881-.754h12.443c.842.001 1.371.9 1.185 1.745-.168.75-.085 2.464-.085 3.302"
                      fill="currentColor"
                    />
                  </svg>
                  Docker Hub
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-6 border-t border-surface-200 dark:border-surface-800 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-surface-500 dark:text-surface-400">
            &copy; {currentYear} VizWiz Visual QA. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-surface-400 dark:text-surface-500">
            Built with React, Tailwind CSS and Framer Motion. Powered by PyTorch
            and Hugging Face transformers.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

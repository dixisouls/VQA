import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                VizWiz
              </span>
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Visual QA
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Visual Question Answering for Everyone
            </p>
          </div>

          <div className="flex flex-col space-y-4 text-center md:flex-row md:space-y-0 md:space-x-6 md:text-left">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-gray-100">
                Resources
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="https://github.com/dixisouls/vizwiz-vqa-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://huggingface.co/docs/transformers/model_doc/vit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Vision Transformer
                  </a>
                </li>
                <li>
                  <a
                    href="https://huggingface.co/docs/transformers/model_doc/bert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    BERT Model
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-gray-100">
                Links
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inference"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Inference
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-gray-100">
                Contact
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <a
                    href="https://github.com/dixisouls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://huggingface.co/dixisouls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Hugging Face
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} VizWiz Visual QA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

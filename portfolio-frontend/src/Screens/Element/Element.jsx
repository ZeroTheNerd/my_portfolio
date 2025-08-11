// src/Screens/Element/Element.jsx
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Zein } from "../../components/Zein/zein";
import "./style.css";

const Element = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/landing", { state: { inChromeWindow: true } });
  };

  return (
    <div className="element">
      <div className="content-wrapper">
        <div className="name-animation">
          <Zein />
          <motion.div
            className="last-name"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Martim
          </motion.div>
        </div>

        <motion.div
          className="button-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="get-started-button" onClick={handleButtonClick}>
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Element;

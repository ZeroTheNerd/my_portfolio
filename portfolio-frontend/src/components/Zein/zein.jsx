import { motion } from "framer-motion";
import React from "react";
import "./style.css";

export const Zein = () => {
  return (
    <motion.div
      className="zein"
      initial={{ y: -300, opacity: 1 }} // Start higher up with full opacity
      animate={{ y: 0 }} // Fall down to its normal position
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.8, // Delay to ensure Mosarsaa is visible first
      }}
    >
      <div className="text-wrapper">Zach</div>
    </motion.div>
  );
};

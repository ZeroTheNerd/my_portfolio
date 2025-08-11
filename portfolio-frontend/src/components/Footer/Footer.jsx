import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <footer className="page-footer">
      <div className="footer-content">
        <p>© 2025 ZM</p>
        <div className="footer-links">
          <button
            className="footer-link"
            onClick={() => navigate("/PrivacyPolicy")}
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowState } from "../../context/WindowContext";
import NavBar from "../Navigation/NavBar";
import Footer from "../Footer/Footer";
import "./ChromeLayout.css";

const ChromeLayout = ({ children }) => {
  const navigate = useNavigate();
  const { windowSize, updateWindowSize } = useWindowState();

  const handleControls = (action) => {
    switch (action) {
      case "close":
        navigate("/");
        updateWindowSize("normal");
        break;
      case "minimize":
        updateWindowSize("minimized");
        break;
      case "maximize":
        updateWindowSize(windowSize === "fullscreen" ? "normal" : "fullscreen");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateWindowSize("fullscreen");
    return () => updateWindowSize("normal");
  }, [updateWindowSize]);

  return (
    <div className="desktop-screen">
      <div className={`chrome-window ${windowSize}`}>
        <div className="chrome-header">
          <div className="mac-controls">
            <button
              className="red"
              onClick={() => handleControls("close")}
              aria-label="Close window"
            ></button>
            <button
              className="yellow"
              onClick={() => handleControls("minimize")}
              aria-label="Minimize window"
            ></button>
            <button
              className="green"
              onClick={() => handleControls("maximize")}
              aria-label="Maximize window"
            ></button>
          </div>
          <div className="chrome-title">Google Chrome</div>
        </div>
        <div className="chrome-body">
          <main className="content-wrapper main-content">{children}</main>
          <NavBar />

        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ChromeLayout;

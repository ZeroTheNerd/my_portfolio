import React, { useEffect, useState } from "react";
import Element from "../Element/Element";
import "./style.css";

export const PowerShellAnimation = () => {
  const [messages, setMessages] = useState([]);
  const [showChromeTab, setShowChromeTab] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [chromeWindowSize, setChromeWindowSize] = useState("normal"); // "normal", "minimized", "fullscreen"

  // Handle window controls for Chrome tab
  const handleChromeControls = (action) => {
    switch (action) {
      case "close":
        setShowChromeTab(false);
        break;
      case "minimize":
        setChromeWindowSize("minimized");
        break;
      case "maximize":
        setChromeWindowSize(
          chromeWindowSize === "fullscreen" ? "normal" : "fullscreen"
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const steps = [
      "Initializing...",
      "Downloading dependencies...",
      "Installing packages...",
      "Starting application...",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length) {
        setMessages((prev) => [...prev, steps[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowTerminal(false);
          setShowChromeTab(true);
        }, 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="desktop-screen">
      {/* Terminal Window */}
      {showTerminal && (
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="mac-controls">
              <button
                className="red"
                onClick={() => setShowTerminal(false)}
              ></button>
              <button className="yellow"></button>
              <button className="green"></button>
            </div>
            Terminal
          </div>
          <div className="terminal-body">
            {messages.map((msg, idx) => (
              <div key={idx} className="terminal-line">
                zachmartim@Macbook-Pro-123 Desktop % {msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chrome Tab */}
      {showChromeTab && (
        <div className={`chrome-window ${chromeWindowSize}`}>
          <div className="chrome-header">
            <div className="mac-controls">
              <button
                className="red"
                onClick={() => handleChromeControls("close")}
              ></button>
              <button
                className="green"
                onClick={() => handleChromeControls("maximize")}
              ></button>
            </div>
            Google Chrome
          </div>
          <div className="chrome-body">
            <Element />
          </div>
        </div>
      )}
    </div>
  );
};

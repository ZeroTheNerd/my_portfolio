// Landing.jsx (Updated)
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "../../styles/global.css";
import "./Landing.css";
import linkedinpfp from '../../assets/images/linkedinpfp.png';
import Ulogo from '../../assets/images/Ulogo.png';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Landing = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [dynamicText, setDynamicText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stickies, setStickies] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");
  const typingInterval = useRef(null);

  const errorMessage =
    "\tOops! It looks like you've stumbled upon a glitch in the Sim-verse!\n\nHello, I'm Zach Martim, a Student Software Engineer at the University Of Utah's ServiceNow Platform and soon-to-be Computer Science graduate.\n\nDon't worry, this isn't a real error. I'm just excited to connect with fellow tech professionals!";

  const initialMessages = [
    errorMessage,
    "I'm passionate about technology and software engineering.",
    "I bring a unique blend of technical expertise and a global perspective",
    "Feel free to connect with me to discuss exciting opportunities or collaborations!",
    "Gaming is a huge part of my life! Let's connect and talk about it!",
  ];

  // Fixed typing animation with cleanup
  const typeMessage = () => {
    let i = 0;
    setDynamicText(""); // Reset text before typing
    clearInterval(typingInterval.current);

    typingInterval.current = setInterval(() => {
      if (i < errorMessage.length) {
        setDynamicText((prev) => prev + errorMessage[i]);
        i++;
      } else {
        clearInterval(typingInterval.current);
        setIsTyping(false);
      }
    }, 30);
  };

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedSession");
    if (!hasVisited) {
      const timeout = setTimeout(() => {
        setPopupVisible(true);
        new Audio("https://www.myinstants.com/media/sounds/erro.mp3").play();
        sessionStorage.setItem("hasVisitedSession", "true");
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (isPopupVisible && !isTyping) {
      setIsTyping(true);
      typeMessage();
    }
    return () => clearInterval(typingInterval.current);
  }, [isPopupVisible]);

  // Initialize sticky notes with unique IDs
  useEffect(() => {
    setStickies(
      initialMessages.map((text, i) => ({
        id: Date.now() + i,
        text,
        position: getRandomPosition(),
        color: getRandomColor(),
      }))
    );
  }, []);

  // Add new sticky note functionality
  const addSticky = () => {
    const newSticky = {
      id: Date.now(),
      text: newNoteText || "New Note",
      position: {
        x: Math.random() * window.innerWidth * 0.3,
        y: Math.random() * window.innerHeight * 0.3,
      },
      color: getRandomColor(), // Add this line
    };
    setStickies([...stickies, newSticky]);
    setNewNoteText("");
  };

  const getRandomColor = () => {
    const colors = [
      "#fbee9d", // Yellow
      "#ffcccb", // Pink
      "#c7f9cc", // Mint Green
      "#a0c4ff", // Light Blue
      "#fdffb6", // Lemon Yellow
      "#ffc6ff", // Lavender
      "#ffab73", // Peach
      "#d4a5a5", // Rose
      "#bde0fe", // Sky Blue
      "#caf7e3", // Aqua Mint
      "#f9c0c0", // Coral Pink
      "#f1e7fe", // Soft Purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Updated reset functionality
  const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth * 0.6,
    y: Math.random() * window.innerHeight * 0.6,
  });

  // Updated reset functionality
  const resetStickies = () => {
    setStickies(
      initialMessages.map((text, i) => ({
        id: Date.now() + i,
        text,
        position: getRandomPosition(),
        color: getRandomColor(), // Assign random color
      }))
    );
  };

  // Handle drag movement
  const handleDragStop = (e, data, id) => {
    setStickies(
      stickies.map((sticky) =>
        sticky.id === id
          ? { ...sticky, position: { x: data.x, y: data.y }, isPlaced: true } // Mark as placed
          : sticky
      )
    );
  };

  return (
    <div className="landing-container">
      {/* Left Section */}
      <div className="landing-left">
        <div className="profile-picture">
          <img
            src={linkedinpfp}
            alt="Profile"
            className="profile-img"
          />
        </div>
         {/* Add your name and title */}
        <div className="profile-details">
          <h2>Zach Martim</h2>
          <h4>Student Software Engineer</h4>
          <h4 className = "university-row">University of Utah <img src={Ulogo} alt = "U logo" className="u-logo" /> </h4>
          <p>Salt Lake City, UT</p>
        </div>

        <div className="card connect-card">
          <h3>Connect with Me</h3>
          <ul className="social-links">
            <li>
              <a
                href="https://www.linkedin.com/in/zachmartim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ZeroTheNerd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a href="zachmartim101@gmail.com"
                 aria-label="Email" >
                  <MdEmail />
                </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="landing-right">
        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <div className="popup-header">
                <span className="popup-title">Error Message</span>
                <button
                  onClick={() => {
                    setPopupVisible(false);
                    resetStickies(); // Add this line
                  }}
                  className="close-button"
                >
                  X
                </button>
              </div>
              <p className="typing">{dynamicText}</p>
            </div>
          </div>
        )}

        {!isPopupVisible && (
          <div className="sticky-container">
            {/* Error Message (non-draggable) */}

            {stickies.map((sticky) => (
              <Draggable
                key={sticky.id}
                bounds="parent"
                position={sticky.position}
                onStop={(e, data) => handleDragStop(e, data, sticky.id)} // Detect placement
              >
                <div
                  className="stickynote"
                  style={{ backgroundColor: sticky.color }}
                >
                  {sticky.text}
                </div>
              </Draggable>
            ))}

            {/* Add New Note Controls */}
            <div className="controls">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="New note text"
              />
              <button onClick={addSticky}>Add Note</button>
              <button onClick={resetStickies}>Reset Board</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;

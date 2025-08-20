import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "../../styles/global.css";
import "./Extra.css"; // Copy Landing.css here and adjust as needed

const errorMessage =
  "\tOops! It looks like you've stumbled upon a glitch in the Sim-verse!...";
const initialMessages = [
  errorMessage,
  "I'm passionate about technology and software engineering.",
  "I bring a unique blend of ...",
  "Feel free to connect with me...",
  "Gaming is a huge part of my life!...",
];

const Extras = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [dynamicText, setDynamicText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stickies, setStickies] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");
  const typingInterval = useRef(null);

  const typeMessage = () => {
    let i = 0;
    setDynamicText("");
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
    setStickies(
      initialMessages.map((text, i) => ({
        id: Date.now() + i,
        text,
        position: getRandomPosition(),
        color: getRandomColor(),
      }))
    );
  }, []);

  useEffect(() => {
    if (isPopupVisible && !isTyping) {
      setIsTyping(true);
      typeMessage();
    }
    return () => clearInterval(typingInterval.current);
  }, [isPopupVisible]);

  const addSticky = () => {
    const newSticky = {
      id: Date.now(),
      text: newNoteText || "New Note",
      position: {
        x: Math.random() * window.innerWidth * 0.3,
        y: Math.random() * window.innerHeight * 0.3,
      },
      color: getRandomColor(),
    };
    setStickies([...stickies, newSticky]);
    setNewNoteText("");
  };

  const resetStickies = () => {
    setStickies(
      initialMessages.map((text, i) => ({
        id: Date.now() + i,
        text,
        position: getRandomPosition(),
        color: getRandomColor(),
      }))
    );
  };

  function getRandomColor() {
    const colors = [
      "#fbee9d",
      "#ffcccb",
      "#c7f9cc",
      "#a0c4ff",
      "#fdffb6",
      "#ffc6ff",
      "#ffab73",
      "#d4a5a5",
      "#bde0fe",
      "#caf7e3",
      "#f9c0c0",
      "#f1e7fe",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getRandomPosition() {
    return {
      x: Math.random() * window.innerWidth * 0.6,
      y: Math.random() * window.innerHeight * 0.6,
    };
  }

  const handleDragStop = (e, data, id) => {
    setStickies(
      stickies.map((sticky) =>
        sticky.id === id
          ? { ...sticky, position: { x: data.x, y: data.y }, isPlaced: true }
          : sticky
      )
    );
  };

  return (
    <div className="extras-container">
      <div className="chalkboard-section">
        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <div className="popup-header">
                <span className="popup-title">Error Message</span>
                <button
                  onClick={() => {
                    setPopupVisible(false);
                    resetStickies();
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
            {stickies.map((sticky) => (
              <Draggable
                key={sticky.id}
                bounds="parent"
                position={sticky.position}
                onStop={(e, data) => handleDragStop(e, data, sticky.id)}
              >
                <div
                  className="stickynote"
                  style={{ backgroundColor: sticky.color }}
                >
                  {sticky.text}
                </div>
              </Draggable>
            ))}
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

export default Extras;

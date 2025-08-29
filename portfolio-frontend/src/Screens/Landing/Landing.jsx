// Landing.jsx (Updated)
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import linkedinpfp from "../../assets/images/linkedinpfp.png";
import Ulogo from "../../assets/images/Ulogo.png";
import "../../styles/global.css";
import "./Landing.css";

const Landing = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [dynamicText, setDynamicText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingInterval = useRef(null);

  const errorMessage =
    "\tOops! It looks like you've stumbled upon a glitch in the Sim-verse!\n\nHello, I'm Zach Martim, a Student Software Engineer at the University Of Utah's ServiceNow Platform and soon-to-be Computer Science graduate.\n\nDon't worry, this isn't a real error. I'm just excited to connect with fellow tech professionals!";

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

  return (
    <div className="landing-container">
      {/* Left Section */}
      <div className="landing-left">
        <div className="profile-picture">
          <img src={linkedinpfp} alt="Profile" className="profile-img" />
        </div>
        {/* Add your name and title */}
        <div className="profile-details">
          <h2>Zach Martim</h2>
          <h4>Student Software Engineer</h4>
          <h4 className="university-row">
            University of Utah{" "}
            <img src={Ulogo} alt="U logo" className="u-logo" />{" "}
          </h4>
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
              <a
                href="mailto:zachmartim101@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
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
                    // If you want to reset stickies or perform other actions on close, add here
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
          <div className="about-me-panel">
            <h2>About Me</h2>
            <p>
              Hi, I’m <span className="about-name">Zach Martim</span> - a
              passionate Student Software Engineer for our ServiceNow platform
              at the University of Utah. I am currently pursuing my degree in
              Computer Science with an expected graduation date of December
              2026. Driven by curiosity and creativity, I love building tools,
              collaborating on innovative projects and finding simple solutions.
            </p>
            <p>
              <strong className="about-excited">What gets me excited?</strong>{" "}
              Tackling coding challenges, participating in hackathons, game jams
              and even CTF challenges. I love finding new ways to grow, and
              connecting with people who share a love for tech (or games, or
              amazing coffee/drinks!).
            </p>
            <ul className="about-facts">
              <li>
                I strive for great teamwork and collaboration. I am able to
                learn the most from others and find motivation through my peers.
              </li>
              <li>
                Outside the screen, which is rare, you can catch me hanging out
                with friends, jamming to some music, or on a nice day out with
                my partner.
              </li>
              <li>
                Favorite saying:{" "}
                <em>
                  “If debugging is the process of removing software bugs, then
                  programming must be the process of putting them in”
                </em>
              </li>
            </ul>
            <p>
              Let’s connect—I'm always open to collaborations and conversation!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;

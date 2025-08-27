import { useNavigate } from "react-router-dom";
import byulogo from "../../assets/images/Byulogo.png";
import Ulogo from "../../assets/images/Ulogored.png";

import "./DigitalResume.css";

const experiences = [
  {
    period: "December 2022 - present",
    title: "Software Engineer Intern",
    company: "University of Utah, ServiceNow",
    description:
      "Utilizing ServiceNow, I have developed responsive UI with javascript; implemented REST APIs through Flow Designer and I am the SME for our Kallidus Integration; Solved several bugs and implemented fixes for them; I even created a secret snake game using javascript",
    icon: Ulogo,
  },
  {
    period: "2022 - present",
    title: "Student, Computer Science Major",
    company: "University Of Utah",
    description:
      "I decided pure mathematics wasn't for me and switched to Computer science. While changing majors I also transferred Universities. I have an emphasis on AI, Machine Learning and Information classes such as Digital Image Processing, Aritificial Intelligence, Database System, Computer Systems, Data Analysis, and much more",
    icon: Ulogo,
  },
  {
    period: "2021 – 2022",
    title: "Student, Mathematics Major",
    company: "Brigham Young University",
    description:
      "My first year at university I attended BYU as a mathematics major. I wasn't sure if this is what I wanted so I took a few core math classes such as Calculus 2 and the rest were generals",
    icon: byulogo,
  },
];

const DigitalResume = () => {
  const navigate = useNavigate();

  return (
    <section className="digital-resume-container">
      <div className="timeline">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className={`timeline-container ${idx % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-content">
              <img
                src={exp.icon}
                alt={`${exp.company} logo`}
                className="timeline-icon"
              />
              <h3>{exp.period}</h3>
              <h4>
                {exp.title}, {exp.company}
              </h4>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DigitalResume;

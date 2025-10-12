import { useState } from "react";
import { FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import byulogo from "../../assets/images/Byulogo.png";
import Ulogo from "../../assets/images/Ulogored.png";

import "./DigitalResume.css";

const experiences = [
  {
    period: "December 2022 - Present",
    startDate: "Dec 2022",
    endDate: "Present",
    duration: "2+ years",
    title: "Student Software Engineer",
    company: "University of Utah",
    department: "ServiceNow Platform",
    location: "Salt Lake City, UT",
    type: "work",
    icon: Ulogo,
    description:
      "Leading ServiceNow platform development and integration projects, serving as the subject matter expert for enterprise solutions.",
    achievements: [
      "Developed responsive UI components using JavaScript, improving user experience across the ServiceNow platform",
      "Implemented REST APIs through Flow Designer, streamlining data integration processes",
      "Serve as SME (Subject Matter Expert) for Kallidus Integration, managing complex system connections",
      "Resolved multiple critical bugs and implemented robust fixes, enhancing platform stability",
      "Created interactive features and Easter eggs to improve user engagement",
    ],
    technologies: ["ServiceNow", "JavaScript", "REST APIs", "Flow Designer", "GlideRecord"],
  },
  {
    period: "2022 - Present",
    startDate: "2022",
    endDate: "Dec 2026",
    duration: "4 years",
    title: "Computer Science Major",
    company: "University of Utah",
    department: "School of Computing",
    location: "Salt Lake City, UT",
    type: "education",
    icon: Ulogo,
    description:
      "Pursuing Bachelor's degree in Computer Science with emphasis on AI, Machine Learning, and advanced information systems.",
    achievements: [
      "Specialized coursework in Digital Image Processing, Artificial Intelligence, and Machine Learning",
      "Completed advanced courses in Database Systems, Computer Systems Architecture, and Data Analysis",
      "Maintained strong academic performance while working part-time as a software engineer",
      "Active participation in hackathons, game jams, and CTF challenges",
    ],
    technologies: ["Python", "Java", "C++", "AI/ML", "Data Structures", "Algorithms"],
  },
  {
    period: "2021 - 2022",
    startDate: "2021",
    endDate: "2022",
    duration: "1 year",
    title: "Mathematics Major",
    company: "Brigham Young University",
    department: "College of Physical and Mathematical Sciences",
    location: "Provo, UT",
    type: "education",
    icon: byulogo,
    description:
      "Foundational year exploring mathematics and determining career path, ultimately leading to transition into Computer Science.",
    achievements: [
      "Completed Calculus 2 and advanced mathematics coursework",
      "Developed strong analytical and problem-solving skills",
      "Explored various academic disciplines through general education courses",
      "Made strategic decision to pivot to Computer Science based on interests and strengths",
    ],
    technologies: ["Mathematics", "Calculus", "Problem Solving"],
  },
];

const DigitalResume = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [filter, setFilter] = useState("all");

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredExperiences = experiences.filter(exp => {
    if (filter === "all") return true;
    return exp.type === filter;
  });

  return (
    <section className="digital-resume-container">
      <div className="resume-header">
        <h1 className="resume-title">Career Journey</h1>
        <p className="resume-subtitle">My professional experience and educational background</p>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "work" ? "active" : ""}`}
            onClick={() => setFilter("work")}
          >
            <FaBriefcase /> Work Experience
          </button>
          <button
            className={`filter-btn ${filter === "education" ? "active" : ""}`}
            onClick={() => setFilter("education")}
          >
            <FaGraduationCap /> Education
          </button>
        </div>
      </div>

      <div className="timeline">
        {filteredExperiences.map((exp, idx) => (
          <div
            key={idx}
            className={`timeline-item ${exp.type}`}
          >
            <div className="timeline-marker">
              <div className="timeline-dot">
                {exp.type === "work" ? <FaBriefcase /> : <FaGraduationCap />}
              </div>
              <img
                src={exp.icon}
                alt={`${exp.company} logo`}
                className="timeline-logo"
              />
            </div>

            <div className="timeline-content">
              <div className="timeline-header">
                <div className="header-top">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="duration-badge">{exp.duration}</span>
                </div>
                <h4 className="company-name">{exp.company}</h4>
                {exp.department && (
                  <p className="department">{exp.department}</p>
                )}
                <div className="timeline-meta">
                  <span className="meta-item">
                    <FaCalendarAlt /> {exp.period}
                  </span>
                  <span className="meta-item">
                    <FaMapMarkerAlt /> {exp.location}
                  </span>
                </div>
              </div>

              <p className="timeline-description">{exp.description}</p>

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="achievements-section">
                  <button
                    className="expand-btn"
                    onClick={() => toggleExpand(idx)}
                  >
                    {expandedItems[idx] ? (
                      <>
                        <FaChevronUp /> Hide Details
                      </>
                    ) : (
                      <>
                        <FaChevronDown /> View Key Achievements
                      </>
                    )}
                  </button>

                  {expandedItems[idx] && (
                    <div className="achievements-list">
                      <ul>
                        {exp.achievements.map((achievement, aIdx) => (
                          <li key={aIdx}>{achievement}</li>
                        ))}
                      </ul>
                      {exp.technologies && (
                        <div className="tech-tags">
                          <strong>Technologies:</strong>
                          <div className="tags">
                            {exp.technologies.map((tech, tIdx) => (
                              <span key={tIdx} className="tech-tag">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DigitalResume;

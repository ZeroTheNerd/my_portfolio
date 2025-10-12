import {
  FaAws,
  FaCode,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaHashtag,
  FaJava,
  FaJs,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiCss3,
  SiFastapi,
  SiHtml5,
  SiUnity,
} from "react-icons/si";
import "./Skills.css";

const skillsData = {
  languages: [
    { name: "Python", icon: <FaPython />, level: 90 },
    { name: "JavaScript", icon: <FaJs />, level: 85 },
    { name: "Java", icon: <FaJava />, level: 80 },
    { name: "C++", icon: <SiCplusplus />, level: 75 },
    { name: "C#", icon: <FaHashtag />, level: 75 },
    { name: "SQL", icon: <FaDatabase />, level: 80 },
  ],
  frameworks: [
    { name: "React", icon: <FaReact />, level: 85 },
    { name: "Node.js", icon: <FaNodeJs />, level: 80 },
    { name: "FastAPI", icon: <SiFastapi />, level: 75 },
    { name: "Unity", icon: <SiUnity />, level: 70 },
    { name: "HTML5", icon: <SiHtml5 />, level: 90 },
    { name: "CSS3", icon: <SiCss3 />, level: 85 },
  ],
  tools: [
    { name: "Git", icon: <FaGitAlt />, level: 85 },
    { name: "Docker", icon: <FaDocker />, level: 75 },
    { name: "Linux", icon: <FaLinux />, level: 80 },
    { name: "AWS", icon: <FaAws />, level: 70 },
  ],
};

const Skills = () => (
  <section className="skills-section">
    <div className="skills-container">
      <h2 className="skills-main-title">Technical Skills</h2>
      <p className="skills-subtitle">
        A snapshot of my technical expertise and proficiency
      </p>

      <div className="skills-category">
        <h3 className="category-title">
          <FaCode className="category-icon" />
          Programming Languages
        </h3>
        <div className="skills-grid">
          {skillsData.languages.map((skill, idx) => (
            <div className="skill-item" key={idx}>
              <div className="skill-header">
                <div className="skill-name-wrapper">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-category">
        <h3 className="category-title">
          <FaReact className="category-icon" />
          Frameworks & Libraries
        </h3>
        <div className="skills-grid">
          {skillsData.frameworks.map((skill, idx) => (
            <div className="skill-item" key={idx}>
              <div className="skill-header">
                <div className="skill-name-wrapper">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-category">
        <h3 className="category-title">
          <FaDocker className="category-icon" />
          Tools & Platforms
        </h3>
        <div className="skills-grid">
          {skillsData.tools.map((skill, idx) => (
            <div className="skill-item" key={idx}>
              <div className="skill-header">
                <div className="skill-name-wrapper">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-summary">
        <h3>Additional Expertise</h3>
        <div className="summary-tags">
          <span className="tag">Object-Oriented Programming</span>
          <span className="tag">Data Structures & Algorithms</span>
          <span className="tag">Agile Methodologies</span>
          <span className="tag">ServiceNow Platform</span>
          <span className="tag">GraphQL</span>
          <span className="tag">RESTful APIs</span>
        </div>
      </div>
    </div>
  </section>
);

export default Skills;

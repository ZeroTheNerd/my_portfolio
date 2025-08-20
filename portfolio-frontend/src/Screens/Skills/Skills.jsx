import { FaCode, FaCogs, FaProjectDiagram, FaTools } from "react-icons/fa";
import "./Skills.css";

// Replace or expand icon libraries as needed!

const skillsData = [
  {
    icon: <FaCode />,
    title: "Programming Languages",
    description:
      "Proficient in C, C++, C#, Java, JavaScript, Python, SQL and more. Built desktop apps, web services, and automation scripts across coursework and personal projects.",
  },
  {
    icon: <FaCogs />,
    title: "Frameworks & Libraries",
    description:
      "Hands-on with HTML, CSS, Node.js, FastAPI, Qt, and Unity for building web servers, GUIs, and games. Familiar with React for front-end development.",
  },
  {
    icon: <FaTools />,
    title: "Tools & Platforms",
    description:
      "Experienced with Docker, Linux, Makefiles, ServiceNow's GlideRecords, AWS including AppSync with a GraphQL API and a DynamoDB,  and multiple IDEs. Leveraged containers, scripting, and automation in development.",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Software Engineering Concepts",
    description:
      "Strong foundation in object-oriented programming, data structures and algorithms, version control (Git), and agile/team-based workflows.",
  },
];

const Skills = () => (
  <section className="skills-section">
    <div className="skills-row">
      {skillsData.map((skill, idx) => (
        <div className="skills-card" key={idx}>
          <div className="skills-icon">{skill.icon}</div>
          <h3 className="skills-title">{skill.title}</h3>
          <p className="skills-desc">{skill.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

   useEffect(() => {
    // Fetch the project data from backend API
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
/* <div className="projects-container">
      <h2>My Projects</h2>
      {projects.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div> */

    <div className="projects-container">
      <h1>Projects</h1>
      <p>Here’s where my portfolio projects will go.

      </p>
            <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>      <p>Here’s where my portfolio projects will go.

      </p>
    </div>

  );
};

export default Projects;

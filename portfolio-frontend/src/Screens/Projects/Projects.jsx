import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

   useEffect(() => {
    // Fetch the project data from backend API (Can find it server.js)
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  

  const handleCardClick = (project) => {
    setSelected(project);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

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
<div className="projects-grid-container">
      <h1>My Projects</h1>
      {projects.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              className="project-card"
              key={project.id}
              onClick={() => handleCardClick(project)}
            >
              <img
                src={project.imageUrl}
                alt={project.name}
                className="project-image"
              />
              <div className="project-title">{project.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Popup/modal for project details */}
      {selected && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={handleCloseModal}>&times;</span>
            <h3>{selected.name}</h3>
            <img src={selected.imageUrl} alt={selected.name} className="modal-image" />
            <p>{selected.description}</p>
            {selected.url && (
              <a href={selected.url} target="_blank" rel="noopener noreferrer">View Project</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

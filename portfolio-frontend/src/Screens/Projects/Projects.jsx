import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TanukiHunt from '../../assets/images/TanukiHunt.png';
import Dreamscape from '../../assets/images/Dreamscapelogo.png';
import { FaGithub } from "react-icons/fa";
import "./Projects.css";


const projectData = [
  {
      id: 1,
      name: 'Tanuki Hunt: Swiped Spritis',
      description: 'A stealth platformer made in Unity for the Ludem Dare 56 game jam',
      url: 'https://lunaruu.itch.io/tanuki-hunt-stolen',
      images: [TanukiHunt],
      githuburl: 'https://github.com/AlmityTuhm/LudumDare56'
  },
  {
      id: 2,
      name: 'PC Builder Simulator',
      description: 'A qt app created in c++ as a final project for my Software Development 2 class',
      url: 'https://github.com/ZeroTheNerd/pc_builder_simulator',
      images: [],
      githuburl: 'https://github.com/ZeroTheNerd/pc_builder_simulator'
    },
    {
      id: 3,
      name: 'Dream Scape',
      description: 'An FPS shooter that I developed with a few other engineers for one of my Universities game jams',
      url: 'https://almitytuhm.itch.io/dream-scape',
      images: [Dreamscape],
      githuburl: 'https://github.com/AlmityTuhm/GameJamSeptember2023'
    },
    {
      id: 4,
      name: 'Portuguese Portfolio',
      description: 'I was encouraged to make a portfolio website for my journey learning Portuguese so I created a locally hosted website',
      url: '',
      images: [],
      githuburl: 'https://github.com/ZachMartim/zachportfolio.github.io'
    },
    {
      id: 4,
      name: 'Pomodoro',
      description: 'Utilizing React, Node.js for the frontend and AWS AppSync along with GraphQl for the backend. This is still a work in progress.',
      url: '',
      images: [],
      githuburl: 'https://github.com/jelston11/pmdo_frontend'
    },
    // {
    //   id: 5,
    //   name: 'OuttaTime',
    //   description: 'Another React, Node.js alongside AWS services application. Built to proactively supports drivers in finding balance, health, and enjoyment on the road—all while keeping them and their fleets compliant and safe',
    //   url: '',
    //   images: [],
    //   githuburl: 'https://github.com/jelston11/pmdo_frontend'
    // }

];

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
<div className="projects-container">
      <h2>My Projects</h2>

      <div className="projects-grid">
        {projectData.map(project => (
          <div
            className="project-card"
            key={project.id}
            onClick={() => setSelected(project)}
          >
            <img
              src={project.images[0]}
              alt={project.name}
              className="project-image"
            />
            <div className="project-title">{project.name}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setSelected(null)}>
              &times;
            </span>
            <h3 className="modal-name">{selected.name}</h3>
            <p className = "modal-description">{selected.description}</p>
      {selected.images.map((img, i) => (
        <a
          key={i}
          href={selected.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={img}
            alt={`${selected.name} screenshot`}
            className="modal-image"
          />
        </a>
      ))}
      <a className="modal-github" href={selected.githuburl}><FaGithub /></a>
      {selected.videoUrl && selected.videoUrl.includes("youtube") && (
        <iframe
          width="100%"
          height="315"
          src={selected.videoUrl}
          title="Project video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
      {selected.videoUrl && selected.videoUrl.endsWith(".mp4") && (
        <video src={selected.videoUrl} controls width="100%" />
      )}
    </div>
  </div>
)}
    </div>
  );
}

export default Projects;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TanukiHunt from '../../assets/images/TanukiHunt.png';
import Dreamscape from '../../assets/images/Dreamscapelogo.png';
import Bemvindos from '../../assets/images/bem-vindos.png';
import Buildurpc from '../../assets/images/BuildUrPC.png';
import focussync from '../../assets/images/FocusSync.png';
import docscanner from '../../assets/images/docscanner.png';
import pcbuildervideo from '../../assets/videos/FinalProjectVideoDemo.mp4';

import { FaGithub } from "react-icons/fa";
import "./Projects.css";


const projectData = [
  {
    id: 1,
    name: 'Tanuki Hunt: Swiped Spritis',
    description: 'A stealth platformer made in Unity for the Ludem Dare 56 game jam',
    url: 'https://lunaruu.itch.io/tanuki-hunt-stolen',
    images: [TanukiHunt, TanukiHunt],
    githuburl: 'https://github.com/AlmityTuhm/LudumDare56'
  },
  {
    id: 2,
    name: 'PC Builder Simulator',
    description: 'A qt app created in c++ as a final project for my Software Development 2 class that utilizes box2d physics. Note: The repo is private. If you want to see more about this project, check out the video attached below',
    url: 'https://github.com/ZeroTheNerd/pc_builder_simulator',
    images: [Buildurpc],
    githuburl: 'https://github.com/ZeroTheNerd/pc_builder_simulator',
    video: pcbuildervideo
  },
  {
    id: 3,
    name: 'Dream Scape',
    description: 'An FPS shooter that I developed with a few other engineers for one of my Universities game jams. Note: The github link is a copy I made which does not hold all the commits. It was a copy I created so that the repo is public. The original repo has 186 commits',
    url: 'https://almitytuhm.itch.io/dream-scape',
    images: [Dreamscape, Dreamscape],
    githuburl: 'https://github.com/ZeroTheNerd/dream_scape'
  },
  {
    id: 4,
    name: 'Portuguese Portfolio',
    description: 'I was encouraged to make a portfolio website for my journey learning Portuguese so I created a locally hosted website using bootstrap. This project is not the most technical and was very easy to set up but I am adding it here as it is a reminder of where I started. It also gives people more of an idea of who I am. I love the portuguese language and have always strived to become fluent. Its a language outside of coding that I still study to this day. Both of my parents speak portuguese and it is my dads mother tounge. If you would like to like to see more of the webite, feel free to clone the repo. Check out the README for further information',
    url: 'https://github.com/ZeroTheNerd/portuguese_portfolio',
    images: [Bemvindos, Bemvindos],
    githuburl: 'https://github.com/ZachMartim/zachportfolio.github.io'
  },
  {
    id: 5,
    name: 'Pomodoro',
    description: 'Utilizing React, Node.js for the frontend and AWS AppSync along with GraphQl for the backend. Note: This is still a work in progress and the repo is private',
    url: '',
    images: [focussync, focussync],
    githuburl: 'https://github.com/jelston11/pmdo_frontend'
  },
  // {
  //   id: 6,
  //   name: 'OuttaTime',
  //   description: 'Another React, Node.js alongside AWS services application. Built to proactively supports drivers in finding balance, health, and enjoyment on the road—all while keeping them and their fleets compliant and safe',
  //   url: '',
  //   images: [],
  //   githuburl: 'https://github.com/jelston11/pmdo_frontend'
  // }
  {
    id: 7,
    name: 'Autoscanner',
    description: 'Allows you to scan book pages using a mobile camera. Involves detecting and isolating the page area, flattening curled pages, pre-processing for OCR(Optical Character Recognition), and implementing an OCR pipeline to extract searchable text',
    url: 'https://github.com/ZeroTheNerd/auto_scanner',
    images: [docscanner],
    githuburl: 'https://github.com/ZeroTheNerd/auto_scanner'
  }

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
      <h2 className="projects-header">Here are a few projects I have worked on in the past or are currently working on.
        <br /> Note: Most of the github links are to private repositories.
      </h2>
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
            <p className="modal-description">{selected.description}</p>
            {selected.images[1] && (
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer">
                <div className="modal-image-wrapper">
                  <img
                    src={selected.images[0]}
                    alt={`${selected.name} screenshot 1`}
                    className="modal-image"
                  />
                </div>
              </a>
            )}
            {/* {selected.video && selected.video.includes("youtube") && (
              <iframe
                width="100%"
                height="315"
                src={selected.video}
                title="Project video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            )} */}
            {selected.video && selected.video.endsWith(".mp4") && (
              <video src={selected.video} controls width="100%" />
            )}
            <a className="modal-github" href={selected.githuburl}><FaGithub /></a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;

import React from "react";
import "./Projects.css";
import { SiVulkan, SiUnity } from "react-icons/si";
import { FaRobot, FaGamepad } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "Yalaz Engine",
      description:
        "Cross-platform 3D rendering engine with PBR, path tracing, skeletal animation, and a full editor.",
      tags: ["Vulkan", "C++20", "CMake"],
      link: "https://github.com/Yalazz/Yalaz-Engine",
      icon: <SiVulkan />,
    },
    {
      title: "SpriteAI",
      description:
        "AI-powered tool that generates game-ready sprite assets from text prompts.",
      tags: ["AI", "Python", "Game Art"],
      link: "https://github.com/Yalazz/SpriteAI",
      icon: <FaRobot />,
    },
    {
      title: "The Lighthouse",
      description:
        "A horror exploration game built in Unity with atmospheric lighting and shader effects.",
      tags: ["Unity", "C#", "Horror"],
      link: "https://github.com/Yalazz/TheLighthouse",
      icon: <FaGamepad />,
    },
    {
      title: "Stellar Recon: Kepler",
      description:
        "Space exploration game with custom shaders and procedural visuals, built as a team project.",
      tags: ["Unity", "C#", "ShaderLab"],
      link: "https://github.com/begumdonmez/g-stellar-recon-kepler",
      icon: <SiUnity />,
    },
  ];

  return (
    <div className="pg-grid">
      {projects.map((p, idx) => (
        <article className="pg-card" key={idx}>
          <header className="pg-head">
            <span className="pg-icon" aria-hidden="true">{p.icon}</span>
            <h3 className="pg-title">{p.title}</h3>
          </header>

          <p className="pg-desc">{p.description}</p>

          {Array.isArray(p.tags) && p.tags.length > 0 && (
            <div className="pg-tags" aria-label="tags">
              {p.tags.map((t, i) => (
                <span className="pg-tag" key={i}>{t}</span>
              ))}
            </div>
          )}

          {p.link && (
            <a
              className="pg-link"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              title="View Project"
            >
              View Project →
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

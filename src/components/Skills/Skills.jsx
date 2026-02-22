import React from "react";
import "./Skills.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const skillGroups = [
  { label: "LANGUAGES", items: ["C", "C++", "C#", "Python", "Java", "JavaScript", "SQL", "GLSL"] },
  { label: "FRAMEWORKS", items: ["React", "Vue.js", "Spring Boot", "SAPUI5", ".NET Core", "Unity"] },
  { label: "GRAPHICS", items: ["Vulkan", "OpenGL", "ShaderLab", "PBR", "Path Tracing", "Three.js"] },
  { label: "DEVOPS", items: ["Docker", "RabbitMQ", "PostgreSQL", "MSSQL", "Git", "CMake", "Jenkins"] },
  { label: "DESIGN", items: ["Figma", "Photoshop", "Illustrator", "Procreate", "Aseprite"] },
];

export default function Skills() {
  const ref = useScrollReveal();

  return (
    <section className="skills-container" ref={ref}>
      <h2 className="skills-title">Skills</h2>
      <div className="skills-monitor">
        {/* Header bar */}
        <div className="skills-header">
          <div className="skills-led" />
          <span className="skills-brand">SKILLS.SYS</span>
          <span className="skills-status">5 modules loaded</span>
        </div>

        {/* Screen */}
        <div className="skills-screen">
          <div className="skills-scanline" />
          <div className="skills-output">
            <div className="skills-line sys">guest@yalaz:~$ cat skills.txt</div>
            <div className="skills-line sys dim">---</div>
            {skillGroups.map((group, idx) => (
              <div key={idx} className="skills-block">
                <div className="skills-line label">[{group.label}]</div>
                <div className="skills-line values">
                  {group.items.map((item, i) => (
                    <span className="skills-item" key={i}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="skills-line sys dim">---</div>
            <div className="skills-line sys">EOF</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="skills-footer">
          <span className="skills-prompt">guest@yalaz:~$</span>
          <span className="skills-cursor">_</span>
        </div>
      </div>
    </section>
  );
}

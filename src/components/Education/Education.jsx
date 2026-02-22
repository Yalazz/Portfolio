import React from "react";
import "./Education.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const educationData = [
  {
    degree: "B.Sc. in Digital Game Design (Ongoing)",
    school: "Beykoz University",
    year: "2024 – Present",
    note: "High Honor Student (3x). Top 3 in department, Spring 2023. GPA: 3.8/4.0.",
  },
];

export default function Education() {
  const sectionRef = useScrollReveal();

  return (
    <section id="education" className="section" ref={sectionRef}>
      <h2 className="section-title">Education</h2>
      <div className="edu-timeline">
        {educationData.map((item, idx) => (
          <div key={idx} className={`edu-item ${idx % 2 === 0 ? "left" : "right"}`}>
            <div className="edu-dot" />
            <div className="edu-content">
              <h3 className="edu-degree">{item.degree}</h3>
              <div className="edu-meta">
                <span className="edu-school">{item.school}</span>
                <span className="edu-sep">•</span>
                <time className="edu-year">{item.year}</time>
              </div>
              <p className="edu-note">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

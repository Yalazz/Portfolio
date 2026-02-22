import React from "react";
import "./Experience.css";
import { FaBriefcase } from "react-icons/fa";
import RetroCRTBox from "../RetroCRT/RetroCRT";



export default function Experience() {
  const experienceData = [
    {
      role: "Software Developer",
      company: "VIS Technology",
      period: "Aug 2025 – Present",
      details: [
        "Implemented secure auth flows using JWT, integrating React frontends with Spring Boot microservices.",
        "Built responsive React interfaces with routing, protected pages, and API service layers.",
        "Developed SAPUI5 business screens and workflow components for enterprise credit-evaluation processes.",
        "Integrated RabbitMQ-based messaging pipelines for async operations and document-processing flows.",
        "Optimized PostgreSQL and MSSQL queries, schemas, and stored procedures for performance and stability.",
      ],
    },
    {
      role: "Software Specialist",
      company: "Flowick Teknoloji A.Ş.",
      period: "Oct 2024 – Present",
      details: [
        "Developed automation bots for the Bubble.io platform using Python, Java, and JavaScript.",
        "Created translation bots to automate language processing tasks integrated into Bubble.io.",
        "Built web scraping bots with Python for efficient data extraction and analysis.",
        "Designed email systems using HTML and JavaScript to enhance communication workflows.",
      ],
    },
    {
      role: "Intern – Software Engineer",
      company: "Smart IQ",
      period: "Jul 2024 – Aug 2024",
      details: [
        "Built real-time data processing infrastructure using RabbitMQ.",
        "Developed notification systems with .NET Core and SMTP.",
        "Contributed to PostgreSQL logging and Vue.js-based admin panel development.",
      ],
    },
  ];

  return (
    <section className="experience-container" aria-labelledby="exp-title">
      <h3 id="exp-title" className="exp-section-title">Experience</h3>
      <div className="experience-with-crt">
        <ul className="experience-list">
          {experienceData.map((item, index) => (
            <li key={index} className="experience-item">
              <FaBriefcase className="exp-icon" aria-hidden="true" />
              <div className="exp-info">
                <h4 className="exp-role">{item.role}</h4>
                <div className="exp-meta">
                  <span className="exp-company">{item.company}</span>
                  <time className="exp-period">{item.period}</time>
                </div>
                <ul className="exp-details">
                  {item.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="experience-crt">
                <RetroCRTBox />
        </div>
      </div>
    </section>
  );
}

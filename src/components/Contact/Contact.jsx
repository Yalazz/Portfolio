import React from "react";
import "./Contact.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

export default function Contact({
  email = "emreeblici@gmail.com",
  github = "https://github.com/Yalazz",
  linkedin = "https://www.linkedin.com/in/yalaz/",
}) {
  return (
    <div className="contact-container" role="region" aria-label="Contact">
      <ul className="contact-links">
        <li className="contact-item">
          <a
            className="contact-link"
            href={`mailto:${email}`}
            aria-label="Send email"
          >
            <FaEnvelope className="contact-icon" aria-hidden="true" />
            <span className="contact-text">{email}</span>
          </a>
        </li>

        <li className="contact-item">
          <a
            className="contact-link"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
          >
            <FaGithub className="contact-icon" aria-hidden="true" />
            <span className="contact-text">
              {github.replace(/^https?:\/\//, "")}
            </span>
          </a>
        </li>

        <li className="contact-item">
          <a
            className="contact-link"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
          >
            <FaLinkedin className="contact-icon" aria-hidden="true" />
            <span className="contact-text">
              {linkedin.replace(/^https?:\/\//, "")}
            </span>
          </a>
        </li>

        <li className="contact-item">
          <a
            className="contact-link"
            href="/assets/cv/Emre_Bilici_CV.pdf"
            download
            aria-label="Download CV"
          >
            <FaFileDownload className="contact-icon" aria-hidden="true" />
            <span className="contact-text">Download CV</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

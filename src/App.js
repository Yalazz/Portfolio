import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./App.css";

import Hero3D from "./components/Hero3D/Hero3D";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Monitor from "./components/Monitor/Monitor";
import SocialLinks from "./components/SocialLinks/SocialLinks";
import Loader from "./components/Loader/Loader";
import { FaFileDownload } from "react-icons/fa";

export default function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const heroRef = useRef(null);

  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light")
  );
  const [poweredOn, setPoweredOn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    root.classList.add("theme-fade");
    const t = setTimeout(() => root.classList.remove("theme-fade"), 280);
    return () => clearTimeout(t);
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Hero entrance animation after loader
  useEffect(() => {
    if (loading || !heroRef.current) return;
    const el = heroRef.current;
    const title = el.querySelector(".hero-title");
    const canvas = el.querySelector(".hero3d-canvas");
    const btn = el.querySelector(".cv-download-btn");

    if (title) gsap.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" });
    if (canvas) gsap.fromTo(canvas, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.85, duration: 1, delay: 0.3, ease: "power2.out" });
    if (btn) gsap.fromTo(btn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.5, ease: "power2.out" });
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <div className="App">
      <header className="navbar" role="navigation" aria-label="Primary">
        <div className="nav-left">
          <a href="#hero" className="brand" aria-label="Go to top">
            <span className="glitch" data-text="EMRE BILICI PORTFOLIO">
              EMRE BILICI PORTFOLIO
            </span>
          </a>
        </div>
        <ul className="nav-right">
          <li><a href="#hero">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </header>

      <Monitor
        poweredOn={poweredOn}
        onTogglePower={(next) => {
          if (typeof next === "boolean") setPoweredOn(next);
          else setPoweredOn((v) => !v);
        }}
      />

      <main className="main-content">
        <section id="hero" className="hero-section" ref={heroRef}>
          <h1 className="hero-title big-glitch">
            <span className="glitch" data-text="EMRE BILICI">
              EMRE BILICI
            </span>
            <span className="hero-subtitle">
              Software Developer & Graphics Engineer
            </span>
          </h1>
          <Hero3D />
          <a
            href="/assets/cv/Emre_Bilici_CV.pdf"
            download
            className="cv-download-btn"
          >
            <FaFileDownload /> Download CV
          </a>
        </section>

        <section id="projects" className="section">
          <Projects />
        </section>

        <section id="skills" className="section">
          <Skills />
        </section>

        <section id="experience" className="section">
          <Experience />
        </section>

        <section id="education" className="section">
          <Education />
        </section>

        <section id="contact" className="section">
          <Contact />
        </section>
      </main>

      <Footer />

      <SocialLinks
        poweredOn={poweredOn}
        setPoweredOn={(fnOrBool) =>
          setPoweredOn(typeof fnOrBool === "function" ? fnOrBool : !!fnOrBool)
        }
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}

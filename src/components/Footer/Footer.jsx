import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>&copy; {new Date().getFullYear()} Emre Bilici</span>
      <span className="footer-sep">|</span>
      <span>Built with React & Three.js</span>
    </footer>
  );
}

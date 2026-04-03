import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Chatbot from "./components/Chatbot";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = 0, ringY = 0;
    let raf;

    const move = (e) => {
      const x = e.clientX, y = e.clientY;
      if (dot) { dot.style.left = x + "px"; dot.style.top = y + "px"; }
      ringX += (x - ringX) * 0.12;
      ringY += (y - ringY) * 0.12;
      if (ring) { ring.style.left = ringX + "px"; ring.style.top = ringY + "px"; }
    };

    const animate = () => { raf = requestAnimationFrame(animate); };
    animate();
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      {/* Custom cursor */}
      <div className="cursor">
        <div className="cursor-dot" ref={dotRef} style={{ position: "fixed" }} />
        <div className="cursor-ring" ref={ringRef} style={{ position: "fixed" }} />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-number" aria-hidden="true">S.</div>
        <div className="hero-left">
          <p className="hero-eyebrow">Available for work</p>
          <h1 className="hero-title">
            Suraj<br /><em>Builds.</em>
          </h1>
        </div>
        <div className="hero-right">
          <p className="hero-desc">
            AI-powered systems &amp; modern web experiences. Turning complex problems into elegant, intelligent solutions.
          </p>
          <a href="#projects" className="hero-cta">
            View Work <span>↓</span>
          </a>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          Scroll
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="reveal">
          <div className="about-label">About me</div>
          <h2>Crafting <em>intelligent</em><br />experiences</h2>
        </div>
        <div className="about-right reveal">
          <p className="about-text">
            I'm a software engineer specialising in AI systems and modern web technologies. I build scalable, intelligent products that sit at the intersection of great engineering and thoughtful design.
          </p>
          <div className="skills-row">
            {["Java", "Python", "Machine Learning", "React", "Node.js"].map((s) => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <Projects />
      </section>

      {/* Chat */}
      <section id="chat">
        <Chatbot />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-name">Suraj.</span>
        <span className="footer-copy">© {new Date().getFullYear()} — All rights reserved</span>
      </footer>
    </div>
  );
}

export default App;

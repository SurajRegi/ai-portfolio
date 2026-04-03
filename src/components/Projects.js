import { useEffect } from "react";
import data from "../data";

function Projects() {

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <div className="projects">
      <div className="projects-header reveal">
        <div>
          <div className="projects-label">Selected work</div>
          <h2>Recent <em>Projects</em></h2>
        </div>
        <span className="projects-count">{String(data.projects.length).padStart(2, "0")} projects</span>
      </div>
      <div className="projects-grid">
        {data.projects.map((proj, index) => (
          <div key={index} className="card reveal">
            <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="card-content">
              <h3>{proj.name}</h3>
              <p>{proj.description}</p>
              <div className="card-tags">
                {proj.tech.map((t) => (
                  <span key={t} className="card-tag">{t}</span>
                ))}
              </div>
            </div>
            <span className="card-arrow">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

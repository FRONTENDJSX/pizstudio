import React from "react";

const projects = [
  { title: "Project A", desc: "Ad for Piz Studio." },
  { title: "Project B", desc: "Promo Video for local wings spot." },
  { title: "Project C", desc: "Promo Video for local bakery." },
  { title: "Project D", desc: "Google-Style spec ad." }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio" data-scroll-section>
      <div className="container">
        <h2>Portfolio</h2>
        <div className="portfolio-grid">
          {projects.map((p, i) => (
            <div key={i} className="project" data-scroll data-scroll-speed={1 + (i % 3)}>
              <div className="project-surface">
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

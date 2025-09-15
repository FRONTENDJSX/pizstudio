import React from "react";

const services = [
  { title: "Video Production", desc: "Concept, shoot, and deliver cinematic video content." },
  { title: "Editing", desc: "Polished, rhythm-driven editing tailored to your brand." },
  { title: "Visual Effects", desc: "Stylized effects and motion graphics that elevate the story." }
];

export default function Services() {
  return (
    <section id="services" className="services" data-scroll-section>
      <div className="container">
        <h2>Our Services</h2>
        <div className="cards">
          {services.map((s, i) => (
            <article key={i} className="card" tabIndex={0} data-scroll data-scroll-speed={1 + i * 0.2}>
              <div className="card-icon" aria-hidden><span>{i + 1}</span></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a className="card-link" href="#contact">Work with us →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

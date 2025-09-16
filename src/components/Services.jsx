import React from "react";

const services = [
  { 
    title: "Video Production", 
    desc: "Deliver cinematic ads, promos, and social-ready content with polished editing." 
  },
  { 
    title: "Editing", 
    desc: "Sharp, rhythm-driven editing with a modern, professional finish tailored to your brand." 
  },
  { 
    title: "Visual Effects", 
    desc: "Stylized effects, compositing, and motion graphics that elevate storytelling." 
  },
  { 
    title: "AI Websites", 
    desc: "Fully AI-powered websites — designed, structured, and optimized with a creative human touch." 
  },
  { 
    title: "AI Branding", 
    desc: "AI-assisted logo design, brand identity systems, and graphics refined for a professional edge." 
  },
  { 
    title: "AI Marketing Materials", 
    desc: "Flyers, social graphics, and promotional content generated with AI and refined for maximum impact." 
  }
];

export default function Services() {
  return (
    <section id="services" className="services" data-scroll-section>
      <div className="container">
        <h2>Our Services</h2>
        <div className="cards">
          {services.map((s, i) => (
            <article 
              key={i} 
              className="card" 
              tabIndex={0} 
              data-scroll 
              data-scroll-speed={1 + i * 0.2}
            >
              <div className="card-icon" aria-hidden>
                <span>{i + 1}</span>
              </div>
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

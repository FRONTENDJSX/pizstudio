import React from "react";

const steps = [
  { 
    title: "Ideation", 
    desc: "We start by understanding your vision and goals to craft a creative strategy tailored to your brand." 
  },
  { 
    title: "AI Design", 
    desc: "Our AI-powered tools generate websites, logos, branding, and marketing materials, all refined with human oversight for a polished finish." 
  },
  { 
    title: "Editing & Visuals", 
    desc: "All video editing and cinematic visuals are done personally, ensuring precision, creativity, and a professional touch." 
  },
  { 
    title: "Delivery", 
    desc: "End-to-end project handling ensures everything is delivered professionally, on time, and ready to launch." 
  }
];

export default function Approach() {
  return (
    <section id="approach" className="portfolio" data-scroll-section>
      <div className="container">
        <h2>Our Approach</h2>
        <div className="portfolio-grid">
          {steps.map((step, i) => (
            <div key={i} className="project" data-scroll data-scroll-speed={1 + (i % 3)}>
              <div className="project-surface">
                <div className="project-title">{step.title}</div>
                <div className="project-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

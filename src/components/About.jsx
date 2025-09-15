import React from "react";

export default function About() {
  return (
    <section id="about" className="about" data-scroll-section>
      <div className="container">
        <div className="split">
          <div className="text">
            <h2>About Piz Studio</h2>
            <p>
              Piz Studio is a one-person creative studio delivering cinematic video, sharp editing,
              and advanced visual effects. Projects are handled end-to-end with a modern, polished approach.
            </p>
            <p className="muted">Fast, focused, and built for impact.</p>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="num">100+</div>
              <div className="label">Projects</div>
            </div>
            <div className="stat">
              <div className="num">1</div>
              <div className="label">Creative Lead</div>
            </div>
            <div className="stat">
              <div className="num">Trusted</div>
              <div className="label">By Clients Nationwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

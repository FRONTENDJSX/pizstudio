import React, { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let raf = null;
    let particles = [];
    const DPR = Math.max(window.devicePixelRatio || 1, 1);

    function resize() {
      canvas.width = Math.floor(window.innerWidth * DPR);
      canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();

    function makeParticles(n = 140) {
      particles = [];
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 2.4 + 0.6,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6
        });
      }
    }
    makeParticles();

    const mouse = { x: -9999, y: -9999 };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(6,7,10,0.28)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }

        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            const alpha = Math.max(0, 0.12 - d2 / 16000);
            ctx.strokeStyle = `rgba(255,95,140,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.2);
        g.addColorStop(0, "rgba(255,140,170,0.95)");
        g.addColorStop(0.6, "rgba(255,95,140,0.85)");
        g.addColorStop(1, "rgba(255,95,140,0.02)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 + Math.sin(Date.now() / 400 + p.r) * 0.12), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
      mouse.y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", () => {
      resize();
      makeParticles(140);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Smooth scroll + reveal immediately
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("active"); // reveal immediately
    window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero" data-scroll-section>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-inner container">
        <h1 className="hero-title">Crafting <span className="accent">Bold</span> Experiences</h1>
        <p className="hero-sub">
          Piz Studio — Cinematic video, sharp editing, and AI-powered websites. Our entire site is built with AI.
        </p>
        <div className="hero-cta">
          <button className="btn" onClick={() => scrollToSection("portfolio")}>
            See Our Work
          </button>
          <button className="btn ghost" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}

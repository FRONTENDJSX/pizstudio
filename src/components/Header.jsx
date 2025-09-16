import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Logo from "./logo.png";

export default function Header({ scrollInstance }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  // Hide/show header on scroll
  useEffect(() => {
    const header = headerRef.current;
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      header.style.transform =
        currentScroll > lastScroll ? "translateY(-110%)" : "translateY(0)";
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section via Locomotive Scroll
  const scrollToSection = (id) => {
    if (!scrollInstance) return;
    const el = document.querySelector(`#${id}`);
    if (!el) return;
    const headerHeight = headerRef.current.offsetHeight || 0;

    scrollInstance.scrollTo(el, {
      offset: -headerHeight,
      duration: 1000,
      easing: [0.25, 0.0, 0.35, 1.0]
    });

    setOpen(false);
  };

  // Fade-in sections on scroll
  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-scroll-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header jelly-header" ref={headerRef}>
      <div className="header-inner">
        {/* Logo */}
        <div className="brand" onClick={() => scrollToSection("hero")}>
          <img src={Logo} alt="Piz Studio" className="brand-logo" />
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation */}
        <nav className={`site-nav ${open ? "open" : ""}`}>
          {[
            { id: "hero", label: "Home" },
            { id: "about", label: "About" },
            { id: "services", label: "Services" },
            { id: "approach", label: "Our Approach" },
            { id: "contact", label: "Contact" }
          ].map((section) => (
            <div
              key={section.id}
              className="nav-link"
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

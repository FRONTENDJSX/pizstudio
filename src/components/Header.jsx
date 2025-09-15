import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Logo from "./logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  // Hide/show on scroll
  useEffect(() => {
    const header = headerRef.current;
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      header.style.transform =
        currentScroll > lastScroll ? "translateY(-110%)" : "translateY(0)";
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll with fade-in
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = headerRef.current.offsetHeight || 0;
    window.scrollTo({ top: el.offsetTop - headerHeight, behavior: "smooth" });
    el.classList.add("active");
    setOpen(false);
  };

  // Fade-in for reveal sections
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
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
          {["home", "about", "services", "portfolio", "contact"].map(
            (section) => (
              <div
                key={section}
                className="nav-link"
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </div>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

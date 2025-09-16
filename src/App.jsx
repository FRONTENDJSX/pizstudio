import React, { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

import Header from "./components/Header";
import Hero from "./components/Hero.jsx";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const locoRef = useRef(null);
  const [locoInstance, setLocoInstance] = useState(null);

  useEffect(() => {
    const scrollEl = document.querySelector("[data-scroll-container]");

    const loco = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.0,
      inertia: 0.85,
      smartphone: { smooth: true },
      tablet: { smooth: true }
    });
    locoRef.current = loco;
    setLocoInstance(loco);

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length ? loco.scrollTo(value, 0, 0) : loco.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed"
    });

    loco.on("scroll", ScrollTrigger.update);

    ScrollTrigger.addEventListener("refresh", () => loco.update());
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", () => loco.update());
      loco.destroy();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <div data-scroll-container>
      {/* Pass the Locomotive Scroll instance to Header */}
      <Header scrollInstance={locoInstance} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

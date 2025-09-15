import React, { useEffect, useRef } from "react";
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

    // tell ScrollTrigger to use these proxy methods for the ".scroll-container" element:
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length ? loco.scrollTo(value, 0, 0) : loco.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // Locomotive handles things with transform, so pinType should be fixed on mobile
      pinType: scrollEl.style.transform ? "transform" : "fixed"
    });

    // update ScrollTrigger on loco scroll
    loco.on("scroll", ScrollTrigger.update);

    // refresh ScrollTrigger + update loco on window update
    ScrollTrigger.addEventListener("refresh", () => loco.update());
    ScrollTrigger.refresh();

    // cleanup
    return () => {
      ScrollTrigger.removeEventListener("refresh", () => loco.update());
      loco.destroy();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <div data-scroll-container>
      <Header />
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

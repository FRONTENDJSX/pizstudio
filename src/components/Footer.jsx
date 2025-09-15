import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer" data-scroll-section>
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} Piz Studio</div>
        <div className="socials">
          <a href="mailto:pizcreativestudio@outlook.com">pizcreativestudio@outlook.com</a>
        </div>
      </div>
    </footer>
  );
}

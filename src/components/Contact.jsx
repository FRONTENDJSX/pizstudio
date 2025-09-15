import React, { useState } from "react";
import "./Contact.css"; // 👈 make sure to create this CSS file

export default function Contact() {
  const [status, setStatus] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !message) {
      setStatus({ ok: false, msg: "Please fill all fields." });
      clearStatus();
      return;
    }

    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`;
    const mailto = `mailto:pizcreativestudio@outlook.com?subject=${encodeURIComponent(
      "Website contact from " + name
    )}&body=${encodeURIComponent(body)}`;

    // open email client
    window.location.href = mailto;
    setStatus({ ok: true, msg: "Opening your email app..." });
    clearStatus();
  }

  function clearStatus() {
    setTimeout(() => setStatus(null), 3000);
  }

  return (
    <section id="contact" className="contact" data-scroll-section>
      <div className="container narrow">
        <h2>Contact</h2>
        <p className="muted">Tell us about your project. We reply fast.</p>

        <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
          <div className="row">
            <input name="name" placeholder="Name" aria-label="Name" />
            <input name="email" type="email" placeholder="Email" aria-label="Email" />
          </div>
          <textarea name="message" placeholder="Message" rows="6" aria-label="Message" />
          <div className="form-actions">
            <button type="submit" className="btn">Send Message</button>
            {status && (
              <div className={`status ${status.ok ? "success" : "error"}`}>
                {status.msg}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

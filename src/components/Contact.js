import data from "../data";

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-label">Get in touch</div>
      <h2 className="contact-title">Let's <em>Connect</em></h2>
      <p className="contact-sub">
        Open to opportunities, collaborations, or just a good conversation.
      </p>
      <div className="contact-links">
        <a href={`mailto:${data.contact.email}`} className="contact-btn">
          <span>✉</span> {data.contact.email}
        </a>
        <a
          href={`https://${data.contact.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="contact-btn contact-btn--outline"
        >
          <span>in</span> LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Contact;

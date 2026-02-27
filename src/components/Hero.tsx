export default function Hero() {
  return (
    <div className="bio">
      <div className="bio-text">
        <div className="name-position">
          <h1>Angad Brar</h1>
          <p>Software Developer</p>
        </div>
        <div className="contact">
          <a
            className="contact-icon"
            href="https://linkedin.com/in/angadbrar-/"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            className="contact-icon"
            href="https://github.com/angadv12/"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            className="contact-icon"
            href="mailto:angadbrar512@gmail.com"
            aria-label="Email"
          >
            <i className="bi bi-envelope-at"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

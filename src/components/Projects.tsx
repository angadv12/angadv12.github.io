import { motion } from "framer-motion";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="projects-cards">
        {projects.map((proj, i) => (
          <motion.div
            className="projects-item"
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="name-logo">
              {proj.logo_uri && (
                <img
                  className="logo"
                  src={proj.logo_uri}
                  alt={`${proj.name} logo`}
                />
              )}
              <h2 className="name">{proj.name}</h2>
              <a
                className="gh_link"
                href={proj.link}
                aria-label={`${proj.name} on GitHub`}
              >
                <i className="bi bi-github"></i>
              </a>
            </div>
            <p className="description">{proj.description}</p>
            <p className="stack">{proj.stack}</p>
            <div className="preview-frame">
              {proj.preview_uri ? (
                /\.(mp4|webm|mov)$/i.test(proj.preview_uri) ? (
                  <video
                    src={proj.preview_uri}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={proj.preview_uri}
                    alt={`${proj.name} preview`}
                    loading="lazy"
                  />
                )
              ) : (
                <span className="preview-placeholder">
                  Screenshot / GIF coming soon
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

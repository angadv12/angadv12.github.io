import { motion } from "framer-motion";
import { experiences } from "../data/experiences";

export default function Experience() {
  return (
    <div className="experience">
      <h1>Experience</h1>
      <div className="experiences-cards">
        {experiences.map((exp, i) => (
          <motion.div
            className="experience-item"
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="content-container">
              <div className="logo-container">
                <img className="logo" src={exp.pic_uri} alt="" />
              </div>
              <div className="words-container">
                <h2>{exp.title}</h2>
                <p className="info">{exp.info}</p>
              </div>
            </div>
            <ul className="description">
              {exp.description.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

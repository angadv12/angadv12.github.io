import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    title: "Software Engineer Intern",
    info: "Capital One | June 2026 - Aug 2026",
    description: ["Incoming TIP Intern for Summer 2026."],
    pic_uri: "/assets/CapitalOne_logo.png",
  },
  {
    title: "Software Engineer Intern",
    info: "Lean TECHniques | May 2025 - Aug 2025",
    description: [
      "Developed full-stack AI-powered translation service for Vermeer Corp. to address 30-90 day manual translation bottleneck, using Azure AI Foundry to reduce translation timeframe to 1-2 days and enable 15x faster global product deployment.",
      "Modernized Vermeer deployments via Terraform and Actions automation, promoting move to an Agile environment.",
      "Designed E2E test suite with Cypress and pre-commit linting to avoid trivial failed CI checks and improve commit history.",
      "Built MVP for internal security tool with React/Node/Express, deployed on Lambda/APIgw/S3/Cloudfront/R53 stack.",
      "Cleaned and structured large sensor datasets for client John Deere, and architected PyTorch models to predict component failures, demonstrating 10% downtime reduction in simulated fleet testing.",
    ],
    pic_uri: "/assets/LT_logo.png",
  },
  {
    title: "Software Engineer",
    info: "theCourseForum | Aug 2024 - Present",
    description: [
      "Implemented moderation of toxic course reviews on-submission using Toxic-BERT model through HuggingFace and purged existing reviews above toxicity threshold, resulting in a reduction of platform review population of 15%.",
      "Refactored query architecture to scale for 25k users, reducing latency by 120% and optimizing performance for high-traffic.",
      "Containerized the Django app + Postgres DB dev environment with Docker and created one-command setup script to ensure reproducible setups for new members, reducing onboarding time from 2 meetings to 1.",
      "Gamified with karma and badges, boosting average session length and posts/user by 14%, generating product insights.",
      "Integrated rate limiting on review submission, reducing spam requests and lowering monthly AWS costs by 5-10%.",
    ],
    pic_uri: "/assets/tCF.png",
  },
  {
    title: "Full-Stack Developer Intern",
    info: "building-U | May 2023 - Aug 2023",
    description: [
      "Led migration of web app from WordPress to Laravel PHP backend, resulting in 30% faster load times and optimizing scalability for future features.",
      "Constructed and SQL queried a free database of extracurricular learning opportunities for high-school students, populating more than 10000 activities.",
      "Spearheaded redesign of annual virtual game ($4YT) by migrating front-end to React, elevating user experience and increasing user engagement by 40%.",
    ],
    pic_uri: "/assets/building_U.png",
  },
];

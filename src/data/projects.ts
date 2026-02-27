import type { Project } from "../types";

export const projects: Project[] = [
  {
    name: "Notion 2nd Brain",
    stack: "FastAPI, Uvicorn, Notion API, Gemini-3-Flash, Docker, Railway",
    description:
      "Turns raw thoughts into structured Notion tasks w/ actionable plans, powered by Gemini-3.",
    link: "https://github.com/angadv12/notion_brain",
  },
  {
    name: "courtcast-API",
    stack: "YOLOv11, SAM2, FastAPI, Redis, Canvas API",
    description:
      "Creates structured, query-ready stats & visualizations from NBA broadcast footage.",
    link: "https://github.com/angadv12/courtcast-API",
  },
  {
    name: "Divvy",
    logo_uri: "/assets/Divvy_logo.png",
    stack: "React Native, GPT-4.1-mini, Firebase, PayPal API",
    description: "Scan Receipts -> Split the Bills -> Get Paid",
    link: "https://github.com/angadv12/Divvy",
  },
];

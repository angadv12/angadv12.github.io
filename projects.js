// Array of projects objects
const projects = [
	{
      name: "Notion 2nd Brain",
    //   logo_uri: "/assets/NotionBrain_logo.png",
      stack: "FastAPI, Uvicorn, Notion API, Gemini-3-Flash, Docker, Railway",
      description: "Turns raw thoughts into structured Notion tasks w/ actionable plans, powered by Gemini-3."
    },
    {
      name: "courtcast-API",
	//   logo_uri: "/assets/courtcast_logo.png",
      stack: "YOLOv11, SAM2, FastAPI, Redis, Canvas API",
      description: "Creates structured, query-ready stats & visualizations from NBA broadcast footage."
    },
    {
      name: "Divvy",
      logo_uri: "/assets/Divvy_logo.png",
      stack: "React Native, GPT-4.1-mini, Firebase, PayPal API",
      description: "Scan Receipts -> Split the Bills -> Get Paid"
    },
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.querySelector(".projects-cards");
  
    projects.forEach(proj => {
      // container for each project card
      const projItem = document.createElement("div");
      projItem.classList.add("projects-item");
      
      const nameLogoDiv = document.createElement("div");
      nameLogoDiv.classList.add("name-logo");

      const logo = document.createElement("img");
      logo.classList.add("logo");
      logo.src = proj.logo_uri;
      const name = document.createElement("h2");
      name.classList.add("name");
      name.textContent = proj.name;
      const gh_link = document.createElement("a");
      gh_link.classList.add("gh_link");
      gh_link.href = `https://github.com/angadv12/${proj.name}`;
      const gh_link_i = document.createElement("i");
      gh_link_i.classList.add("bi");
      gh_link_i.classList.add("bi-github");

      gh_link.appendChild(gh_link_i);
      nameLogoDiv.appendChild(logo);
      nameLogoDiv.appendChild(name);
      nameLogoDiv.appendChild(gh_link);
      projItem.appendChild(nameLogoDiv);
      
      // project description
      const description = document.createElement("p");
      description.classList.add("description");
      description.textContent = proj.description;

      // project tech stack
      const stack = document.createElement("p");
      stack.classList.add("stack");
      stack.textContent = proj.stack;

      projItem.appendChild(description);
      projItem.appendChild(stack);
    
      projectsContainer.appendChild(projItem);
    });

    // check if projects container is in viewport
    const checkVisibility = () => {
      const sectionTop = projectsContainer.getBoundingClientRect().top;
      const sectionBottom = projectsContainer.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      // add visible class when top of element is in viewport (75% threshold)
      if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
        projectsContainer.classList.add("is-visible");
      } else {
        projectsContainer.classList.remove("is-visible");
      }
    };
    
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
  });
  
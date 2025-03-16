// Array of projects objects
const projects = [
    {
      name: "Divvy",
      logo_uri: "/assets/Divvy_logo.png",
      stack: "React Native (TypeScript), Firebase/Firestore, Tesseract OCR, PayPal API",
      description: "Scan Receipts -> Split the Bills -> Get Paid"
    },
    {
      name: "GameFeed",
      logo_uri: "/assets/GameFeed_logo.png",
      stack: "MongoDB, Express, React, Node.js, Puppeteer, Tailwind CSS",
      description: "NBA Box Scores, Sports News, Community Forums"
    },
    {
      name: "PropertyIQ",
      logo_uri: "/assets/PropertyIQ_logo.png",
      stack: "Django, React, Scikit-Learn, SQLite, Google OAuth 2.0, ngrok",
      description: "Property Listings & Price Predictions with Gradient Boosting Model"
    }
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
      
      // Create and append the stack
      const stack = document.createElement("p");
      stack.classList.add("stack");
      stack.textContent = proj.stack;
      projItem.appendChild(stack);
      
      // Create and append the description
      const description = document.createElement("p");
      description.classList.add("description");
      description.textContent = proj.description;
      projItem.appendChild(description);
    
      projectsContainer.appendChild(projItem);
    });

    // Function to check if projects container is in viewport
    const checkVisibility = () => {
      const sectionTop = projectsContainer.getBoundingClientRect().top;
      const sectionBottom = projectsContainer.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      // Add visible class when top of element is in viewport (75% threshold)
      if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
        projectsContainer.classList.add("is-visible");
      } else {
        projectsContainer.classList.remove("is-visible");
      }
    };
    
    // Check visibility on page load
    checkVisibility();
    
    // Check visibility on scroll
    window.addEventListener("scroll", checkVisibility);
  });
  
// Array of currents objects
const currents = [
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const currentsContainer = document.querySelector(".currents-cards");
  
    currents.forEach(curr => {
      // container for each current card
      const currItem = document.createElement("div");
      currItem.classList.add("currents-item");
      
      const nameLogoDiv = document.createElement("div");
      nameLogoDiv.classList.add("name-logo");

      // Create title without logo
      const name = document.createElement("h2");
      name.classList.add("name");
      name.textContent = curr.name;
      
      // GitHub link
      const gh_link = document.createElement("a");
      gh_link.classList.add("gh_link");
      gh_link.href = `https://github.com/angadv12/${curr.name}`;
      const gh_link_i = document.createElement("i");
      gh_link_i.classList.add("bi");
      gh_link_i.classList.add("bi-github");

      gh_link.appendChild(gh_link_i);
      
      nameLogoDiv.appendChild(name);
      nameLogoDiv.appendChild(gh_link);
      currItem.appendChild(nameLogoDiv);
      
      // current description
      const description = document.createElement("p");
      description.classList.add("description");
      description.textContent = curr.description;

      // current tech stack
      const stack = document.createElement("p");
      stack.classList.add("stack");
      stack.textContent = curr.stack;
      
      currItem.appendChild(description);
      currItem.appendChild(stack);
      currentsContainer.appendChild(currItem);
    });

    // check if currents container is in viewport
    const checkVisibility = () => {
      const sectionTop = currentsContainer.getBoundingClientRect().top;
      const sectionBottom = currentsContainer.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      // add visible class when top of element is in viewport (75% threshold)
      if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
        currentsContainer.classList.add("is-visible");
      } else {
        currentsContainer.classList.remove("is-visible");
      }
    };
    
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
  });
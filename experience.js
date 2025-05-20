// Array of experience objects
const experiences = [
    {
        title: "Full-Stack Developer Intern",
        info: "building-U | May 2023 - Aug 2023",
        description: [
            "Led migration of web app from WordPress to Laravel PHP backend, resulting in 30% faster load times and optimizing scalability for future features.",
            "Constructed and SQL queried a free database of extracurricular learning opportunities for high-school students, populating more than 10000 activities.",
            "Spearheaded redesign of annual virtual game ($4YT) by migrating front-end to React, elevating user experience and increasing user engagement by 40%."
        ],
        pic_uri: "/assets/building_U.png"
    },
    {
        title: "Software Engineer",
        info: "theCourseForum | Aug 2024 - Present",
        description: [
            "Engineered asynchronous pagination on features searches in Django, improving search load times by more than 100%.",
            "Developed an auto-complete feature to streamline course and professor searches, reducing search times by over 25%.",
            "Created schedule builder feature for a more comprehensive advising platform for over 20000 regular users (80% of UVA student body)."
        ],
        pic_uri: "/assets/tCF.png"
    },
    {
        title: "Software Engineer",
        info: "Lean TECHniques | May 2025 - Aug 2025",
        description: [
            "Incoming Summer 2025"
        ],
        pic_uri: "/assets/LT_logo.png"
    }
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const experienceContainer = document.querySelector(".experience");
    
    const header = experienceContainer.querySelector("h1");
  
    experiences.forEach(exp => {
      const expItem = document.createElement("div");
      expItem.classList.add("experience-item");

      const info_container = document.createElement("div");
      info_container.classList.add("info-container");
      
      const title = document.createElement("h2");
      title.textContent = exp.title;
      info_container.appendChild(title);

      const info = document.createElement("p");
      info.classList.add("info");
      info.textContent = exp.info;
      info_container.appendChild(info);
      
      const descriptionList = document.createElement("ul");
      descriptionList.classList.add("description");
      exp.description.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        descriptionList.appendChild(li);
      });
      info_container.appendChild(descriptionList);

      const pic_container = document.createElement("div");
      pic_container.classList.add("pic-container");

      const pic = document.createElement("img");
      pic.classList.add("picture");
      pic.src = exp.pic_uri;
      pic_container.appendChild(pic);

      expItem.appendChild(info_container);
      expItem.appendChild(pic_container);
      

      header.insertAdjacentElement('afterend', expItem);
    });
  });
  
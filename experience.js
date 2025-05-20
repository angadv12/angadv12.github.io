// Array of experience objects
const experiences = [
  {
    title: "Software Engineer Intern",
    info: "Lean TECHniques | May 2025 - Aug 2025",
    description: [
      "Incoming Summer 2025"
    ],
    pic_uri: "/assets/LT_logo.png"
  },
  {
    title: "Software Engineer",
    info: "theCourseForum | Aug 2024 - Present",
    description: [
      "Moderated toxic reviews at-submission using Detoxify model - reducing toxic review rate to 4 per 100 reviews in testing.",
      "Introduced rate limiting on review submission, reducing spam and lowering request costs by 10% (20000 regular users).",
      "Engineered async pagination on reviews & feature searches, improving search load times by more than 100%.",
      "Participated in backlog creation/handling and requirements elicitation & design in weekly Scrum meetings.",
    ],
    pic_uri: "/assets/tCF.png"
  },
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
];

document.addEventListener("DOMContentLoaded", () => {
  const experienceContainer = document.querySelector(".experiences-cards");
  
  experiences.forEach(exp => {
    const expItem = document.createElement("div");
    expItem.classList.add("experience-item");
    
    // content container
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");

    // logo + container
    const logoContainer = document.createElement("div");
    logoContainer.classList.add("logo-container");
    const logo = document.createElement("img");
    logo.classList.add("logo");
    logo.src = exp.pic_uri;
    logoContainer.appendChild(logo);
    
    // words container
    const wordsContainer = document.createElement("div");
    wordsContainer.classList.add("words-container");

    const title = document.createElement("h2");
    title.textContent = exp.title;
    wordsContainer.appendChild(title);

    const info = document.createElement("p");
    info.classList.add("info");
    info.textContent = exp.info;
    wordsContainer.appendChild(info);

    contentContainer.appendChild(logoContainer);
    contentContainer.appendChild(wordsContainer);
    
    // description list
    const descriptionList = document.createElement("ul");
    descriptionList.classList.add("description");
    exp.description.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      descriptionList.appendChild(li);
    });
    
    // Add content container to the experience item
    expItem.appendChild(contentContainer);
    expItem.appendChild(descriptionList);

    experienceContainer.appendChild(expItem);
  });

  // check if experience container is in viewport
  const checkVisibility = () => {
    const sectionTop = experienceContainer.getBoundingClientRect().top;
    const sectionBottom = experienceContainer.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    // add visible class when top of element is in viewport (75% threshold)
    if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
      experienceContainer.classList.add("is-visible");
    } else {
      experienceContainer.classList.remove("is-visible");
    }
  };
  
  checkVisibility();
  window.addEventListener("scroll", checkVisibility);
});
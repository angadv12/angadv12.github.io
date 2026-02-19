// Array of projects objects
// Add a `preview_uri` field to each project to show a screenshot/gif
const projects = [
	{
		name: "Notion 2nd Brain",
		//   logo_uri: "/assets/NotionBrain_logo.png",
		//   preview_uri: "/assets/NotionBrain_preview.png",
		stack: "FastAPI, Uvicorn, Notion API, Gemini-3-Flash, Docker, Railway",
		description: "Turns raw thoughts into structured Notion tasks w/ actionable plans, powered by Gemini-3.",
		link: "https://github.com/angadv12/notion_brain"
	},
	{
		name: "courtcast-API",
		//   logo_uri: "/assets/courtcast_logo.png",
		//   preview_uri: "/assets/courtcast_preview.png",
		stack: "YOLOv11, SAM2, FastAPI, Redis, Canvas API",
		description: "Creates structured, query-ready stats & visualizations from NBA broadcast footage.",
		link: "https://github.com/angadv12/courtcast-API"
	},
	{
		name: "Divvy",
		logo_uri: "/assets/Divvy_logo.png",
		//   preview_uri: "/assets/Divvy_preview.png",
		stack: "React Native, GPT-4.1-mini, Firebase, PayPal API",
		description: "Scan Receipts -> Split the Bills -> Get Paid",
		link: "https://github.com/angadv12/Divvy"
	},
];

document.addEventListener("DOMContentLoaded", () => {
	const projectsContainer = document.querySelector(".projects-cards");

	projects.forEach(proj => {
		const projItem = document.createElement("div");
		projItem.classList.add("projects-item");

		// ── Header row: logo + name + GitHub link ──────────────────
		const nameLogoDiv = document.createElement("div");
		nameLogoDiv.classList.add("name-logo");

		if (proj.logo_uri) {
			const logo = document.createElement("img");
			logo.classList.add("logo");
			logo.src = proj.logo_uri;
			logo.alt = proj.name + " logo";
			nameLogoDiv.appendChild(logo);
		}

		const name = document.createElement("h2");
		name.classList.add("name");
		name.textContent = proj.name;

		const gh_link = document.createElement("a");
		gh_link.classList.add("gh_link");
		gh_link.href = proj.link;
		gh_link.setAttribute("aria-label", `${proj.name} on GitHub`);
		const gh_link_i = document.createElement("i");
		gh_link_i.classList.add("bi", "bi-github");
		gh_link.appendChild(gh_link_i);

		nameLogoDiv.appendChild(name);
		nameLogoDiv.appendChild(gh_link);
		projItem.appendChild(nameLogoDiv);

		// ── Description ────────────────────────────────────────────
		const description = document.createElement("p");
		description.classList.add("description");
		description.textContent = proj.description;
		projItem.appendChild(description);

		// ── Tech stack ─────────────────────────────────────────────
		const stack = document.createElement("p");
		stack.classList.add("stack");
		stack.textContent = proj.stack;
		projItem.appendChild(stack);

		// ── Preview image frame ────────────────────────────────────
		const previewFrame = document.createElement("div");
		previewFrame.classList.add("preview-frame");

		if (proj.preview_uri) {
			const isVideo = /\.(mp4|webm|mov|gif)$/i.test(proj.preview_uri);
			if (isVideo && !/\.gif$/i.test(proj.preview_uri)) {
				const vid = document.createElement("video");
				vid.src = proj.preview_uri;
				vid.autoplay = true;
				vid.loop = true;
				vid.muted = true;
				vid.playsInline = true;
				previewFrame.appendChild(vid);
			} else {
				const img = document.createElement("img");
				img.src = proj.preview_uri;
				img.alt = `${proj.name} preview`;
				img.loading = "lazy";
				previewFrame.appendChild(img);
			}
		} else {
			const placeholder = document.createElement("span");
			placeholder.classList.add("preview-placeholder");
			placeholder.textContent = "Screenshot / GIF coming soon";
			previewFrame.appendChild(placeholder);
		}

		projItem.appendChild(previewFrame);
		projectsContainer.appendChild(projItem);
	});

	// Scroll-triggered visibility
	const checkVisibility = () => {
		const sectionTop = projectsContainer.getBoundingClientRect().top;
		const sectionBottom = projectsContainer.getBoundingClientRect().bottom;
		const windowHeight = window.innerHeight;
		if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
			projectsContainer.classList.add("is-visible");
		} else {
			projectsContainer.classList.remove("is-visible");
		}
	};

	checkVisibility();
	window.addEventListener("scroll", checkVisibility);
});

// Mount the 3D animated scene as a fullbleed background behind the hero
document.addEventListener("DOMContentLoaded", () => {
	const host = document.getElementById("hero-scene");
	const canvas = document.getElementById("hero-canvas");

	if (host && canvas) {
		mountHeroScene(host, canvas);
	}
});

function mountHeroScene(host, canvas) {
	if (typeof THREE === "undefined") {
		// Three.js didn't load — silently degrade
		return;
	}

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
	camera.position.set(0, 0, 5.5);

	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true, // transparent so page background shows through
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
	renderer.setClearColor(0x000000, 0);

	// ── Lighting ───────────────────────────────────────────────────
	scene.add(new THREE.AmbientLight(0x8cc8ff, 0.55));

	const keyLight = new THREE.PointLight(0x84ffd3, 1.1, 30);
	keyLight.position.set(4, 3, 5);
	scene.add(keyLight);

	const rimLight = new THREE.PointLight(0x5f8bff, 0.8, 30);
	rimLight.position.set(-4, -2, -5);
	scene.add(rimLight);

	// ── Animated torus knot — gently spinning ─────────────────────
	const torusKnot = new THREE.Mesh(
		new THREE.TorusKnotGeometry(1.6, 0.45, 200, 32, 2, 3),
		new THREE.MeshStandardMaterial({
			color: 0x7ecaff,
			metalness: 0.6,
			roughness: 0.18,
			wireframe: true,
			transparent: true,
			opacity: 0.22,
		}),
	);
	scene.add(torusKnot);

	// ── Icosahedron shell — slowly counter-rotating ───────────────
	const shell = new THREE.Mesh(
		new THREE.IcosahedronGeometry(2.4, 1),
		new THREE.MeshBasicMaterial({
			color: 0x74ffd4,
			wireframe: true,
			transparent: true,
			opacity: 0.07,
		}),
	);
	scene.add(shell);

	// ── Floating particles ────────────────────────────────────────
	const particleCount = 120;
	const positions = new Float32Array(particleCount * 3);
	for (let i = 0; i < particleCount; i++) {
		positions[i * 3] = (Math.random() - 0.5) * 8;
		positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
	}
	const particlesGeo = new THREE.BufferGeometry();
	particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	const particlesMat = new THREE.PointsMaterial({
		color: 0x9bf7dc,
		size: 0.035,
		transparent: true,
		opacity: 0.7,
		sizeAttenuation: true,
	});
	const particles = new THREE.Points(particlesGeo, particlesMat);
	scene.add(particles);

	// ── Animation ─────────────────────────────────────────────────
	let rafId = null;
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const renderFrame = (now) => {
		const t = now * 0.001;

		torusKnot.rotation.x = t * 0.15;
		torusKnot.rotation.y = t * 0.22;
		torusKnot.position.y = Math.sin(t * 0.4) * 0.15;

		shell.rotation.y = -t * 0.08;
		shell.rotation.x = Math.sin(t * 0.2) * 0.1;

		// gentle floating particles drift
		const posArr = particlesGeo.attributes.position.array;
		for (let i = 0; i < particleCount; i++) {
			posArr[i * 3 + 1] += Math.sin(t + i) * 0.0008;
		}
		particlesGeo.attributes.position.needsUpdate = true;

		renderer.render(scene, camera);
		rafId = requestAnimationFrame(renderFrame);
	};

	// ── Resize ────────────────────────────────────────────────────
	const resize = () => {
		const w = host.clientWidth;
		const h = host.clientHeight;
		if (w === 0 || h === 0) return;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	};

	resize();
	if (typeof ResizeObserver !== "undefined") {
		new ResizeObserver(resize).observe(host);
	} else {
		window.addEventListener("resize", resize);
	}

	if (reduceMotion) {
		renderer.render(scene, camera);
		return;
	}

	rafId = requestAnimationFrame(renderFrame);

	document.addEventListener("visibilitychange", () => {
		if (document.hidden && rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		} else if (!document.hidden && rafId === null) {
			rafId = requestAnimationFrame(renderFrame);
		}
	});
}

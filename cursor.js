const glow = document.querySelector('.cursor-glow');
const glowInner = document.querySelector('.cursor-glow-inner');

// Target (mouse) position
let targetX = 0;
let targetY = 0;
// Current glow position
let currentX = 0;
let currentY = 0;
// Adjust this for more or less lag
const speed = 0.035; // Slower for more lag

// Track mouse movement for intensity
let lastX = 0;
let lastY = 0;
let movementIntensity = 0;
let isMoving = false;
let moveTimer;

document.addEventListener('mousemove', (e) => {
  // Update the target position to the mouse coordinates
  targetX = e.clientX;
  targetY = e.clientY;
  
  // Calculate movement intensity for dynamic glow
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const movement = Math.sqrt(dx * dx + dy * dy);
  
  // Update movement intensity based on how fast the mouse is moving
  movementIntensity = Math.min(1, movementIntensity * 0.85 + movement * 0.03);
  
  // Track if mouse is moving for subtle animation adjustments
  isMoving = true;
  clearTimeout(moveTimer);
  moveTimer = setTimeout(() => {
    isMoving = false;
  }, 100);
  
  // Store last position
  lastX = e.clientX;
  lastY = e.clientY;
});

function animate() {
  // Move currentX/currentY toward targetX/targetY with smooth easing
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;

  // Position the glow
  glow.style.left = `${currentX}px`;
  glow.style.top = `${currentY}px`;
  
  // Add subtle size changes based on movement
  const baseScale = 1.0;
  const moveScale = isMoving ? 1.0 + (movementIntensity * 0.2) : 1.0;
  
  // Apply scale - this creates a subtle expansion effect during movement
  glow.style.transform = `translate(-50%, -50%) scale(${baseScale * moveScale})`;
  
  // Slightly adjust blur based on movement for more realistic effects
  if (isMoving) {
    glowInner.style.filter = `blur(${15 + movementIntensity * 5}px)`;
    // Subtly adjust opacity when moving
    glowInner.style.opacity = 0.6 + (movementIntensity * 0.3);
  } else {
    glowInner.style.filter = 'blur(15px)';
    // Reset opacity when not moving
    glowInner.style.opacity = '';
  }

  // Reduce intensity gradually
  movementIntensity *= 0.95;
  
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
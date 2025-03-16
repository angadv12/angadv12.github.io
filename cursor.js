const glow = document.querySelector('.cursor-glow');

// Target (mouse) position
let targetX = 0;
let targetY = 0;
// Current glow position
let currentX = 0;
let currentY = 0;
// Adjust this for more or less lag
const speed = 0.2; // 0.1 = slower catch-up, 0.2+ = faster

document.addEventListener('mousemove', (e) => {
  // Update the target position to the mouse coordinates
  targetX = e.clientX;
  targetY = e.clientY;
});

function animate() {
  // Move currentX/currentY toward targetX/targetY by 'speed'
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;

  // Position the glow wrapper
  glow.style.left = currentX + 'px';
  glow.style.top = currentY + 'px';

  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const inner = innerRef.current;
    if (!glow || !inner) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.035;

    let lastX = 0;
    let lastY = 0;
    let movementIntensity = 0;
    let isMoving = false;
    let moveTimer: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const movement = Math.sqrt(dx * dx + dy * dy);
      movementIntensity = Math.min(
        1,
        movementIntensity * 0.85 + movement * 0.03,
      );

      isMoving = true;
      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => {
        isMoving = false;
      }, 100);

      lastX = e.clientX;
      lastY = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const animate = () => {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;

      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;

      const moveScale = isMoving ? 1.0 + movementIntensity * 0.2 : 1.0;
      glow.style.transform = `translate(-50%, -50%) scale(${moveScale})`;

      if (isMoving) {
        inner.style.filter = `blur(${15 + movementIntensity * 5}px)`;
        inner.style.opacity = `${0.6 + movementIntensity * 0.3}`;
      } else {
        inner.style.filter = "blur(15px)";
        inner.style.opacity = "";
      }

      movementIntensity *= 0.95;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(moveTimer);
    };
  }, []);

  return (
    <div className="cursor-glow" ref={glowRef}>
      <div className="cursor-glow-inner" ref={innerRef}></div>
    </div>
  );
}

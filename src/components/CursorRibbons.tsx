import React, { useEffect, useRef } from "react";

interface Ribbon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const CursorRibbons = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ribbonsRef = useRef<Ribbon[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      lastPos.current = { ...mousePos.current };
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Add new ribbons on movement
      const dx = mousePos.current.x - lastPos.current.x;
      const dy = mousePos.current.y - lastPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      if (velocity > 2) {
        for (let i = 0; i < 2; i++) {
          ribbonsRef.current.push({
            x: mousePos.current.x + (Math.random() - 0.5) * 10,
            y: mousePos.current.y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get theme colors from CSS variables
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();

      ribbonsRef.current = ribbonsRef.current.filter((ribbon) => {
        ribbon.x += ribbon.vx;
        ribbon.y += ribbon.vy;
        ribbon.life -= 0.01;
        ribbon.vy += 0.1; // gravity

        if (ribbon.life > 0) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${primaryColor}, ${ribbon.life})`;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          
          // Draw ribbon trail
          ctx.moveTo(ribbon.x, ribbon.y);
          ctx.lineTo(ribbon.x - ribbon.vx * 3, ribbon.y - ribbon.vy * 3);
          ctx.stroke();

          // Add glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${accentColor})`;
          ctx.stroke();
          ctx.shadowBlur = 0;

          return true;
        }
        return false;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CursorRibbons;

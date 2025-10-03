import React, { useEffect, useState, useRef } from "react";

interface FallingTextProps {
  text: string;
  className?: string;
}

const FallingText = ({ text, className = "" }: FallingTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const letters = text.split("");

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(-100px) rotateX(-90deg)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${index * 0.03}s`,
            transformOrigin: "center top",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
};

export default FallingText;

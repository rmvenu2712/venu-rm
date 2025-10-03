import React, { useEffect, useState, useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitText = ({ text, className = "", delay = 0 }: SplitTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
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
  }, [delay]);

  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <span
            className="inline-block transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${wordIndex * 0.05}s`,
            }}
          >
            {word}
            {wordIndex < words.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </div>
  );
};

export default SplitText;

import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}

const TypewriterText = ({ text, delay = 0, speed = 100, showCursor = true }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`typewriter-${text}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [text, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTypingComplete(true);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed, hasStarted]);

  return (
    <span id={`typewriter-${text}`}>
      {displayText}
      {showCursor && !isTypingComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default TypewriterText;

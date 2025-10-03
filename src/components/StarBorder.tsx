import React from "react";

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
}

const StarBorder = ({ children, className = "" }: StarBorderProps) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur-sm animate-pulse" />
      <div className="relative bg-background rounded-full border-2 border-primary/50 shadow-lg">
        {children}
      </div>
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-[spin_3s_linear_infinite]" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
    </div>
  );
};

export default StarBorder;

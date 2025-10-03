import React from "react";

interface ShinyTextProps {
  text: string;
  className?: string;
}

const ShinyText = ({ text, className = "" }: ShinyTextProps) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 50%, rgba(255,255,255,1) 100%)',
        animation: 'shimmer 3s ease-in-out infinite',
        backgroundSize: '200% 100%',
      }}>
        <span
          className="
            absolute  
            w-[2px] h-[35px]
            bg-white 
            skew-x-[-20deg]
            animate-[crossSlide_3s_linear_infinite]
            blur-sm
            top-1/2
            -translate-y-1/2
            left-[-15px]
          "
        ></span>
        {text}
      </span>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          @keyframes crossSlide {
            0% {
              left: -15px;
            }
            100% {
              left: calc(100% + 15px);
            }
          }
        `
      }} />
    </span>
  );
};

export default ShinyText;
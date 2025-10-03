import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const getTooltipText = () => {
    return isDark ? "Switch to light mode" : "Switch to dark mode";
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-20 h-fit rounded-full p-1 transition-all duration-500 ease-in-out
        ${isDark 
          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800' 
          : 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500'
        }
        shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95
        border-2 ${isDark ? 'border-purple-400/30' : 'border-white/30'}
        z-[60] bg-background/80 backdrop-blur-sm
        ${className}
      `}
      title={getTooltipText()}
      aria-label={getTooltipText()}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Stars for dark mode */}
        {isDark && (
          <>
            <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute top-3 left-6 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse delay-100"></div>
            <div className="absolute bottom-3 left-4 w-0.5 h-0.5 bg-white rounded-full opacity-70 animate-pulse delay-200"></div>
            <div className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse delay-300"></div>
          </>
        )}
        
        {/* Clouds for light mode */}
        {!isDark && (
          <>
            <div className="absolute top-2 left-2 w-2 h-1 bg-white/40 rounded-full"></div>
            <div className="absolute top-3 left-3 w-1.5 h-0.5 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-2 right-3 w-2 h-1 bg-white/40 rounded-full"></div>
            <div className="absolute bottom-3 right-2 w-1 h-0.5 bg-white/30 rounded-full"></div>
          </>
        )}
      </div>

      {/* Sliding toggle */}
      <div
        className={`
          relative w-8 h-8 rounded-full transition-all duration-500 ease-in-out transform
          ${isDark ? 'translate-x-10 bg-slate-800' : 'translate-x-0 bg-yellow-300'}
          shadow-lg flex items-center justify-center
          ${isDark ? 'shadow-purple-900/50' : 'shadow-yellow-500/50'}
        `}
      >
        {/* Icon */}
        {isDark ? (
          <Moon 
            size={16} 
            className="text-blue-200 transition-all duration-300" 
          />
        ) : (
          <Sun 
            size={16} 
            className="text-orange-600 transition-all duration-300" 
          />
        )}
      </div>

      {/* Glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-full transition-opacity duration-500
          ${isDark 
            ? 'bg-gradient-to-r from-purple-400/20 to-indigo-400/20' 
            : 'bg-gradient-to-r from-yellow-300/20 to-orange-300/20'
          }
        `}
      ></div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
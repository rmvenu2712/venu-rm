
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed  left-0 z-50 rounded-full  w-fit mx-auto right-0 px-4 pr-2 py-2 transition-all duration-300 h-fit",
        isScrolled 
          ? "top-3 dark:bg-gray-100/10 bg-gray-950/10 backdrop-blur-md shadow-sm" 
          : " top-3"
      )}
    >
      <div className=" flex items-center justify-between ">

        <nav className="flex space-x-8">
          <a 
          href="/" 
          className=""
          aria-label="VENU"
        >
          <img 
            src="/venu-logo.png" 
            alt="VENU Logo" 
            className="h-7 sm:h-10" 
          />
        </a>
          <a 
            href="/" 
            className="nav-link hidden md:block"
          >
            Home
          </a>
          <a href="/projects" className="nav-link">Projects</a>
          <a href="/blog" className="nav-link">Blog</a>
                <ThemeToggle  />
        </nav>

      </div>

    </header>
  );
};

export default Navbar;

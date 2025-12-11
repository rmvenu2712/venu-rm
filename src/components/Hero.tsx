import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import SplitText from "./SplitText";
import StarBorder from "./StarBorder";
import FollowingEyes from "./FollowingEyes";
import image from '../../public/lovable-uploads/3d-animated-boy-holding-youtube-icon-his-hand_1173242-1162-removebg-preview.png'

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error("Error loading Lottie animation:", error));
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Magnet effect for button
  useEffect(() => {
    if (!buttonRef.current || isMobile) return;

    const button = buttonRef.current;
    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      button.style.transform = 'translate(0, 0)';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 5;
      const centerY = rect.top + rect.height / 5;

      const deltaX = (e.clientX - centerX) * 0.80; // Magnet strength (adjust 0.25 for more/less pull)
      const deltaY = (e.clientY - centerY) * 0.80;

      button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousemove', handleMouseMove);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);


  const texts = [
    "Frontend developer specializing in React, TypeScript, and modern web technologies.",
    "Building fast, beautiful, and responsive web experiences.",
    "Passionate about clean code and great user interfaces.",
    // Add more phrases here...
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const typingSpeed = 50;   // Speed when typing (ms per char)
    const deletingSpeed = 30; // Speed when deleting (ms per char)
    const pauseAfterType = 2000; // Pause after finishing typing (ms)
    const pauseAfterDelete = 500; // Pause before starting next text

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentFullText.length) {
        // Typing phase
        setDisplayedText(currentFullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting phase
        setDisplayedText(currentFullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentFullText.length) {
        // Finished typing → pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseAfterType);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting → move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setTimeout(() => {}, pauseAfterDelete);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentTextIndex, texts]);


  
  return (
    <section 
      className={cn(
        "overflow-hidden relative bg-cover",
        isMobile ? "py-24 px-4 pb-10" : "py-32 px-5 pb-16"
      )} 
      id="hero"
      style={{
        backgroundImage: 'url("/Header-background.png")',
        backgroundPosition: 'center 30%'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
      
      <div className="container px-0 py-3 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="pulse-chip">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">01</span>
                <span>Frontend Developer</span>
              </div>
            </div>

            <h1 
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in" 
            >
              <SplitText text="Crafting Digital Experiences" />
            </h1>
            
            <p 
              className="section-subtitle mt-3 h-[40px] sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in dark:text-white text-gray-950 font-normal text-base sm:text-lg text-left"
            >
             {displayedText}
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" 
            >
              <a 
                ref={buttonRef}
                href="/projects" 
                className="flex items-center justify-center group w-full sm:w-auto text-center transition-all duration-300 ease-out cursor-pointer text-sm leading-5 px-6 py-4 rounded-full border border-white text-white bg-[#FE5C02] font-medium hover:shadow-lg active:scale-95"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            {lottieData ? (
              <div className="relative z-10 animate-fade-in">
                <LottieAnimation 
                  animationPath={lottieData} 
                  className="w-full h-auto max-w-lg mx-auto"
                  loop={true}
                  autoplay={true}
                />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
                <div className="relative transition-all duration-500 ease-out overflow-hidden">
                                 <div className="relative h-fit w-fit">
                     <img src={image} className="w-[450px]"  alt='image' />
                    <FollowingEyes/>
                </div>
                  {/* <div className="absolute inset-0 bg-[url('/hero-image.jpg')] bg-cover bg-center mix-blend-overlay opacity-50"></div> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;
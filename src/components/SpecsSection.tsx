import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion"; // Install framer-motion if not already: npm install framer-motion

const SpecsSection = () => {
  const buttonRef = useRef(null); // Generic ref for h2 element
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Triggers once when 30% of section is visible

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    const handleMouseMove = (e) => {
      if (!isHovering) return;
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.50;
      const deltaY = (e.clientY - centerY) * 0.50;
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

  // Animation variants for smooth entrance - using easing arrays with tuple assertion for TypeScript compatibility
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // Custom smooth ease-out (assert as 4-number tuple)
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.58, 1] as [number, number, number, number] // Standard easeOut as tuple
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.58, 1] as [number, number, number, number] // Standard easeOut as tuple
      },
    },
  };

      const dividerRef = useRef<HTMLDivElement>(null);
  

    const dividerVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full py-6 sm:py-10 bg-background"
      id="specifications"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with badge and line */}
        <motion.div
          variants={childVariants}
          className="flex items-center gap-4 mb-8 sm:mb-16"
        >
          <motion.div
            variants={badgeVariants}
            className="flex items-center gap-4"
          >
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">3</span>
              <span>Technologies</span>
            </div>
          </motion.div>
            <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.4 }}
                                        variants={dividerVariants}
                                        ref={dividerRef}
                                        className="flex-1 h-[2px] bg-gray-300 dark:bg-gray-600 origin-center"
                                      />
        </motion.div>
       
        {/* Main content with text mask image - responsive text sizing */}
        <motion.div
          variants={childVariants}
          className="max-w-5xl pl-4 sm:pl-8"
        >
          <motion.h2
            ref={buttonRef}
            variants={childVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-tight mb-8 sm:mb-12"
          >
            <span className="block bg-clip-text text-transparent bg-[url('/text-mask-image.jpg')] bg-cover bg-center">
              I work with modern frontend technologies to build scalable, performant web applications. From React and TypeScript to cutting-edge frameworks, I create digital experiences that users love.
            </span>
          </motion.h2>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SpecsSection;
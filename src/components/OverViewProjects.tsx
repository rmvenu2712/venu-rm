import { motion, Variants } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SplitText from './SplitText';
import { ArrowRight } from 'lucide-react';
import ProjectSlider from './ProjectSlider';

const OverViewProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust threshold as needed
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 8;

      const deltaX = (e.clientX - centerX) * 0.3; // Magnet strength (adjust 0.3 for more/less pull)
      const deltaY = (e.clientY - centerY) * 0.3;

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

  // Animation variants for the section title, subtitle, and divider
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the divider
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
    <div className='container'>
      <div className="mb-10 sm:mb-16">
        <div className="mb-2 md:mb-3">
          <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip flex items-center">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 dark:bg-pulse-600 text-white mr-2">
                06
              </span>
              <span className="text-pulse-500">Projects</span>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={dividerVariants}
              ref={dividerRef}
              className="flex-1 h-[2px] bg-gray-300 dark:bg-gray-600 origin-center"
            />
          </div>
           

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
            className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2 text-gray-900 dark:text-gray-100"
          >
            <SplitText text="Featured Projects" />
          </motion.h2>
        </div>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
          className="section-subtitle text-gray-600 dark:text-gray-300"
        >
                      Explore my latest work and creative solutions across various domains

        </motion.p>
      </div>

<ProjectSlider/>
      <div
        ref={buttonRef}
        className='flex w-fit mx-auto rounded-full px-6 py-4 border border-white bg-[#FE5C02] items-center justify-center'
      >
        <a target='_blank'
          href="https://rmvenu2712.github.io/All-projects/"
          className="w-fit mx-auto group sm:w-auto text-center transition-all duration-300 ease-out cursor-pointer text-sm leading-5 text-white font-medium hover:shadow-lg active:scale-95"
        >
          View All
        </a>
        <ArrowRight className="ml-2 w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default OverViewProjects;
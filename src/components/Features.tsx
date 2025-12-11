'use client'; // Required for client-side features like Framer Motion

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion'; // Install: npm install framer-motion
import SplitText from './SplitText';
import foxGif from '../../public/lovable-uploads/finnickPeekingBottom-cropped.gif'
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  // Animation variants for the card
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.15, // Staggered animation for each card
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05, // Slight zoom on hover
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the icon
  const iconVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2, // Larger zoom for the icon on hover
      rotate: 5, // Subtle rotation for dynamic effect
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      className={cn(
        'feature-card p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300',
        'bg-white dark:bg-gray-800',
        'hover:bg-gradient-to-br hover:from-pulse-100 hover:to-pulse-200 dark:hover:from-pulse-600 dark:hover:to-pulse-700',
        'border border-gray-200 dark:border-gray-700'
      )}
    >
      <motion.div
        variants={iconVariants}
        className={cn(
          'rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4 sm:mb-5',
          'bg-pulse-100 dark:bg-pulse-600 text-pulse-600 dark:text-pulse-200'
        )}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
        {description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

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

  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(true);
    }, 8000); // 3 seconds delay

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <section
      className="py-12 sm:py-16 md:py-20 pb-0 relative bg-background"
      id="features"
      ref={sectionRef}
    >
      <div className="section-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-16">
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="pulse-chip flex items-center">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 dark:bg-pulse-600 text-white mr-2">
                  04
                </span>
                <span className="text-pulse-500">Features</span>
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
              <SplitText text="Core Skills & Expertise" />
            </motion.h2>
          </div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
            className="section-subtitle text-gray-600 dark:text-gray-300"
          >
            Specialized in modern web development with a focus on performance, accessibility, and user experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div  className='relative'>
            {showGif && (
        <img 
          src="/lovable-uploads/finnickPeekingBottom-cropped.gif" 
          alt="Finnick peeking" 
          className="w-[150px] block md:hidden absolute right-0 -top-28" 
        />
      )}
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            }
            title="React & TypeScript"
            description="Expert in building scalable applications with React 18, TypeScript, and modern JavaScript frameworks."
            index={0}
          />
          </div>
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M4 4h6v12H4z"></path>
                <path d="M14 4h6v8h-6z"></path>
                <path d="M14 16h6v4h-6z"></path>
              </svg>
            }
            title="Responsive Design"
            description="Creating beautiful, mobile-first designs that work seamlessly across all devices and screen sizes."
            index={1}
          />
          <div className='relative'>
            {showGif && (
        <img 
          src="/lovable-uploads/finnickPeekingBottom-cropped.gif" 
          alt="Finnick peeking" 
          className="w-[150px] hidden md:block  absolute -top-28" 
        />
      )}
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            }
            title="Performance Optimization"
            description="Focused on web performance, Core Web Vitals, and creating lightning-fast user experiences."
            index={2}
          />
          </div>
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" x2="12" y1="22.08" y2="12"></line>
              </svg>
            }
            title="Modern Tooling"
            description="Proficient with Vite, Webpack, Git, and modern development tools for efficient workflows."
            index={3}
          />
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
              </svg>
            }
            title="API Integration"
            description="Experienced in RESTful APIs, GraphQL, and connecting frontend applications with backend services."
            index={4}
          />
          <FeatureCard
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path d="M16 18l2-2-2-2"></path>
                <path d="M8 6l-2 2 2 2"></path>
                <path d="M12 2v20"></path>
              </svg>
            }
            title="Clean Code"
            description="Writing maintainable, scalable code following best practices, SOLID principles, and design patterns."
            index={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
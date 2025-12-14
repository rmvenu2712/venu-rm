'use client'; // If this is in app directory, ensure client-side for animations and form

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion'; // Add framer-motion: npm install framer-motion
import pandaimage from '../../public/lovable-uploads/brunoPeekingBottom-cropped.gif'
import { SiGmail, SiInstagram, SiLinkedin, SiMailchimp, SiMaildotcom, SiWhatsapp } from "react-icons/si";

interface DetailsSectionProps {
  id?: string;
}

const DetailsSection = ({ id }: DetailsSectionProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Log input value to console on change (as per request)
    console.log(`${name}: ${value}`);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Simple validation
  if (!formData.fullName || !formData.email) {
    toast.error("Please fill in all required fields");
    return;
  }

  // Prepare data for Web3Forms
  const submissionData = {
    access_key: '3b0957a5-dbf4-41ce-91b8-aefd1dc393f6', // ← Replace this later
    name: formData.fullName,
    email: formData.email,
    company: formData.company || '',
    message: formData.message || `Contact from ${formData.fullName} - ${formData.company || 'No company specified'}`,
    // Optional: customize subject
    subject: `New Contact Form Submission from ${formData.fullName}`,
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        message: ""
      });
    } else {
      console.error('Web3Forms Error:', result);
      toast.error("Failed to send message. Please try again.");
    }
  } catch (error) {
    console.error('Submission Error:', error);
    toast.error("Failed to send message. Please try again.");
  }
};


  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(true);
    }, 8000); // 3 seconds delay

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  // Optimized and relatable content: Rephrased for better flow and relatability
  const techStackItems = [
    {
      title: "Frontend",
      description: "React, TypeScript, Next.js ."
    },
    {
      title: "Styling",
      description: "CSS-in-JS, Tailwind CSS, Bootstrap ."
    },
    {
      title: "Tools",
      description: "Vite, Git, VS Code, Figma ."
    },
    {
      title: "Animation Frameworks",
      description: "Framer Motion, GSAP, Three.js, etc."
    },
    {
      title: "Testing",
      description: "Jest, React Testing Library ."
    },
    {
      title: "Experience",
      description: "2+ Years – Delivering real-world solutions for diverse projects."
    }
  ];

  return (
    <section id={id || "details"} className="w-full bg-background py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card - Tech Stack */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden dark:shadow-[#07090d] shadow-elegant">
            {/* Card Header with background image */}
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end"
              style={{
                backgroundImage: "url('/background-section3.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                Tech Stack
              </h2>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-8 bg-background">
              <h3 className="text-lg sm:text-xl font-display mb-6 sm:mb-8 text-gray-900 dark:text-gray-100">
                Technologies and tools I use to build modern, efficient web apps
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {techStackItems.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: (index: number) => ({
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.2, // Staggered delay for one-by-one animation
                          duration: 0.5,
                          ease: "easeInOut"
                        }
                      })
                    }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-dark-900 flex items-center justify-center flex-shrink-0 dark:bg-gray-700">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 dark:text-gray-200">
                        <span className="font-semibold text-base">{item.title}:</span> {item.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: (index: number) => ({
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2, // Staggered delay for one-by-one animation
                      duration: 0.5,
                      ease: "easeInOut"
                    }
                  })
                }} className="flex gap-4 m-5 items-center">
                <a href="https://www.linkedin.com/in/venu-rm/" target="_blank"><SiLinkedin size={20} /></a>
                {/* <a href=""><SiInstagram size={20} /></a> */}
                <a target="_blank" href="https://api.whatsapp.com/send?phone=916385538151&text=Hi%20Venu,%20nice%20to%20meet%20you.%20Can%20we%20connect"><SiWhatsapp size={20} /></a>
                <a href="mailto:rmvenu001@gmail.com"><SiGmail size={20} /></a>
              </motion.div>
            </div>
          </div>

          {/* Right Card - Contact Form */}
          <div className="relative">
            {showGif && <img src={pandaimage} className="w-[150px] absolute right-3 -top-36" alt="pandaimage" />}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden dark:shadow-[#07090d] shadow-elegant">
              {/* Card Header with background image */}
              <div
                className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start"
                style={{
                  backgroundImage: "url('/background-section1.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                  Get in touch
                </div>
                <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                  Let's work together
                </h2>
              </div>

              {/* Card Content - Form */}
              <div className="bg-background p-4 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message or project details (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 resize-y min-h-[100px]"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-pulse-500 hover:bg-pulse-600 text-white font-medium rounded-full transition-colors duration-300 dark:bg-pulse-600 dark:hover:bg-pulse-700"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
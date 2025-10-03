import React from "react";
import { motion, Variants } from "framer-motion";

const ProjectsSection = () => {
  const dividerVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeInOut",
      },
    },
  };

  // Sample project data (customize as needed)
  const projects = [
    { title: "Bridge", image: "https://picsum.photos/seed/1/800/600?grayscale", description: "A stunning bridge design." },
    { title: "Desk Setup", image: "https://picsum.photos/seed/2/800/600?grayscale", description: "Optimized workspace layout." },
    { title: "Waterfall", image: "https://picsum.photos/seed/3/800/600?grayscale", description: "Nature-inspired UI." },
    { title: "Strawberries", image: "https://picsum.photos/seed/4/800/600?grayscale", description: "Fresh e-commerce site." },
  ];

  return (
    <section id="projects" className="bg-background py-10">
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">08</span>
              <span>Projects</span>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={dividerVariants}
              className="flex-1 h-[2px] bg-gray-300 dark:bg-gray-600 origin-center"
            />
          </div>
          <h2 className="text-5xl font-display font-bold mb-4 text-left">Projects</h2>
          <p className="text-xl text-gray-700 mb-10 text-left">
            Explore my latest work showcasing innovative designs and solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">{project.description}</p>
                </div>
                <motion.button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-70 text-white font-medium py-2 px-4 rounded transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  View Project
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
import React, { useRef, useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SplitText from "./SplitText";

const ExperienceSection = () => {
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

    const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      }
    },
  };

  const experiences = [
    {
      year: "2023 - 2025",
      month: "Dec 2023 - Present",
      title: "Junior Frontend Developer",
      company: "Vilvabusiness",
      location: "Kalyani ammal Street, Ambatur, Chennai",
      companyUrl: "https://vilvabusiness.com",
      certificationUrl: "https://novitech.com/certificate/12345",
      content: "Vilvabusiness is a trusted fintech-focused company that builds secure financial applications, trending eCommerce platforms, and software products. Along with managing its own eCommerce sites and apps, the company provides end-to-end IT consulting and digital solutions, empowering businesses to grow with innovative technology.",
      projects: [
        "Developed scalable eCommerce platform with real-time inventory",
        "Built bus booking application with seat selection and live tracking",
        "Designed fintech dashboard with secure payments and analytics",
        "Created high-conversion landing pages for multiple SaaS products"
      ]
    },
    {
      year: "2023",
      month: "Oct - Nov 2023",
      title: "Frontend Developer Intern",
      company: "Novi Tech",
      location: "Remote",
      companyUrl: "https://novitech.com",
      certificationUrl: "https://novitech.com/certificate/12345",
      content: "Completed a certified 2-month internship program focused on frontend development. Gained hands-on training in React, TypeScript, and modern UI frameworks while working on guided team projects.",
      projects: [
        "Developed a demo e-commerce website as part of training",
        "Implemented API integrations and basic payment flow",
        "Built responsive layouts and improved UI/UX for sample projects"
      ]
    }
  ];
  const [selectedYear, setSelectedYear] = useState<string | null>("2023 - 2025");
    const handleYearClick = (year: string) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  return (
    <motion.section
      className="w-full py-16 bg-background relative overflow-hidden"
      id="experience"

      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* <div className="absolute inset-0 bg-black/20"></div> */}
      <div className="container relative px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          className="mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="pulse-chip">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
                <span>Experience</span>
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
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">
              <SplitText text="Professional Experience" />
            </h2>
          </div>

          <p className="text-lg text-muted-foreground">
            My journey in frontend development and the impact I've made at various companies
          </p>
        </motion.div>

        <div className="mt-32 hidden md:block mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="relative  mb-12 last:mb-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-[49.5%] transform -translate-x-1/2 -translate-y-1/2 top-6 w-4  h-4 bg-primary rounded-full border-4 border-background z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                ></motion.div>

                <div className={`flex items-start ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  {/* Year badge */}
                  <div className={`w-1/2 relative  top-3 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="inline-block  px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {experience.year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <motion.div
                      className="bg-card rounded-2xl p-6 shadow-elegant dark:shadow-[#000] hover:shadow-elegant-hover transition-all duration-300"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.month}</span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-foreground mb-1">
                        {experience.title}
                      </h3>

                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <a
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {experience.company}
                        </a>
                        <ExternalLink className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {experience.content}
                      </p>
                      
                      {experience.certificationUrl && (
                        <div className="mb-4">
                          <a
                            href={experience.certificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm font-semibold"
                          >
                            View Certification
                          </a>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Projects:</h4>
                        <ul className="space-y-1">
                          {experience.projects.map((project, projectIndex) => (
                            <li key={projectIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>



                {/* Mobile Year Selection */}
        <div className="lg:hidden flex justify-center gap-4 mb-8">
          {experiences.map((experience, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedYear === experience.year
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
              onClick={() => handleYearClick(experience.year)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {experience.year}
            </motion.button>
          ))}
        </div>

        <div className=" block md:hidden mx-auto">
          <div className="relative">
            {/* Timeline line (visible only on desktop) */}
            <div className="lg:block hidden absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 last:mb-0 ${
                  selectedYear && selectedYear !== experience.year ? 'hidden lg:block' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot (visible only on desktop) */}
                <motion.div
                  className="lg:block hidden absolute left-[49.5%] transform -translate-x-1/2 -translate-y-1/2 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                ></motion.div>

                <div className={`flex items-start ${index % 2 === 0 ? 'lg:flex-row-reverse flex-col' : 'flex-col'}`}>
                  {/* Year badge (visible only on desktop) */}
                  <div className={`lg:w-1/2 w-full relative top-3 ${index % 2 === 0 ? 'lg:pl-8 lg:text-left' : 'lg:pr-8 lg:text-right'}`}>
                    <motion.div
                      className="lg:block hidden mb-4"
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {experience.year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    className={`lg:w-1/2 w-full ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'} mt-4 lg:mt-0`}
                    variants={contentVariants}
                    initial="hidden"
                    animate={selectedYear === experience.year || !selectedYear ? "visible" : "hidden"}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-card rounded-2xl p-6 shadow-elegant dark:shadow-[#000] hover:shadow-elegant-hover transition-all duration-300">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.month}</span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-foreground mb-1">
                        {experience.title}
                      </h3>

                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <a
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {experience.company}
                        </a>
                        <ExternalLink className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {experience.content}
                      </p>
                      
                      {experience.certificationUrl && (
                        <div className="mb-4">
                          <a
                            href={experience.certificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm font-semibold"
                          >
                            View Certification
                          </a>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Projects:</h4>
                        <ul className="space-y-1">
                          {experience.projects.map((project, projectIndex) => (
                            <li key={projectIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </motion.section>
  );
};

export default ExperienceSection;
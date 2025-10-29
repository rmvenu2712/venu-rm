import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProjectSlider = () => {
const projects = [

  {
    id: "3",
    title: "Beauty Shop Landing Page",
    description: "A modern, elegant landing page for a women's beauty products store. Fully responsive with smooth animations and call-to-action sections.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: "/project(4).png", // Replace with actual image
    liveUrl: "https://prettygurls.netlify.app",
    githubUrl: "https://github.com/rmvenu2712/Beauty-Shop-Landing"
  },
  {
    id: "4",
    title: "Thirukural Generator",
    description: "An interactive web app that fetches and displays random Thirukural verses with explanations using a public API. Built with React and styled using Bootstrap.",
    tech: ["React", "Bootstrap"],
    image: "/project(5).png", // Replace with actual image
    liveUrl: "https://kural-tail.netlify.app/",
    githubUrl: "https://github.com/rmvenu2712/Thirukkural-Generator-"
  },
  {
    id: "5",
    title: "Task Management System",
    description: "A feature-rich task manager with drag-and-drop functionality, project categorization, task creation/deletion, and status tracking. Built for personal productivity.",
    tech: ["React", "Tailwind CSS"],
    image: "/taskmanagement.png", // Replace with actual image
    liveUrl: "https://task-management-system-71x.pages.dev",
    githubUrl: "https://github.com/rmvenu2712/task-management-system"
  },
    {
    id: "1",
    title: "Currency Converter",
    description: "A real-time currency converter web app powered by an external API. Built with clean and responsive design using HTML, CSS, and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects (2).webp",
    liveUrl: "https://currence-converter.netlify.app",
    githubUrl: "https://github.com/rmvenu2712/CurenceConverter"
  },
  {
    id: "2",
    title: "BMI Calculator",
    description: "A user-friendly BMI calculator that computes Body Mass Index based on height and weight input. Features responsive design and instant results.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    image: "/projects (1).webp", // Replace with actual image if available
    liveUrl: "https://bmicalculater001.netlify.app/",
    githubUrl: "https://github.com/rmvenu2712/Orgbmi"
  },
  {
    id: "6",
    title: "React CRUD Operations",
    description: "A responsive CRUD application demonstrating Create, Read, Update, and Delete operations in React. Ideal for learning state management and component lifecycle.",
    tech: ["React", "Bootstrap"],
    image: "/projects (1).gif", // Replace with actual image
    liveUrl: "https://recproj.netlify.app/",
    githubUrl: "https://github.com/rmvenu2712/Reactproject"
  }
];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 md:py-24  relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96  rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="max-w-[1400px] mx-auto relative px-4 md:px-16 lg:px-20">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <div className="group relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 h-full rounded-2xl shadow-lg hover:shadow-2xl">
                      <div className="relative overflow-hidden aspect-[3/4]">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                        {/* Hover overlay with icons */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3">
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-xl"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            viewport={{ once: false }}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>

                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background shadow-xl"
                            initial={{ scale: 0, rotate: 180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            viewport={{ once: false }}
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        </div>

                        
                      </div>

                      <div className="p-4">
                        <h3 className="text-base font-display font-bold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 2).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-md text-[10px] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 2 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-[10px]">
                              +{project.tech.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 w-12 h-12 bg-primary/90 text-primary-foreground border-primary/30 hover:bg-primary shadow-xl" />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16 w-12 h-12 bg-primary/90 text-primary-foreground border-primary/30 hover:bg-primary shadow-xl" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;

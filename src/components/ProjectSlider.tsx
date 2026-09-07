import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


const ProjectSlider = () => {
  const projects = [
      {
  id: "8",
  title: "E-Commerce Fashion Website",
  description: "A full-featured e-commerce website built with Next.js and Tailwind CSS. Includes Razorpay test payment integration, dynamic theme switching, and category-based navigation for Men, Women, and Kids.",
  tech: ["Next.js", "Tailwind CSS", "TypeScript", "Razorpay"],
  image: "/ecom-wear.png", // Replace with actual image
  category: "Frontend",
  liveUrl: "https://ecom-wear.pages.dev",
  githubUrl: "https://github.com/rmvenu2712/ecom-wear"
}
,
{
  id: "9",
  title: "WebOpti Tools",
  description: "An AI-powered SEO platform providing professional tools for web performance analysis, optimization, and compliance with the latest SEO best practices and updates.",
  tech: ["Next.js", "Tailwind CSS", "TypeScript"],
  image: "/webopti-tools.png", // Replace with actual image
  category: "Frontend",
  liveUrl: "https://webopti-tools.pages.dev/",
  githubUrl: "https://github.com/rmvenu2712/webopti-tools"
},
    {
      id: "3",
      title: "Beauty Shop Landing Page",
      description: "A modern, elegant landing page for a women's beauty products store. Fully responsive with smooth animations and call-to-action sections.",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/project(4).png",
      liveUrl: "https://beauty-shop-landing.pages.dev/",
      githubUrl: "https://github.com/rmvenu2712/Beauty-Shop-Landing"
    },
    {
      id: "4",
      title: "Thirukural Generator",
      description: "An interactive web app that fetches and displays random Thirukural verses with explanations using a public API. Built with React and styled using Bootstrap.",
      tech: ["React", "Bootstrap"],
      image: "/project(5).png",
      liveUrl: "https://thirukkural-generator.pages.dev/",
      githubUrl: "https://github.com/rmvenu2712/Thirukkural-Generator-"
    },
    {
      id: "5",
      title: "Task Management System",
      description: "A feature-rich task manager with drag-and-drop functionality, project categorization, task creation/deletion, and status tracking. Built for personal productivity.",
      tech: ["React", "Tailwind CSS"],
      image: "/taskmanagement.png",
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
      image: "/projects (1).webp",
      liveUrl: "https://bmicalculater001.netlify.app/",
      githubUrl: "https://github.com/rmvenu2712/Orgbmi"
    }
  ];

  const reduceMotion = useReducedMotion();
  const [showAnimal, setShowAnimal] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }));

  return (
        <motion.div className="relative pb-10 pt-24 sm:pt-28" onViewportEnter={() => setShowAnimal(true)} viewport={{ once: true, amount: 0.15 }}>
      <div aria-hidden="true" className="pointer-events-none absolute right-5 top-0 flex h-24 w-28 items-end overflow-hidden sm:right-10 sm:h-28 sm:w-36">
        {showAnimal && !reduceMotion && (
          <img src="/lovable-uploads/finnickPeekingBottom-cropped.gif" alt="" className="block h-auto w-full" />
        )}
      </div>
      <Carousel plugins={reduceMotion ? [] : [autoplay.current]} opts={{ align: "start", loop: true, duration: reduceMotion ? 0 : 25 }} aria-label="Featured projects" className="w-full">
        <CarouselContent className="-ml-4 items-stretch">
          {projects.map((project, index) => (
            <CarouselItem key={project.id} className="basis-full pl-4 md:basis-1/2 lg:basis-1/4">
              <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-pulse-400/60 motion-reduce:transition-none"
              >
                <div className={`relative overflow-hidden p-3 pb-0 ${index % 2 === 0 ? 'bg-[#f2e9df] dark:bg-[#28231f]' : 'bg-[#e7ecef] dark:bg-[#1c2730]'}`}>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600 dark:text-gray-300">Project / {String(index + 1).padStart(2, '0')}</span>
                    <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-700 dark:border-white/15 dark:text-gray-200">Web</span>
                  </div>
                  <div className="overflow-hidden rounded-t-xl border border-black/10 bg-background shadow-[0_12px_35px_-12px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
                    <div aria-hidden="true" className="flex h-8 items-center gap-1.5 border-b border-border bg-background px-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f28b82]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#fdd663]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#81c995]" />
                      <span className="ml-3 min-w-0 truncate text-[9px] text-muted-foreground">{new URL(project.liveUrl).hostname}</span>
                    </div>
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-base font-semibold leading-snug tracking-tight">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground">{project.description}</p>
                  <ul aria-label="Technologies used" className="mb-4 mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <li key={tech} className="rounded-md bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground">{tech}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-3 py-2.5 text-xs font-medium text-background transition-colors hover:bg-pulse-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulse-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      Live project <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View source for ${project.title} on GitHub (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulse-500">
                      <Github aria-hidden="true" className="h-4 w-4" /> Source
                    </a>
                  </div>
                </div>
              </motion.article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{projects.length} projects to explore</p>
          <div className="flex gap-2">
            <CarouselPrevious className="static h-11 w-11 translate-y-0 border-border hover:border-pulse-500 hover:bg-pulse-500 hover:text-white" />
            <CarouselNext className="static h-11 w-11 translate-y-0 border-border hover:bg-pulse-500 hover:text-white" />
          </div>
        </div>
      </Carousel>
    </motion.div>
  );
};

export default ProjectSlider;


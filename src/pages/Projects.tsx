import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import { Button } from "@/components/ui/button";
import SearchAndFilter from "@/components/SearchAndFilter";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const projects = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard with real-time analytics.",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
      category: "Full-Stack",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built for maximum productivity.",
      tech: ["React", "TypeScript", "Socket.io", "MongoDB", "Express"],
      category: "Frontend",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "3",
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using OpenWeather API with beautiful data visualizations.",
      tech: ["React", "JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
      category: "Frontend",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "4",
      title: "Social Media Dashboard",
      description: "A comprehensive social media management platform with analytics, scheduling, and multi-platform integration. Perfect for content creators and businesses.",
      tech: ["React", "TypeScript", "Next.js", "Firebase", "Tailwind"],
      category: "Full-Stack",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "5",
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing projects and skills. Built with performance and accessibility in mind using latest web technologies.",
      tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
      category: "Frontend",
      image: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "6",
      title: "Learning Management System",
      description: "A complete LMS platform with course creation, student progress tracking, and interactive learning modules. Designed for educational institutions.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      category: "Full-Stack",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const availableCategories = Array.from(new Set(projects.map(project => project.category)));

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(project.category);
      
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategories]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                My Projects
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A showcase of my recent work and side projects that demonstrate my skills in frontend development and full-stack applications.
              </p>
            </motion.div>

            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              availableCategories={availableCategories}
              placeholder="Search projects..."
            />
            
            <motion.div 
              className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="bg-card rounded-2xl shadow-elegant overflow-hidden hover:shadow-elegant-hover transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button size="sm" asChild className="flex-1">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground text-lg">
                  No projects found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
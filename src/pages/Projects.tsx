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
      id: "3",
      title: "Beauty Shop Landing Page",
      description: "A modern, elegant landing page for a women's beauty products store. Fully responsive with smooth animations and call-to-action sections.",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/project(4).png", // Replace with actual image
      category: "Frontend",
      liveUrl: "https://prettygurls.netlify.app",
      githubUrl: "https://github.com/rmvenu2712/Beauty-Shop-Landing"
    },
    {
      id: "4",
      title: "Thirukural Generator",
      description: "An interactive web app that fetches and displays random Thirukural verses with explanations using a public API. Built with React and styled using Bootstrap.",
      tech: ["React", "Bootstrap"],
      image: "/project(5).png", // Replace with actual image
      category: "Frontend",
      liveUrl: "https://kural-tail.netlify.app/",
      githubUrl: "https://github.com/rmvenu2712/Thirukkural-Generator-"
    },
    {
      id: "5",
      title: "Task Management System",
      description: "A feature-rich task manager with drag-and-drop functionality, project categorization, task creation/deletion, and status tracking. Built for personal productivity.",
      tech: ["React", "Tailwind CSS"],
      image: "/taskmanagement.png", // Replace with actual image
      category: "Frontend",
      liveUrl: "https://task-management-system-71x.pages.dev",
      githubUrl: "https://github.com/rmvenu2712/task-management-system"
    },
        {
      id: "1",
      title: "Currency Converter",
      description: "A real-time currency converter web app powered by an external API. Built with clean and responsive design using HTML, CSS, and JavaScript.",
      tech: ["HTML", "CSS", "JavaScript"],
      category: "Frontend",
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
      category: "Frontend",
      liveUrl: "https://bmicalculater001.netlify.app/",
      githubUrl: "https://github.com/rmvenu2712/Orgbmi"
    },
    {
      id: "6",
      title: "React CRUD Operations",
      description: "A responsive CRUD application demonstrating Create, Read, Update, and Delete operations in React. Ideal for learning state management and component lifecycle.",
      tech: ["React", "Bootstrap"],
      image: "/projects (1).gif", // Replace with actual image
      category: "Frontend",
      liveUrl: "https://recproj.netlify.app/",
      githubUrl: "https://github.com/rmvenu2712/Reactproject"
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
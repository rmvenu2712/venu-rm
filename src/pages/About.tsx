import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-8">
              About Me
            </h1>
            
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <div className="bg-card rounded-2xl p-8 shadow-elegant mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Frontend Developer & UI/UX Enthusiast
                </h2>
                <p className="mb-6">
                  I'm a passionate frontend developer with expertise in React, TypeScript, and modern web technologies. 
                  I love creating beautiful, responsive, and user-friendly interfaces that deliver exceptional user experiences.
                </p>
                <p className="mb-6">
                  With a strong foundation in design principles and cutting-edge development practices, I bridge the gap 
                  between design and functionality to create digital experiences that not only look great but perform exceptionally.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or sharing my knowledge with the developer community.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Skills</h3>
                  <ul className="space-y-2">
                    <li>React & Next.js</li>
                    <li>TypeScript & JavaScript</li>
                    <li>Tailwind CSS & SCSS</li>
                    <li>Node.js & Express</li>
                    <li>Git & Version Control</li>
                    <li>Responsive Design</li>
                  </ul>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-elegant">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Interests</h3>
                  <ul className="space-y-2">
                    <li>Modern Web Technologies</li>
                    <li>User Experience Design</li>
                    <li>Performance Optimization</li>
                    <li>Open Source Projects</li>
                    <li>Tech Community</li>
                    <li>Continuous Learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
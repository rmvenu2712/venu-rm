import { MapPin, Mail, Phone, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

const ResumePage = () => {
    const educationData = [
  {
    degree: "Bachelor of Engineering - Computer Science",
    institution: "Prince Shri Venkateshwara Padmavathy Engineering College",
    score: "CGPA: 7.20",
    year: "2020 - 2024"
  },
  {
    degree: "HSC",
    institution: "Karpaga Vinayaga Matric Hr.Sec School",
    score: "Percentage: 56%",
    year: "2019 - 2020"
  },
  {
    degree: "SSLC",
    institution: "Karpaga Vinayaga Matric Hr.Sec School",
    score: "Percentage: 70%",
    year: "2017 - 2018"
  }
];


const projectsData = [
  {
    title: "VOICE ASSISTANT",
    description: "A voice-powered AI assistant created using HTML, CSS, and JavaScript, capable of responding to user queries through speech recognition and text-to-speech APIs.",
    viewLink: "https://venu-portfolio-psi.vercel.app",
    githubLink: "https://github.com/VENURM"
  },
  {
    title: "CHAT GPT CLONE",
    description: "Developed a Chat GPT using React.js - an AI chatbot replicating OpenAI's ChatGPT UI, enabling real-time conversations powered by the OpenAI API.",
    viewLink: "https://venu-portfolio-psi.vercel.app",
    githubLink: "https://github.com/VENURM"
  },
  {
    title: "IOT BASED RAILWAY TRACKING",
    description: "An IoT-enabled system using GPS, GSM, and microcontrollers to monitor real-time train locations and display them on a web dashboard.",
    viewLink: "https://venu-portfolio-psi.vercel.app",
    githubLink: "https://github.com/VENURM"
  },
  {
    title: "BUSINESS WEBSITE",
    description: "A multi-page corporate website built with React and Tailwind CSS, featuring services, team sections, and contact forms for business engagement.",
    viewLink: "https://venu-portfolio-psi.vercel.app",
    githubLink: "https://github.com/VENURM"
  }
];



  return (
     <div className="min-h-screen bg-background py-8 px-4 md:px-8 print:py-4 print:px-8">
        <div className="max-w-4xl mx-auto bg-card shadow-sm print:shadow-none border border-border print:border-0 rounded-lg p-6 md:p-10">
    <header className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">VENU R M</h1>
      
      <div className="flex flex-wrap gap-4 md:gap-6 text-sm mb-3">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Chennai, India</span>
        </div>
        <a href="mailto:Venurm07@gmail.com" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
          <Mail className="w-4 h-4 text-primary" />
          <span>Venurm07@gmail.com</span>
        </a>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Phone className="w-4 h-4 text-primary" />
          <span>+91 6383387547</span>
        </div>
        <a href="https://venu-portfolio-psi.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
          <Globe className="w-4 h-4 text-primary" />
          <span>venu-portfolio-psi.vercel.app</span>
        </a>
      </div>

      <div className="flex gap-4 text-sm">
        <a href="https://linkedin.com/in/venu-r-m-90b76a1b8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
          <Linkedin className="w-4 h-4 text-primary" />
          <span>linkedin.com/in/venu-r-m-90b76a1b8</span>
        </a>
        <a href="https://github.com/VENURM" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
          <Github className="w-4 h-4 text-primary" />
          <span>github.com/VENURM</span>
        </a>
      </div>
    </header>



     <section className="mb-6 border-l-4 border-primary pl-4">
      <p className="text-foreground leading-relaxed">
        I am a <span className="highlight">Frontend Developer</span> specializing in building responsive and user-friendly interfaces using{' '}
        <span className="highlight">HTML</span>, <span className="highlight">CSS</span>, <span className="highlight">JavaScript</span>,{' '}
        <span className="highlight">React</span>, and <span className="highlight">Next Js</span>. I focus on clean code, good user experience, and modern design with{' '}
        <span className="highlight">Bootstrap</span> and <span className="highlight">Tailwind CSS</span>. I'm eager to grow and contribute to impactful projects.
      </p>
      <a 
        href="https://venu-portfolio-psi.vercel.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-primary hover:underline mt-2 text-sm font-medium"
      >
        Explore my work
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </section>


    <section className="mb-6">
      <SectionTitle title="Education" />
      <div className="space-y-3">
        {educationData.map((edu, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-1 bg-primary rounded-full flex-shrink-0 mt-1"></div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium text-primary">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.score}</p>
                </div>
                <span className="text-sm text-muted-foreground mt-1 md:mt-0">{edu.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>





 <section className="mb-6">
      <SectionTitle title="Achievements" />
      <ul className="space-y-2 text-foreground">
        <li className="flex gap-2">
          <span className="text-primary">•</span>
          <span>
            <span className="highlight">1st Place</span> in <span className="highlight">Web Designing</span> competition at Easwari Engineering College - 2024
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-primary">•</span>
          <span>
            Completed <span className="highlight">Full Stack Web Development Certification</span> at Besant Technologies - 2024
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-primary">•</span>
          <span>
            <span className="highlight">Internship</span> at Quasar Binary Pvt. Ltd - 2024
          </span>
        </li>
      </ul>
    </section>



        <section className="mb-6">
      <SectionTitle title="Technologies" />
      <div className="space-y-2">
        <p className="text-foreground">
          <span className="highlight">Languages:</span>{' '}
          <span className="text-muted-foreground">HTML, CSS, JavaScript, SQL, C</span>
        </p>
        <p className="text-foreground">
          <span className="highlight">Frameworks / Tools:</span>{' '}
          <span className="text-muted-foreground">React JS, Next JS, Bootstrap, Tailwind CSS, Material UI, Git</span>
        </p>
      </div>
    </section>

  <section className="mb-6">
      <SectionTitle title="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-primary text-sm uppercase tracking-wide mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              • {project.description}
            </p>
            <div className="flex gap-4">
              <a 
                href={project.viewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
              >
                View
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
              >
                Github
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>


    </div>
    </div>
  );
};

export default ResumePage;


const SectionTitle = ({ title }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">{title}</h2>
      <div className="flex-1 h-px bg-border"></div>
    </div>
  );
};
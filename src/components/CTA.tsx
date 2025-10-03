import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const CTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        to_email: formData.email,
        message: formData.message
      },
      'YOUR_PUBLIC_KEY'
    ).then(
      () => {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon."
        });
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
      },
      (error) => {
        console.error('EmailJS Error:', error);
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon."
        });
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
      }
    );
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    
    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative" id="get-access" ref={ctaRef}>
      {/* Background gradient at the top has been removed */}
      
      <div className="section-container relative z-10 opacity-0 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto glass-card p-6 sm:p-8 md:p-10 lg:p-14 text-center overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-pulse-100/30 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gray-100/50 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
          
          <div className="pulse-chip mx-auto mb-4 sm:mb-6">
            <span>Limited Availability</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Let's work together
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
              required
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-6 py-4 rounded-3xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 min-h-[120px]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary group flex items-center justify-center w-full sm:w-auto mx-auto"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;

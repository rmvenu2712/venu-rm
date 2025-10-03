import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import SearchAndFilter from "@/components/SearchAndFilter";
import NewsletterDialog from "@/components/NewsletterDialog";
import { motion } from "framer-motion";

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const blogPosts = [
    {
      id: "1",
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes and custom components. Master the art of responsive design with practical examples.",
      date: "2024-03-15",
      readTime: "5 min read",
      category: "CSS",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      likes: 24,
      isLiked: false
    },
    {
      id: "2",
      title: "React Performance Optimization Techniques",
      excerpt: "Discover advanced techniques to optimize your React applications for better performance and user experience. From memoization to code splitting, we cover it all.",
      date: "2024-03-10",
      readTime: "8 min read",
      category: "React",
      image: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
      likes: 42,
      isLiked: false
    },
    {
      id: "3",
      title: "TypeScript Best Practices in 2024",
      excerpt: "Explore the latest TypeScript features and best practices that will make your code more robust and maintainable. Perfect for both beginners and experienced developers.",
      date: "2024-03-05",
      readTime: "6 min read",
      category: "TypeScript",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      likes: 18,
      isLiked: false
    },
    {
      id: "4",
      title: "Modern JavaScript ES2024 Features",
      excerpt: "Dive into the latest JavaScript features and how they can improve your development workflow. Stay up-to-date with the newest additions to the language.",
      date: "2024-02-28",
      readTime: "7 min read",
      category: "JavaScript",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      likes: 31,
      isLiked: false
    },
    {
      id: "5",
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt: "A comprehensive guide to understanding when to use CSS Grid versus Flexbox for your layouts. Learn the strengths and use cases of each.",
      date: "2024-02-20",
      readTime: "4 min read",
      category: "CSS",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      likes: 15,
      isLiked: false
    },
    {
      id: "6",
      title: "Building APIs with Node.js and Express",
      excerpt: "Learn how to build robust and scalable APIs using Node.js and Express. From routing to middleware, we cover everything you need to know.",
      date: "2024-02-15",
      readTime: "10 min read",
      category: "Node.js",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      likes: 28,
      isLiked: false
    }
  ];

  const availableCategories = Array.from(new Set(blogPosts.map(post => post.category)));

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(post.category);
      
      return matchesSearch && matchesCategory;
    }).map(post => ({
      ...post,
      isLiked: likedPosts[post.id] || false
    }));
  }, [blogPosts, searchTerm, selectedCategories, likedPosts]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLike = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleReadMore = (post: any) => {
    navigate(`/blog/${post.id}`);
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
                Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sharing my thoughts on frontend development, web technologies, and best practices in modern web development.
              </p>
            </motion.div>

            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              availableCategories={availableCategories}
              placeholder="Search blog posts..."
            />
            
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onReadMore={handleReadMore}
                  onLike={handleLike}
                />
              ))}
            </motion.div>

            {filteredPosts.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground text-lg">
                  No blog posts found matching your criteria.
                </p>
              </motion.div>
            )}
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                More articles coming soon! Stay tuned for updates.
              </p>
              <NewsletterDialog>
                <Button variant="outline">
                  Subscribe to Newsletter
                </Button>
              </NewsletterDialog>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
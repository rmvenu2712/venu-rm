import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import BlogCard from "@/components/BlogCard";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Heart, 
  MessageCircle,
  Send,
  User
} from "lucide-react";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "Great article! Really helpful insights on React optimization.",
      date: "2024-03-16",
      avatar: ""
    },
    {
      id: 2,
      author: "Sarah Wilson",
      content: "Thanks for sharing these techniques. I'll definitely try them in my next project.",
      date: "2024-03-16",
      avatar: ""
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  // Mock blog post data - in real app, fetch based on id
  const blogPost = {
    title: "React Performance Optimization Techniques",
    content: `
      <p>React applications can sometimes suffer from performance issues as they grow in complexity. In this comprehensive guide, we'll explore various techniques to optimize your React applications for better performance and user experience.</p>
      
      <h2>1. Component Memoization</h2>
      <p>One of the most effective ways to improve React performance is through component memoization using React.memo(). This prevents unnecessary re-renders when props haven't changed.</p>
      
      <h2>2. useMemo and useCallback Hooks</h2>
      <p>These hooks help prevent expensive calculations and function recreations on every render. Use useMemo for expensive calculations and useCallback for function references passed to child components.</p>
      
      <h2>3. Code Splitting and Lazy Loading</h2>
      <p>Break your application into smaller chunks using dynamic imports and React.lazy(). This reduces the initial bundle size and improves loading times.</p>
      
      <h2>4. Virtual Scrolling</h2>
      <p>For large lists, implement virtual scrolling to render only visible items. This dramatically improves performance when dealing with thousands of items.</p>
      
      <h2>5. Bundle Analysis</h2>
      <p>Regularly analyze your bundle using tools like webpack-bundle-analyzer to identify and eliminate unnecessary dependencies.</p>
      
      <p>By implementing these techniques, you can significantly improve your React application's performance and provide a better user experience.</p>
    `,
    date: "2024-03-10",
    readTime: "8 min read",
    category: "React",
    image: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
    author: "Venu Frontend Developer"
  };

  const recentBlogs = [
    {
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.",
      date: "2024-03-15",
      readTime: "5 min read",
      category: "CSS",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png"
    },
    {
      title: "TypeScript Best Practices in 2024",
      excerpt: "Explore the latest TypeScript features and best practices for robust code.",
      date: "2024-03-05",
      readTime: "6 min read",
      category: "TypeScript",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png"
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      const comment = {
        id: comments.length + 1,
        author: commentAuthor,
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        avatar: ""
      };
      setComments([...comments, comment]);
      setNewComment("");
      setCommentAuthor("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </motion.div>

            {/* Article Header */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <header className="mb-8">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {blogPost.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(blogPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogPost.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPost.author}
                  </div>
                </div>

                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-elegant mb-8"
                />
              </header>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none mb-8 text-foreground"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Article Actions */}
              <div className="flex items-center justify-between py-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={handleLike}
                    className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likes} likes</span>
                  </Button>
                  <ShareButton
                    url={window.location.href}
                    title={blogPost.title}
                    description="Check out this amazing article!"
                    variant="ghost"
                    className="flex items-center gap-2 text-muted-foreground"
                  />
                </div>
              </div>
            </motion.article>

            {/* Comments Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-card rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Your name"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    required
                  />
                </div>
                <Textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                  rows={4}
                  required
                />
                <Button type="submit" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Post Comment
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-card rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{comment.author}</h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground ml-11">{comment.content}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Recent Blogs */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-display font-bold mb-6">Recent Articles</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {recentBlogs.map((post, index) => (
                  <BlogCard
                    key={index}
                    post={post}
                    onReadMore={() => {/* Navigate to blog detail */}}
                  />
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
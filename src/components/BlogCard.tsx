import React from "react";
import { Calendar, Clock, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ShareButton from "@/components/ShareButton";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  id?: string;
  likes?: number;
  isLiked?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (post: BlogPost) => void;
  onLike?: (postId: string) => void;
  className?: string;
}

const BlogCard = ({ post, onReadMore, onLike, className = "" }: BlogCardProps) => {
  return (
    <motion.article 
      className={`bg-card rounded-2xl shadow-elegant overflow-hidden hover:shadow-elegant-hover transition-all duration-300 ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className="text-xl font-display font-bold mb-3 hover:text-primary transition-colors duration-300 cursor-pointer">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            className="group"
            onClick={() => onReadMore?.(post)}
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <div className="flex items-center gap-2">
            {post.likes !== undefined && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                onClick={() => onLike?.(post.id || '')}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{post.likes}</span>
              </Button>
            )}
            <ShareButton
              url={`/blog/${post.id}`}
              title={post.title}
              description={post.excerpt}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
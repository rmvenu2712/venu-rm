import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share2, MessageCircle, Facebook, Linkedin, Twitter, Link, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
}

const ShareButton = ({ 
  url, 
  title, 
  description = "", 
  className = "",
  variant = "ghost",
  size = "sm"
}: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ensure we have a full URL for sharing
  const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
  const shareUrl = encodeURIComponent(fullUrl);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
      color: "text-green-600"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTitle}`,
      color: "text-blue-600"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${shareTitle}&summary=${shareDescription}`,
      color: "text-blue-700"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      color: "text-blue-400"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${shareTitle}&body=${shareDescription}%20${shareUrl}`,
      color: "text-gray-600"
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard."
      });
      setIsOpen(false);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={`text-muted-foreground ${className}`}>
          <Share2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <DropdownMenuItem
              key={link.name}
              onClick={() => handleShare(link.url)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IconComponent className={`w-4 h-4 ${link.color}`} />
              Share on {link.name}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          onClick={copyToClipboard}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Link className="w-4 h-4 text-gray-600" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
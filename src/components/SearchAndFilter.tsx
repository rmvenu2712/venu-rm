import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  availableCategories: string[];
  placeholder?: string;
}

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  availableCategories,
  placeholder = "Search..."
}: SearchAndFilterProps) => {
  const clearFilters = () => {
    onSearchChange("");
    selectedCategories.forEach(category => onCategoryToggle(category));
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0;

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 bg-card border-border focus:border-primary transition-colors duration-300"
        />
      </div>

      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Categories
            {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedCategories.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {availableCategories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryToggle(category)}
              className="flex items-center justify-between cursor-pointer"
            >
              <span>{category}</span>
              {selectedCategories.includes(category) && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
          Clear
        </Button>
      )}
    </motion.div>
  );
};

export default SearchAndFilter;
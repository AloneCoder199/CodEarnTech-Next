'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, Clock, Eye, Heart, ArrowRight, TrendingUp,
  Calendar, User, ChevronDown, X, Bookmark, Share2
} from 'lucide-react';
import { blogPosts, categories, getFeaturedPosts, getTrendingPosts } from '@/lib/blogData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubscriptionForm } from '@/components/subscription-form';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const featuredPosts = getFeaturedPosts();
  const trendingPosts = getTrendingPosts();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4" variant="secondary">
              <TrendingUp className="w-3 h-3 mr-1" />
              {blogPosts.length}+ Articles
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Insights for Modern
              <span className="text-primary"> Developers</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deep dives into SaaS architecture, frontend engineering, AI tools, and design systems. 
              Written by engineers, for engineers.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'}`} />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 shadow-lg"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post (Only show when no search/filter) */}
      {!searchQuery && selectedCategory === 'All' && featuredPosts[0] && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-sm font-semibold uppercase tracking-wider">Featured</h2>
            </div>
            
            <Link href={`/blogs/${featuredPosts[0].slug}`}>
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative grid lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden border hover:border-primary/20 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
                  <Image
                    src={featuredPosts[0].coverImage}
                    alt={featuredPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                
                <div className="p-8 lg:py-12 lg:pr-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary">{featuredPosts[0].category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPosts[0].readTime} min read
                    </span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredPosts[0].title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <Image
                        src={featuredPosts[0].author.avatar}
                        alt={featuredPosts[0].author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{featuredPosts[0].author.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(featuredPosts[0].publishedAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {formatNumber(featuredPosts[0].views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {formatNumber(featuredPosts[0].likes)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results (${filteredPosts.length})` : 
               selectedCategory !== 'All' ? `${selectedCategory} Articles` : 
               'Latest Articles'}
            </h2>
            
            {!searchQuery && selectedCategory === 'All' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Sorted by trending</span>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/blogs/${post.slug}`}>
                    <div className="group h-full bg-card rounded-xl overflow-hidden border hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-full bg-white/90 hover:bg-white text-foreground shadow-lg transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-full bg-white/90 hover:bg-white text-foreground shadow-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>

                        {post.trending && (
                          <Badge className="absolute top-3 left-3 bg-orange-500/90 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min
                          </span>
                        </div>

                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={28}
                              height={28}
                              className="rounded-full"
                            />
                            <span className="text-xs font-medium">{post.author.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {formatNumber(post.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {formatNumber(post.likes)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or category filter
              </p>
              <Button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}>
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get the latest articles, tutorials, and insights delivered straight to your inbox. 
            No spam, unsubscribe anytime.
          </p>
          
          <>
          <SubscriptionForm/>
          </>
          
          <p className="text-xs text-muted-foreground mt-4">
            Join 5,000+ developers. Weekly updates, no spam.
          </p>
        </div>
      </section>
    </div>
  );
}
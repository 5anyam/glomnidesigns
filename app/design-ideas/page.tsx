"use client"
import { useState, useEffect } from 'react';
import { Search, Grid, List, Heart, MapPin, Eye, Calculator, Star, Filter, SlidersHorizontal, Sparkles, TrendingUp, Award } from 'lucide-react';
import { designAPI, categoryAPI, Design, Category } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function NewDesignIdeasPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedDesigns, setLikedDesigns] = useState<Set<number>>(new Set());

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  // Filter designs when data changes
  useEffect(() => {
    applyFilters();
  }, [designs, searchTerm, selectedCategory]);

  const loadData = async () => {
    setLoading(true);
    
    // Load designs and categories
    const [designsResult, categoriesResult] = await Promise.all([
      designAPI.getAll(),
      categoryAPI.getAll()
    ]);

    if (designsResult.success) {
      setDesigns(designsResult.data);
      console.log('✅ Loaded designs:', designsResult.data.length);
    }

    if (categoriesResult.success) {
      setCategories(categoriesResult.data);
      console.log('✅ Loaded categories:', categoriesResult.data.length);
    }

    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...designs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(design =>
        design.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(design =>
        design.categories?.some(cat => cat.slug === selectedCategory)
      );
    }

    setFilteredDesigns(filtered);
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${imageUrl}`;
  };

  const toggleLike = (designId: number) => {
    const newLiked = new Set(likedDesigns);
    if (newLiked.has(designId)) {
      newLiked.delete(designId);
    } else {
      newLiked.add(designId);
    }
    setLikedDesigns(newLiked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-blue-500/10 rounded-full"></div>
          </div>
          <p className="text-gray-400 mt-4 font-medium">Loading premium designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Premium Collection</span>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Stunning Interior Designs
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Discover {filteredDesigns.length} carefully curated designs crafted by expert designers
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">500+</h3>
              <p className="text-gray-400">Premium Designs</p>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">98%</h3>
              <p className="text-gray-400">Satisfaction Rate</p>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1000+</h3>
              <p className="text-gray-400">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search designs, styles, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-white min-w-48 appearance-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-black rounded-xl p-1 border border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No designs found</h3>
            <p className="text-gray-400 text-lg mb-8">Try adjusting your search criteria or browse all categories</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {searchTerm || selectedCategory !== 'all' ? 'Filtered Results' : 'All Designs'}
                </h2>
                <p className="text-gray-400">
                  Showing {filteredDesigns.length} of {designs.length} designs
                </p>
              </div>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-all duration-300"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
              : 'space-y-6'
            }>
              {filteredDesigns.map(design => (
                <DesignCard 
                  key={design.id} 
                  design={design} 
                  viewMode={viewMode} 
                  getImageUrl={getImageUrl}
                  isLiked={likedDesigns.has(design.id)}
                  onToggleLike={() => toggleLike(design.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Enhanced Design Card Component
function DesignCard({ 
  design, 
  viewMode, 
  getImageUrl,
  isLiked,
  onToggleLike
}: { 
  design: Design; 
  viewMode: 'grid' | 'list'; 
  getImageUrl: (url: string) => string;
  isLiked: boolean;
  onToggleLike: () => void;
}) {
  const imageUrl = design.featured_image?.url || design.images?.[0]?.url || '';

  // Function to truncate description to word limit
  const getTruncatedDescription = (text: string, wordLimit: number = 35) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800/60 overflow-hidden hover:border-gray-600/80 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <div className="flex">
          <div className="relative w-80 h-72 bg-gray-800 flex-shrink-0 overflow-hidden">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={design.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <Eye className="w-16 h-16 text-gray-600" />
              </div>
            )}
            
            {/* Categories on Image - Top Left */}
            {design.categories && design.categories.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {design.categories.slice(0, 2).map(cat => (
                  <span 
                    key={cat.id} 
                    className="px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20 shadow-lg"
                  >
                    {cat.name}
                  </span>
                ))}
                {design.categories.length > 2 && (
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-gray-300 text-xs rounded-full border border-white/10">
                    +{design.categories.length - 2} more
                  </span>
                )}
              </div>
            )}

            {/* Featured Badge - Top Right */}
            {design.is_featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl border border-yellow-400/30">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
          
          <div className="flex-1 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                  {design.name}
                </h3>
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                  {design.location && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <MapPin className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="font-medium">{design.location}</span>
                    </div>
                  )}
                  {design.area_size && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                        <SlidersHorizontal className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="font-medium">{design.area_size} sq ft</span>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={onToggleLike}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-400 scale-110 border border-red-500/30' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-red-400 border border-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Description for List View */}
            <p className="text-gray-300 mb-6 leading-relaxed text-base">
              {getTruncatedDescription(design.description) || 'A beautiful interior design crafted with premium materials and expert attention to detail for your perfect space.'}
            </p>
            
            <div className="flex items-center justify-between">
              {design.price_range && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 mb-1">Starting from</span>
                  <div className="text-2xl font-bold text-green-400">{design.price_range}</div>
                </div>
              )}
              
              <div className="flex gap-3">
                <Link href={`/design-ideas/${design.slug}`}>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </Link>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  <Calculator className="w-4 h-4" />
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-800/60 overflow-hidden hover:border-gray-600/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {imageUrl ? (
          <Image
            src={getImageUrl(imageUrl)}
            alt={design.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Eye className="w-16 h-16 text-gray-600" />
          </div>
        )}
        
        {/* Categories on Image - Top Left */}
        {design.categories && design.categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {design.categories.slice(0, 2).map(cat => (
              <span 
                key={cat.id} 
                className="px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20 shadow-lg hover:bg-black/90 transition-all duration-300"
              >
                {cat.name}
              </span>
            ))}
            {design.categories.length > 2 && (
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-gray-300 text-xs rounded-full border border-white/10">
                +{design.categories.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Featured Badge - Top Right of Image */}
        {design.is_featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl border border-yellow-400/30 animate-pulse">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        
        {/* Like Button - Bottom Right of Image */}
        <button 
          onClick={onToggleLike}
          className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-300 shadow-lg ${
            isLiked 
              ? 'bg-red-500/90 text-white scale-110 shadow-red-500/25' 
              : 'bg-black/60 backdrop-blur-md text-gray-300 hover:text-red-400 hover:bg-red-500/20 border border-white/10'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-white text-xl mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
          {design.name}
        </h3>

        {/* Description for Grid View */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {getTruncatedDescription(design.description) || 'Premium interior design featuring modern aesthetics with carefully selected materials and expert craftsmanship for exceptional living spaces.'}
        </p>
        
        {/* Location and Area Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm">
            {design.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-blue-400" />
                </div>
                <span>{design.location}</span>
              </div>
            )}
            {design.area_size && (
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 bg-green-500/20 rounded-md flex items-center justify-center">
                  <SlidersHorizontal className="w-3 h-3 text-green-400" />
                </div>
                <span>{design.area_size} sq ft</span>
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        {design.price_range && (
          <div className="mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-gray-400">Starting from</span>
              <div className="text-xl font-bold text-green-400">{design.price_range}</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link href={`/design-ideas/${design.slug}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg">
              <Eye className="w-4 h-4" />
              View
            </button>
          </Link>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg">
            <Calculator className="w-4 h-4" />
            Quote
          </button>
        </div>
      </div>
    </div>
  );
}

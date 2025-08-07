"use client"
// pages/design-ideas.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, MapPin, Clock, Eye, Calculator, Star, X, Menu } from 'lucide-react';
import { designAPI, categoryAPI, Design, Category } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

const DesignIdeasPage = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const styles = ['modern', 'traditional', 'contemporary', 'minimalist', 'luxury'];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterDesigns();
  }, [designs, searchTerm, selectedCategory, selectedStyle]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [designsData, categoriesData] = await Promise.all([
        designAPI.getDesigns(),
        categoryAPI.getCategories(),
      ]);

      setDesigns(designsData.data || []);
      setCategories(categoriesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDesigns = () => {
    let filtered = designs;

    if (searchTerm) {
      filtered = filtered.filter(design =>
        design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(design =>
        design.categories?.some(cat => cat.slug === selectedCategory)
      );
    }

    if (selectedStyle !== 'all') {
      filtered = filtered.filter(design => design.style === selectedStyle);
    }

    setFilteredDesigns(filtered);
  };

  const toggleFavorite = (designId: number) => {
    setFavorites(prev =>
      prev.includes(designId)
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  const openQuoteModal = (design: Design) => {
    setSelectedDesign(design);
    setShowQuoteModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeQuoteModal = () => {
    setShowQuoteModal(false);
    setSelectedDesign(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">Loading premium designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* 📱 Mobile-Optimized Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex-1 min-w-0">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent leading-tight"
                >
                  Premium Designs
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-700 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg"
                >
                  Beautiful interior designs for your space
                </motion.p>
              </div>
              
              {/* 📱 Mobile View Toggle */}
              <div className="flex items-center justify-between sm:justify-end">
                <div className="flex items-center gap-1 bg-blue-100 dark:bg-gray-800 rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                        : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Grid size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                        : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <List size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 Mobile-Optimized Search and Filters */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-blue-200/30 dark:border-gray-700/50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          
          {/* Mobile Search Bar */}
          <div className="mb-4 lg:mb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-blue-400 dark:text-blue-500" />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-blue-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-blue-200 dark:border-gray-600 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 transition-all text-sm sm:text-base"
            >
              <Filter size={16} className="sm:w-5 sm:h-5" />
              <span>Filters</span>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            {/* Results Count - Mobile */}
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* 📱 Mobile Filters Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-blue-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white text-sm sm:text-base"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Style
                    </label>
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-blue-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white text-sm sm:text-base"
                    >
                      <option value="all">All Styles</option>
                      {styles.map(style => (
                        <option key={style} value={style}>
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedStyle('all');
                      setSearchTerm('');
                    }}
                    className="w-full mt-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base font-medium"
                  >
                    Clear All Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 📱 Mobile-Optimized Designs Grid/List */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {filteredDesigns.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-blue-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">No designs found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">Try adjusting your search or filters to discover more designs</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
                : 'space-y-4 sm:space-y-6 lg:space-y-8'
            }
          >
            {filteredDesigns.map((design, index) => (
              <MobileFriendlyDesignCard
                key={design.id}
                design={design}
                viewMode={viewMode}
                isFavorite={favorites.includes(design.id)}
                onToggleFavorite={() => toggleFavorite(design.id)}
                onGetQuote={() => openQuoteModal(design)}
                getImageUrl={getImageUrl}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* 📱 Mobile-Optimized Quote Modal */}
      <MobileQuoteModal
        isOpen={showQuoteModal}
        onClose={closeQuoteModal}
        design={selectedDesign}
      />
    </div>
  );
};

// 📱 Mobile-Friendly Design Card Component
interface MobileFriendlyDesignCardProps {
  design: Design;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onGetQuote: () => void;
  getImageUrl: (url: string) => string;
  index: number;
}

const MobileFriendlyDesignCard: React.FC<MobileFriendlyDesignCardProps> = ({
  design,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onGetQuote,
  getImageUrl,
  index
}) => {
  const imageUrl = design.featured_image?.url || design.images?.[0]?.url;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-64 md:w-80 lg:w-96 h-48 sm:h-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={design.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <p className="text-xs sm:text-sm">No Image Available</p>
                </div>
              </div>
            )}
            
            {/* Mobile-Optimized Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite();
              }}
              className="absolute top-3 right-3 p-2 sm:p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg touch-manipulation"
            >
              <Heart
                size={16}
                className={`sm:w-5 sm:h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`}
              />
            </button>

            {/* Premium Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 sm:gap-2">
              {design.is_featured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  <Star size={8} className="inline mr-1 sm:w-3 sm:h-3" />
                  <span className="text-xs">Featured</span>
                </div>
              )}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                Premium
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {design.title}
              </h3>
              
              {/* Name Field */}
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-2 sm:mb-3">
                by Glomni Designs Team
              </p>
              
              {design.categories && design.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                  {design.categories.slice(0, 3).map(category => (
                    <span
                      key={category.id}
                      className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm rounded-full font-medium"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {design.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base lg:text-lg leading-relaxed">
                {design.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm">
              {design.location && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin size={14} className="sm:w-4 sm:h-4" />
                  <span className="font-medium">{design.location}</span>
                </div>
              )}
              {design.area_size && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">{design.area_size} sq ft</span>
                </div>
              )}
              {design.completion_time && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock size={14} className="sm:w-4 sm:h-4" />
                  <span className="font-medium">{design.completion_time}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              {design.price_range && (
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                  {design.price_range}
                </div>
              )}
              
              {/* Mobile-Optimized Action Buttons */}
              <div className="flex w-full sm:w-auto gap-2 sm:gap-3">
                <Link
                  href={`/design-ideas/${design.slug}`}
                  className="flex-1 sm:flex-none"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg touch-manipulation"
                  >
                    <Eye size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">View Design</span>
                    <span className="sm:hidden">View</span>
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGetQuote}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg touch-manipulation"
                >
                  <Calculator size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Get Estimate</span>
                  <span className="sm:hidden">Quote</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-blue-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        {imageUrl ? (
          <Image
            src={getImageUrl(imageUrl)}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <Eye className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
              <p className="text-xs sm:text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Mobile-Optimized Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg touch-manipulation"
        >
          <Heart
            size={14}
            className={`sm:w-4 sm:h-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`}
          />
        </button>

        {/* Premium Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
          {design.is_featured && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-lg">
              <Star size={8} className="inline mr-1 sm:w-2.5 sm:h-2.5" />
              <span className="text-xs">Featured</span>
            </div>
          )}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-lg">
            Premium
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="mb-3 sm:mb-4">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {design.title}
          </h3>
          
          {/* Name Field */}
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-2 sm:mb-3">
            by Glomni Designs Team
          </p>
          
          {design.categories && design.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {design.categories.slice(0, 2).map(category => (
                <span
                  key={category.id}
                  className="px-2 py-0.5 sm:py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
          {design.location && (
            <div className="flex items-center gap-1">
              <MapPin size={10} className="sm:w-3 sm:h-3" />
              <span className="font-medium truncate">{design.location}</span>
            </div>
          )}
          {design.area_size && (
            <span className="font-medium">• {design.area_size} sq ft</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-4">
          {design.price_range ? (
            <div className="text-sm sm:text-base lg:text-lg font-bold text-green-600 dark:text-green-400">
              {design.price_range}
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Contact for Price</div>
          )}
        </div>

        {/* Mobile-Optimized Action Buttons */}
        <div className="flex gap-2">
          <Link 
            href={`/design-ideas/${design.slug}`}
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 font-semibold text-xs sm:text-sm shadow-md touch-manipulation"
            >
              <Eye size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">View Design</span>
              <span className="sm:hidden">View</span>
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetQuote}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-200 font-semibold text-xs sm:text-sm shadow-md touch-manipulation"
          >
            <Calculator size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Get Estimate</span>
            <span className="sm:hidden">Quote</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// 📱 Mobile-Optimized Quote Modal Component
interface MobileQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: Design | null;
}

const MobileQuoteModal: React.FC<MobileQuoteModalProps> = ({ isOpen, onClose, design }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    message: design ? `I'm interested in getting an estimate for the "${design.title}" design. Please provide detailed pricing and consultation.` : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Mobile estimate request submitted:', formData);
    alert('Thank you! Our design expert will contact you within 24 hours with a detailed estimate.');
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      budget: '',
      timeline: '',
      message: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-800 w-full sm:w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto sm:rounded-3xl shadow-2xl border-0 sm:border border-blue-200 dark:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Get Premium Estimate</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">Professional consultation for your dream design</p>
              {design && (
                <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mt-1 font-medium truncate">For: {design.title}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
            >
              <X size={20} className="text-gray-400 dark:text-gray-500 sm:w-6 sm:h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                >
                  <option value="">Select budget range</option>
                  <option value="1-3 Lakhs">₹1-3 Lakhs</option>
                  <option value="3-5 Lakhs">₹3-5 Lakhs</option>
                  <option value="5-10 Lakhs">₹5-10 Lakhs</option>
                  <option value="10-20 Lakhs">₹10-20 Lakhs</option>
                  <option value="20+ Lakhs">₹20+ Lakhs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                >
                  <option value="">Select timeline</option>
                  <option value="Immediate">Within 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Requirements
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 sm:px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                placeholder="Tell us about your dream space, specific requirements, or any questions..."
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 sm:px-6 py-3 border border-blue-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors font-semibold text-base touch-manipulation"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all font-semibold shadow-lg flex items-center justify-center gap-2 text-base touch-manipulation"
              >
                <Calculator size={18} />
                Request Premium Estimate
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DesignIdeasPage;

"use client"
// pages/design-ideas.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, MapPin, Clock } from 'lucide-react';
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

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(design =>
        design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

    // Style filter
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

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Design Ideas
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover beautiful interior designs for your space
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search designs, locations, styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter size={20} />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Styles</option>
                {styles.map(style => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-4 pt-4 border-t"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Styles</option>
                    {styles.map(style => (
                      <option key={style} value={style}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-gray-600">
          Showing {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Designs Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No designs found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }
          >
            {filteredDesigns.map((design, index) => (
              <DesignCard
                key={design.id}
                design={design}
                viewMode={viewMode}
                isFavorite={favorites.includes(design.id)}
                onToggleFavorite={() => toggleFavorite(design.id)}
                getImageUrl={getImageUrl}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Design Card Component
interface DesignCardProps {
  design: Design;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: () => void;
  getImageUrl: (url: string) => string;
  index: number;
}

const DesignCard: React.FC<DesignCardProps> = ({
  design,
  viewMode,
  isFavorite,
  onToggleFavorite,
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
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-80 h-48 sm:h-auto bg-gray-100">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={design.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            
            {/* Favorite Button */}
            <button
              onClick={onToggleFavorite}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <Heart
                size={18}
                className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}
              />
            </button>

            {/* Featured Badge */}
            {design.is_featured && (
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {design.title}
                </h3>
                {design.categories && design.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {design.categories.map(category => (
                      <span
                        key={category.id}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {design.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {design.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              {design.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {design.location}
                </div>
              )}
              {design.area_size && (
                <div className="flex items-center gap-1">
                  <span>{design.area_size} sq ft</span>
                </div>
              )}
              {design.completion_time && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {design.completion_time}
                </div>
              )}
            </div> 
              <Link
                href={`/design-ideas/${design.slug}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
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
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {imageUrl ? (
          <Image
            src={getImageUrl(imageUrl)}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <Heart
            size={16}
            className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}
          />
        </button>

        {/* Featured Badge */}
        {design.is_featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
            {design.title}
          </h3>
          {design.categories && design.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {design.categories.slice(0, 2).map(category => (
                <span
                  key={category.id}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          {design.location && (
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              {design.location}
            </div>
          )}
          {design.area_size && (
            <span>• {design.area_size} sq ft</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          {design.price_range ? (
            <div className="text-sm font-semibold text-green-600">
              {design.price_range}
            </div>
          ) : (
            <div></div>
          )}
          
          <Link
            href={`/design-ideas/${design.slug}`}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DesignIdeasPage;

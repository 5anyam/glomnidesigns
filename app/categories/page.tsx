"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, ArrowRight, Home, Palette, Tag, Plus, Grid, List } from 'lucide-react';
import { categoryAPI, Category } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [categories, searchTerm, selectedType]);

  const loadCategories = async () => {
    setLoading(true);
    setError('');

    const result = await categoryAPI.getAll();
    
    if (result.success) {
      setCategories(result.data);
      console.log('✅ Loaded categories:', result.data.length);
    } else {
      setError(result.error || 'Failed to load categories');
    }

    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...categories];

    // Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(category => 
        category.name?.toLowerCase().includes(query) ||
        category.description?.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(category => category.type === selectedType);
    }

    setFilteredCategories(filtered);
  };

  const getImageUrl = (url: string) => {
    if (!url) return '/placeholder-category.jpg';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${url}`;
  };

  const categoryTypes = [
    { id: 'all', name: 'All Categories', icon: '🏠' },
    { id: 'home_interior', name: 'Home Interior', icon: '🏡' },
    { id: 'office_interior', name: 'Office Interior', icon: '🏢' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-6"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Categories</h3>
          <p className="text-gray-600">Fetching design categories from Strapi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Tag className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Categories Unavailable</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={loadCategories}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Design Categories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Explore {categories.length} expertly crafted interior design categories to find inspiration for your perfect space
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="flex-1 relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-48"
              >
                {categoryTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-700 font-medium">
              Showing <span className="font-bold text-blue-600">{filteredCategories.length}</span> categor{filteredCategories.length !== 1 ? 'ies' : 'y'}
            </p>
            
            {(searchTerm || selectedType !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Display */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Categories Found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search or filters to find more categories</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
            : 'space-y-6'
          }>
            {filteredCategories.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                viewMode={viewMode}
                getImageUrl={getImageUrl}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Category Card Component
interface CategoryCardProps {
  category: Category;
  viewMode: 'grid' | 'list';
  getImageUrl: (url: string) => string;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  viewMode, 
  getImageUrl, 
  index 
}) => {
  const imageUrl = category.image?.url || '';
  const categoryName = category.name || `Category ${category.id}`;
  const categoryDescription = category.description || 'Beautiful interior design category';

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        <div className="flex">
          {/* Image */}
          <div className="relative w-64 h-48 bg-gray-100 flex-shrink-0">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={categoryName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Palette className="w-16 h-16 text-gray-300" />
              </div>
            )}
            
            {/* Type Badge */}
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              {category.type === 'home_interior' ? 'Home' : 
               category.type === 'office_interior' ? 'Office' : 'General'}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {categoryName}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {categoryDescription}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Tag className="w-4 h-4" />
                <span>Design Category</span>
              </div>
              
              <Link href={`/design-ideas?category=${category.slug}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg"
                >
                  Explore Designs
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
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
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {imageUrl ? (
          <Image
            src={getImageUrl(imageUrl)}
            alt={categoryName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Palette className="w-16 h-16 text-gray-300" />
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          {category.type === 'home_interior' ? '🏡 Home' : 
           category.type === 'office_interior' ? '🏢 Office' : '🎨 General'}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 p-4 rounded-full shadow-lg">
              <Eye size={24} className="text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {categoryName}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {categoryDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Tag className="w-4 h-4" />
            <span>Design Category</span>
          </div>
          
          <Link href={`/design-ideas?category=${category.slug}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md"
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

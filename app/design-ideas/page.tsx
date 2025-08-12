"use client"
import { useState, useEffect } from 'react';
import { Search, Grid, List, Heart, MapPin, Eye, Calculator, Star } from 'lucide-react';
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
        design.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-600">Loading designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Premium Designs</h1>
          <p className="text-white text-lg">
            Found {filteredDesigns.length} beautiful designs for your space
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-black border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-w-48"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex bg-black rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black shadow' : ''}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-black shadow' : ''}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No designs found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-6'
          }>
            {filteredDesigns.map(design => (
              <DesignCard 
                key={design.id} 
                design={design} 
                viewMode={viewMode} 
                getImageUrl={getImageUrl} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Design Card Component
function DesignCard({ 
  design, 
  viewMode, 
  getImageUrl 
}: { 
  design: Design; 
  viewMode: 'grid' | 'list'; 
  getImageUrl: (url: string) => string; 
}) {
  const imageUrl = design.featured_image?.url || design.images?.[0]?.url || '';

  if (viewMode === 'list') {
    return (
      <div className="bg-black rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-64 h-48 bg-black flex-shrink-0">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={design.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Eye className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{design.title}</h3>
            {design.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">{design.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              {design.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {design.location}
                </div>
              )}
              {design.area_size && <span>{design.area_size} sq ft</span>}
            </div>
            <div className="flex items-center justify-between">
              {design.price_range && (
                <div className="text-lg font-bold text-green-600">{design.price_range}</div>
              )}
              <div className="flex gap-2">
                <Link href={`/design-ideas/${design.slug}`}>
                  <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </Link>
                <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Calculator className="w-4 h-4" />
                  Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] bg-gray-200">
        {imageUrl ? (
          <Image
            src={getImageUrl(imageUrl)}
            alt={design.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
        )}
        {design.is_featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-black rounded-full">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-white mb-2 line-clamp-2">{design.title}</h3>
        
        {design.categories && design.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {design.categories.slice(0, 2).map(cat => (
              <span key={cat.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {cat.name}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          {design.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {design.location}
            </div>
          )}
          {design.area_size && <span>{design.area_size} sq ft</span>}
        </div>

        {design.price_range && (
          <div className="text-lg font-bold text-green-600 mb-4">{design.price_range}</div>
        )}

        <div className="flex gap-2">
          <Link href={`/design-ideas/${design.slug}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              <Eye className="w-4 h-4" />
              View
            </button>
          </Link>
          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            <Calculator className="w-4 h-4" />
            Quote
          </button>
        </div>
      </div>
    </div>
  );
}

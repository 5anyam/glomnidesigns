
"use client"
import { useState, useEffect } from 'react';
import { Search, Grid, List, Heart, MapPin, Eye, Calculator, Star, Filter, SlidersHorizontal, Sparkles, TrendingUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [designs, searchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const loadData = async () => {
    setLoading(true);
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

  const applyFiltersAndSort = () => {
    let filtered = [...designs];

    if (searchTerm) {
      filtered = filtered.filter(design =>
        design.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(design =>
        design.categories?.some(cat => cat.slug === selectedCategory)
      );
    }

    filtered.sort((a, b) => {
      const getDateFromDesign = (design: Design): number => {
        const designRecord = design as unknown as Record<string, unknown>;
        const possibleDateFields = [
          'createdAt', 'created_at', 'updatedAt', 'updated_at', 
          'publishedAt', 'published_at', 'date', 'timestamp'
        ];

        for (const field of possibleDateFields) {
          const dateValue = designRecord[field];
          if (dateValue) {
            const date = new Date(dateValue as string | number | Date);
            if (!isNaN(date.getTime())) {
              return date.getTime();
            }
          }
        }
        return design.id || 0;
      };

      return getDateFromDesign(b) - getDateFromDesign(a);
    });

    setFilteredDesigns(filtered);
  };

  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDesigns = filteredDesigns.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-16 h-16 border-4 border-red-400/20 border-t-red-400 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-red-400/10 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">Loading premium designs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-4">
          <div className="text-center mb-6 md:mb-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Designs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              Discover {filteredDesigns.length} carefully curated designs sorted by newest first
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-2">
          <div className="flex flex-col gap-4 items-stretch md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80 lg:w-96">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search designs, styles, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
              />
            </div>

            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              {/* Category Filter */}
              <div className="relative flex-1 md:flex-none">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-400 text-gray-900 dark:text-white min-w-[140px] md:min-w-48 appearance-none cursor-pointer text-sm md:text-base transition-colors"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-white dark:bg-gray-950 rounded-xl p-1 border border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 md:p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-red-400 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Grid className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 md:p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-red-400 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <List className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-16 md:py-20">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border-2 border-gray-200 dark:border-gray-800">
              <Search className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">No designs found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 md:mb-8 px-4">Try adjusting your search criteria or browse all categories</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
              className="px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {searchTerm || selectedCategory !== 'all' ? 'Filtered Results' : 'Latest Designs'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredDesigns.length)} of {filteredDesigns.length} designs
                  {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                </p>
              </div>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-700 transition-all duration-300 text-sm self-start sm:self-auto"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6' 
              : 'space-y-6'
            }>
              {currentDesigns.map(design => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-8">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNumber: number;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === pageNumber
                              ? 'bg-red-400 text-white shadow-lg'
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages} • {filteredDesigns.length} total designs
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

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
  const imageUrl = design.featured_image?.url || 
                   (design.images && design.images.length > 0 ? design.images[0]?.url : '') || 
                   '';

  const getTruncatedDescription = (text: string | undefined, wordLimit: number = 20): string => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/design-ideas/${design.slug}`} className="block">
        <div className="group bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-400 dark:hover:border-red-400 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl cursor-pointer">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-80 h-64 md:h-72 bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
              {imageUrl ? (
                <Image
                  src={getImageUrl(imageUrl)}
                  alt={design.name || 'Design'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Eye className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                </div>
              )}

              {design.categories && design.categories.length > 0 && (
                <div className="absolute top-3 md:top-4 left-3 md:left-4 flex flex-col gap-1 md:gap-2">
                  {design.categories.slice(0, 2).map(cat => (
                    <span 
                      key={cat.id} 
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-700 shadow-lg"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}

              {design.is_featured && (
                <div className="absolute top-3 md:top-4 right-3 md:right-4 flex items-center gap-1 bg-red-400 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold shadow-xl">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </div>
              )}
            </div>

            <div className="flex-1 p-4 md:p-8">
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 group-hover:text-red-400 transition-colors leading-tight">
                    {design.name || 'Untitled Design'}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    {design.location && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-red-400/10 rounded-lg flex items-center justify-center border border-red-400/30">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                        </div>
                        <span className="font-medium">{design.location}</span>
                      </div>
                    )}
                    {design.area_size && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/30">
                          <SlidersHorizontal className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                        </div>
                        <span className="font-medium">{design.area_size} sq ft</span>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={(e) => handleButtonClick(e, onToggleLike)}
                  className={`p-2 md:p-3 rounded-full transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-400 text-white scale-110' 
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-red-400 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                {getTruncatedDescription(design.description, 35) || 'A beautiful interior design crafted with premium materials and expert attention to detail for your perfect space.'}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {design.price_range && (
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Starting from</span>
                    <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{design.price_range}</div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={(e) => handleButtonClick(e, () => {})}
                    className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button 
                    onClick={(e) => handleButtonClick(e, () => {})}
                    className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Calculator className="w-4 h-4" />
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/design-ideas/${design.slug}`} className="block">
      <div className="group bg-white dark:bg-gray-900 backdrop-blur-sm rounded-xl lg:rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-400 dark:hover:border-red-400 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {imageUrl ? (
            <Image
              src={getImageUrl(imageUrl)}
              alt={design.name || 'Design'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Eye className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" />
            </div>
          )}

          {design.categories && design.categories.length > 0 && (
            <div className="absolute top-2 lg:top-3 left-2 lg:left-3 flex flex-col gap-1">
              {design.categories.slice(0, 1).map(cat => (
                <span 
                  key={cat.id} 
                  className="px-2 lg:px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-700 shadow-lg"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {design.is_featured && (
            <div className="absolute top-2 lg:top-3 right-2 lg:right-3 flex items-center gap-1 bg-red-400 text-white px-2 lg:px-3 py-1 rounded-full text-xs font-bold shadow-xl">
              <Star className="w-2.5 h-2.5 lg:w-3 lg:h-3 fill-current" />
              <span className="hidden sm:inline">Featured</span>
            </div>
          )}

          <button 
            onClick={(e) => handleButtonClick(e, onToggleLike)}
            className={`absolute bottom-2 lg:bottom-3 right-2 lg:right-3 p-1.5 lg:p-2 rounded-full transition-all duration-300 shadow-lg ${
              isLiked 
                ? 'bg-red-400 text-white scale-110' 
                : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Heart className={`w-3 h-3 lg:w-4 lg:h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-3 lg:p-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base mb-2 line-clamp-2 group-hover:text-red-400 transition-colors leading-tight">
            {design.name || 'Untitled Design'}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-3 line-clamp-2 leading-relaxed">
            {getTruncatedDescription(design.description, 15) || 'Premium interior design with modern aesthetics and expert craftsmanship.'}
          </p>

          <div className="flex items-center justify-between mb-3 text-xs lg:text-sm">
            {design.location && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <div className="w-4 h-4 lg:w-5 lg:h-5 bg-red-400/10 rounded flex items-center justify-center">
                  <MapPin className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-red-400" />
                </div>
                <span className="truncate">{design.location}</span>
              </div>
            )}
            {design.area_size && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <SlidersHorizontal className="w-3 h-3 text-green-500" />
                <span>{design.area_size} sq ft</span>
              </div>
            )}
          </div>

          {design.price_range && (
            <div className="mb-3">
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">From</span>
                <div className="text-sm lg:text-base font-bold text-green-600 dark:text-green-400">{design.price_range}</div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button 
              onClick={(e) => handleButtonClick(e, () => {})}
              className="flex-1 flex items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
              View
            </button>
            <button 
              onClick={(e) => handleButtonClick(e, () => {})}
              className="flex-1 flex items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Calculator className="w-3 h-3 lg:w-4 lg:h-4" />
              Quote
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Search, Grid, List, Heart, MapPin, Eye, Calculator, Star, Sparkles, TrendingUp, Award, ArrowLeft } from 'lucide-react';
import { designAPI, categoryAPI, Design, Category } from '../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedDesigns, setLikedDesigns] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (slug) {
      loadCategoryData();
    }
  }, [slug]);

  useEffect(() => {
    applyFilters();
  }, [designs, searchTerm]);

  const loadCategoryData = async () => {
    setLoading(true);
    setError('');

    try {
      const categoriesResult = await categoryAPI.getAll();
      if (categoriesResult.success) {
        setAllCategories(categoriesResult.data);
      }

      const designsResult = await designAPI.getByCategory(slug);
      if (designsResult.success && designsResult.data.length > 0) {
        setDesigns(designsResult.data);
        
        const firstDesign = designsResult.data[0];
        const currentCategory = firstDesign.categories?.find((cat: Category) => cat.slug === slug);
        if (currentCategory) {
          setCategory(currentCategory);
        }
      } else {
        const categoryResult = await categoryAPI.getBySlug(slug);
        if (categoryResult.success) {
          setCategory(categoryResult.data);
        } else {
          setError('Category not found');
        }
      }
    } catch (err) {
      console.error('Error loading category data:', err);
      setError('Failed to load category data');
    }

    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...designs];

    if (searchTerm) {
      filtered = filtered.filter(design =>
        design.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.location?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-16 h-16 border-4 border-red-400/20 border-t-red-400 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-red-400/10 rounded-full"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">Loading category designs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center border border-red-200 dark:border-red-800">
            <Search className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">The category you're looking for doesn't exist or has no designs.</p>
          <Link 
            href="/design-ideas" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Designs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          </div>

          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              <span className="text-red-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                {category?.name || 'Category'} Collection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {category?.name || 'Category'} Designs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              {category?.description || `Discover ${filteredDesigns.length} stunning ${category?.name || 'category'} designs crafted by expert designers`}
            </p>
          </div>

          {/* Category Navigation */}
          {allCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Link href="/design-ideas">
                <span className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  All Categories
                </span>
              </Link>
              {allCategories.slice(0, 6).map((cat: Category) => (
                <Link key={cat.id} href={`/category/${cat.slug}`}>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    cat.slug === slug 
                      ? 'bg-red-400 text-white border-red-400' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}>
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 dark:bg-red-950/20 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3 border border-red-200 dark:border-red-800">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">{filteredDesigns.length}+</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Available Designs</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3 border border-green-200 dark:border-green-800">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">98%</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Satisfaction Rate</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3 border border-purple-200 dark:border-purple-800">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Expert</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Craftsmanship</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col gap-4 items-stretch md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80 lg:w-96">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder={`Search ${category?.name || 'category'} designs...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
              />
            </div>

            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 md:p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-red-400 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 md:p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-red-400 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
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
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-gray-200 dark:border-gray-700">
              <Search className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {searchTerm ? 'No matching designs found' : 'No designs available'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 md:mb-8 px-4">
              {searchTerm 
                ? `Try adjusting your search terms for ${category?.name || 'this category'} designs`
                : `${category?.name || 'This category'} designs will be available soon`
              }
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 mr-4"
              >
                Clear Search
              </button>
            )}
            <Link href="/design-ideas">
              <button className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all duration-300">
                Browse All Designs
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {searchTerm ? 'Search Results' : `${category?.name || 'Category'} Designs`}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Showing {filteredDesigns.length} of {designs.length} designs
                </p>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 text-sm self-start sm:self-auto"
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Grid Layout */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6' 
              : 'space-y-6'
            }>
              {filteredDesigns.map((design: Design) => (
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

// Design Card Component
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

  const getTruncatedDescription = (text: string, wordLimit: number = 20) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-400 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-64 md:h-72 bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={design.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Eye className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
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
                  {design.name}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                  {design.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span className="font-medium">{design.location}</span>
                    </div>
                  )}
                  {design.area_size && (
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-green-400" />
                      <span className="font-medium">{design.area_size} sq ft</span>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={onToggleLike}
                className={`p-2 md:p-3 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-50 dark:bg-red-950/20 text-red-400 scale-110 border border-red-200 dark:border-red-800' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-red-400 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              {getTruncatedDescription(design.description, 35) || 'A beautiful interior design crafted with premium materials and expert attention to detail.'}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {design.price_range && (
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">Starting from</span>
                  <div className="text-xl md:text-2xl font-bold text-green-400">{design.price_range}</div>
                </div>
              )}
              
              <div className="flex gap-3">
                <Link href={`/design-ideas/${design.slug}`}>
                  <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </Link>
                <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-green-400 hover:bg-green-500 text-white rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg">
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
    <div className="group bg-white dark:bg-gray-900 rounded-xl lg:rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {imageUrl ? (
          <Image
            src={getImageUrl(imageUrl)}
            alt={design.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Eye className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" />
          </div>
        )}
        
        {design.is_featured && (
          <div className="absolute top-2 lg:top-3 right-2 lg:right-3 flex items-center gap-1 bg-red-400 text-white px-2 lg:px-3 py-1 rounded-full text-xs font-bold shadow-xl">
            <Star className="w-2.5 h-2.5 lg:w-3 lg:h-3 fill-current" />
            <span className="hidden sm:inline">Featured</span>
          </div>
        )}

        <button 
          onClick={onToggleLike}
          className={`absolute bottom-2 lg:bottom-3 right-2 lg:right-3 p-1.5 lg:p-2 rounded-full transition-all duration-300 shadow-lg ${
            isLiked 
              ? 'bg-red-400 text-white scale-110' 
              : 'bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 hover:text-red-400 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <Heart className={`w-3 h-3 lg:w-4 lg:h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-3 lg:p-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base mb-2 line-clamp-2 group-hover:text-red-400 transition-colors leading-tight">
          {design.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-3 line-clamp-2 leading-relaxed">
          {getTruncatedDescription(design.description, 15) || 'Premium interior design with modern aesthetics.'}
        </p>
        
        <div className="flex items-center justify-between mb-3 text-xs lg:text-sm">
          {design.location && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <MapPin className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-red-400" />
              <span className="truncate">{design.location}</span>
            </div>
          )}
          {design.area_size && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Calculator className="w-3 h-3 text-green-400" />
              <span>{design.area_size} sq ft</span>
            </div>
          )}
        </div>

        {design.price_range && (
          <div className="mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">From</span>
              <div className="text-sm lg:text-base font-bold text-green-400">{design.price_range}</div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Link href={`/design-ideas/${design.slug}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 hover:scale-105 shadow-lg">
              <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
              View
            </button>
          </Link>
          <button className="flex-1 flex items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 hover:scale-105 shadow-lg">
            <Calculator className="w-3 h-3 lg:w-4 lg:h-4" />
            Quote
          </button>
        </div>
      </div>
    </div>
  );
}

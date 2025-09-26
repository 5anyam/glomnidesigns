"use client"
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Eye, Star, MapPin, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Properly typed interfaces
interface Design {
  id: number;
  name: string;
  slug: string;
  description?: string;
  location?: string;
  area_size?: number;
  price_range?: string;
  featured_image?: { url: string };
  images?: Array<{ url: string }>;
  is_featured?: boolean;
  categories?: Array<{ id: number; name: string; slug: string }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface CategoryWithDesigns extends Category {
  designs: Design[];
}

// API Response interfaces
interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Office-related category keywords/slugs
const OFFICE_CATEGORY_KEYWORDS = [
  'office',
  'corporate',
  'workspace',
  'commercial',
  'business',
  'executive',
  'conference',
  'meeting',
  'coworking',
  'study',
  'work-from-home',
  'home-office',
  'professional'
];

// API functions with proper typing
const designAPI = {
  async getAll(): Promise<APIResponse<Design[]>> {
    try {
      const response = await fetch('https://elegant-charity-710d3644d3.strapiapp.com/api/designs?populate=*');
      const result = await response.json();
      
      return {
        success: true,
        data: result.data || []
      };
    } catch (error) {
      console.error('Design API Error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to load designs'
      };
    }
  }
};

const categoryAPI = {
  async getAll(): Promise<APIResponse<Category[]>> {
    try {
      const response = await fetch('https://elegant-charity-710d3644d3.strapiapp.com/api/categories?populate=*');
      const result = await response.json();
      
      return {
        success: true,
        data: result.data || []
      };
    } catch (error) {
      console.error('Category API Error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to load categories'
      };
    }
  }
};

// Function to check if category is office-related
const isOfficeCategory = (category: Category): boolean => {
  const categoryName = category.name.toLowerCase();
  const categorySlug = category.slug.toLowerCase();
  
  return OFFICE_CATEGORY_KEYWORDS.some(keyword => 
    categoryName.includes(keyword) || categorySlug.includes(keyword)
  );
};

// Category Carousel Component with proper typing
interface CategoryCarouselProps {
  category: CategoryWithDesigns;
  getImageUrl: (url: string) => string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ category, getImageUrl }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [likedDesigns, setLikedDesigns] = useState<Set<number>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  // Show only first 6 designs for carousel
  const carouselDesigns = category.designs.slice(0, 6);
  
  // Responsive cards per view with proper typing
  const getCardsPerView = (): number => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1.2;
      if (window.innerWidth < 768) return 2.2;
      if (window.innerWidth < 1024) return 3.2;
      return 4;
    }
    return 4;
  };

  const [cardsPerView, setCardsPerView] = useState<number>(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, carouselDesigns.length - Math.floor(cardsPerView));

  const nextSlide = (): void => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Update navigation state
  useEffect(() => {
    setIsAtStart(currentIndex === 0);
    setIsAtEnd(currentIndex >= maxIndex);
  }, [currentIndex, maxIndex]);

  const toggleLike = (designId: number, e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const newLiked = new Set(likedDesigns);
    if (newLiked.has(designId)) {
      newLiked.delete(designId);
    } else {
      newLiked.add(designId);
    }
    setLikedDesigns(newLiked);
  };

  if (carouselDesigns.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            {category.name}
          </h2>
          {category.description && (
            <p className="text-gray-400 text-sm md:text-base max-w-2xl line-clamp-2">
              {category.description}
            </p>
          )}
          <p className="text-blue-400 text-sm font-medium mt-1">
            {category.designs.length} professional designs available
          </p>
        </div>
        
        {/* View More Button */}
        <Link
          href={`/design-ideas?category=${category.slug}`}
          className="group flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-400 hover:text-blue-300 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-sm md:text-base font-semibold"
        >
          <span className="hidden sm:inline">View More</span>
          <span className="sm:hidden">More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows - Desktop */}
        <button
          onClick={prevSlide}
          disabled={isAtStart}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-300 hidden sm:flex items-center justify-center ${
            isAtStart
              ? 'bg-gray-800/50 border-gray-700/50 text-gray-600 cursor-not-allowed'
              : 'bg-gray-800/80 hover:bg-gray-700/80 border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white hover:scale-110 backdrop-blur-md'
          }`}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAtEnd}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-300 hidden sm:flex items-center justify-center ${
            isAtEnd
              ? 'bg-gray-800/50 border-gray-700/50 text-gray-600 cursor-not-allowed'
              : 'bg-gray-800/80 hover:bg-gray-700/80 border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white hover:scale-110 backdrop-blur-md'
          }`}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Carousel Track */}
        <div className="overflow-hidden rounded-2xl">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`
            }}
          >
            {carouselDesigns.map((design) => (
              <div
                key={design.id}
                className="flex-shrink-0 px-2 md:px-3"
                style={{
                  width: `${100 / cardsPerView}%`
                }}
              >
                <DesignCard
                  design={design}
                  getImageUrl={getImageUrl}
                  isLiked={likedDesigns.has(design.id)}
                  onToggleLike={(e) => toggleLike(design.id, e)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-500 w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="sm:hidden text-center mt-2">
          <p className="text-xs text-gray-500">
            Swipe to explore • {currentIndex + 1} of {maxIndex + 1}
          </p>
        </div>
      </div>
    </div>
  );
};

// Individual Design Card Component with proper typing
interface DesignCardProps {
  design: Design;
  getImageUrl: (url: string) => string;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, getImageUrl, isLiked, onToggleLike }) => {
  const imageUrl = design.featured_image?.url || design.images?.[0]?.url || '';

  // Function to get truncated description (1-2 lines max)
  const getTruncatedDescription = (text: string | undefined): string => {
    if (!text) return '';
    // Limit to approximately 80 characters for 2 lines
    if (text.length <= 80) return text;
    return text.substring(0, 80).trim() + '...';
  };

  return (
    <Link href={`/design-ideas/${design.slug}`} className="block group">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-800/60 overflow-hidden hover:border-gray-600/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer">
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          {imageUrl ? (
            <Image
              src={getImageUrl(imageUrl)}
              alt={design.name || 'Design'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Eye className="w-8 h-8 lg:w-12 lg:h-12 text-gray-600" />
            </div>
          )}

          {/* Featured Badge */}
          {design.is_featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xl border border-yellow-400/30">
              <Star className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Premium</span>
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={onToggleLike}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 shadow-lg ${
              isLiked
                ? 'bg-red-500/90 text-white scale-110 shadow-red-500/25'
                : 'bg-black/60 backdrop-blur-md text-gray-300 hover:text-red-400 hover:bg-red-500/20 border border-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Mobile: Price on Image */}
          {design.price_range && (
            <div className="sm:hidden absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
              {design.price_range}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-white text-sm lg:text-base mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors leading-tight">
            {design.name}
          </h3>

          {/* Truncated Description - Only 1-2 lines */}
          {design.description && (
            <p className="hidden sm:block text-gray-400 text-xs lg:text-sm mb-3 line-clamp-2 leading-relaxed">
              {getTruncatedDescription(design.description)}
            </p>
          )}

          {/* Location & Price */}
          <div className="flex items-center justify-between text-xs lg:text-sm mb-2">
            {design.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-blue-400" />
                </div>
                <span className="truncate font-medium">{design.location}</span>
              </div>
            )}

            {/* Desktop: Price */}
            {design.price_range && (
              <div className="hidden sm:block text-green-400 font-bold text-xs lg:text-sm">
                {design.price_range}
              </div>
            )}
          </div>

          {/* Area Size - Single Line */}
          {design.area_size && (
            <div className="hidden sm:block text-gray-400 text-xs mb-2">
              📐 {design.area_size} sq ft
            </div>
          )}

          {/* Mobile: View Button */}
          <div className="sm:hidden mt-3">
            <div className="w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-sm">
              View Office Design
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Home Page Component with Office Category Filter
const HomePageCarousel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [categoriesWithDesigns, setCategoriesWithDesigns] = useState<CategoryWithDesigns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Image URL function with proper typing
  const getImageUrl = (url: string): string => {
    if (!url) return '/placeholder-image.jpg';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${url}`;
  };

  // Load data from Strapi
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      // Load both categories and designs in parallel
      const [categoriesResult, designsResult] = await Promise.all([
        categoryAPI.getAll(),
        designAPI.getAll()
      ]);

      if (categoriesResult.success && designsResult.success) {
        setCategories(categoriesResult.data);
        setDesigns(designsResult.data);
        
        // Filter only office-related categories and limit to 3
        const officeCategories = categoriesResult.data.filter(isOfficeCategory);
        
        // Group designs by office category and limit to top 3
        const categoriesWithDesignsData: CategoryWithDesigns[] = officeCategories
          .map(category => ({
            ...category,
            designs: designsResult.data.filter(design =>
              design.categories?.some(cat => cat.slug === category.slug)
            ).slice(0, 6) // Limit to 6 designs per category for carousel
          }))
          .filter(category => category.designs.length > 0) // Only show categories with designs
          .slice(0, 3); // LIMIT TO ONLY 3 MAIN CATEGORIES

        setCategoriesWithDesigns(categoriesWithDesignsData);
        console.log('✅ Loaded office categories with designs:', categoriesWithDesignsData.length);
        console.log('Office categories:', categoriesWithDesignsData.map(cat => cat.name));
      } else {
        setError('Failed to load data from server');
      }
    } catch (err) {
      console.error('Data loading error:', err);
      setError('Unable to connect to server');
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-20 h-20 border-4 border-blue-500/10 rounded-full"></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Loading Office Collections</h3>
          <p className="text-gray-400 text-lg">Discovering professional workspace designs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-8 mx-auto border border-red-500/30">
            <Eye className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Unable to Load</h3>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">{error}</p>
          <button 
            onClick={loadData}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  // Show message if no office categories found
  if (categoriesWithDesigns.length === 0) {
    return (
      <div className="py-8 md:py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-8 mx-auto border border-gray-700">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No Office Categories Found</h3>
            <p className="text-gray-400 text-xl mb-8 max-w-md mx-auto">
              We're currently updating our office design collections. Please check back soon.
            </p>
            <Link
              href="/design-ideas"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-lg"
            >
              View All Designs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Professional Office Designs</span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Premium Office Interiors
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto line-clamp-2">
            Discover our top {categoriesWithDesigns.length} office design categories. 
            Professional workspaces crafted for productivity and elegance.
          </p>
        </div>

        {/* Office Category Carousels - Max 3 */}
        <div className="space-y-12 md:space-y-16">
          {categoriesWithDesigns.map((category, index) => (
            <CategoryCarousel
              key={category.id}
              category={category}
              getImageUrl={getImageUrl}
            />
          ))}
        </div>

        {/* View All Office Designs Button */}
        <div className="text-center mt-16">
          <Link
            href="/design-ideas?category=office"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-lg"
          >
            Explore All Office Designs
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageCarousel;


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

interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const OFFICE_CATEGORY_KEYWORDS = [
  'corporate', 'workspace', 'commercial', 'business',
  'executive', 'conference', 'meeting', 'coworking', 'study', 'professional'
];

const designAPI = {
  async getAll(): Promise<APIResponse<Design[]>> {
    try {
      const response = await fetch('https://elegant-charity-710d3644d3.strapiapp.com/api/designs?populate=*');
      const result = await response.json();
      return { success: true, data: result.data || [] };
    } catch (error) {
      console.error('Design API Error:', error);
      return { success: false, data: [], error: 'Failed to load designs' };
    }
  }
};

const categoryAPI = {
  async getAll(): Promise<APIResponse<Category[]>> {
    try {
      const response = await fetch('https://elegant-charity-710d3644d3.strapiapp.com/api/categories?populate=*');
      const result = await response.json();
      return { success: true, data: result.data || [] };
    } catch (error) {
      console.error('Category API Error:', error);
      return { success: false, data: [], error: 'Failed to load categories' };
    }
  }
};

const isOfficeCategory = (category: Category): boolean => {
  const categoryName = category.name.toLowerCase();
  const categorySlug = category.slug.toLowerCase();
  return OFFICE_CATEGORY_KEYWORDS.some(keyword => 
    categoryName.includes(keyword) || categorySlug.includes(keyword)
  );
};

const useTouch = () => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [touchEndY, setTouchEndY] = useState<number>(0);

  const minSwipeDistance = 50;
  const maxVerticalDistance = 100;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchEndY(0);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    setTouchEnd(currentX);
    setTouchEndY(currentY);

    const horizontalDistance = Math.abs(touchStart - currentX);
    const verticalDistance = Math.abs(touchStartY - currentY);

    if (horizontalDistance > verticalDistance && horizontalDistance > 20) {
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return null;

    const horizontalDistance = touchStart - touchEnd;
    const verticalDistance = Math.abs(touchStartY - (touchEndY || touchStartY));

    if (Math.abs(horizontalDistance) > minSwipeDistance && verticalDistance < maxVerticalDistance) {
      const isLeftSwipe = horizontalDistance > 0;
      const isRightSwipe = horizontalDistance < 0;
      return { isLeftSwipe, isRightSwipe };
    }
    return null;
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// Individual Design Card Component
interface DesignCardProps {
  design: Design;
  getImageUrl: (url: string) => string;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, getImageUrl, isLiked, onToggleLike }) => {
  const imageUrl = design.featured_image?.url || design.images?.[0]?.url || '';

  const getTruncatedDescription = (text: string | undefined): string => {
    if (!text) return '';
    const limit = typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80;
    if (text.length <= limit) return text;
    return text.substring(0, limit).trim() + '...';
  };

  return (
    <Link href={`/design-ideas/${design.slug}`} className="block group">
      <div className="bg-white dark:bg-gray-900 rounded-xl lg:rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-400 dark:hover:border-red-400 transition-all duration-300 hover:shadow-xl">
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {imageUrl ? (
            <Image
              src={getImageUrl(imageUrl)}
              alt={design.name || 'Design'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Eye className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-gray-400" />
            </div>
          )}

          {/* Featured Badge */}
          {design.is_featured && (
            <div className="absolute top-2 md:top-3 left-2 md:left-3 flex items-center gap-1 bg-red-400 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
              <span className="hidden sm:inline">Premium</span>
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={onToggleLike}
            className={`absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 rounded-full transition-all duration-300 shadow-lg ${
              isLiked
                ? 'bg-red-400 text-white scale-110'
                : 'bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border border-gray-200 dark:border-gray-800'
            }`}
          >
            <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Mobile: Price on Image */}
          {design.price_range && (
            <div className="md:hidden absolute bottom-2 left-2 bg-white/90 dark:bg-gray-900/90 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-bold border border-green-500/30">
              {design.price_range}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3 md:p-4">
          {/* Title */}
          <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm lg:text-base mb-2 line-clamp-1 group-hover:text-red-400 transition-colors leading-tight">
            {design.name}
          </h3>

          {/* Description - Desktop Only */}
          {design.description && (
            <p className="hidden md:block text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-3 line-clamp-2 leading-relaxed">
              {getTruncatedDescription(design.description)}
            </p>
          )}

          {/* Location & Price */}
          <div className="flex items-center justify-between text-xs mb-2">
            {design.location && (
              <div className="flex items-center gap-1 md:gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-red-400/10 rounded flex items-center justify-center">
                  <MapPin className="w-2 h-2 md:w-3 md:h-3 text-red-400" />
                </div>
                <span className="truncate font-medium text-xs">{design.location}</span>
              </div>
            )}

            {design.price_range && (
              <div className="hidden md:block text-green-600 dark:text-green-400 font-bold text-xs lg:text-sm">
                {design.price_range}
              </div>
            )}
          </div>

          {/* Area Size - Desktop Only */}
          {design.area_size && (
            <div className="hidden md:block text-gray-600 dark:text-gray-400 text-xs mb-2">
              📐 {design.area_size} sq ft
            </div>
          )}

          {/* Mobile: View Button */}
          <div className="md:hidden mt-2">
            <div className="w-full text-center px-3 py-1.5 bg-red-400 text-white font-semibold rounded-lg text-xs">
              View Design
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Category Carousel Component
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

  const { onTouchStart, onTouchMove, onTouchEnd } = useTouch();
  const carouselDesigns = category.designs.slice(0, 6);

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
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = (): void => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleTouchEnd = () => {
    const swipeResult = onTouchEnd();
    if (swipeResult) {
      if (swipeResult.isLeftSwipe) nextSlide();
      else if (swipeResult.isRightSwipe) prevSlide();
    }
  };

  useEffect(() => {
    setIsAtStart(currentIndex === 0);
    setIsAtEnd(currentIndex >= maxIndex);
  }, [currentIndex, maxIndex]);

  const toggleLike = (designId: number, e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const newLiked = new Set(likedDesigns);
    if (newLiked.has(designId)) newLiked.delete(designId);
    else newLiked.add(designId);
    setLikedDesigns(newLiked);
  };

  if (carouselDesigns.length === 0) return null;

  return (
    <div className="mb-8 md:mb-12">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-4 sm:px-0">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2 flex items-center gap-2 md:gap-3">
            <div className="w-1 h-6 md:h-8 bg-red-400 rounded-full"></div>
            <span className="truncate">{category.name}</span>
          </h2>
          {category.description && (
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl line-clamp-2 hidden sm:block">
              {category.description}
            </p>
          )}
        </div>

        <Link
          href={`/design-ideas?category=${category.slug}`}
          className="group flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-3 bg-red-400/10 hover:bg-red-400/20 text-red-400 hover:text-red-500 rounded-lg md:rounded-xl border border-red-400/30 hover:border-red-400/50 transition-all duration-300 text-xs md:text-base font-semibold whitespace-nowrap"
        >
          <span className="hidden sm:inline">View More</span>
          <span className="sm:hidden text-xs">More</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <button
          onClick={prevSlide}
          disabled={isAtStart}
          aria-label="Previous"
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 hidden lg:flex items-center justify-center ${
            isAtStart
              ? 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-950/20 border-gray-300 dark:border-gray-700 hover:border-red-400 text-gray-700 dark:text-gray-300 hover:text-red-400'
          }`}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAtEnd}
          aria-label="Next"
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 hidden lg:flex items-center justify-center ${
            isAtEnd
              ? 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-950/20 border-gray-300 dark:border-gray-700 hover:border-red-400 text-gray-700 dark:text-gray-300 hover:text-red-400'
          }`}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="overflow-hidden rounded-xl md:rounded-2xl">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-out touch-pan-x"
            style={{ transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {carouselDesigns.map((design) => (
              <div
                key={design.id}
                className="flex-shrink-0 px-1.5 md:px-2 lg:px-3"
                style={{ width: `${100 / cardsPerView}%` }}
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
        <div className="flex lg:hidden justify-center gap-1.5 mt-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-red-400 w-6'
                  : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="lg:hidden text-center mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            👆 Swipe to explore • {currentIndex + 1} of {maxIndex + 1}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Home Page Component
const HomePageCarousel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [categoriesWithDesigns, setCategoriesWithDesigns] = useState<CategoryWithDesigns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const getImageUrl = (url: string): string => {
    if (!url) return '/placeholder-image.jpg';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${url}`;
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      const [categoriesResult, designsResult] = await Promise.all([
        categoryAPI.getAll(),
        designAPI.getAll()
      ]);

      if (categoriesResult.success && designsResult.success) {
        setCategories(categoriesResult.data);
        setDesigns(designsResult.data);

        const officeCategories = categoriesResult.data.filter(isOfficeCategory);

        const categoriesWithDesignsData: CategoryWithDesigns[] = officeCategories
          .map(category => ({
            ...category,
            designs: designsResult.data.filter(design =>
              design.categories?.some(cat => cat.slug === category.slug)
            ).slice(0, 6)
          }))
          .filter(category => category.designs.length > 0)
          .slice(0, 3);

        setCategoriesWithDesigns(categoriesWithDesignsData);
        console.log('✅ Loaded office categories with designs:', categoriesWithDesignsData.length);
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
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="animate-spin w-16 h-16 md:w-20 md:h-20 border-4 border-red-400/20 border-t-red-400 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-16 h-16 md:w-20 md:h-20 border-4 border-red-400/10 rounded-full"></div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Office Collections</h3>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">Discovering professional workspace designs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-red-400/10 rounded-full flex items-center justify-center mb-6 md:mb-8 mx-auto border-2 border-red-400/30">
            <Eye className="w-10 h-10 md:w-12 md:h-12 text-red-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Unable to Load</h3>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">{error}</p>
          <button 
            onClick={loadData}
            className="px-6 py-3 md:px-8 md:py-4 bg-red-400 text-white rounded-xl hover:bg-red-500 font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-lg"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (categoriesWithDesigns.length === 0) {
    return (
      <div className="py-6 md:py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 md:mb-8 mx-auto border-2 border-gray-200 dark:border-gray-700">
              <Eye className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">No Office Categories Found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-xl mb-6 md:mb-8 max-w-md mx-auto">
              We're currently updating our office design collections.
            </p>
            <Link
              href="/design-ideas"
              className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-lg"
            >
              View All Designs
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 md:py-4 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Premium Office Interiors
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto line-clamp-3 leading-relaxed">
            Discover our top {categoriesWithDesigns.length} office design categories. 
            Professional workspaces crafted for productivity and elegance.
          </p>
        </div>

        {/* Office Category Carousels */}
        <div className="space-y-8 md:space-y-16">
          {categoriesWithDesigns.map((category) => (
            <CategoryCarousel
              key={category.id}
              category={category}
              getImageUrl={getImageUrl}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/design-ideas?category=office"
            className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-lg"
          >
            Explore All Office Designs
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageCarousel;

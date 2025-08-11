"use client"
import { useState, useEffect } from 'react';
import { Search, Filter, Eye, MapPin, Home, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Simple Portfolio Interface
interface SimplePortfolio {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  location?: string;
  area?: string;
  area_size?: number;
  slug?: string;
  featured_image?: { url: string; alternativeText?: string };
  images?: Array<{ url: string; alternativeText?: string }>;
  project_type?: string;
  client_name?: string;
  completion_time?: string;
}

// Simple API Functions
const portfolioService = {
  async fetchAll() {
    try {
      const response = await fetch('https://elegant-charity-710d3644d3.strapiapp.com/api/portfolios?populate=*');
      const result = await response.json();
      
      // Handle different response formats
      const data = result.data || result || [];
      
      return {
        success: true,
        portfolios: Array.isArray(data) ? data : []
      };
    } catch (error) {
      console.error('Portfolio fetch error:', error);
      return {
        success: false,
        portfolios: [],
        error: 'Failed to load portfolios'
      };
    }
  }
};

export default function ModernPortfolioPage() {
  const [portfolios, setPortfolios] = useState<SimplePortfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<SimplePortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter options
  const [locations, setLocations] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);

  // Load portfolios on mount
  useEffect(() => {
    loadPortfolios();
  }, []);

  // Apply filters when data or filters change
  useEffect(() => {
    applyAllFilters();
    extractFilterOptions();
  }, [portfolios, searchQuery, locationFilter, areaFilter]);

  const loadPortfolios = async () => {
    setLoading(true);
    setError('');

    const result = await portfolioService.fetchAll();
    
    if (result.success) {
      setPortfolios(result.portfolios);
      console.log('✅ Loaded portfolios:', result.portfolios.length);
    } else {
      setError(result.error || 'Unable to load portfolios');
    }

    setLoading(false);
  };

  const extractFilterOptions = () => {
    // Extract unique locations
    const uniqueLocations = portfolios
      .map(p => p.location)
      .filter((loc): loc is string => Boolean(loc?.trim()))
      .filter((loc, index, arr) => arr.indexOf(loc) === index)
      .sort();

    // Extract unique areas
    const uniqueAreas = portfolios
      .map(p => p.area || (p.area_size ? `${p.area_size} sq ft` : ''))
      .filter((area): area is string => Boolean(area?.trim()))
      .filter((area, index, arr) => arr.indexOf(area) === index)
      .sort();

    setLocations(uniqueLocations);
    setAreas(uniqueAreas);
  };

  const applyAllFilters = () => {
    let filtered = [...portfolios];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(portfolio => {
        const name = (portfolio.name || portfolio.title || '').toLowerCase();
        const description = (portfolio.description || '').toLowerCase();
        const location = (portfolio.location || '').toLowerCase();
        const area = (portfolio.area || '').toLowerCase();
        const client = (portfolio.client_name || '').toLowerCase();

        return name.includes(query) || 
               description.includes(query) || 
               location.includes(query) || 
               area.includes(query) ||
               client.includes(query);
      });
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(portfolio => portfolio.location === locationFilter);
    }

    // Area filter
    if (areaFilter !== 'all') {
      filtered = filtered.filter(portfolio => 
        portfolio.area === areaFilter || 
        (portfolio.area_size && `${portfolio.area_size} sq ft` === areaFilter)
      );
    }

    setFilteredPortfolios(filtered);
  };

  const getImageUrl = (url: string) => {
    if (!url) return '/placeholder-portfolio.jpg';
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com';
    return `${baseUrl}${url}`;
  };

  const openLightbox = (imageUrl: string, allImages: string[]) => {
    const fullImageUrls = allImages.map(img => getImageUrl(img));
    setLightboxImages(fullImageUrls);
    const index = fullImageUrls.findIndex(img => img === getImageUrl(imageUrl));
    setCurrentImageIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImages([]);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextLightboxImage = () => {
    if (currentImageIndex < lightboxImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevLightboxImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mb-6"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Portfolio</h3>
          <p className="text-gray-600">Fetching stunning projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Unavailable</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={loadPortfolios}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
          >
            Reload Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Discover {portfolios.length} exceptional interior design projects showcasing our expertise and creativity
            </p>
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">Premium Interior Designs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white shadow-md sticky top-0 z-30 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, locations, clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500 text-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            <div className="hidden md:flex items-center gap-4">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-w-48"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-w-40"
              >
                <option value="all">All Areas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="text-gray-700 font-semibold">
              <span className="text-purple-600">{filteredPortfolios.length}</span> project{filteredPortfolios.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-4">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>

                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Areas</option>
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search or filters to find more projects</p>
            {(searchQuery || locationFilter !== 'all' || areaFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('all');
                  setAreaFilter('all');
                }}
                className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPortfolios.map((portfolio, index) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                getImageUrl={getImageUrl}
                onImageClick={openLightbox}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-16 right-0 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>

            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  disabled={currentImageIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 p-3 bg-white/10 rounded-full"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextLightboxImage}
                  disabled={currentImageIndex === lightboxImages.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 p-3 bg-white/10 rounded-full"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <img
              src={lightboxImages[currentImageIndex]}
              alt="Portfolio image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {lightboxImages.length > 1 && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white bg-white/10 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Portfolio Card Component
interface PortfolioCardProps {
  portfolio: SimplePortfolio;
  getImageUrl: (url: string) => string;
  onImageClick: (imageUrl: string, allImages: string[]) => void;
  index: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  getImageUrl,
  onImageClick,
  index
}) => {
  // Get images
  const images = portfolio.images || [];
  const featuredImage = portfolio.featured_image;
  const mainImage = featuredImage || images[0];
  
  // Get all image URLs
  const allImageUrls: string[] = [];
  if (featuredImage?.url) allImageUrls.push(featuredImage.url);
  images.forEach(img => {
    if (img?.url && !allImageUrls.includes(img.url)) {
      allImageUrls.push(img.url);
    }
  });

  const projectName = portfolio.name || portfolio.title || `Project ${portfolio.id}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Main Image */}
      {mainImage?.url && (
        <div 
          className="relative aspect-[4/3] bg-gray-100 cursor-pointer overflow-hidden" 
          onClick={() => onImageClick(mainImage.url, allImageUrls)}
        >
          <Image
            src={getImageUrl(mainImage.url)}
            alt={projectName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 p-4 rounded-full shadow-lg">
                <Eye size={24} className="text-gray-800" />
              </div>
            </div>
          </div>

          {/* Image Count */}
          {allImageUrls.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
              +{allImageUrls.length - 1}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
          {projectName}
        </h3>

        {portfolio.description && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {portfolio.description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          {portfolio.client_name && (
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-purple-500" />
              <span className="font-medium">{portfolio.client_name}</span>
            </div>
          )}
          {portfolio.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{portfolio.location}</span>
            </div>
          )}
          {(portfolio.area || portfolio.area_size) && (
            <div className="flex items-center gap-2">
              <span className="font-medium">📐 {portfolio.area || `${portfolio.area_size} sq ft`}</span>
            </div>
          )}
        </div>

        {/* View Project Button */}
        <Link
          href={`/portfolio/${portfolio.slug || portfolio.id}`}
          className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          View Full Project
        </Link>
      </div>
    </div>
  );
};

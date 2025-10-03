
"use client"
import { useState, useEffect } from 'react';
import { Search, Filter, Eye, MapPin, Home, X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

const portfolioService = {
  async fetchAll() {
    try {
      const response = await fetch('https://elegant-charity-710d3644d3.strapiapp.com/api/portfolios?populate=*');
      const result = await response.json();
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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [locations, setLocations] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);

  useEffect(() => {
    loadPortfolios();
  }, []);

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
    const uniqueLocations = portfolios
      .map(p => p.location)
      .filter((loc): loc is string => Boolean(loc?.trim()))
      .filter((loc, index, arr) => arr.indexOf(loc) === index)
      .sort();

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

    if (locationFilter !== 'all') {
      filtered = filtered.filter(portfolio => portfolio.location === locationFilter);
    }

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
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin w-20 h-20 border-4 border-red-400/20 border-t-red-400 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-20 h-20 border-4 border-red-400/10 rounded-full"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Loading Portfolio</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Discovering stunning projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-red-400/10 rounded-full flex items-center justify-center mb-8 mx-auto border-2 border-red-400/30">
            <X className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Portfolio Unavailable</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">{error}</p>
          <button 
            onClick={loadPortfolios}
            className="px-8 py-4 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Reload Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Portfolio Designs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore {portfolios.length} exceptional projects showcasing our design expertise
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-30 backdrop-blur-xl transition-colors">
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
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-900 dark:text-white placeholder-gray-400 text-lg transition-all duration-300"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            <div className="hidden md:flex items-center gap-4">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-400 text-gray-900 dark:text-white min-w-48 appearance-none cursor-pointer transition-colors"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-400 text-gray-900 dark:text-white min-w-40 appearance-none cursor-pointer transition-colors"
              >
                <option value="all">All Areas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 transition-colors">
              <span className="text-red-400 font-bold text-lg">{filteredPortfolios.length}</span>
              <span className="text-gray-700 dark:text-gray-300 ml-2">project{filteredPortfolios.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 gap-4">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-400 text-gray-900 dark:text-white transition-colors"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>

                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-400 text-gray-900 dark:text-white transition-colors"
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
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-gray-200 dark:border-gray-800">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Projects Found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-8 max-w-md mx-auto">Try adjusting your search or filters</p>
            {(searchQuery || locationFilter !== 'all' || areaFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('all');
                  setAreaFilter('all');
                }}
                className="px-8 py-4 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
              className="absolute -top-16 right-0 text-white hover:text-gray-300 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <X size={24} />
            </button>

            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  disabled={currentImageIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-30 p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextLightboxImage}
                  disabled={currentImageIndex === lightboxImages.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-30 p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <img
              src={lightboxImages[currentImageIndex]}
              alt="Portfolio image"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />

            {lightboxImages.length > 1 && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="font-semibold">{currentImageIndex + 1}</span>
                <span className="text-gray-300 mx-2">/</span>
                <span className="text-gray-300">{lightboxImages.length}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const images = portfolio.images || [];
  const featuredImage = portfolio.featured_image;
  const mainImage = featuredImage || images[0];

  const allImageUrls: string[] = [];
  if (featuredImage?.url) allImageUrls.push(featuredImage.url);
  images.forEach(img => {
    if (img?.url && !allImageUrls.includes(img.url)) {
      allImageUrls.push(img.url);
    }
  });

  const projectName = portfolio.name || portfolio.title || `Project ${portfolio.id}`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-400 dark:hover:border-red-400 transition-all duration-500 group hover:scale-105 hover:shadow-xl">
      {mainImage?.url && (
        <div 
          className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 cursor-pointer overflow-hidden" 
          onClick={() => onImageClick(mainImage.url, allImageUrls)}
        >
          <Image
            src={getImageUrl(mainImage.url)}
            alt={projectName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
                <Eye size={28} className="text-white" />
              </div>
            </div>
          </div>

          {allImageUrls.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold border border-white/30">
              +{allImageUrls.length - 1}
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
          {projectName}
        </h3>

        {portfolio.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm">
            {portfolio.description}
          </p>
        )}

        <div className="space-y-3 text-sm mb-6">
          {portfolio.client_name && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/30">
                <Home className="w-4 h-4 text-purple-500" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{portfolio.client_name}</span>
            </div>
          )}
          {portfolio.location && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-400/10 rounded-lg flex items-center justify-center border border-red-400/30">
                <MapPin className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{portfolio.location}</span>
            </div>
          )}
          {(portfolio.area || portfolio.area_size) && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/30">
                <Grid className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{portfolio.area || `${portfolio.area_size} sq ft`}</span>
            </div>
          )}
        </div>

        <Link
          href={`/portfolio/${portfolio.slug || portfolio.id}`}
          className="block w-full text-center px-6 py-3 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View Full Project
        </Link>
      </div>
    </div>
  );
};

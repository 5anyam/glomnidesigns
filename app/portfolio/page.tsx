"use client"
// pages/portfolios.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, MapPin, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioAPI, Portfolio } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

const PortfoliosPage = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract unique areas and locations for filters
  const [uniqueAreas, setUniqueAreas] = useState<string[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    filterPortfolios();
    extractUniqueValues();
  }, [portfolios, searchTerm, selectedArea, selectedLocation]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const data = await portfolioAPI.getPortfolios();
      setPortfolios(data.data || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const extractUniqueValues = () => {
    const areas = portfolios
      .map(p => p.area)
      .filter((a): a is string => !!a);          // only strings
  
    const locations = portfolios
      .map(p => p.location)
      .filter((l): l is string => !!l);
  
    // deduplicate WITHOUT Set iteration
    const uniq = <T,>(arr: T[]) =>
      arr.filter((v, i) => arr.indexOf(v) === i);
  
    setUniqueAreas(uniq(areas));
    setUniqueLocations(uniq(locations));
  };

  const filterPortfolios = () => {
    let filtered = portfolios;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(portfolio =>
        portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.area?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Area filter
    if (selectedArea !== 'all') {
      filtered = filtered.filter(portfolio => portfolio.area === selectedArea);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(portfolio => portfolio.location === selectedLocation);
    }

    setFilteredPortfolios(filtered);
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${imageUrl}`;
  };

  const openLightbox = (imageUrl: string, allImages: string[]) => {
    const fullImages = allImages.map(img => getImageUrl(img));
    setLightboxImages(fullImages);
    setCurrentImageIndex(fullImages.indexOf(getImageUrl(imageUrl)));
    setLightboxImage(getImageUrl(imageUrl));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentImageIndex < lightboxImages.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(lightboxImages[newIndex]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setLightboxImage(lightboxImages[newIndex]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              Our Portfolio
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto"
            >
              Explore our collection of stunning interior projects and get inspired for your next space
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search portfolios, locations, areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Areas</option>
                {uniqueAreas.map(area => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>
                    {location}
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
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Areas</option>
                    {uniqueAreas.map(area => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Locations</option>
                    {uniqueLocations.map(location => (
                      <option key={location} value={location}>
                        {location}
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
          Showing {filteredPortfolios.length} portfolio{filteredPortfolios.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Portfolios Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolios found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
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
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons */}
              {lightboxImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={currentImageIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={currentImageIndex === lightboxImages.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              {/* Image */}
              <motion.img
                key={lightboxImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={lightboxImage}
                alt="Portfolio image"
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image Counter */}
              {lightboxImages.length > 1 && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-sm">
                  {currentImageIndex + 1} / {lightboxImages.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Portfolio Card Component
interface PortfolioCardProps {
  portfolio: Portfolio;
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
  
  // Get all image URLs for lightbox
  const allImageUrls = images.map(img => img.url);
  if (featuredImage && !allImageUrls.includes(featuredImage.url)) {
    allImageUrls.unshift(featuredImage.url);
  }

  const getRandomHeight = () => {
    const heights = ['h-64', 'h-80', 'h-96', 'h-72'];
    return heights[index % heights.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="break-inside-avoid mb-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      {/* Main Image */}
      {mainImage && (
        <div className="relative cursor-pointer" onClick={() => onImageClick(mainImage.url, allImageUrls)}>
          <div className={`relative ${getRandomHeight()} bg-gray-100`}>
            <Image
              src={getImageUrl(mainImage.url)}
              alt={portfolio.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 p-3 rounded-full">
                  <Eye size={20} className="text-gray-800" />
                </div>
              </div>
            </div>

            {/* Image Count Badge */}
            {images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                +{images.length - 1}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">
          {portfolio.name}
        </h3>

        {portfolio.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {portfolio.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
          {portfolio.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {portfolio.location}
            </div>
          )}
          {portfolio.area && (
            <div className="flex items-center gap-1">
              <Maximize2 size={14} />
              {portfolio.area}
            </div>
          )}
        </div>

        {/* Gallery Preview */}
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {images.slice(1, 4).map((image, idx) => (
              <div
                key={image.id}
                className="relative aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer"
                onClick={() => onImageClick(image.url, allImageUrls)}
              >
                <Image
                  src={getImageUrl(image.url)}
                  alt={`${portfolio.name} ${idx + 2}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-200"
                />
                {idx === 2 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      +{images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Link
          href={`/portfolio/${portfolio.slug}`}
          className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
        >
          View Project
        </Link>
      </div>
    </motion.div>
  );
};

export default PortfoliosPage;

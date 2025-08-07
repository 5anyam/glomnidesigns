'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Heart, Share2, MapPin, Clock, Maximize2, Palette, Star,
  ChevronLeft, ChevronRight, X, Eye, Bookmark, Download, Phone, Mail,
  Calendar, Award, Shield, Zap, Users, CheckCircle, ExternalLink
} from 'lucide-react';
import { designAPI, portfolioAPI, Design, Portfolio } from '../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function DesignDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  
  const [design, setDesign] = useState<Design | null>(null);
  const [relatedDesigns, setRelatedDesigns] = useState<Design[]>([]);
  const [relatedPortfolios, setRelatedPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'designs' | 'portfolios'>('designs');

  useEffect(() => {
    if (slug) {
      fetchDesign(slug);
    }
  }, [slug]);

  const fetchDesign = async (designSlug: string) => {
    try {
      setLoading(true);
      let foundDesign: Design | null = null;

      if (designAPI.getDesignBySlug) {
        const resp = await designAPI.getDesignBySlug(designSlug);
        foundDesign = resp.data;
      }
      if (!foundDesign) {
        const searchResult = await designAPI.searchDesigns({ q: designSlug });
        foundDesign = searchResult.data?.find((d: Design) => d.slug === designSlug);
      }

      if (foundDesign) {
        setDesign(foundDesign);
        
        // Fetch related designs and portfolios
        if (foundDesign.categories && foundDesign.categories.length > 0) {
          const categorySlug = foundDesign.categories[0].slug;
          const [designsResult, portfoliosResult] = await Promise.all([
            designAPI.getDesignsByCategory(categorySlug),
            portfolioAPI.getPortfolios()
          ]);
          
          const filteredDesigns = designsResult.data?.filter((d: Design) => d.id !== foundDesign.id) || [];
          setRelatedDesigns(filteredDesigns.slice(0, 8));
          setRelatedPortfolios(portfoliosResult.data?.slice(0, 6) || []);
        }
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Error fetching design:', error);
      router.push('/404');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${imageUrl}`;
  };

  const getAllImages = () => {
    if (!design) return [];
    
    const images: any[] = [];
    
    // Add featured image first
    if (design.featured_image) {
      images.push(design.featured_image);
    }
    
    // Process images array
    let imagesData: any[] = [];
    
    if (design.images) {
      if (Array.isArray(design.images)) {
        // Direct array
        imagesData = design.images;
      } else if (
        design.images && 
        typeof design.images === 'object' && 
        'data' in design.images &&
        Array.isArray((design.images as any).data)
      ) {
        // Strapi format: { data: [...] }
        imagesData = (design.images as any).data.map((d: any) => ({
          id: d.id,
          ...d.attributes
        }));
      }
    }
    
    // Filter out featured image from images array
    const featuredId = design.featured_image?.id;
    const filteredImages = imagesData.filter((img: any) => 
      img && img.id !== featuredId
    );
    
    return [...images, ...filteredImages];
  };
  
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const shareDesign = async () => {
    if (navigator.share && design) {
      try {
        await navigator.share({
          title: design.title,
          text: design.description || '',
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const nextImage = () => {
    const images = getAllImages();
    if (currentImageIndex < images.length - 1) setCurrentImageIndex(currentImageIndex + 1);
  };
  
  const prevImage = () => {
    if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading premium design...</p>
      </div>
    </div>
  );

  if (!design) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <Star className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Design Not Found</h1>
        <p className="text-gray-600 mb-8">The design you're looking for doesn't exist or has been moved.</p>
        <Link href="/design-ideas" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse All Designs
        </Link>
      </div>
    </div>
  );

  const allImages = getAllImages();
  const currentImage = allImages[currentImageIndex];

  return (
    <>
      <Head>
        <title>{design.title} - Premium Interior Design</title>
        <meta name="description" content={design.description || `Premium ${design.style} design in ${design.location}`} />
        <meta property="og:title" content={design.title} />
        <meta property="og:description" content={design.description || ''} />
        <meta property="og:image" content={design.featured_image ? getImageUrl(design.featured_image.url) : ''} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Premium Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200 backdrop-blur-sm"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline font-medium">Back to Gallery</span>
              </button>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isFavorite 
                      ? 'bg-red-50 text-red-600 ring-2 ring-red-200' 
                      : 'bg-gray-100/50 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareDesign}
                  className="p-3 rounded-full bg-gray-100/50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Share2 size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-gray-100/50 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                >
                  <Download size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-12">
            
            {/* Left Column - Images & Gallery */}
            <div className="xl:col-span-3">
              {/* Hero Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-8"
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden shadow-2xl">
                  {currentImage && (
                    <Image
                      src={getImageUrl(currentImage.url)}
                      alt={currentImage.alternativeText || design.title}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                      onClick={() => setShowGallery(true)}
                    />
                  )}
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronLeft size={24} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        disabled={currentImageIndex === allImages.length - 1}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronRight size={24} />
                      </motion.button>
                    </>
                  )}

                  {/* Premium Badges */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    {design.is_featured && (
                      <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        <Star size={16} className="fill-current" />
                        Featured Design
                      </div>
                    )}
                    <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      Premium Collection
                    </div>
                  </div>

                  {/* Image Counter */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  )}

                  {/* View Gallery Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowGallery(true)}
                    className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-all duration-200 shadow-lg"
                  >
                    <Eye size={16} />
                    View Full Gallery
                  </motion.button>
                </div>

                {/* Premium Thumbnail Strip */}
                {allImages.length > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide"
                  >
                    {allImages.map((image, index) => (
                      <motion.button
                        key={image.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-24 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border-3 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={getImageUrl(image.url)}
                          alt={`View ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-blue-500/20" />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Premium Description Card */}
              {design.description && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Design Story</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">{design.description}</p>
                </motion.div>
              )}
            </div>

            {/* Right Column - Premium Details */}
            <div className="xl:col-span-2">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 sticky top-32"
              >
                {/* Title & Categories */}
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {design.title}
                  </h1>
                  
                  {design.categories && design.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {design.categories.map(category => (
                        <Link
                          key={category.id}
                          href={`/design-ideas?category=${category.slug}`}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full hover:from-blue-200 hover:to-purple-200 transition-all duration-200 hover:scale-105"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Premium Price Card */}
                {design.price_range && (
                  <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                      <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Investment Range</p>
                    </div>
                    <p className="text-2xl font-bold text-green-800">{design.price_range}</p>
                    <p className="text-green-600 text-sm mt-1">*Prices vary based on customization</p>
                  </div>
                )}

                {/* Premium Details Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {design.location && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</p>
                        <p className="font-semibold text-gray-900">{design.location}</p>
                      </div>
                    </div>
                  )}

                  {design.area_size && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Maximize2 size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Area</p>
                        <p className="font-semibold text-gray-900">{design.area_size} sq ft</p>
                      </div>
                    </div>
                  )}

                  {design.style && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Palette size={18} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Style</p>
                        <p className="font-semibold text-gray-900 capitalize">{design.style}</p>
                      </div>
                    </div>
                  )}

                  {design.completion_time && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock size={18} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Timeline</p>
                        <p className="font-semibold text-gray-900">{design.completion_time}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Premium Features */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Premium Features
                  </h4>
                  <div className="space-y-3">
                    {['3D Visualization Included', '1-Year Design Warranty', 'Free Design Consultation', 'Premium Material Sourcing'].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {design.tags && Array.isArray(design.tags) && design.tags.length > 0 && (
                  <div className="mb-8">
                    <p className="text-sm font-bold text-gray-900 mb-3">Design Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {design.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Premium CTA Buttons */}
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Star className="w-5 h-5 fill-current" />
                    Get Premium Quote
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowContactForm(true)}
                    className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Consultation
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now: +91 98765 43210
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Premium Related Products Section */}
          {(relatedDesigns.length > 0 || relatedPortfolios.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">You Might Also Love</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Discover more premium designs and completed projects from our exclusive collection
                </p>
              </div>

              {/* Premium Tabs */}
              <div className="flex justify-center mb-10">
                <div className="bg-gray-100 p-1 rounded-full">
                  <button
                    onClick={() => setActiveTab('designs')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                      activeTab === 'designs'
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Similar Designs ({relatedDesigns.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('portfolios')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                      activeTab === 'portfolios'
                        ? 'bg-white text-purple-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Our Projects ({relatedPortfolios.length})
                  </button>
                </div>
              </div>

              {/* Related Designs */}
              <AnimatePresence mode="wait">
                {activeTab === 'designs' && relatedDesigns.length > 0 && (
                  <motion.div
                    key="designs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                  >
                    {relatedDesigns.map((relatedDesign, index) => (
                      <PremiumDesignCard
                        key={relatedDesign.id}
                        design={relatedDesign}
                        getImageUrl={getImageUrl}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}

                {activeTab === 'portfolios' && relatedPortfolios.length > 0 && (
                  <motion.div
                    key="portfolios"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {relatedPortfolios.map((portfolio, index) => (
                      <PremiumPortfolioCard
                        key={portfolio.id}
                        portfolio={portfolio}
                        getImageUrl={getImageUrl}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Link
                  href={activeTab === 'designs' ? '/design-ideas' : '/portfolios'}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  View All {activeTab === 'designs' ? 'Designs' : 'Projects'}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Premium Lightbox Gallery */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setShowGallery(false)}
            >
              <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setShowGallery(false)}
                  className="absolute -top-16 right-0 text-white hover:text-gray-300 z-10 p-2 bg-white/10 rounded-full backdrop-blur-sm"
                >
                  <X size={24} />
                </button>

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 p-3 bg-white/10 rounded-full backdrop-blur-sm"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={nextImage}
                      disabled={currentImageIndex === allImages.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 p-3 bg-white/10 rounded-full backdrop-blur-sm"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}

                {currentImage && (
                  <motion.img
                    key={currentImage.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={getImageUrl(currentImage.url)}
                    alt={currentImage.alternativeText || design.title}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  />
                )}

                {allImages.length > 1 && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Contact Form Modal */}
        <PremiumContactFormModal
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          designTitle={design.title}
        />
      </div>
    </>
  );
}

// Premium Design Card Component
interface PremiumDesignCardProps {
  design: Design;
  getImageUrl: (url: string) => string;
  index: number;
}

const PremiumDesignCard: React.FC<PremiumDesignCardProps> = ({ design, getImageUrl, index }) => {
  const imageUrl = design.featured_image?.url || design.images?.[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/design-idea/${design.slug}`}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={design.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Star className="w-12 h-12" />
              </div>
            )}
            
            {design.is_featured && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Featured
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {design.title}
            </h3>
            
            {design.location && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                <MapPin size={12} />
                {design.location}
              </div>
            )}

            {design.price_range && (
              <div className="text-lg font-bold text-green-600">
                {design.price_range}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Premium Portfolio Card Component
interface PremiumPortfolioCardProps {
  portfolio: Portfolio;
  getImageUrl: (url: string) => string;
  index: number;
}

const PremiumPortfolioCard: React.FC<PremiumPortfolioCardProps> = ({ portfolio, getImageUrl, index }) => {
  const imageUrl = portfolio.featured_image?.url || portfolio.images?.[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/portfolio/${portfolio.slug}`}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={portfolio.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Award className="w-12 h-12" />
              </div>
            )}

            <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              Portfolio
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {portfolio.name}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              {portfolio.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {portfolio.location}
                </div>
              )}
              {portfolio.area && (
                <div className="flex items-center gap-1">
                  <Maximize2 size={12} />
                  {portfolio.area}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Premium Contact Form Modal Component
interface PremiumContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  designTitle: string;
}

const PremiumContactFormModal: React.FC<PremiumContactFormModalProps> = ({ isOpen, onClose, designTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    message: `I'm interested in the "${designTitle}" design. Please provide premium consultation and detailed quote.`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Premium form submitted:', formData);
    alert('Thank you! Our premium design consultant will contact you within 24 hours.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Premium Consultation</h3>
              <p className="text-gray-600">Get expert advice for your dream space</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select budget range</option>
                  <option value="1-3 Lakhs">₹1-3 Lakhs</option>
                  <option value="3-5 Lakhs">₹3-5 Lakhs</option>
                  <option value="5-10 Lakhs">₹5-10 Lakhs</option>
                  <option value="10+ Lakhs">₹10+ Lakhs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select timeline</option>
                  <option value="Immediate">Within 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Details
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Tell us about your dream space..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
              >
                Get Premium Consultation
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

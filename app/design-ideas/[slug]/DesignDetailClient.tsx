
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, MapPin, Clock, Eye, Star, Phone, MessageSquare, Ruler, Palette, Calendar, Info, Sparkles, Award, Users, CheckCircle, Shield, Clock3, Wrench, ZoomIn, ZoomOut, Maximize, X, Plus, Minus } from 'lucide-react';
import { designAPI, Design } from '../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import ContactModal from '@/components/contactModal';

export default function NewDesignDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [design, setDesign] = useState<Design | null>(null);
  const [relatedDesigns, setRelatedDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (slug) loadDesign();
  }, [slug]);

  const loadDesign = async () => {
    setLoading(true);
    setError('');
    const designResult = await designAPI.getBySlug(slug);

    if (designResult.success && designResult.data) {
      setDesign(designResult.data);
      if (designResult.data.categories?.[0]?.slug) {
        const relatedResult = await designAPI.getByCategory(designResult.data.categories[0].slug);
        if (relatedResult.success) {
          const filtered = relatedResult.data.filter((d: Design) => d.id !== designResult.data!.id);
          setRelatedDesigns(filtered.slice(0, 6));
        }
      }
    } else {
      setError('Design not found');
    }
    setLoading(false);
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${imageUrl}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: design?.name, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 1));
  const resetZoom = () => setZoomLevel(1);
  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => { setIsFullscreen(false); setZoomLevel(1); };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFullscreen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="relative">
          <div className="animate-spin w-16 h-16 border-4 border-red-400/20 border-t-red-400 rounded-full"></div>
          <div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-red-400/10 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-400/10 rounded-full flex items-center justify-center border-2 border-red-400/30">
            <Eye className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Design Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">The design you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/design-ideas" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = design.featured_image?.url || design.images?.[0]?.url || '';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Modern Header */}
      <div className="sticky top-0 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-400 text-white scale-110' 
                    : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        {/* Main Content Section with Sticky Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-20">

          {/* LEFT SIDE: Sticky Image Section - Desktop Only */}
          <div className="w-full">
            {/* Sticky container for desktop */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 dark:border-gray-800 group transition-colors">
                {imageUrl ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={getImageUrl(imageUrl)}
                      alt={design.name}
                      fill
                      className="object-cover transition-transform duration-500 cursor-pointer"
                      style={{ transform: `scale(${zoomLevel})` }}
                      onClick={() => zoomLevel > 1 ? resetZoom() : zoomIn()}
                    />

                    {/* Zoom Controls */}
                    <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                        disabled={zoomLevel <= 1}
                        className="p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                        title="Zoom Out"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="px-3 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg text-sm font-bold border border-gray-200 dark:border-gray-700">
                        {Math.round(zoomLevel * 100)}%
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                        disabled={zoomLevel >= 3}
                        className="p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                        title="Zoom In"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); openFullscreen(); }}
                      className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-200 dark:border-gray-700"
                      title="Open Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>

                    {/* Zoom Hint */}
                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-200 dark:border-gray-700">
                      Click to zoom • Use controls for precision
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Eye className="w-24 h-24 text-gray-400" />
                  </div>
                )}

                {design.is_featured && (
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Featured Design
                  </div>
                )}
              </div>

              {/* Quick Actions Below Image */}
              <div className="hidden lg:block space-y-3">
                <div className="flex gap-3">
                  <ContactModal/>
                  <a href="tel:+919899989803" className="flex-1">
                    <button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 px-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Now 
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Scrollable Content */}
          <div className="w-full space-y-8">

            {/* Title & Basic Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {design.name}
                </h1>

                {design.categories && design.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {design.categories.map(cat => (
                      <span 
                        key={cat.id} 
                        className="px-3 py-1.5 bg-red-400/10 backdrop-blur-sm text-red-400 rounded-full text-sm font-semibold border border-red-400/30 hover:border-red-400/50 transition-all duration-300"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {design.description && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base lg:text-lg">
                  {design.description}
                </p>
              )}
            </div>

            {/* Price Highlight */}
            {design.price_range && (
              <div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-6 border-2 border-green-400/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-green-600 dark:text-green-400 text-base lg:text-lg font-semibold">Starting from</span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{design.price_range}</div>
                <p className="text-green-600 dark:text-green-400 text-sm">*Final cost depends on customization & materials</p>
              </div>
            )}

            {/* Mobile CTA Buttons */}
            <div className="lg:hidden flex flex-col gap-3">
              <ContactModal/>
              <a href="tel:+919899989803">
                <button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Now 
                </button>
              </a>
            </div>

            {/* Design Specifications Inline */}
            {(design.location || design.area_size || design.style || design.completion_time) && (
              <div className="grid grid-cols-2 gap-3">
                {design.location && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-400/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <MapPin className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Location</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs">{design.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {design.area_size && (
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-400/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/30">
                        <Ruler className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Area</h4>
                        <p className="text-green-600 dark:text-green-400 font-semibold text-xs">{design.area_size} sq ft</p>
                      </div>
                    </div>
                  </div>
                )}

                {design.style && (
                  <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl border-2 border-purple-400/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <Palette className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Style</h4>
                        <p className="text-purple-600 dark:text-purple-400 font-semibold text-xs capitalize">{design.style}</p>
                      </div>
                    </div>
                  </div>
                )}

                {design.completion_time && (
                  <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl border-2 border-orange-400/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/30">
                        <Clock3 className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Timeline</h4>
                        <p className="text-orange-600 dark:text-orange-400 font-semibold text-xs">{design.completion_time}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Choose This Design</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-4 hover:border-red-400 transition-all">
                  <div className="w-10 h-10 bg-red-400/10 rounded-lg flex items-center justify-center mb-3 border border-red-400/30">
                    <CheckCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Premium Materials</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">High-quality finishes</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-4 hover:border-green-400 transition-all">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-3 border border-green-500/30">
                    <Wrench className="w-5 h-5 text-green-500" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Expert Installation</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Professional team</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-4 hover:border-purple-400 transition-all">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3 border border-purple-500/30">
                    <Palette className="w-5 h-5 text-purple-500" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Customizable</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Tailored to you</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-4 hover:border-orange-400 transition-all">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3 border border-orange-500/30">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">3 Year Warranty</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Full coverage</p>
                </div>
              </div>
            </div>

            {/* Our Process - Compact */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Process</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { num: 1, title: 'Consultation', desc: 'Understand your vision' },
                  { num: 2, title: 'Design', desc: '3D designs & materials' },
                  { num: 3, title: 'Execution', desc: 'Professional installation' },
                  { num: 4, title: 'Handover', desc: 'Complete with warranty' }
                ].map(step => (
                  <div key={step.num} className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-4 text-center hover:border-red-400 transition-all">
                    <div className="w-10 h-10 bg-red-400/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-400/30">
                      <span className="text-red-400 font-bold text-lg">{step.num}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black z-[10000] flex items-center justify-center">
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
              <div className="flex gap-3">
                <button onClick={zoomOut} disabled={zoomLevel <= 0.5} className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all disabled:opacity-50" title="Zoom Out">
                  <Minus size={20} />
                </button>
                <div className="px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold">
                  {Math.round(zoomLevel * 100)}%
                </div>
                <button onClick={zoomIn} disabled={zoomLevel >= 3} className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all disabled:opacity-50" title="Zoom In">
                  <Plus size={20} />
                </button>
              </div>
              <button onClick={closeFullscreen} className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all" title="Close">
                <X size={20} />
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center p-20 overflow-hidden">
              <img src={getImageUrl(imageUrl)} alt={design.name} className="transition-transform duration-300 ease-out select-none max-w-full max-h-full object-contain" style={{ transform: `scale(${zoomLevel})` }} />
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Use zoom controls to magnify • ESC or X to close
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mb-12 lg:mb-20">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Space?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg mb-6 lg:mb-8 max-w-2xl mx-auto">
              Get a free consultation with our design experts and bring your dream space to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <ContactModal/>
              <a href="tel:+919899989803">
                <button className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 lg:py-4 px-6 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Now 
                </button>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">Trusted by 500+ happy customers</span>
            </div>
          </div>
        </div>

        {/* Related Designs */}
        {relatedDesigns.length > 0 && (
          <div>
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4">Similar Designs</h2>
              <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg">Explore more designs that might inspire you</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {relatedDesigns.map(related => {
                const relatedImageUrl = related.featured_image?.url || related.images?.[0]?.url || '';
                return (
                  <Link key={related.id} href={`/design-ideas/${related.slug}`}>
                    <div className="group bg-white dark:bg-gray-900 rounded-xl lg:rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-red-400 dark:hover:border-red-400 transition-all duration-500 hover:scale-105">
                      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        {relatedImageUrl ? (
                          <Image src={getImageUrl(relatedImageUrl)} alt={related.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Eye className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="p-4 lg:p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                          {related.name}
                        </h3>
                        <div className="flex items-center justify-between text-xs lg:text-base">
                          {related.price_range && (
                            <p className="text-green-600 dark:text-green-400 font-bold">{related.price_range}</p>
                          )}
                          {related.location && (
                            <p className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {related.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

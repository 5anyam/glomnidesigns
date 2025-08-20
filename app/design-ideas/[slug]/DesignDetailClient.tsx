'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, MapPin, Clock, Eye, Star, Phone, MessageSquare, Ruler, Palette, Calendar, Info, Sparkles, Award, Users, CheckCircle, Shield, Clock3, Wrench } from 'lucide-react';
import { designAPI, Design } from '../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function NewDesignDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [design, setDesign] = useState<Design | null>(null);
  const [relatedDesigns, setRelatedDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      loadDesign();
    }
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
      await navigator.share({
        title: design?.name,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full"></div>
          <div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-blue-500/10 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <Eye className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Design Not Found</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">The design you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/design-ideas" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
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
    <div className="min-h-screen bg-black">
      {/* Modern Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-400 scale-110 border border-red-500/30' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section - Image and Basic Description (50-50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Image Section - 50% */}
          <div className="w-full">
            <div className="relative aspect-[4/3] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
              {imageUrl ? (
                <Image
                  src={getImageUrl(imageUrl)}
                  alt={design.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Eye className="w-24 h-24 text-gray-600" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {design.is_featured && (
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  Featured Design
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 drop-shadow-2xl">
                  {design.name}
                </h1>
                {design.categories && design.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {design.categories.map(cat => (
                      <span key={cat.id} className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info Section - 50% */}
          <div className="w-full flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Design Overview</h2>
              {design.description && (
                <p className="text-gray-300 leading-relaxed text-lg mb-8">{design.description}</p>
              )}
              
              {/* Price Highlight */}
              {design.price_range && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400 text-lg font-semibold">Starting from</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{design.price_range}</div>
                  <p className="text-green-300 text-sm">*Final cost depends on customization & materials</p>
                </div>
              )}
            </div>

            {/* Quick CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
                <MessageSquare className="w-5 h-5" />
                Get Free Quote
              </button>
              <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose This Design</h2>
            <p className="text-gray-400 text-lg">Premium features that make this design stand out</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Premium Materials</h3>
                <p className="text-gray-400 text-sm">High-quality finishes and materials for lasting beauty</p>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <Wrench className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Expert Installation</h3>
                <p className="text-gray-400 text-sm">Professional installation by certified craftsmen</p>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                  <Palette className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Customizable</h3>
                <p className="text-gray-400 text-sm">Tailored to your preferences and requirements</p>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                  <Shield className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3 Year Warranty</h3>
                <p className="text-gray-400 text-sm">Comprehensive warranty on workmanship</p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Specifications */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Design Specifications</h2>
            <p className="text-gray-400 text-lg">Detailed information about this project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {design.location && (
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl border border-blue-700/50 p-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                    <MapPin className="w-7 h-7 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Location</h4>
                  <p className="text-blue-300 font-semibold text-lg">{design.location}</p>
                </div>
              </div>
            )}

            {design.area_size && (
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-2xl border border-green-700/50 p-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                    <Ruler className="w-7 h-7 text-green-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Area Size</h4>
                  <p className="text-green-300 font-semibold text-lg">{design.area_size} sq ft</p>
                </div>
              </div>
            )}

            {design.style && (
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl border border-purple-700/50 p-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                    <Palette className="w-7 h-7 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Style</h4>
                  <p className="text-purple-300 font-semibold text-lg capitalize">{design.style}</p>
                </div>
              </div>
            )}

            {design.completion_time && (
              <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-2xl border border-orange-700/50 p-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                    <Clock3 className="w-7 h-7 text-orange-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Timeline</h4>
                  <p className="text-orange-300 font-semibold text-lg">{design.completion_time}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Our Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Design Process</h2>
            <p className="text-gray-400 text-lg">From concept to completion in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-500/30">
                <span className="text-blue-400 font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Consultation</h3>
              <p className="text-gray-400">Initial meeting to understand your vision and requirements</p>
            </div>

            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/30">
                <span className="text-green-400 font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Design</h3>
              <p className="text-gray-400">Create detailed 3D designs and material selections</p>
            </div>

            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-purple-500/30">
                <span className="text-purple-400 font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Execution</h3>
              <p className="text-gray-400">Professional installation with regular progress updates</p>
            </div>

            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-orange-500/30">
                <span className="text-orange-400 font-bold text-2xl">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Handover</h3>
              <p className="text-gray-400">Final walkthrough and project completion with warranty</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl border border-gray-700 p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Space?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get a free consultation with our design experts and bring your dream space to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
                <MessageSquare className="w-5 h-5" />
                Free Consultation
              </button>
              <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" />
                Call Expert
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">Trusted by 500+ happy customers</span>
            </div>
          </div>
        </div>

        {/* Related Designs */}
        {relatedDesigns.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Similar Designs</h2>
              <p className="text-gray-400 text-lg">Explore more designs that might inspire you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedDesigns.map(related => {
                const relatedImageUrl = related.featured_image?.url || related.images?.[0]?.url || '';
                return (
                  <Link key={related.id} href={`/design-ideas/${related.slug}`}>
                    <div className="group bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-500 hover:scale-105">
                      <div className="relative aspect-[4/3] bg-gray-800 overflow-hidden">
                        {relatedImageUrl ? (
                          <Image
                            src={getImageUrl(relatedImageUrl)}
                            alt={related.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Eye className="w-12 h-12 text-gray-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {related.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          {related.price_range && (
                            <p className="text-green-400 font-bold text-lg">{related.price_range}</p>
                          )}
                          {related.location && (
                            <p className="text-gray-400 text-sm flex items-center gap-1">
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

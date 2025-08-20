'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, MapPin, Clock, Eye, Star, Phone, MessageSquare, Ruler, Palette, Calendar, Info, Sparkles, Award, Users } from 'lucide-react';
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
        const relatedResult = await designAPI.getByCategory(designResult.data.categories.slug);
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          
          {/* Image Section */}
          <div className="xl:col-span-2">
            <div className="relative aspect-[16/10] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
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
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {design.is_featured && (
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  Featured Design
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-2xl">
                  {design.name}
                </h1>
                {design.categories && design.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {design.categories.map(cat => (
                      <span key={cat.id} className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-gray-700">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            
            {/* Enhanced Description Card */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  Design Overview
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {design.description && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      Description
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{design.description}</p>
                  </div>
                )}
                
                {/* Additional Description Content */}
                <div className="pt-4 border-t border-gray-800">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Premium quality materials and finishes</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Customizable to your preferences</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Professional installation included</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>3 years warranty on workmanship</span>
                    </div>
                  </div>
                </div>

                {/* Design Process */}
                <div className="pt-4 border-t border-gray-800">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    Our Process
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-400 font-bold text-sm">1</span>
                      </div>
                      <p className="text-xs text-gray-300 font-medium">Consultation</p>
                    </div>
                    <div className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-400 font-bold text-sm">2</span>
                      </div>
                      <p className="text-xs text-gray-300 font-medium">Design</p>
                    </div>
                    <div className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-400 font-bold text-sm">3</span>
                      </div>
                      <p className="text-xs text-gray-300 font-medium">Execution</p>
                    </div>
                    <div className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-400 font-bold text-sm">4</span>
                      </div>
                      <p className="text-xs text-gray-300 font-medium">Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Details Cards */}
            <div className="space-y-4">
              {design.location && (
                <div className="group bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Location</span>
                        <span className="text-gray-400 text-sm">Project area</span>
                      </div>
                    </div>
                    <p className="text-white font-medium">{design.location}</p>
                  </div>
                </div>
              )}

              {design.area_size && (
                <div className="group bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-green-500/30 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                        <Ruler className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Area Size</span>
                        <span className="text-gray-400 text-sm">Total coverage</span>
                      </div>
                    </div>
                    <p className="text-white font-medium">{design.area_size} sq ft</p>
                  </div>
                </div>
              )}

              {design.style && (
                <div className="group bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <Palette className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Design Style</span>
                        <span className="text-gray-400 text-sm">Theme & aesthetic</span>
                      </div>
                    </div>
                    <p className="text-white font-medium capitalize">{design.style}</p>
                  </div>
                </div>
              )}

              {design.completion_time && (
                <div className="group bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-orange-500/30 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                        <Calendar className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Timeline</span>
                        <span className="text-gray-400 text-sm">Completion time</span>
                      </div>
                    </div>
                    <p className="text-white font-medium">{design.completion_time}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Price Card */}
            {design.price_range && (
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 rounded-2xl border border-green-700/50 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-400">Investment Range</h3>
                    <p className="text-green-300 text-sm">Complete project cost</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-2">{design.price_range}</p>
                <p className="text-green-300 text-sm mb-4">*Price may vary based on customization and materials</p>
                <div className="flex items-center gap-2 text-green-300 text-xs">
                  <Users className="w-3 h-3" />
                  <span>Trusted by 500+ satisfied customers</span>
                </div>
              </div>
            )}

            {/* Enhanced CTA Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 border border-blue-500">
                <MessageSquare className="w-5 h-5" />
                Get Free Consultation
                <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">FREE</span>
              </button>
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 border border-green-500">
                <Phone className="w-5 h-5" />
                Call Expert Now
                <span className="text-xs bg-green-300 text-green-800 px-2 py-0.5 rounded-full">24/7</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Related Designs */}
        {relatedDesigns.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Similar Designs</h2>
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

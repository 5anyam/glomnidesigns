'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, MapPin, Clock, Eye, Star } from 'lucide-react';
import { designAPI, Design } from '../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function NewDesignDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [design, setDesign] = useState<Design | null>(null);
  const [relatedDesigns, setRelatedDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      loadDesign();
    }
  }, [slug]);

  const loadDesign = async () => {
    setLoading(true);
    setError('');

    // Get design by slug
    const designResult = await designAPI.getBySlug(slug);
    
    if (designResult.success && designResult.data) {
      setDesign(designResult.data);
      
      // Get related designs
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Design Not Found</h1>
          <p className="text-gray-600 mb-6">The design you're looking for doesn't exist.</p>
          <Link href="/design-ideas" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = design.featured_image?.url || design.images?.[0]?.url || '';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex gap-2">
            <button className="p-3 rounded-full hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image */}
          <div className="relative aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
            {imageUrl ? (
              <Image
                src={getImageUrl(imageUrl)}
                alt={design.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Eye className="w-16 h-16 text-gray-400" />
              </div>
            )}
            
            {design.is_featured && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                <Star className="w-4 h-4 fill-current" />
                Featured
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{design.title}</h1>
              
              {design.categories && design.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {design.categories.map(cat => (
                    <span key={cat.id} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {design.description && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{design.description}</p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {design.location && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Location</span>
                  </div>
                  <p className="text-gray-700">{design.location}</p>
                </div>
              )}

              {design.area_size && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900 block mb-2">Area</span>
                  <p className="text-gray-700">{design.area_size} sq ft</p>
                </div>
              )}

              {design.style && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900 block mb-2">Style</span>
                  <p className="text-gray-700 capitalize">{design.style}</p>
                </div>
              )}

              {design.completion_time && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Timeline</span>
                  </div>
                  <p className="text-gray-700">{design.completion_time}</p>
                </div>
              )}
            </div>

            {/* Price */}
            {design.price_range && (
              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-bold text-green-800 mb-2">Investment Range</h3>
                <p className="text-2xl font-bold text-green-700">{design.price_range}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700">
                Get Quote
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-bold text-lg hover:border-gray-400">
                Call Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Designs */}
        {relatedDesigns.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Similar Designs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDesigns.map(related => {
                const relatedImageUrl = related.featured_image?.url || related.images?.[0]?.url || '';
                return (
                  <Link key={related.id} href={`/design-ideas/${related.slug}`}>
                    <div className="bg-white rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[4/3] bg-gray-200">
                        {relatedImageUrl ? (
                          <Image
                            src={getImageUrl(relatedImageUrl)}
                            alt={related.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Eye className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 line-clamp-2">{related.title}</h3>
                        {related.price_range && (
                          <p className="text-green-600 font-bold mt-2">{related.price_range}</p>
                        )}
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

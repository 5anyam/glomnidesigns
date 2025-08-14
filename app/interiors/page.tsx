"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Users, 
  Clock,
  Palette,
  Home,
  Building,
  Sparkles,
  Heart
} from 'lucide-react';
import { interiorAPI, interiorCategoryAPI, Interior, InteriorCategory } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function InteriorsPage() {
  const [interiors, setInteriors] = useState<Interior[]>([]);
  const [categories, setCategories] = useState<InteriorCategory[]>([]);
  const [filteredServices, setFilteredServices] = useState<Interior[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [interiors, searchTerm, selectedCategory, showOnlyFeatured]);

  const loadData = async () => {
    setLoading(true);
    setError('');

    const [servicesResult, categoriesResult] = await Promise.all([
      interiorAPI.getAll(),
      interiorCategoryAPI.getAll()
    ]);
    
    if (servicesResult.success) {
      setInteriors(servicesResult.data);
    } else {
      setError(servicesResult.error || 'Failed to load services');
    }

    if (categoriesResult.success) {
      setCategories(categoriesResult.data);
    }

    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...interiors];

    // Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(service => 
        service.title?.toLowerCase().includes(query) ||
        service.short_description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => 
        service.service_category?.slug === selectedCategory
      );
    }

    // Featured filter
    if (showOnlyFeatured) {
      filtered = filtered.filter(service => service.is_featured);
    }

    setFilteredServices(filtered);
  };

  const getImageUrl = (url: string) => {
    if (!url) return '/placeholder-service.jpg';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://elegant-charity-710d3644d3.strapiapp.com'}${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-6"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Services</h3>
          <p className="text-gray-600">Fetching our interior design offerings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Palette className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Services Unavailable</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={loadData}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Home className="w-8 h-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">Interior Services</h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              Transform your space with our comprehensive interior design services. From concept to completion, we create beautiful, functional environments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>500+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span>Award-Winning Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-300" />
                <span>Happy Clients</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
                Explore Services
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all">
                Get Free Quote
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-50 border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="flex-1 relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-48"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyFeatured}
                  onChange={(e) => setShowOnlyFeatured(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">Featured Only</span>
              </label>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-700 font-medium">
              Showing <span className="font-bold text-blue-600">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
            </p>
            
            {(searchTerm || selectedCategory !== 'all' || showOnlyFeatured) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setShowOnlyFeatured(false);
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Services Found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search or filters to find more services</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                getImageUrl={getImageUrl}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Service Card Component
interface ServiceCardProps {
  service: Interior;
  getImageUrl: (url: string) => string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, getImageUrl, index }) => {
  const imageUrl = service.featured_image?.url || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {imageUrl ? (
          <Image
            src={getImageUrl(imageUrl)}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Palette className="w-16 h-16 text-gray-300" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {service.is_featured && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-3 h-3 inline mr-1 fill-current" />
              Featured
            </div>
          )}
          {service.is_popular && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              <Heart className="w-3 h-3 inline mr-1 fill-current" />
              Popular
            </div>
          )}
        </div>

        {/* Category Badge */}
        {service.service_category && (
          <div 
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: service.service_category.color || '#3B82F6' }}
          >
            {service.service_category.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {service.short_description}
        </p>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {service.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price & Duration */}
        <div className="flex items-center justify-between mb-4 text-sm">
          {service.price_range && (
            <div className="font-bold text-green-600">{service.price_range}</div>
          )}
          {service.duration && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              {service.duration}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link href={`/interiors/${service.slug}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg group-hover:shadow-xl"
          >
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

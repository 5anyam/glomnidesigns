"use client"
// components/ProductDetailPage.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Share2, Heart, Star } from 'lucide-react';

// Type definitions
interface Feature {
  icon: string;
  title: string;
}

interface Colors {
  baseUnit: string;
  wallUnit: string;
}

interface ProjectReference {
  title: string;
  image: string;
}

interface ProductDetails {
  layout: string;
  dimensions: string;
  style: string;
  colors: Colors;
  shutterFinish: string;
  countertopMaterial: string;
  storageFeatures: string[];
}

interface ProductData {
  id: number;
  title: string;
  images: string[];
  features: Feature[];
  details: ProductDetails;
  previousProject: ProjectReference;
  nextProject: ProjectReference;
}

interface ProductDetailPageProps {
  productData?: ProductData;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sample data structure - replace with your Strapi data
  const defaultProduct: ProductData = {
    id: 1,
    title: "Contemporary L-Shaped Kitchen Design with Gloss Cabinets and Tall Storage",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600", 
      "/api/placeholder/800/600"
    ],
    features: [
      { icon: "🎨", title: "Customisable Designs" },
      { icon: "📅", title: "Flat 10 year warranty" },
      { icon: "💳", title: "Easy EMIs" },
      { icon: "🚚", title: "45 day delivery" }
    ],
    details: {
      layout: "L Shape Kitchen Design",
      dimensions: "10x12 feet",
      style: "Contemporary",
      colors: {
        baseUnit: "White Needle",
        wallUnit: "Frosty white"
      },
      shutterFinish: "Laminate in high gloss finish",
      countertopMaterial: "Granite",
      storageFeatures: [
        "High-gloss, floor-to-ceiling cabinetry dominates this kitchen, offering abundant concealed storage with multiple tall units, deep drawers, and lofts for rarely used items.",
        "Open upper shelves and glass-fronted cabinets allow for display and quick access to daily-use utensils or jars."
      ]
    },
    previousProject: {
      title: "Modern Open Kitchen Design with Handle...",
      image: "/api/placeholder/100/80"
    },
    nextProject: {
      title: "Modern U-Shaped Kitchen Design with...",
      image: "/api/placeholder/100/80"
    }
  };

  const product = productData || defaultProduct;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-red-500">LIVSPACE</div>
            <div className="hidden md:flex space-x-6">
              <span className="text-red-500 border-b-2 border-red-500 pb-1">Design Ideas</span>
              <span className="text-gray-600 hover:text-gray-900">Magazine</span>
              <span className="text-gray-600 hover:text-gray-900">Cities</span>
              <span className="text-gray-600 hover:text-gray-900">Portfolio</span>
              <span className="text-gray-600 hover:text-gray-900">Store Locator</span>
              <span className="text-gray-600 hover:text-gray-900">More</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium">
              Shop Furnishings New
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.title}
                fill
                className="object-cover"
              />
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Previous/Next Projects */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <Image
                  src={product.previousProject.image}
                  alt="Previous project"
                  width={60}
                  height={48}
                  className="rounded object-cover"
                />
                <div>
                  <p className="text-xs text-gray-500">Previous Project</p>
                  <p className="text-sm font-medium">{product.previousProject.title}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Next Project</p>
                  <p className="text-sm font-medium">{product.nextProject.title}</p>
                </div>
                <Image
                  src={product.nextProject.image}
                  alt="Next project"
                  width={60}
                  height={48}
                  className="rounded object-cover"
                />
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex justify-end space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm border">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{feature.title}</p>
                </div>
              ))}
            </div>

            {/* Kitchen Design Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Kitchen Design Details:</h2>
              
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Layout:</span> {product.details.layout}
                </div>
                <div>
                  <span className="font-semibold">Room Dimension:</span> {product.details.dimensions}
                </div>
                <div>
                  <span className="font-semibold">Style:</span> {product.details.style}
                </div>
                
                <div>
                  <span className="font-semibold">Colour:</span>
                  <div className="ml-4 mt-1 space-y-1">
                    <div>- Base unit: {product.details.colors.baseUnit}</div>
                    <div>- Wall unit: {product.details.colors.wallUnit}</div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold">Shutter finish:</span>
                  <div className="ml-4 mt-1">- {product.details.shutterFinish}</div>
                </div>
                
                <div>
                  <span className="font-semibold">Countertop Material:</span> {product.details.countertopMaterial}
                </div>
                
                <div>
                  <span className="font-semibold">Storage Features:</span>
                  <div className="ml-4 mt-2 space-y-2">
                    {product.details.storageFeatures.map((feature, index) => (
                      <div key={index}>- {feature}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors">
              GET FREE QUOTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
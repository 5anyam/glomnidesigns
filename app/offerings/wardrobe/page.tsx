"use client"
import { useState } from 'react';
import { Check, ArrowRight, Shield, Star, ChevronDown, Droplets, Layers, Settings, Box, Heart, Gift, Shirt, Sparkles } from 'lucide-react';
import Link from 'next/link';

const WardrobeOfferingsPage = () => {
  const [selectedRange, setSelectedRange] = useState<'aarambh' | 'premium'>('premium');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);


  // Why Choose Us Features
  const whyChooseUs = [
    {
      icon: <Box className="w-8 h-8" />,
      title: 'DuraBuild Cabinets',
      description: 'With soft-closing hinges and sturdy build for lasting durability'
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: 'AquaBloc Technology',
      description: 'Repels moisture from entering the core, protecting your wardrobe'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'AntiBubble Technology',
      description: 'For a smooth and seamless finish without imperfections'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Precision Engineered',
      description: 'Automated manufacturing process for error-free cabinets'
    }
  ];

  // Wardrobe Types
  const wardrobeTypes = [
    {
      title: 'His Wardrobe',
      icon: '👔',
      description: 'Smartly designed for modern men. It blends functionality with a sleek aesthetic, ideal for everyday efficiency.'
    },
    {
      title: 'Hers Wardrobe',
      icon: '👗',
      description: 'A chic and practical design crafted with elegant finishes, it brings both style and organization to her space.'
    },
    {
      title: 'Kids Wardrobe',
      icon: '🧸',
      description: 'Playful yet organized. Designed to grow with your child, it keeps their room neat and lively.'
    }
  ];

  // Wardrobe Styles
  const wardrobeStyles = [
    {
      name: 'Sliding-Door Wardrobe',
      description: 'A space-saver ideal for tighter rooms, the doors glide instead of swinging out, giving a clean, modern look.',
      features: ['Space-Saving', 'Mirror Panels', 'Frosted Glass', 'Wood Finishes']
    },
    {
      name: 'Glass & Metal Frame',
      description: 'Uses transparent or translucent glass doors with sleek metal frames, creating a high-end, showroom-type wardrobe.',
      features: ['Luxury Look', 'Metal Frames', 'Glass Doors', 'Trendy Design']
    },
    {
      name: 'Traditional Wooden',
      description: 'Classic and rich in character. Fits nicely in heritage or more formal interiors.',
      features: ['Classic Design', 'Rich Character', 'Heritage Style', 'Formal Look']
    }
  ];

  // Materials
  const coreMaterials = [
    {
      type: 'Engineered Wood',
      variants: 'MDF, HDF-HMR, PB',
      features: ['Lightweight', 'Budget-friendly', 'Good screw-holding', 'Varying load capacity']
    },
    {
      type: 'Plywood',
      variants: 'MR, BWR, BWP',
      features: ['High strength', 'Termite-resistant', 'Low emission', 'Premium quality']
    }
  ];

  // Finishes
  const finishes = [
    { name: 'Elite Laminate', description: 'Modern trends meet tactile textures and innovative designs', icon: '✨' },
    { name: 'Classic Laminate', description: 'Reliable and stylish, resists scratches and stains', icon: '🎨' },
    { name: 'Acrylic', description: 'Gentle, mirror-like finish for a premium look with UV stability', icon: '💫' }
  ];

  // Cabinet Types
  const cabinetTypes = [
    { icon: <Gift className="w-8 h-8" />, name: 'Hanging Cabinets', description: 'Perfect for storing shirts, dresses and coats without wrinkling' },
    { icon: <Layers className="w-8 h-8" />, name: 'Shelving Cabinets', description: 'Best for folded clothes, bags with adjustable shelves' },
    { icon: <Box className="w-8 h-8" />, name: 'Drawer Cabinets', description: 'Pull-out drawers for underclothing or jewelry' }
  ];

  // Smart Accessories
  const smartAccessories = [
    { icon: '👖', name: 'Pull-Out Trouser Rack', description: 'Organized storage for trousers' },
    { icon: '🪞', name: 'Built-In Mirror Panel', description: 'Sleek mirror without taking space' },
    { icon: '💡', name: 'Internal Lighting', description: 'LED strip lights for illumination' },
    { icon: '👔', name: 'Tie & Belt Organizer', description: 'Keeps ties and belts organized' },
    { icon: '💍', name: 'Jewelry Drawer Inserts', description: 'Compartments for jewelry' },
    { icon: '👞', name: 'Shoe Pull-Out Tray', description: 'Sliding trays for shoes' }
  ];

  const faqs = [
    {
      question: 'What is the warranty period for Glomni Designs wardrobes?',
      answer: 'We offer a flat 10-year warranty on all our Premium range wardrobes. The Aarambh range comes with a 1-year warranty covering manufacturing defects and material quality.'
    },
    {
      question: 'How long does delivery and installation take?',
      answer: 'We guarantee 45-day delivery with our Move-in Guarantee. This includes complete manufacturing, delivery, and professional installation.'
    },
    {
      question: 'Can I customize my wardrobe design?',
      answer: 'Absolutely! We offer complete customization including size, materials, finishes, shutter types, internal configurations, and accessories.'
    },
    {
      question: 'What materials do you use for wardrobe construction?',
      answer: 'We use premium quality engineered wood (MDF, HDF-HMR, PB) and plywood (MR, BWR, BWP) with AquaBloc and AntiBubble technology.'
    },
    {
      question: 'Do you provide design consultation?',
      answer: 'Yes! Our expert designers provide free consultation to help you choose the perfect wardrobe design, materials, and accessories.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Premium Wardrobe Solutions</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Glomni Designs Wardrobe Range
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Experience the perfect blend of style, functionality and craftsmanship
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-red-400 mb-1">10 Years</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Warranty*</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-red-400 mb-1">45 Days</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Delivery**</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-red-400 mb-1">100%</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Customizable</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-red-400 mb-1">500+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Glomni Designs Wardrobe
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Experience superior quality and innovative technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 rounded-full bg-red-400/10 flex items-center justify-center mb-4 text-red-400">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wardrobe Types */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Wardrobe For Everyone
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Perfectly designed for every family member's unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {wardrobeTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-5xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {type.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wardrobe Styles */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Types Of Wardrobe
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Choose from our diverse range of wardrobe styles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {wardrobeStyles.map((style, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {style.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {style.description}
                </p>
                <div className="space-y-2">
                  {style.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Materials */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Core Materials We Use
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Premium quality materials for lasting durability
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {coreMaterials.map((material, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {material.type}
              </h3>
              <p className="text-red-400 mb-4 font-semibold text-sm">
                {material.variants}
              </p>
              <ul className="space-y-2">
                {material.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Finishes */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Wardrobe Shutter Finishes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Choose from premium finish options
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {finishes.map((finish, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">{finish.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{finish.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{finish.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cabinet Types */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What's Inside Your Wardrobe
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Intelligent cabinet organization for maximum storage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cabinetTypes.map((cabinet, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-full bg-red-400/10 flex items-center justify-center mb-4 text-red-400">
                {cabinet.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {cabinet.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {cabinet.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Accessories */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Smart Accessories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Enhance your wardrobe with intelligent add-ons
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {smartAccessories.map((accessory, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-red-400 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{accessory.icon}</div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">{accessory.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{accessory.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Everything you need to know about our wardrobes
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
              >
                <span className="text-base font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    expandedFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFAQ === index && (
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12 md:pb-16">
        <div className="text-center bg-gradient-to-r from-red-400 to-red-500 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Ready to Design Your Dream Wardrobe?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get a free consultation with our design experts and transform your space today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-red-500 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl transition-all duration-300 hover:bg-white hover:text-red-500"
            >
              View Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardrobeOfferingsPage;

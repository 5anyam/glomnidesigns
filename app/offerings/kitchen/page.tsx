"use client"
import { useState } from 'react';
import { Check, ArrowRight, Shield, Droplets, Layers, Settings, Box, ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';

const KitchenOfferingsPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string>('l-shaped');

  // Kitchen Styles
  const kitchenStyles = [
    {
      name: 'Scandinavian Kitchen',
      description: 'Simple yet classy, clean and practical which emphasizes on the use of light colors & natural materials to create a new appearance.',
      icon: '❄️'
    },
    {
      name: 'Industrial Kitchen',
      description: 'Bold & contemporary with a mix of metal, wood and exposed finish to give a rough urban impression.',
      icon: '🏭'
    },
    {
      name: 'Farmhouse Kitchen',
      description: 'Warm & homely, open shelves with subtle wood detail for a cozy cooking experience.',
      icon: '🌾'
    },
    {
      name: 'Mediterranean Kitchen',
      description: 'Based on the charisma of the coastline with the use of colorful tiles, arches and natural earthy colors.',
      icon: '🌊'
    },
    {
      name: 'Bohemian Kitchen',
      description: 'Open shelving with artistic decoration are common to this eclectic kitchen style.',
      icon: '🎨'
    },
    {
      name: 'Contemporary Kitchen',
      description: 'Smooth & coordinating the latest materials with curved edges and new designs.',
      icon: '✨'
    }
  ];

  // Why Choose Us
  const whyChooseUs = [
    {
      icon: <Box className="w-8 h-8" />,
      title: 'DuraBuild Cabinets',
      description: 'With soft-closing hinges and sturdy build for lasting durability'
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: 'AquaBloc Technology',
      description: 'Repels moisture from entering the core, protecting your kitchen'
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

  // Kitchen Layouts
  const kitchenLayouts = [
    {
      id: 'l-shaped',
      name: 'L-Shaped Kitchen',
      description: 'Lean and small-space friendly, where cabinets and appliances are positioned along two side walls.',
      features: ['2 adjoining countertops', 'Corner spaces', 'Ideal for small homes']
    },
    {
      id: 'u-shaped',
      name: 'U-Shaped Kitchen',
      description: 'Provides the greatest counter and storage area with cabinets on three walls.',
      features: ['3 connected walls', 'Maximum storage', 'Open entrance']
    },
    {
      id: 'straight',
      name: 'Straight-Line Kitchen',
      description: 'Single wall design, very suitable for a small place or a studio apartment.',
      features: ['Cabinets in single line', 'Space-efficient', 'Budget-friendly']
    },
    {
      id: 'parallel',
      name: 'Parallel (Galley) Kitchen',
      description: 'Two matching counters that render the cooking procedure effective and systematized.',
      features: ['Two parallel counters', 'Efficient workflow', 'Great for small spaces']
    },
    {
      id: 'island',
      name: 'Island Kitchen',
      description: 'Central island for additional workspace, dining space, or storage - suited to open plan houses.',
      features: ['Central island', 'Extra workspace', 'Social cooking']
    },
    {
      id: 'peninsula',
      name: 'Peninsula Kitchen',
      description: 'Like an island design but interlocked to a wall or counter forming a semi-open space.',
      features: ['Connected island', 'Semi-open design', 'Space-saving']
    }
  ];

  // Core Materials
  const coreMaterials = [
    {
      type: 'Engineered Wood',
      variants: 'MDF, HDF-HMR, PB',
      description: 'Lightweight, budget-friendly with varying range of load and screw-holding capacities',
      features: ['Budget-friendly', 'Lightweight', 'Versatile']
    },
    {
      type: 'Plywood',
      variants: 'MR, BWR, BWP',
      description: 'Most widely used in kitchen cabinets, strong and waterproof material',
      features: ['High strength', 'Termite-resistant', 'Low emission']
    }
  ];

  // Shutter Finishes
  const shutterFinishes = [
    { name: 'Elite Laminate', description: 'Modern trends meet tactile textures and designs', icon: '✨' },
    { name: 'Classic Laminate', description: 'Scratch, moisture, and stain resistant for everyday use', icon: '🎨' },
    { name: 'Membrane', description: 'Comes with grooves and is stain-resistant', icon: '💫' },
    { name: 'Acrylic/High-Gloss', description: 'Smooth and shiny finish giving a luxury modern appearance', icon: '💎' },
    { name: 'PU Paint Finish', description: 'Smooth painted finish with high quality and long-lasting look', icon: '🖌️' }
  ];

  // Handle Types
  const handleTypes = [
    { name: 'Regular Handles', description: 'Low-maintenance and easy to use in linear and classic designs', icon: '🔘' },
    { name: 'Edge Profile', description: 'Placed along edges, gives an illusion of being handle-less', icon: '➖' },
    { name: 'Gola', description: 'Attached to carcass cabinet for a seamless look', icon: '〰️' },
    { name: 'Knobs', description: 'Simple, round or square; versatile and classic', icon: '⚫' },
    { name: 'Recessed Pulls', description: 'Built into the shutter for a minimalist look', icon: '⬜' }
  ];

  // Countertops
  const countertops = [
    { name: 'Granite', description: 'Classic, strong, heat-proof in natural designs', features: ['Durable', 'Heat-resistant', 'Low maintenance'] },
    { name: 'Quartz', description: 'Non-porous, low-care, uniform color for modern kitchens', features: ['Tough', 'Polished look', 'Various colors'] },
    { name: 'Marble', description: 'Expensive and beautiful but needs special care', features: ['Luxurious', 'Elegant', 'Premium'] },
    { name: 'Solid Surfaces', description: 'Non-porous, stain-resistant and easy to maintain', features: ['Seamless', 'Easy maintenance', 'Hygienic'] }
  ];

  // Cabinet Types
  const cabinetTypes = [
    { name: 'Base Units', description: 'Placed on floor, goes up to countertop for heavy items like pots and pans' },
    { name: 'Wall Units', description: 'Can be hung on wall, runs over dado area up to 7 ft for dishes and spices' },
    { name: 'Semi-tall Units', description: 'Located on floor, runs above countertop height for pantry storage' },
    { name: 'Tall/Pantry Cabinets', description: 'Full-height cabinets for large-scale storage of pantry supplies' }
  ];

  // Sink Types
  const sinkTypes = [
    { name: 'Single Bowl Sink', description: 'Budget-friendly and can handle large items like pots', icon: '🚰' },
    { name: 'Double Bowl Sink', description: 'Versatile for food prep and drying of utensils', icon: '🚿' },
    { name: 'Touchless/Sensor Faucet', description: 'Hands-free, hygienic, convenient use', icon: '💧' }
  ];

  const faqs = [
    {
      question: 'What is the warranty period for Glomni Designs kitchens?',
      answer: 'We offer a flat 10-year warranty on all our modular kitchens. This covers manufacturing defects, material quality, and hardware.'
    },
    {
      question: 'How long does delivery and installation take?',
      answer: 'We guarantee 45-day delivery with our Move-in Guarantee. This includes complete manufacturing, delivery, and professional installation.'
    },
    {
      question: 'Can I customize my kitchen design?',
      answer: 'Absolutely! We offer complete customization including layout, materials, finishes, countertops, handles, and all hardware to match your specific needs.'
    },
    {
      question: 'What materials do you use for kitchen cabinets?',
      answer: 'We use premium quality engineered wood (MDF, HDF-HMR, PB) and plywood (MR, BWR, BWP) with AquaBloc and AntiBubble technology for durability.'
    },
    {
      question: 'Do you provide design consultation?',
      answer: 'Yes! Our expert designers provide free consultation to help you choose the perfect kitchen layout, style, materials, and finishes.'
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
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Premium Modular Kitchens</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              The Glomni Designs Kitchen Range
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Transform your cooking space with premium modular kitchens designed for elegance and practicality
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

      {/* Kitchen Styles */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Kitchen Styles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Choose from our diverse range of kitchen design styles
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenStyles.map((style, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-5xl mb-4">{style.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {style.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {style.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Glomni Designs Kitchen
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

      {/* Kitchen Layouts */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Know Your Kitchen Layout
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Understanding layout is the first step to planning a perfect kitchen
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenLayouts.map((layout, index) => (
            <div
              key={index}
              onClick={() => setSelectedLayout(layout.id)}
              className={`cursor-pointer bg-white dark:bg-gray-900 rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 ${
                selectedLayout === layout.id
                  ? 'border-red-400 shadow-xl'
                  : 'border-gray-200 dark:border-gray-800 hover:border-red-400/50'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {layout.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {layout.description}
              </p>
              <div className="space-y-2">
                {layout.features.map((feature, idx) => (
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

      {/* Core Materials */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Core Materials We Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Superior quality materials ensure your kitchen lasts a lifetime
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
                <p className="text-red-400 mb-3 font-semibold text-sm">
                  {material.variants}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {material.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {material.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shutter Finishes */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Shutter Finishes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Choose from premium finish options for your kitchen
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shutterFinishes.map((finish, index) => (
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

      {/* Handle Types */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Handle Options
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Select from various handle styles for your kitchen cabinets
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {handleTypes.map((handle, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-red-400 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{handle.icon}</div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">{handle.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{handle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Countertops */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Countertops & Backsplashes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Premium countertop materials for durability and style
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {countertops.map((top, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {top.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {top.description}
              </p>
              <ul className="space-y-1">
                {top.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Cabinet Types */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Components That Make Your Kitchen
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Understanding cabinet types for optimal kitchen design
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cabinetTypes.map((cabinet, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {cabinet.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {cabinet.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sink & Faucets */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Sink & Faucets
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Quality sinks and faucets for your dream kitchen
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sinkTypes.map((sink, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-3">{sink.icon}</div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{sink.name}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{sink.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Everything you need to know about our modular kitchens
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
            Ready to Design Your Dream Kitchen?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get a free consultation with our design experts and transform your cooking space today
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

export default KitchenOfferingsPage;

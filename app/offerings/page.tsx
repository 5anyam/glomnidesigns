"use client"
import { useState } from 'react';
import { ArrowRight, Sparkles, Home, Package, Sofa, Star, ChevronDown, Check, Users, Shield, Lightbulb, Leaf, Layout, Palette } from 'lucide-react';
import Link from 'next/link';

const MainOfferingsPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Main Offerings
  const mainOfferings = [
    {
      title: 'Kitchen Design',
      icon: '🍳',
      description: 'Premium Modular and classy kitchens that have been designed to infuse the notion of elegance and practicality. Glomni Designs turns the kitchen rooms into magnificent works of art.',
      link: '/offerings/kitchen',
      features: ['Modular Solutions', 'Smart Storage', 'Premium Materials', 'Custom Layouts']
    },
    {
      title: 'Wardrobe Design',
      icon: '👔',
      description: 'Make the most of the spaciousness with smooth, personalized wardrobes that provide the luxury, organizational, and classic design - designed to suit your way of life.',
      link: '/offerings/wardrobe',
      features: ['Space Optimization', 'Custom Organization', 'Luxury Finishes', 'Smart Accessories']
    },
    {
      title: 'Living Spaces',
      icon: '🛋️',
      description: 'Design welcoming living spaces that are in line with your personality. Glomni Designs selects the comfort, beauty, and harmony in all details of your home.',
      link: '/offerings/living-spaces',
      features: ['Personalized Design', 'Comfort Focus', 'Aesthetic Balance', 'Functional Layouts']
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Neha Mehta',
      location: 'South Delhi',
      text: 'The model of my kitchen and living room will look like a magazine thanks to Glomni Designs! I think the elegance, efficiency and the design they come in is very much tailor-made and very suitable to my home.',
      rating: 5
    },
    {
      name: 'Rohan Bhatia',
      location: 'Gurugram',
      text: 'The team actually knew what we needed. Our wardrobes and modular interiors appear trendy but useful - the level of detail attention is merely excellent.',
      rating: 5
    },
    {
      name: 'Aditi Sharma',
      location: 'Noida',
      text: 'I enjoyed the flow with which Glomni Designs managed to conduct business, conception to the ultimate. My apartment is now big, modern and well balanced.',
      rating: 5
    },
    {
      name: 'Arjun Khanna',
      location: 'Dwarka',
      text: 'Professional, creative, and reliable... That is Glomni Designs! They have made my modular home interiors a luxurious and warm place.',
      rating: 5
    }
  ];

  // Focus Areas
  const focusAreas = [
    {
      icon: <Layout className="w-8 h-8" />,
      title: 'Smart Space Planning',
      description: 'The space is used effectively, without wasting any inch in order to optimize movement and functionality.'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'High Quality Materials',
      description: 'We use the finest quality in terms of material like long lasting finishes and fashionable textures.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Personal Design',
      description: 'Every design is personalized to your taste, your lifestyle and your space.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Creative Storage',
      description: 'Smart, hidden, and organized solutions that make life in the modern world easier.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Perfect Lighting & Detailing',
      description: 'Thoughtful lighting and work that makes your interiors come alive.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable Design',
      description: 'Environmentally friendly materials and energy saving designs towards a greener home.'
    }
  ];

  // FAQs
  const faqs = [
    {
      question: 'What is the difference between Glomni Designs Select and Glomni Designs Vesta?',
      answer: 'There are two service packages of design called Glomni Designs- Select and Vesta. Select tends to be less sophisticated in design and execution, whereas Vesta is more premium materials, finishes and fully customized.'
    },
    {
      question: 'What can I expect to spend if I were to choose Glomni Designs Select?',
      answer: 'The Select package pricing will rely on the size of your home and the material options you select. An average interior project can cost between 2-4k per sq. ft. Get a complete quote to know the cost of design, furniture and labour.'
    },
    {
      question: 'Is this a safe time to do my home interiors?',
      answer: 'It is time to design or implement interiors provided that you have your budget and time schedule ready. The supply of materials and labor is also stable, and the designers can effectively handle the site work with appropriate safety and quality inspections.'
    },
    {
      question: 'How is Glomni Designs different from contractors/individual designers/studios?',
      answer: 'Glomni Designs offers end-to-end interior solutions with a dedicated team of professionals, premium materials, and guaranteed timelines. We provide a single point of contact for the entire project, ensuring quality control and seamless execution.'
    },
    {
      question: 'What are the cities that Glomni Designs currently operates in?',
      answer: 'Glomni Designs is already in operation in Delhi NCR, that covers Delhi, Noida, Gurgaon, Ghaziabad, Faridabad and Greater Noida. Remote design or long term service can be checked by clients who are not located in NCR.'
    },
    {
      question: 'Can I get just a part of my home designed?',
      answer: 'Yes, you may select to only design certain spaces such as the kitchen, living room or even the bedroom. Glomni Designs will provide a customizable design package of partial interior constructions with the same design consideration as complete home designs.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, but booking can get cancelled, though it will be dependent on your terms of the contract. Part of the amount paid as a booking might not be refunded after design or procurement is started hence ensure the policies are verified before payment.'
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
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Home Interior Solutions</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              We Don't Just Create Interiors,
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 mb-6">
              We Craft Experiences That Re-examine Modern Living
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              At Glomni Designs, every space tells a story of elegance, functionality, and personalized design
            </p>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What We Offer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Comprehensive interior design solutions for every space in your home
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {mainOfferings.map((offering, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-red-400 transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-6xl mb-4">{offering.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-400 transition-colors">
                {offering.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                {offering.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {offering.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={offering.link}
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-500 font-semibold transition-colors group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* We Focus On */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              We Focus On
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Our core principles that define every project we undertake
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 rounded-full bg-red-400/10 flex items-center justify-center mb-4 text-red-400">
                  {area.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Real experiences from our satisfied customers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-red-400 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Packages */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Service Packages
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Choose the package that suits your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-8 hover:border-red-400 transition-all duration-300">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Glomni Designs Select</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Essential interior design package with standard materials and finishes
              </p>
              <div className="text-2xl font-bold text-red-400 mb-6">₹2-4K per sq. ft.</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Standard Design Execution</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Quality Materials</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Essential Customization</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>1 Year Warranty</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-gray-900 rounded-2xl border-2 border-red-400 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                Premium
              </div>
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Glomni Designs Vesta</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Premium luxury package with high-end materials and full customization
              </p>
              <div className="text-2xl font-bold text-red-400 mb-6">₹4K+ per sq. ft.</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Premium Design & Execution</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>High-End Materials & Finishes</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Full Customization</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Extended Warranty</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Dedicated Support</span>
                </li>
              </ul>
            </div>
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
            Everything you need to know about our services
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
            Ready to Transform Your Home?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get a free consultation with our design experts and start your interior design journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-red-500 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Users className="w-5 h-5" />
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

export default MainOfferingsPage;

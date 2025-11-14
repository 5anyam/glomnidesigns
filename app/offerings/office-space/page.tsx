"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  Lightbulb, 
  Palette, 
  Layout, 
  Building2, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  ChevronDown,
  Check,
  Zap,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OfficeOfferingsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of office interiors does Glomni Designs specialise in?",
      answer: "We deal in numerous kinds of office interior at Glomni Designs such as coworking space, open workspace, conference room, private cabins, reception area, and break area. We aim at creating a workspace that will enhance its utility, innovation, and comfort."
    },
    {
      question: "Why should I choose Glomni Designs for my office interior in Noida?",
      answer: "Glomni Designs mixes creativity, easy-to-use, and modern, stylish design for your office interiors that shows your brand’s image. With years of experience and a skilled design team in Noida, we make sure to timely delivery, give budget-friendly ideas, and best performance."
    },
    {
      question: "How long does it take to complete an office interior project?",
      answer: "The project time is based on the office size, design, and customer needs. A normal office interior in Noida takes four to eight weeks from design to final output."
    },
    {
      question: "Do you offer custom interior design solutions for offices?",
      answer: "Yes, we do customised office interiors based on your company brand, your space needs and staff needs. Every project starts with a proper discussion & design presentation."
    },
    {
      question: "Can Glomni Designs handle both design and execution?",
      answer: "Yes, we are offering office interior turnkey services, concept design, 3D visualisation, project execution, furniture assembly, and end-of-project handover."
    },
    {
      question: "Do you also provide renovation services for existing office spaces?",
      answer: "Yes, Glomni Designs gives office renovation and remodelling services in Noida. You may either wish to have a new look in your workspace or to change and tailor workspace layouts so as to fit in your efficiency; you can leave the rest to our team."
    },
    {
      question: "Can you design office interiors for startups and small businesses?",
      answer: "Yes! We love working with startups and small businesses. Our team designs smart, free to move, and budget-friendly office interiors that improve their use and style."
    },
    {
      question: "How do I get started with Glomni Designs for my office project?",
      answer: "Simply contact us through our website or call our Noida office to schedule a consultation. We will discuss your requirements, space design, and style before giving a design proposal."
    },
    {
      question: "Do you offer on-site consultations in Noida and nearby areas?",
      answer: "Yes, we give proper discussion across Noida, Greater Noida, Delhi, and NCR regions. Our designers visit your place to take look, understand the place, and suggest the best design style."
    }
  ];

  const services = [
    { name: "Reception Area", icon: "Briefcase", href: "/services/office/reception", description: "Make a great first impression with a warm & best design." },
    { name: "Open Workspaces", icon: "Users", href: "/services/office/open-workspaces", description: "Simple and classy design that helps teamwork and comfort." },
    { name: "Private Cabins", icon: "Building2", href: "/services/office/private-cabins", description: "Stylish and peaceful spaces for focused work and meetings." },
    { name: "Meeting Rooms", icon: "Users", href: "/services/office/meeting-rooms", description: "Modern and well-planned for smooth discussions." },
    { name: "Pantry & Cafeteria", icon: "Zap", href: "/services/office/pantry", description: "Relaxing and comfortable areas for coffee breaks and lunch hours." },
    { name: "Storage & Filing Areas", icon: "Layout", href: "/services/office/storage", description: "Smart, organised spaces that keep your office things safe." },
    { name: "Washrooms & Utility Corners", icon: "Leaf", href: "/services/office/washrooms", description: "Clean, modern, and easy-to-use designs for everyday comfort." }
  ];

  const styles = [
    { name: "Modern Corporate", icon: "Award", description: "Sleek design with smart interior and perfect lighting." },
    { name: "Minimalist Design", icon: "Palette", description: "Clean lines and free space that improve focus." },
    { name: "Industrial Look", icon: "Building2", description: "Raw, open, and useful spaces with exposed materials and textures." },
    { name: "Contemporary Elegance", icon: "Lightbulb", description: "Trendy, lively, and flexible workspaces that fit today's needs." },
    { name: "Luxury Executive", icon: "Award", description: "Premium finishes and best modern interiors for leadership cabins." },
    { name: "Creative Studio Style", icon: "Palette", description: "Bright colors and innovative setups for design and media offices." }
  ];

  const flooringOptions = [
    { name: "Vinyl Flooring", description: "Modern, affordable, and easy to clean – perfect for busy areas." },
    { name: "Carpet Tiles", description: "Comfortable and noise-controlling for open workplaces and meeting rooms." },
    { name: "Hardwood Flooring", description: "Best for the long term & gives a rich look in the main places." },
    { name: "Epoxy Flooring", description: "Seamless, strong, and best for heavy-use places." },
    { name: "Laminate Flooring", description: "Elegant & affordable, great for all office types." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-red-400/10 to-gray-50 dark:from-red-900/20 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/office-hero-bg.jpg')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Design Your Workplace, Design Your Achievements
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              A good design office is not just about looks. It helps people work better, stay happy, and feel motivated.
              At Glomni Designs, we create offices that are modern, comfortable, and stylish, places where ideas grow and teams work with joy.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
              >
                Get Your Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Office Interiors Matter */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Why Office Interiors Matter
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Turn Your Office into a Better Place to Work
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            <p className="mb-6">
              Your office design plays an important part in how your team feels and works every day. From lighting and design to interior and colours, every material affects focus, comfort, and energy levels.
            </p>
            <p className="mb-6">
              At Glomni Designs, we understand how a well-designed office can motivate your team and impress your partners. Our design experts make interiors that balance style, comfort, and its use, & make sure your office truly reflects your business goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              What We Offer
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Complete Office Interior Solutions – From Concept to Completion
            </motion.p>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            Glomni design can make every part of your office with creativity, comfort, and functionality in mind.
            Whether it is a corporate office, startup space, or co-working area, Glomni Designs helps you create an office that fits your business perfectly.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-red-400 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    {service.icon === 'Briefcase' && <Briefcase className="w-6 h-6 text-red-400" />}
                    {service.icon === 'Users' && <Users className="w-6 h-6 text-red-400" />}
                    {service.icon === 'Building2' && <Building2 className="w-6 h-6 text-red-400" />}
                    {service.icon === 'Layout' && <Layout className="w-6 h-6 text-red-400" />}
                    {service.icon === 'Zap' && <Zap className="w-6 h-6 text-red-400" />}
                    {service.icon === 'Leaf' && <Leaf className="w-6 h-6 text-red-400" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                  </div>
                </div>
                <Link 
                  href={service.href}
                  className="inline-flex items-center text-red-400 hover:text-red-500 font-semibold text-sm"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles We Offer */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Styles We Offer
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Choose a Style That Looks Good for Your Brand
            </motion.p>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            Every office has its own goal, and we help you to achieve your goal with the best design. Whether you want a minimal, elegant, or creative workplace, we bring your idea to life.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {styles.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-red-400 transition-all duration-300 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-red-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {style.icon === 'Award' && <Award className="w-8 h-8 text-red-400" />}
                  {style.icon === 'Palette' && <Palette className="w-8 h-8 text-red-400" />}
                  {style.icon === 'Building2' && <Building2 className="w-8 h-8 text-red-400" />}
                  {style.icon === 'Lightbulb' && <Lightbulb className="w-8 h-8 text-red-400" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{style.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{style.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flooring Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Flooring Options for Your Office
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Durable & Stylish Surface for Every Office Space
            </motion.p>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            We believe your office floor sets the tone for your complete office. That is why we give high-quality, stylish, and easy-to-maintain surfaces twitch is best for every type of office. Our team will help you choose the best surface that meets your interior design and usage.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flooringOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-red-400 transition-all duration-300 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-3">{option.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-400 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Office?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Let's discuss your vision and create a workspace that inspires productivity and growth.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-white text-red-400 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              Schedule Consultation
            </Link>
            <Link 
              href="/portfolio/office"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-red-400 transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

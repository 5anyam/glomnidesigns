"use client"
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  MapPin, 
  Phone, 
  Mail,
  Palette,
  Building,
  Home,
  Cpu,
  Wrench,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Lightbulb,
  Handshake,
  Zap,
  HeadphonesIcon
} from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  const expertise = [
    {
      icon: <Home className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Interior Designs",
      description: "Beautiful home interiors that reflect your personality",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Office Spaces", 
      description: "Productive and stylish workspace solutions",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Constructions",
      description: "Quality construction with attention to detail",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Data Centers",
      description: "Efficient and reliable data center solutions",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Innovative",
      description: "We deliver new ways and clever solutions to any home interior, construction project, data centres, and offices creating visions in reality."
    },
    {
      icon: <Handshake className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Collaboration",
      description: "We operate closely together with our clients and join your visions and our experience to produce spaces that can be said to represent your vision and your needs."
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Excellence",
      description: "We pay attention to quality, accuracy, and finishing that make each project stand out, starting from design conception through delivery."
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Reliability",
      description: "At Glomni Design, our customers can count on us for keeping promises, providing the best quality work, and fulfilling their demands."
    }
  ];

  const usp = [
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Real-Time Design Solutions",
      description: "We provide real design previews by generating AI design features that let you see exactly how your idea will look before the work starts."
    },
    {
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Standard & Transparent Pricing",
      description: "We promise & provide clear, honest project costs with no hidden charges."
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Quality & Time Delivery",
      description: "At Glomni design, we promise to deliver Quality work that satisfies our customer standards within the promised time."
    },
    {
      icon: <HeadphonesIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "After-Delivery Support",
      description: "We stay connected after the project is done, offering feedback checks and assistance for up to 15 days or a month."
    }
  ];

  const locations = ["Delhi", "Noida", "Gurgaon"];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-Optimized Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Palette className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">About Us</h1>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
            >
              Glomni Designs
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-2"
            >
              At Glomni Designs, every space has a story to share. With fresh ideas, genuine passion, and hands-on experience, along with generating AI design feature our designers bring your ideas to life. We believe in creating a space that you live & enjoy every day.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Expertise Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Expertise</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              From efficient data centres to stylish office spaces and high-quality home interiors, we combine our expertise and creativity to provide you with the best output.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Story Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0" />
                <span>OUR STORY</span>
              </h2>
              
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                <p>
                  Glomni Designs, starting with a simple but daring idea— to change how spaces are designed and experienced. We began as a small, passionate team and have grown into a complete design and build company, valued for quality work across home interiors, office spaces, constructions, and efficient data centres.
                </p>
                
                <p>
                  Since the beginning, we have held the belief that a space should inspire, show personality, and tell a story of how it has been built. We complete all our projects on this idea, whether it involves designing an effective critical data centre, the best constructed buildings, converting a happy living space, or creating a stylish and productive office.
                </p>
                
                <p>
                  We as a team try our best to complete the projects in just a few days, and sometimes it can vary depending on the size and location of the project, as well as what kind of project it is, because we believe in providing quality work to our customers.
                </p>
                
                <p>
                  For data centres, we provide end-to-end services, carefully planned rack setups, non-IT infrastructure, and smart layouts that keep smooth operations and long-term reliability. Every detail is planned correctly, including technical expertise with creative design, so your space works beautifully and efficiently.
                </p>
                
                <p className="font-semibold text-blue-600 text-base sm:text-lg md:text-xl">
                  At Glomni Designs, we don't just build spaces—we craft environments that are practical, inspiring, and ready for the future.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-first lg:order-last"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">500+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">50+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">3</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600">Cities Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">5+</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Values Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              <span>OUR VALUES</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Our work is guided by values that shape every design, build, and transformation we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {value.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">{value.title}</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-Optimized USP Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />
              <span>USP</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              What makes us unique and why clients choose Glomni Designs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {usp.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 sm:mb-6">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Location Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />
              <span>Location</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
              We serve our services in Delhi, Noida, and Gurgaon, delivering quality designs and builds to match every client's vision. Wherever you are in these cities, we're just a call away.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/30 transition-all duration-300"
                >
                  <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 text-yellow-300" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{location}</h3>
                  <p className="text-sm sm:text-base text-blue-100">Quality Design Services</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-4 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Ready to Transform Your Space?</h3>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 px-2">
                Contact us today for a free consultation and let's bring your vision to life!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                <button className="flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </button>
                <button className="flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold rounded-lg sm:rounded-xl hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Get Quote
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Building2, Lightbulb, Users, Award, ArrowRight, Server, Home, Briefcase, Hammer } from 'lucide-react';

const AboutUs = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Interior Design",
      description: "Creating beautiful, functional spaces that reflect your personality and lifestyle with innovative design solutions."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Office Spaces",
      description: "Designing productive work environments that inspire creativity and enhance team collaboration."
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "Construction",
      description: "Complete construction services from concept to completion with attention to detail and quality craftsmanship."
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Data Centers",
      description: "Specialized infrastructure design for mission-critical data center facilities with optimal performance."
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Happy Clients" },
    { number: "25+", label: "Expert Team" }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "We embrace cutting-edge design trends and technologies to create spaces that are ahead of their time."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "We work closely with our clients to understand their vision and bring it to life through seamless partnership."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "Quality is at the heart of everything we do, from initial concept to final implementation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-8">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">About Our Company</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-6">
            Transforming Spaces,
            <br />Creating Stories
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We believe that every space has the potential to tell a story. Our team of passionate and 
            experienced designers is dedicated to transforming your vision into reality.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From residential interiors to complex data centers, we bring specialized knowledge 
              and creative vision to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-2 mt-6 text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize how spaces are designed and built, we have grown 
                  from a small team of passionate designers to a comprehensive design and construction firm.
                </p>
                <p>
                  Our journey began with a simple belief: every space should not only be functional but 
                  should also inspire and tell a meaningful story. This philosophy guides every project 
                  we undertake, from intimate residential interiors to large-scale commercial developments.
                </p>
                <p>
                  Today, we specialize in creating environments that seamlessly blend aesthetics with 
                  functionality, whether it's a cozy home interior, a dynamic office space, a robust 
                  construction project, or a mission-critical data center.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
                <div className="text-6xl font-bold mb-4">15+</div>
                <div className="text-xl mb-6">Years of Excellence</div>
                <p className="text-blue-100 leading-relaxed">
                  Over a decade and a half of creating exceptional spaces, building lasting 
                  relationships, and pushing the boundaries of design innovation.
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-purple-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Let's work together to create a space that tells your unique story. 
            Our team is ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2 group">
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300">
              View Our Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
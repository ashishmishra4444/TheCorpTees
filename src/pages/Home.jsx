import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Star, TrendingUp, Users, Award, Clock, Shield,
  MessageSquare, Palette, FileCheck, ShieldCheck, Truck,
  ChevronRight, Building2, Rocket, GraduationCap, HeartPulse,
  Factory, Hotel, CalendarDays, Landmark, Zap
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { processSteps, whyChooseUs, testimonials, industries } from '../data/mockData';
import ProductGrid from '../components/products/ProductGrid';
import CustomButton from '../components/shared/CustomButton';

const industryIcons = {
  corporate: Building2,
  startups: Rocket,
  education: GraduationCap,
  healthcare: HeartPulse,
  manufacturing: Factory,
  hospitality: Hotel,
  events: CalendarDays,
  government: Landmark,
};

function SectionReveal({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { setCategory } = useAppState();
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dual Column Asymmetrical Layout */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] py-12 lg:py-0">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
              className="order-2 lg:order-1"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full mb-6"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">
                  India's #1 Corporate Merchandise Brand
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
                Where Brands
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  Wear Their Identity
                </span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                From Employee Welcome Kits to Corporate Uniforms, we create merchandise
                that represents your brand. Trusted by 500+ companies across India.
              </p>

              {/* Metric Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Users, label: '500+ Clients', value: 'Served' },
                  { icon: TrendingUp, label: '10,000+', value: 'Units Delivered' },
                  { icon: Award, label: 'ISO 9001', value: 'Certified' },
                  { icon: Clock, label: '24-48 Hr', value: 'Express Delivery' },
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm"
                  >
                    <metric.icon className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{metric.label}</p>
                      <p className="text-[10px] text-slate-500">{metric.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <CustomButton size="lg" icon={ArrowRight} iconPosition="right" onClick={scrollToProducts}>
                  View Our Products
                </CustomButton>
                <Link to="/request-quote">
                  <CustomButton variant="outline" size="lg">
                    Get a Free Quote
                  </CustomButton>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Product Collage Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 100 }}
              className="order-1 lg:order-2"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=533&fit=crop"
                      alt="Corporate Welcome Kit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1625910513413-5fc4e5e6727a?w=400&h=400&fit=crop"
                      alt="Corporate Polo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="space-y-3 sm:space-y-4 pt-6 sm:pt-8"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"
                      alt="Corporate Hoodie"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=533&fit=crop"
                      alt="Conference Kit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Product Discovery Feed - Meesho Style */}
      <section ref={productsRef} className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Discover Premium Corporate Merchandise
              </h2>
              <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                Browse our extensive catalog of corporate apparel, employee kits, gifting solutions, and event merchandise.
              </p>
            </div>
          </SectionReveal>

          <ProductGrid showFilters={false} limit={10} title="Featured Products" />

          <div className="text-center mt-8">
            <Link to="/gallery">
              <CustomButton variant="outline" icon={ArrowRight} iconPosition="right">
                View All Products
              </CustomButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                The Corp Tees Advantage
              </h2>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <SectionReveal key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process - Timeline */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Our Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                From Concept to Delivery in 5 Steps
              </h2>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {processSteps.map((step, index) => (
              <SectionReveal key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative text-center"
                >
                  {/* Connector Line (desktop only) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-slate-700" />
                  )}

                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
                    <step.icon className="w-7 h-7 text-slate-900" />
                  </div>
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-amber-500">
                    <span className="text-xs font-bold text-amber-500">{step.step}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Industries We Serve
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Trusted Across 8 Key Sectors
              </h2>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => {
              const Icon = industryIcons[industry.id] || Building2;
              return (
                <SectionReveal key={index}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group p-5 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-slate-100 group-hover:bg-amber-100 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Icon className="w-6 h-6 text-slate-600 group-hover:text-amber-600 transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">{industry.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{industry.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs font-medium text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Testimonials
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                What Our Clients Say
              </h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <SectionReveal key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Get a free quote within 24 hours. No commitments, no hidden charges.
              Just premium merchandise tailored to your brand.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/request-quote">
                <CustomButton size="lg" icon={ArrowRight} iconPosition="right">
                  Get a Free Quote Now
                </CustomButton>
              </Link>
              <Link to="/gallery">
                <CustomButton variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Browse Products
                </CustomButton>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

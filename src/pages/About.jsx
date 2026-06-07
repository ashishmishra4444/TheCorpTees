import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Target, Eye, Heart, Users, Award, Globe, TrendingUp, ArrowRight,
  Star
} from 'lucide-react';
import { processSteps, testimonials } from '../data/mockData';
import CustomButton from '../components/shared/CustomButton';

function SectionReveal({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              About The Corp Tees
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6 leading-tight">
              More Than Merchandise.
              <span className="block text-amber-400">We Build Brand Experiences.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              Every successful brand leaves an impression. At The Corp Tees, we help organizations 
              create that impression through thoughtfully designed, premium-quality merchandise and branding solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <SectionReveal>
              <div className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 h-full">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  To help brands become memorable through exceptional merchandise. We believe that every 
                  product that carries your logo is an ambassador of your brand values, culture, and commitment to quality.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Whether it's an employee's first day, a company's annual event, a college fest, or a 
                  customer gifting campaign, we ensure every product reflects professionalism, quality, and brand pride.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white h-full">
                <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-slate-900" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  To Become India's Most Trusted Corporate Merchandise Brand.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  We envision a future where every organization can effortlessly source premium merchandise 
                  that enhances employee engagement, strengthens brand identity, and creates lasting impressions 
                  across all touchpoints.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, value: '500+', label: 'Happy Clients' },
                { icon: Award, value: '10,000+', label: 'Orders Delivered' },
                { icon: Globe, value: '25+', label: 'States Covered' },
                { icon: TrendingUp, value: '98%', label: 'Client Retention' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-white rounded-xl border border-slate-200 text-center"
                >
                  <stat.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                How We Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Our 5-Step Process
              </h2>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {processSteps.map((step, index) => (
              <SectionReveal key={index}>
                <div className="relative text-center group">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-slate-200 group-hover:bg-amber-200 transition-colors" />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 group-hover:border-amber-300 transition-colors shadow-sm"
                  >
                    <step.icon className="w-8 h-8 text-amber-600" />
                  </motion.div>
                  <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3 -mt-2 relative z-10">
                    <span className="text-xs font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                What Drives Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">Our Core Values</h2>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Passion', desc: 'We love what we do, and it shows in every product we create.' },
              { icon: Award, title: 'Quality', desc: 'Never compromise on materials, craftsmanship, or finishing.' },
              { icon: Users, title: 'Partnership', desc: 'We grow when our clients grow. Your success is our success.' },
              { icon: TrendingUp, title: 'Innovation', desc: 'Constantly exploring new techniques, materials, and designs.' },
            ].map((value, idx) => (
              <SectionReveal key={idx}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors"
                >
                  <value.icon className="w-8 h-8 text-amber-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Client Stories
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Trusted by Industry Leaders
              </h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <SectionReveal key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm"
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
                      <p className="text-xs text-slate-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Let's Build Something Great Together
            </h2>
            <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
              Ready to elevate your brand with premium merchandise? Get in touch and let's discuss your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/request-quote">
                <CustomButton size="lg" icon={ArrowRight} iconPosition="right">
                  Get a Free Quote
                </CustomButton>
              </Link>
              <Link to="/gallery">
                <CustomButton variant="outline" size="lg">
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

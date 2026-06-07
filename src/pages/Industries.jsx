import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Building2, Rocket, GraduationCap, HeartPulse, Factory, Hotel,
  CalendarDays, Landmark, ArrowRight, Check, Users, Briefcase
} from 'lucide-react';
import { industries } from '../data/mockData';
import { useAppState } from '../context/AppStateContext';
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

const industryProducts = {
  corporate: ['Corporate Polo T-Shirts', 'Employee Welcome Kits', 'Executive Gift Sets', 'Conference Kits'],
  startups: ['Branded T-Shirts', 'Startup Swag Boxes', 'Tech Accessories', 'Team Hoodies'],
  education: ['School Uniforms', 'College Jerseys', 'Event T-Shirts', 'Convocation Merchandise'],
  healthcare: ['Medical Scrubs', 'Lab Coats', 'Patient Care Kits', 'Staff Uniforms'],
  manufacturing: ['Safety Jackets', 'Industrial Uniforms', 'Worker Engagement Kits', 'Helmets & PPE'],
  hospitality: ['Hotel Uniforms', 'Aprons', 'Guest Welcome Kits', 'Staff Polo Shirts'],
  events: ['Event T-Shirts', 'Lanyards & ID Cards', 'Conference Bags', 'Promotional Caps'],
  government: ['Official Uniforms', 'Ceremonial Merchandise', 'Public Service Kits', 'ID Card Holders'],
};

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

export default function Industries() {
  const { setIndustry, setCategory } = useAppState();

  const handleExplore = (industryId) => {
    setIndustry(industryId);
    setCategory('all');
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-600 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Industries We Serve
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">
              Trusted Across{' '}
              <span className="text-amber-400">8 Key Sectors</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              From Fortune 500 corporations to emerging startups, educational institutions to government bodies — 
              we deliver tailored merchandise solutions that speak your industry's language.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industryIcons[industry.id] || Building2;
              const products = industryProducts[industry.id] || [];

              return (
                <SectionReveal key={index}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Card Header */}
                    <div className="p-6 pb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-amber-100 group-hover:to-amber-50 rounded-xl flex items-center justify-center mb-4 transition-colors border border-slate-200 group-hover:border-amber-200">
                        <Icon className="w-7 h-7 text-slate-600 group-hover:text-amber-600 transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {industry.name}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {industry.description}
                      </p>
                    </div>

                    {/* Products List */}
                    <div className="px-6 flex-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Popular Products
                      </p>
                      <ul className="space-y-2">
                        {products.map((product, pidx) => (
                          <li key={pidx} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="p-6 pt-4">
                      <Link to="/gallery" onClick={() => handleExplore(industry.id)}>
                        <CustomButton
                          variant="outline"
                          size="sm"
                          fullWidth
                          icon={ArrowRight}
                          iconPosition="right"
                          className="group-hover:border-amber-500 group-hover:text-amber-600"
                        >
                          Explore Solutions
                        </CustomButton>
                      </Link>
                    </div>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry-Specific */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Industry Expertise
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Why Industry-Specific Solutions Matter
              </h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Compliance Ready',
                description: 'We understand industry-specific compliance requirements — from ISI-certified safety wear for manufacturing to medical-grade fabrics for healthcare.',
              },
              {
                icon: Users,
                title: 'Cultural Fit',
                description: 'Our designs respect and reflect your industry culture. Corporate elegance for enterprises, youthful energy for startups, tradition for academic institutions.',
              },
              {
                icon: Building2,
                title: 'Scale & Volume',
                description: 'Different industries have different scale needs. We handle everything from 50-unit hospitality orders to 10,000+ unit corporate rollouts with equal precision.',
              },
            ].map((item, idx) => (
              <SectionReveal key={idx}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 bg-slate-50 rounded-xl border border-slate-100"
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-white mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              We serve many more sectors beyond these 8. Reach out to us with your specific requirements 
              and we'll create a custom solution tailored to your industry needs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/request-quote">
                <CustomButton size="lg" icon={ArrowRight} iconPosition="right">
                  Request Custom Solution
                </CustomButton>
              </Link>
              <Link to="/contact">
                <CustomButton variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Contact Us
                </CustomButton>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

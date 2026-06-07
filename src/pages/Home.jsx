import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, Users, Truck, ArrowRight } from 'lucide-react';
import { categories } from '../data/mockData';

const HERO_SLIDES = [
  {
    desktopImage: "/products/welcomekit-desktop.png",
    tabletImage: "/products/welcomekit-tablet.png",
    mobileImage: "/products/welcomekit-1.png",
    title: "Premium Corporate Merchandise Architected for Scale",
    subtitle: "From executive onboarding kits to custom apparel, we deploy high-end branding solutions aligned with your corporate identity guidelines."
  },
  {
    desktopImage: "/products/polo-desktop.png",
    tabletImage: "/products/polo-tablet.png",
    mobileImage: "/products/polo-1.png",
    title: "Industry-Grade Premium Apparel",
    subtitle: "Engineered with ultra-combed 220 GSM fabrics, precision micro-embroidery patterns, and premium detailing that stands out."
  },
  {
    desktopImage: "/products/smartbottle-desktop.png",
    tabletImage: "/products/smartbottle-tablet.png",
    mobileImage: "/products/smartbottle-1.png",
    title: "Next-Gen Executive Technical Gifts",
    subtitle: "Discover high-utility, smart IoT products and eco-conscious premium gear curated intentionally for modern workforces."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col overflow-x-hidden">
      
      <section className="relative w-full h-[85vh] sm:h-[90vh] bg-[#0b0f14] flex items-center justify-center overflow-hidden">
        
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex items-center"
          >
            <picture className="w-full h-full select-none pointer-events-none">
              <source media="(min-width: 1024px)" srcSet={HERO_SLIDES[currentSlide].desktopImage} />
              <source media="(min-width: 640px)" srcSet={HERO_SLIDES[currentSlide].tabletImage} />
              <motion.img 
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                src={HERO_SLIDES[currentSlide].mobileImage} 
                alt="" 
                className="w-full h-full object-cover object-center lg:object-[80%_center]"
              />
            </picture>
            
            {/* Optimized Gradient: Lighter on mobile, balanced on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-slate-950/90 lg:via-slate-950/50 lg:to-transparent z-10" />

            <div className="absolute inset-0 z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex justify-start items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl backdrop-blur-sm bg-slate-950/30 border border-white/5 rounded-2xl p-6 sm:p-12 shadow-2xl text-white"
              >
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-4">
                  B2B Production Enterprise
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="text-slate-200 text-sm sm:text-base mb-8 font-light leading-relaxed max-w-lg">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <Link 
                    to="/request-quote" 
                    className="px-8 py-3.5 rounded-lg bg-white text-slate-950 font-medium tracking-wide shadow-lg hover:bg-amber-500 hover:text-slate-900 transition-colors duration-200 text-center flex items-center justify-center gap-2 group"
                  >
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/gallery" 
                    className="px-8 py-3.5 rounded-lg border border-white/30 text-white font-medium tracking-wide backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 text-center"
                  >
                    View Our Products
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 right-6 z-30 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-white/40'}`}
              aria-label={`Navigate to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="w-full bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-base mb-1">Premium Quality Products</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Strict adherence to premium specifications, high GSM weights, and fine stitching metrics.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-base mb-1">Custom Branding Solutions</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Laser markings, metallic badges, high-density embroidery, or structural silk prints.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-base mb-1">Bulk Order Specialists</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Highly responsive pricing frameworks built dynamically for thousands of units.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-medium text-base mb-1">Reliable Pan-India Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Fast-tracked dispatch models with fully secure door-to-door bulk shipping routes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Matrix */}
      <section className="w-full py-20 bg-slate-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Curated Assortment</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">Shop by Category</h2>
            <div className="w-12 h-1 bg-slate-900 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-center">
            {categories.map((cat) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={cat.id}
                className="flex flex-col items-center text-center group"
              >
                <Link to={`/gallery?category=${cat.id}`} className="w-full flex flex-col items-center">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-slate-200/80 shadow-md group-hover:shadow-xl transition-all duration-300 mb-4 bg-white flex items-center justify-center p-2">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <h3 className="font-medium text-sm sm:text-base text-slate-800 group-hover:text-slate-950 transition-colors font-sans">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-400 mt-1 font-mono">{cat.count} Variants</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
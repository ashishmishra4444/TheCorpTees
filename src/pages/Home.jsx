import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  categories,
  products,
  processSteps,
  testimonials,
  industries,
  whyChooseUs,
} from "../data/mockData";
import ProductCard from "../components/products/ProductCard";
import { Star, ArrowUpRight, ArrowRight } from "lucide-react";
import ProcessShowcase from "../components/layout/ProcessShowcase";
import CustomButton from "../components/shared/CustomButton";

const HERO_SLIDES = [
  {
    desktop: "/products/welcomekit-desktop.png",
    tablet: "/products/welcomekit-tablet.png",
    mobile: "/products/welcomekit-mobile.png",
  },
  {
    desktop: "/products/polo-desktop.png",
    tablet: "/products/polo-tablet.png",
    mobile: "/products/polo-mobile.png",
  },
  {
    desktop: "/products/smartbottle-desktop.png",
    tablet: "/products/smartbottle-tablet.png",
    mobile: "/products/smartbottle-mobile.png",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-creamy flex flex-col">
      {/* Hero Section: Full Screen Cinematic */}
      <section className="relative w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.picture
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="block w-full h-full"
          >
            <source
              media="(min-width: 1024px)"
              srcSet={HERO_SLIDES[currentSlide].desktop}
            />
            <source
              media="(min-width: 768px)"
              srcSet={HERO_SLIDES[currentSlide].tablet}
            />
            <img
              src={HERO_SLIDES[currentSlide].mobile}
              alt="Product Showcase"
              className="w-full h-full object-cover object-center"
            />
          </motion.picture>
        </AnimatePresence>
        <div className="absolute inset-0 bg-deepBlue/10 pointer-events-none" />
      </section>

      {/* 2. Shop By Category */}
      <section className="py-20 px-6 md:px-16 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0F4C81] mb-4 text-center">
            Shop By Category
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
            Explore premium merchandise collections tailored for corporate
            teams, institutions, and events.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[24px] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-slate-100"
              >
                {/* Image area with hover swap */}
                <Link
                  to={`/gallery?category=${cat.id}`}
                  className="h-64 overflow-hidden relative block"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={cat.hoverImage}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </Link>

                {/* Info Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-[#0F4C81]">
                      {cat.name}
                    </h3>
                    <span className="px-3 py-1 bg-[#FFFDF7] border border-[#0F4C81]/20 text-[#0F4C81] text-xs font-bold rounded-full">
                      {products.filter((p) => p.category === cat.id).length}{" "}
                      Items
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">
                    Discover our professional range of {cat.name.toLowerCase()}{" "}
                    designed for quality and impact.
                  </p>

                  <Link
                    to={`/gallery?category=${cat.id}`}
                    className="inline-flex items-center text-[#0F4C81] font-bold gap-2 group-hover:gap-4 transition-all"
                  >
                    Explore Collection <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Signature Collection */}
      <section className="py-20 px-6 md:px-16 bg-[#F8F9FA]">
        <h2 className="text-4xl font-bold text-[#0F4C81] mb-12 text-center">
          Signature Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us – now only first 3 cards + CTA */}
      <section className="py-24 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[#EAB308] uppercase tracking-[0.3em] text-sm font-semibold">
              Why The Corp Tees
            </span>

            <h2 className="text-4xl font-bold text-[#0F4C81] mt-4 mb-5">
              Your Trusted Corporate Merchandise Partner
            </h2>

            <p className="max-w-3xl mx-auto text-slate-600 leading-relaxed">
              We combine premium product quality, creative branding expertise,
              enterprise-scale production capabilities, and reliable delivery to
              help organizations create memorable brand experiences.
            </p>

            <p className="text-slate-600 max-w-2xl mx-auto mt-1.5 leading-relaxed">
              We don't just manufacture merchandise. We create premium brand
              experiences that strengthen engagement, improve visibility, and
              leave lasting impressions.
            </p>
          </div>

          {/* Only first 3 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {whyChooseUs.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-[28px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#0F4C81] px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                    {item.stats}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#0F4C81] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-2xl font-bold text-[#0F4C81] mb-3">
                Discover Everything We Offer
              </h3>
              <p className="text-slate-500 mb-6">
                Explore our complete service capabilities, production expertise,
                customization options, logistics support, and enterprise
                merchandise solutions.
              </p>
              <Link to="/services#why-choose-us">
                <CustomButton
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-[#0F4C81] hover:bg-[#0d3f6d] text-white"
                >
                  View All Services
                </CustomButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Process Timeline */}
      <ProcessShowcase processSteps={processSteps} headingColor="#0F4C81" />

      {/* 6. Testimonials Carousel */}
      <section className="py-20 px-6 md:px-16 bg-[#FFFDF7]">
        <h2 className="text-4xl font-bold text-[#0F4C81] mb-12 text-center">
          Trusted by Industry Leaders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex text-[#EAB308] mb-4">
                {[...Array(5)].map((_, star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star < t.rating ? "fill-current" : "text-slate-200"}`}
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm italic mb-6">"{t.text}"</p>
              <div>
                <p className="font-bold text-[#0F4C81] text-sm">{t.name}</p>
                <p className="text-xs text-slate-400">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Industries We Serve */}
      <section className="py-20 bg-white px-8">
        <h2 className="text-4xl font-bold text-[#0F4C81] mb-12 text-center">
          Industries We Serve
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="p-6 bg-[#FFFDF7] rounded-lg border border-slate-100 hover:border-[#EAB308] transition-colors"
            >
              <h4 className="font-bold text-[#0F4C81] text-lg">{ind.name}</h4>
              <p className="text-sm text-slate-600 mt-2">{ind.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
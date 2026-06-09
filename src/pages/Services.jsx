import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Star,
  Shield,
  Truck,
  Package,
  Headphones,
  Award,
  Briefcase,
  Users,
  Building,
  Calendar,
  MapPin,
  Sparkles,
  CreditCard,
} from "lucide-react";
import {
  services,
  processSteps,
  whyChooseUs,
  industries,
} from "../data/mockData";
import CustomButton from "../components/shared/CustomButton";
import ProcessShowcase from "../components/layout/ProcessShowcase";
import TestimonialsSection from "../sections/TestimonialsSection";

// Reusable section reveal animation
const SectionReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hero Section – Premium Enterprise, Full Viewport, Balanced Product Showcase
const HeroSection = () => {
  // Only 5 products, controlled composition with slight overlaps
  const showcaseProducts = [
    {
      name: "Polo",
      image: "/products/polo-1.png",
      top: "15%",
      left: "5%",
      rotate: -4,
      z: 10,
    },
    {
      name: "Gift Box",
      image: "/products/welcomekit-1.png",
      top: "30%",
      left: "35%",
      rotate: 2,
      z: 20,
    },
    {
      name: "Hoodie",
      image: "/products/hoodie-1.png",
      top: "10%",
      left: "65%",
      rotate: 6,
      z: 15,
    },
    {
      name: "Bottle",
      image: "/products/smartbottle-1.png",
      top: "55%",
      left: "55%",
      rotate: -3,
      z: 25,
    },
    {
      name: "Lanyard + Cap",
      image: "/products/lanyard-1.png",
      top: "65%",
      left: "15%",
      rotate: 8,
      z: 5,
    },
  ];

  // Trust stats displayed in a glass card
  const trustStats = [
    { value: "500+", label: "Clients" },
    { value: "10,000+", label: "Orders Delivered" },
    { value: "Pan India", label: "Delivery" },
    { value: "98%", label: "Client Retention" },
  ];

  return (
    <section className="relative overflow-hidden h-[calc(100vh-88px)] flex items-center bg-[#081120]">
      {/* Background layers – deep navy with radial glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07111F] via-[#0B1830] to-[#101C36]" />

      {/* Amber glow top right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* Blue glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column – content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-amber-500 text-xs font-semibold uppercase tracking-[0.25em]">
                Enterprise Merchandise Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-[1.2] tracking-tight"
            >
              Corporate Merchandise
              <span className="text-amber-500 block">
                Solutions Built For Scale
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base lg:text-lg max-w-xl leading-relaxed"
            >
              From employee onboarding kits to branded apparel, gifting
              programs, event merchandise and institutional uniforms, we help
              organizations create memorable brand experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link to="/request-quote">
                <CustomButton
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-lg shadow-amber-500/20 px-7 py-3.5 text-sm font-semibold"
                >
                  Get Free Quote
                </CustomButton>
              </Link>
              <Link to="/gallery">
                <CustomButton
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm"
                >
                  Explore Products
                </CustomButton>
              </Link>
            </motion.div>

            {/* Trust Bar – glass card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 mt-6"
            >
              <div className="flex flex-wrap justify-between gap-4">
                {trustStats.map((stat, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <span className="block text-xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column – controlled product collage */}
          <div className="relative h-[450px] hidden lg:block">
            {showcaseProducts.map((product, idx) => (
              <motion.div
                key={idx}
                className="absolute bg-white/10 backdrop-blur-md rounded-xl p-2 shadow-2xl border border-white/20 transition-all duration-300"
                style={{
                  top: product.top,
                  left: product.left,
                  rotate: product.rotate,
                  width: "160px",
                  height: "160px",
                  zIndex: product.z,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  boxShadow: "0 20px 30px -10px rgba(245,158,11,0.2)",
                  borderColor: "rgba(245,158,11,0.4)",
                  transition: { duration: 0.2 },
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Service Overview Card Component
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {service.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.offerings.slice(0, 4).map((item, i) => (
            <span
              key={i}
              className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
          {service.offerings.length > 4 && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
              +{service.offerings.length - 4} more
            </span>
          )}
        </div>
        <Link to={`/gallery?category=${service.categoryLink}`}>
          <button className="text-[#EAB308] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Explore Products <ArrowRight size={14} />
          </button>
        </Link>
      </div>
      {isHovered && (
        <motion.div
          layoutId="serviceGlow"
          className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-[#EAB308]/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

// Detailed Service Section (split layout)
const DetailedServiceSection = ({ service, reverse = false }) => {
  return (
    <SectionReveal>
      <div
        className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}
      >
        <div
          className={`relative rounded-2xl overflow-hidden h-[400px] ${reverse ? "lg:order-2" : ""}`}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {service.title}
          </h2>
          <p className="text-slate-500 mb-6">{service.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {service.offerings.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to={`/gallery?category=${service.categoryLink}`}>
              <CustomButton
                variant="outline"
                icon={ArrowRight}
                iconPosition="right"
              >
                View All Products
              </CustomButton>
            </Link>
            <Link to="/request-quote">
              <CustomButton>Request Quote</CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};

// Employee Kits Section (dark navy premium)
const EmployeeKitsSection = () => {
  const kits = [
    {
      name: "Welcome Kits",
      image: "/products/welcomekit-1.png",
      desc: "Luxury onboarding experience",
    },
    {
      name: "Joining Merchandise",
      image: "/products/joiningmerch-1.png",
      desc: "Essential office supplies",
    },
    {
      name: "Work From Home Kits",
      image: "/products/wfhkit-1.png",
      desc: "Remote productivity essentials",
    },
    {
      name: "Festive Employee Gifts",
      image: "/products/hamper-1.png",
      desc: "Celebratory hampers",
    },
    {
      name: "Corporate Swag Boxes",
      image: "/products/swagbox-1.png",
      desc: "Fully customizable",
    },
    {
      name: "Employee Engagement Kits",
      image: "/products/studentkit-1.png",
      desc: "Team building & retention",
    },
  ];

  return (
    <section className="py-24 bg-[#020817]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="text-[#EAB308] text-xs font-semibold uppercase tracking-[0.25em]">
              Employee Experience
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">
              Employee Joining Kits
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Make every new hire feel valued and every employee milestone
              memorable with premium branded kits.
            </p>
          </div>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit, idx) => (
            <SectionReveal key={idx}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#EAB308]/30 transition-all"
              >
                <div className="h-32 mb-4 flex items-center justify-center">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {kit.name}
                </h3>
                <p className="text-slate-400 text-sm">{kit.desc}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/gallery?category=employee-kits">
            <CustomButton
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Explore All Kits
            </CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Corporate Gifting Grid
const CorporateGiftingGrid = () => {
  const gifts = [
    {
      name: "Executive Gift Sets",
      image: "/products/festivegift-1.png",
      price: "₹800+",
    },
    { name: "Premium Diaries", image: "/products/diary-1.png", price: "₹400+" },
    {
      name: "Smart Bottles",
      image: "/products/smartbottle-1.png",
      price: "₹650+",
    },
    { name: "Mugs", image: "/products/mug-1.png", price: "₹250+" },
    { name: "Pens", image: "/products/pen-1.png", price: "₹150+" },
    { name: "Tech Accessories", image: "/products/tech-1.png", price: "₹380+" },
    {
      name: "Customized Hampers",
      image: "/products/hamper-1.png",
      price: "₹2500+",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="text-[#EAB308] text-xs font-semibold uppercase tracking-[0.25em]">
              Premium Gifting
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-4">
              Corporate Gifting Solutions
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              Thoughtful gifts that strengthen relationships and leave lasting
              impressions.
            </p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {gifts.map((gift, idx) => (
            <SectionReveal key={idx}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="h-28 mb-3 flex items-center justify-center">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="font-semibold text-slate-900">{gift.name}</h3>
                <p className="text-xs text-amber-600 mt-1">from {gift.price}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/gallery?category=corporate-gifting">
            <CustomButton variant="outline">
              Explore Gift Collection
            </CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section (reusing existing data)
const WhyChooseUsSection = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="text-[#EAB308] text-xs font-semibold uppercase tracking-[0.25em]">
              Trust & Excellence
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-4">
              Why Companies Choose Us
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              End-to-end merchandise solutions trusted by 500+ organizations
              nationwide.
            </p>
          </div>
        </SectionReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, idx) => (
            <SectionReveal key={idx}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  {item.id === 1 && (
                    <Shield className="w-6 h-6 text-amber-600" />
                  )}
                  {item.id === 2 && (
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  )}
                  {item.id === 3 && (
                    <Truck className="w-6 h-6 text-amber-600" />
                  )}
                  {item.id === 4 && (
                    <Package className="w-6 h-6 text-amber-600" />
                  )}
                  {item.id === 5 && (
                    <Headphones className="w-6 h-6 text-amber-600" />
                  )}
                  {item.id === 6 && (
                    <Award className="w-6 h-6 text-amber-600" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm">{item.description}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// Industries We Serve
const IndustriesSection = () => {
  const industryIcons = [
    <Briefcase className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
    <Building className="w-6 h-6" />,
    <Shield className="w-6 h-6" />,
    <Truck className="w-6 h-6" />,
    <Star className="w-6 h-6" />,
    <Calendar className="w-6 h-6" />,
    <MapPin className="w-6 h-6" />,
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="text-[#EAB308] text-xs font-semibold uppercase tracking-[0.25em]">
              Verticals We Serve
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-4">
              Industries We Serve
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              Tailored merchandise solutions for diverse business sectors.
            </p>
          </div>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {industries.map((industry, idx) => (
            <SectionReveal key={idx}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                  {industryIcons[idx % industryIcons.length]}
                </div>
                <h3 className="font-bold text-slate-900">{industry.name}</h3>
                <p className="text-xs text-slate-500 mt-2">
                  {industry.description}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA
const FinalCTASection = () => {
  return (
    <section className="py-20 bg-[#020817]">
      <div className="max-w-5xl mx-auto text-center px-6">
        <SectionReveal>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready To Build Merchandise
            <span className="text-[#EAB308] block mt-2">
              That Represents Your Brand?
            </span>
          </h2>
          <p className="text-slate-300 mt-5 max-w-2xl mx-auto">
            From 10 pieces to 10,000+ units, we help organizations create
            memorable merchandise experiences with premium quality and reliable
            delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/request-quote">
              <CustomButton size="lg" icon={ArrowRight} iconPosition="right">
                Request Free Quote
              </CustomButton>
            </Link>
            <Link to="/contact">
              <CustomButton
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Talk To An Expert
              </CustomButton>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

// Main Services Component
export default function Services() {
  const firstRowServices = services.slice(0, 3);
  const secondRowServices = services.slice(3, 5);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-[#EAB308] text-xs font-semibold uppercase tracking-[0.25em]">
                Comprehensive Solutions
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-4">
                Everything Your Brand Needs
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                End-to-end merchandise solutions for enterprises, institutions
                and growing teams.
              </p>
            </div>
          </SectionReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {firstRowServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {secondRowServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx + 3} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <DetailedServiceSection service={services[0]} reverse={false} />
        </div>
      </section>

      <EmployeeKitsSection />
      <CorporateGiftingGrid />

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <DetailedServiceSection service={services[3]} reverse={true} />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="text-center mb-10">
              <span className="text-[#EAB308] text-xs font-semibold uppercase tracking-[0.25em]">
                Event Ready
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-4">
                Event & Promotional Merchandise
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {services[4].offerings.map((item, idx) => (
              <SectionReveal key={idx}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100"
                >
                  <span className="text-xs font-medium text-slate-700">
                    {item}
                  </span>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery?category=event-merchandise">
              <CustomButton variant="outline">
                Explore Event Collection
              </CustomButton>
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />


      <WhyChooseUsSection />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ProcessShowcase
            processSteps={processSteps}
            headingColor="#0F4C81"
            headingSize="text-2xl sm:text-3xl"
          />
        </div>
      </section>

      <IndustriesSection />
      <FinalCTASection />
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  Globe,
  TrendingUp,
  Heart,
} from "lucide-react";
import { processSteps, testimonials, stats } from "../data/mockData";
import CustomButton from "../components/shared/CustomButton";
import { useState, useRef } from "react";
import ProcessShowcase from "../components/layout/ProcessShowcase";
import CoreValuesManifesto from "../components/layout/CoreValuesManifesto";

function SectionReveal({ children, className = "" }) {
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
}

function ImpactShowcase({ stats }) {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="py-28 bg-[#F8FAFC] overflow-hidden">
      {" "}
      <div className="max-w-5xl mx-auto text-center mb-16 px-6">
        {" "}
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#EAB308]">
          Our Impact{" "}
        </span>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-[#020817]">
          Numbers That Reflect Trust
        </h2>
        <p className="mt-5 text-slate-500 max-w-2xl mx-auto">
          Building memorable merchandise experiences for organizations across
          India.
        </p>
      </div>
      {/* Desktop Luxury Showcase */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="hidden lg:flex h-[520px] gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveCard(index)}
              animate={{
                flex: activeCard === index ? 3 : 1,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
          relative
          overflow-hidden
          rounded-[32px]
          cursor-pointer
          shadow-[0_30px_80px_rgba(15,76,129,0.10)]
        "
            >
              <motion.img
                src={stat.image}
                alt={stat.label}
                animate={{
                  scale: activeCard === index ? 1.08 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
              />

              <motion.div
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#020817]/15
            via-[#020817]/50
            to-[#020817]/95
          "
              />

              <motion.div
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  y: activeCard === index ? 0 : 40,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
            absolute
            bottom-0
            left-0
            right-0
            p-8
            text-white
          "
              >
                <p className="text-5xl font-bold text-[#EAB308]">
                  {stat.value}
                </p>

                <h3 className="mt-3 text-2xl font-semibold">{stat.label}</h3>

                <p className="mt-3 text-slate-300 max-w-xs">
                  {stat.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-[#14B8A6] font-medium">
                  Explore Success Stories
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Tablet */}
      <div className="hidden md:grid lg:hidden max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            className="
          relative
          h-[320px]
          rounded-[24px]
          overflow-hidden
          shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        "
          >
            <img
              src={stat.image}
              alt={stat.label}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/70 to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-4xl font-bold text-[#EAB308]">{stat.value}</p>

              <h3 className="mt-2 text-xl font-semibold">{stat.label}</h3>

              <p className="mt-2 text-sm text-slate-300">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Mobile */}
      <div className="grid md:hidden max-w-7xl mx-auto px-5 gap-5">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className="
          relative
          h-[320px]
          rounded-[24px]
          overflow-hidden
          shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        "
          >
            <img
              src={stat.image}
              alt={stat.label}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/70 to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-4xl font-bold text-[#EAB308]">{stat.value}</p>

              <h3 className="mt-2 text-xl font-semibold">{stat.label}</h3>

              <p className="mt-2 text-sm text-slate-300">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#020817] h-screen w-full flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/products/about-hero.png"
            alt="The Corp Tees"
            className="w-full h-full object-cover object-[75%_center] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="text-[10px] sm:text-xs font-medium text-[#EAB308] uppercase tracking-[0.2em]">
              About The Corp Tees
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] text-white">
              More Than Merchandise.
              <span className="block text-[#EAB308] mt-1">
                We Build Brand Experiences.
              </span>
            </h1>
            <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-medium max-w-md">
              Every successful brand leaves an impression. At The Corp Tees, we
              help organizations create that impression through thoughtfully
              designed, premium-quality merchandise and branding solutions.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/request-quote">
                <button className="bg-[#EAB308] hover:bg-[#d8a707] text-slate-900 font-medium px-5 py-2.5 rounded-lg transition-all text-sm">
                  Get Free Quote
                </button>
              </Link>
              <Link to="/gallery">
                <button className="border border-white/20 bg-white/5 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-white/10 transition-all text-sm">
                  View Products
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Redesigned Mission & Vision Section */}
      <section className="py-24 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <SectionReveal>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full"
              >
                <img
                  src="/products/mission.png"
                  alt="Our Mission"
                  className="w-full h-[280px] object-cover"
                />
                <div className="p-8 lg:p-10">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#FEF9C3] text-[#CA8A04] text-xs font-bold uppercase tracking-wider mb-6">
                    Our Purpose
                  </span>
                  <h2 className="text-2xl font-bold text-[#0F4C81] mb-6">
                    Our Mission
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium ">
                    To help brands become memorable through exceptional
                    merchandise. We believe that every product carrying your
                    logo becomes an ambassador of your culture, values and
                    commitment to quality.
                  </p>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    Whether it is employee onboarding, corporate gifting, events
                    or customer engagement programs, we ensure every touchpoint
                    strengthens your brand.
                  </p>
                </div>
              </motion.div>
            </SectionReveal>

            {/* Vision Card */}
            <SectionReveal>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full"
              >
                <img
                  src="/products/vision.png"
                  alt="Our Vision"
                  className="w-full h-[280px] object-cover"
                />
                <div className="p-8 lg:p-10">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-6">
                    Future Forward
                  </span>
                  <h2 className="text-2xl font-bold text-[#0F4C81] mb-6">
                    Our Vision
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium ">
                    To become India's most trusted corporate merchandise and
                    branding partner.
                  </p>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    We envision a future where organizations effortlessly create
                    meaningful employee experiences, stronger brand connections
                    and memorable impressions through premium merchandise.
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Stats & Impact Section */}
      <ImpactShowcase stats={stats} />

      {/* Luxury Process Showcase */}
      <ProcessShowcase processSteps={processSteps} />

      {/* Core Values */}
      <CoreValuesManifesto />

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
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
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

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Let's Build Something Great Together
            </h2>
            <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
              Ready to elevate your brand with premium merchandise? Get in touch
              and let's discuss your requirements.
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

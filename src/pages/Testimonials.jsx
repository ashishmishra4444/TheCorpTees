import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// Testimonials Data - Grouped in sets of 3
const testimonialsGroups = [
  // Group 1
  [
    {
      id: 1,
      name: "Priya Sharma",
      title: "HR Director",
      company: "TechMahindra",
      content: "The quality of merchandise and professionalism exceeded our expectations. Our employees absolutely loved the welcome kits!",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahul Mehta",
      title: "Procurement Head",
      company: "ICICI Bank",
      content: "Best corporate gifting partner we've worked with. Timely delivery, premium quality products, and excellent support throughout.",
      rating: 5,
    },
    {
      id: 3,
      name: "Anjali Singh",
      title: "Dean of Students",
      company: "IIT Delhi",
      content: "From convocation merchandise to daily uniforms, they've been our trusted partner for over 3 years. Outstanding quality.",
      rating: 5,
    }
  ],
  // Group 2
  [
    {
      id: 4,
      name: "Vikram Malhotra",
      title: "Event Manager",
      company: "Sunburn Festival",
      content: "Handled our bulk order of 5000+ event T-shirts flawlessly. Great team to work with and amazing attention to detail.",
      rating: 5,
    },
    {
      id: 5,
      name: "Neha Gupta",
      title: "VP Marketing",
      company: "Amazon India",
      content: "The corporate gift hampers were a huge hit with our partners. Premium quality and beautiful presentation.",
      rating: 5,
    },
    {
      id: 6,
      name: "Amit Patel",
      title: "Facility Manager",
      company: "Marriott Hotels",
      content: "Hospitality uniforms delivered with perfect fit and exceptional quality. Very accommodating with our custom requirements.",
      rating: 5,
    }
  ],
  // Group 3
  [
    {
      id: 7,
      name: "Sneha Reddy",
      title: "Talent Acquisition Lead",
      company: "Microsoft",
      content: "The joining kits for our new hires have been a game-changer. Professional packaging and thoughtful items.",
      rating: 5,
    },
    {
      id: 8,
      name: "Rajesh Kumar",
      title: "Sports Director",
      company: "Delhi University",
      content: "Sports jerseys delivered on time for our annual sports fest. Excellent quality printing and fabric.",
      rating: 4,
    },
    {
      id: 9,
      name: "Meera Iyer",
      title: "CEO",
      company: "Startup India",
      content: "Affordable yet premium swag boxes for our launch event. They delivered exactly what we wanted within our budget.",
      rating: 5,
    }
  ],
  // Group 4
  [
    {
      id: 10,
      name: "Arjun Nair",
      title: "Conference Organizer",
      company: "Tech Summit 2024",
      content: "Conference kits were top-notch. Received many compliments from attendees. Will use them for all future events.",
      rating: 5,
    },
    {
      id: 11,
      name: "Kavita Desai",
      title: "Brand Manager",
      company: "Tata Group",
      content: "Outstanding quality and attention to detail. The merchandise perfectly represents our premium brand image.",
      rating: 5,
    },
    {
      id: 12,
      name: "Suresh Menon",
      title: "Operations Head",
      company: "Infosys",
      content: "Handled our bulk uniform order of 10,000+ pieces seamlessly. Great communication and quality control.",
      rating: 5,
    }
  ]
];

export default function Testimonials() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setDirection(1);
    setCurrentGroup((prev) => (prev + 1) % testimonialsGroups.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentGroup((prev) => (prev - 1 + testimonialsGroups.length) % testimonialsGroups.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentGroup ? 1 : -1);
    setCurrentGroup(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentGroup]);

  const currentTestimonials = testimonialsGroups[currentGroup];

  const containerVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    })
  };

  return (
    <div className="w-full bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header with Rating Box Side by Side */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16">
          {/* Left Side - Title */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              What Our <span className="text-amber-500">Clients Say</span>
            </h2>
            <p className="text-slate-500 max-w-md">
              Real stories from real businesses we've partnered with
            </p>
          </div>

          {/* Right Side - Rating Box */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 min-w-[280px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-slate-900">4.9</span>
              <span className="text-slate-400">/5</span>
            </div>
            <p className="text-slate-700 font-medium mb-2">Trusted by 500+ businesses</p>
            <div className="flex gap-4 text-sm text-slate-500">
              <span>✓ 500+ Happy Clients</span>
              <span>✓ 98% Repeat Business</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid - 3 per slide */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentGroup}
              custom={direction}
              variants={containerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author */}
                  <div className="border-t border-slate-100 pt-4">
                    <h3 className="font-semibold text-slate-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-amber-600 text-xs font-medium">
                      {testimonial.title}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Simplified */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-5 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:bg-amber-50"
          >
            <ChevronLeft className="w-5 h-5 text-amber-500 cursor-pointer" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-5 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:bg-amber-50"
          >
            <ChevronRight className="w-5 h-5 text-amber-500 cursor-pointer" />
          </button>
        </div>

        {/* Simple Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialsGroups.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentGroup
                  ? "w-6 h-1.5 bg-amber-500"
                  : "w-1.5 h-1.5 bg-slate-300 hover:bg-amber-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
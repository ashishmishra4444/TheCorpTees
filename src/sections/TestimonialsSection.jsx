import { motion } from "framer-motion";
import AnimatedCardsStack from "../components/ui/AnimatedCardsStack";

// B2B corporate testimonials with real Unsplash professional headshots
const testimonialsData = [
  {
    name: "Neha Sharma",
    role: "HR Manager",
    company: "Tata Communications",
    rating: 5,
    text: "The onboarding kits we ordered for 500+ new hires were delivered on time with exceptional quality. The custom packaging and welcome cards made a huge difference in employee experience.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
  },
  {
    name: "Vikram Mehta",
    role: "Procurement Lead",
    company: "Godrej Industries",
    rating: 5,
    text: "We've worked with multiple vendors, but The Corp Tees stood out for their reliability and premium finish. The bulk pricing was transparent and the account manager was always responsive.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
  {
    name: "Anjali Patil",
    role: "Startup Founder",
    company: "SaaS Growth Labs",
    rating: 5,
    text: "As a bootstrapped startup, we needed high-quality swag without huge minimums. The Corp Tees delivered custom hoodies and notebooks that our team absolutely loved. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
  },
  {
    name: "Rohan Desai",
    role: "Corporate Communications Manager",
    company: "ICICI Bank",
    rating: 4,
    text: "We used The Corp Tees for our annual leadership offsite – from branded polos to conference kits. The end-to-end service saved us weeks of coordination.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
  },
  {
    name: "Priya Singh",
    role: "Event Manager",
    company: "Informa Markets",
    rating: 5,
    text: "Handled a large-scale expo with 10,000+ delegate kits. Pan-India delivery was flawless and the custom lanyards & bags looked premium. Will definitely work again.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#EAB308] text-xs font-semibold uppercase tracking-[0.25em]">
            Client Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0F4C81] mt-4">
            Trusted By Growing Teams & Enterprises
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            See how organizations across India use The Corp Tees for employee onboarding, gifting, uniforms and branded merchandise.
          </p>
        </motion.div>

        {/* Animated Cards Stack */}
        <AnimatedCardsStack items={testimonialsData} autoplayInterval={6000} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
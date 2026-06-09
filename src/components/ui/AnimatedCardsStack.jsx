import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

const AnimatedCardsStack = ({ items, autoplayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const nextCard = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextCard, autoplayInterval);
    return () => clearInterval(intervalRef.current);
  }, [autoplayInterval]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    }),
  };

  const currentItem = items[currentIndex];

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[480px] mx-auto">
      <div className="relative w-[420px] h-[480px] md:w-[420px] md:h-[480px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < currentItem.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-slate-700 text-lg leading-relaxed flex-1">
              "{currentItem.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentItem.avatar} alt={currentItem.name} />
                <AvatarFallback>{currentItem.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-slate-900">{currentItem.name}</p>
                <p className="text-sm text-slate-500">
                  {currentItem.role}, {currentItem.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? "w-8 bg-amber-500" : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedCardsStack;
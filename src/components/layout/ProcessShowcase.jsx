import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProcessShowcase({
  processSteps,
  headingColor = "#0F4C81",
  headingSize = "text-3xl sm:text-4xl"
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#EAB308]">
            How We Work
          </span>
          <h2
            className={`mt-4 ${headingSize} font-bold`}
            style={{ color: headingColor }}
          >
            Our 5-Step Process
          </h2>
          <p className="mt-5 text-slate-500 max-w-2xl mx-auto">
            A streamlined journey designed to transform ideas into premium
            merchandise experiences.
          </p>
        </div>

        {/* Desktop: side-by-side, Mobile: stacked */}
        <div className="lg:grid lg:grid-cols-[1.4fr_0.8fr] lg:gap-8">
          {/* Left: Image with overlay - fixed height 420px on desktop */}
          <div className="relative h-[320px] md:h-[380px] lg:h-[420px] rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(15,76,129,0.12)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                src={processSteps[activeStep].image}
                alt={processSteps[activeStep].title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/95 via-[#020817]/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="text-[#EAB308] text-4xl lg:text-5xl font-bold">
                    {processSteps[activeStep].step}
                  </div>
                  <h3 className="mt-3 text-2xl lg:text-3xl font-bold text-white">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="mt-3 text-base text-slate-300 max-w-md">
                    {processSteps[activeStep].description}
                  </p>
                  <button className="mt-5 inline-flex items-center gap-2 text-[#14B8A6] font-semibold text-sm">
                    Explore This Step
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Navigation column – exactly 420px high, cards evenly spaced */}
          <div className="mt-4 lg:mt-0">
            <div className="h-[320px] md:h-[380px] lg:h-[420px] flex flex-col justify-between">
              {processSteps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <motion.button
                    key={index}
                    onMouseEnter={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    whileHover={{
                      y: -2,
                      scale: isActive ? 1.02 : 1.01
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`
                      cursor-pointer relative px-4 py-3 rounded-xl text-left
                      flex-shrink-0 w-[180px] lg:w-auto
                      min-h-[72px] lg:min-h-[74px]
                      border transition-all duration-300 ease-out
                      ${isActive
                        ? "bg-[#020817] border-[#EAB308] shadow-[0_0_0_1px_rgba(234,179,8,0.2),0_8px_24px_rgba(234,179,8,0.15)] scale-[1.02]"
                        : "bg-white border-slate-200 hover:border-slate-300"
                      }
                    `}
                  >
                    {/* Step number */}
                    <div
                      className={`text-xs font-bold ${
                        isActive ? "text-[#EAB308]" : "text-slate-400"
                      }`}
                    >
                      0{step.step}
                    </div>

                    {/* Title */}
                    <div
                      className={`mt-1 text-sm lg:text-base font-semibold ${
                        isActive ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {step.title}
                    </div>

                    {/* Fixed left accent bar (only for active card) */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#EAB308]" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
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
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Hero Image */}
        <div className="relative h-[620px] rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(15,76,129,0.12)]">
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

          <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{ duration: 0.45 }}
              >
                <div className="text-[#EAB308] text-6xl lg:text-7xl font-bold">
                  {processSteps[activeStep].step}
                </div>

                <h3 className="mt-4 text-3xl lg:text-4xl font-bold text-white">
                  {processSteps[activeStep].title}
                </h3>

                <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                  {processSteps[activeStep].description}
                </p>

                <button className="mt-6 inline-flex items-center gap-2 text-[#14B8A6] font-semibold">
                  Explore This Step
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 overflow-x-auto">
          <div className="flex min-w-max gap-4 lg:gap-6">
            {processSteps.map((step, index) => (
              <motion.button
                key={index}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                whileHover={{ y: -2 }}
                className={`
                  cursor-pointer
                  relative
                  px-6 py-5
                  rounded-2xl
                  text-left
                  transition-all
                  min-w-[220px]
                  border
                  ${
                    activeStep === index
                      ? "bg-[#020817] border-[#EAB308]"
                      : "bg-white border-slate-200"
                  }
                `}
              >
                <div
                  className={`text-sm font-bold ${
                    activeStep === index ? "text-[#EAB308]" : "text-slate-400"
                  }`}
                >
                  0{step.step}
                </div>

                <div
                  className={`mt-2 font-semibold ${
                    activeStep === index ? "text-white" : "text-slate-800"
                  }`}
                >
                  {step.title}
                </div>

                {activeStep === index && (
                  <motion.div
                    layoutId="active-process"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#EAB308]"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

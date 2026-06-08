import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { values } from "../../data/mockData";


export default function CoreValuesManifesto() {
  return (
    <section className="py-32 bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}

        <div className="text-center max-w-3xl mx-auto mb-28">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#EAB308]">
            The Principles Behind Every Project
          </span>

          <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-[#020817]">
            Built On More Than Merchandise
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Every product we create reflects a philosophy of craftsmanship,
            partnership and continuous improvement.
          </p>
        </div>

        {/* Story Blocks */}

        <div className="space-y-[140px]">

          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`
                grid lg:grid-cols-2 gap-16 items-center
                ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}
              `}
            >
              {/* Image */}

              <div className="overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(15,76,129,0.08)]">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={value.image}
                  alt={value.title}
                  className="
                    w-full
                    h-[380px]
                    md:h-[450px]
                    lg:h-[520px]
                    object-cover
                  "
                />
              </div>

              {/* Content */}

              <div className="max-w-xl">

                <div className="text-[100px] lg:text-[120px] leading-none font-bold text-[#EAB308]/20">
                  {value.number}
                </div>

                <h3 className="mt-2 text-4xl lg:text-5xl font-bold text-[#020817]">
                  {value.title}
                </h3>

                <p className="mt-8 text-lg leading-relaxed text-slate-600">
                  {value.description}
                </p>

                <button className="
                  mt-10
                  inline-flex
                  items-center
                  gap-3
                  text-[#EAB308]
                  font-semibold
                  group
                ">
                  Explore Our Standards

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
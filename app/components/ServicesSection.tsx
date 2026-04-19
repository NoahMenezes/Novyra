"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Code2, Palette, Cpu, Zap, Search, Globe } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Premium Web Design",
    description:
      "Crafting high-end, visual-first digital experiences that capture your brand's essence and convert visitors into clients.",
  },
  {
    icon: Cpu,
    title: "AI Automation",
    description:
      "Integrating cutting-edge AI workflows into your business to automate repetitive tasks and skyrocket your efficiency.",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "Building robust, lightning-fast web applications using the latest technologies like Next.js, React, and Bun.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Ensuring your site loads in under a second with advanced optimization techniques and Core Web Vitals expertise.",
  },
  {
    icon: Search,
    title: "SEO & Growth Strategy",
    description:
      "Implementing data-driven SEO strategies to ensure your brand is discovered by the right audience at the right time.",
  },
  {
    icon: Globe,
    title: "Digital Ecosystems",
    description:
      "Creating cohesive digital identities across all platforms to maintain a strong and consistent brand presence.",
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="text-white/40 text-sm tracking-widest uppercase mb-6">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-6">
            Future-ready <span className="font-serif italic text-white/60">services</span>
            <br />
            for the next generation.
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            From world-class design to intelligent AI automation, we provide
            the tools you need to lead in the digital era.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="liquid-glass rounded-3xl p-8 md:p-10 group cursor-pointer hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="liquid-glass rounded-2xl p-3">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="liquid-glass rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-white text-xl mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

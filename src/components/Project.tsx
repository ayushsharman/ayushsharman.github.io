import React from "react";
import { motion } from "framer-motion";

const Project: React.FC = () => {
  const caseStudies = [
    {
      title: "Solving onboarding friction",
      focus: "Medoc",
      summary:
        "Reduced early churn by redesigning the first 30 days of hospital onboarding, emphasizing clarity, accountability, and immediate value.",
    },
    {
      title: "Scaling hospital implementation systems",
      focus: "Medoc",
      summary:
        "Built repeatable operational playbooks for clinical partners so new hospital launches required less coordination and more predictability.",
    },
    {
      title: "Product adoption challenges",
      focus: "Medoc",
      summary:
        "Turned adoption conversations away from feature lists and toward habit formation, usage clarity, and executive alignment.",
    },
    {
      title: "Internet narrative breakdowns",
      focus: "Content",
      summary:
        "Analyzed modern influence, attention economies, and culture moments with a systems-first lens rather than trend chasing.",
    },
  ];

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative py-24 px-6 text-slate-950 bg-white"
    >
      <div className="absolute left-10 top-24 h-20 w-20 rounded-full bg-[#d6c2a3]/80" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-600 mb-4">Case studies</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">Strategic breakdowns, not project snapshots.</h2>
          <p className="mt-4 text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
            A sequence of operational and narrative interventions that moved teams, products, and systems forward.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.05 * index }}
              className="grid gap-6 md:grid-cols-[0.25fr_0.75fr]"
            >
              <div className="flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-500">{caseStudy.focus}</span>
                <div className="h-2 w-16 bg-black" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-950">{caseStudy.title}</h3>
                <p className="mt-4 text-slate-700 leading-relaxed">{caseStudy.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Project;

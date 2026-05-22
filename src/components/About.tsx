import { Sparkles, Columns, PenTool } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const focusAreas = [
    {
      title: "Scaling Medoc",
      description:
        "Lead product operations and implementation systems for hospital adoption, clinical workflows, and cross-functional execution.",
      icon: <Sparkles className="w-5 h-5 text-white" />,
    },
    {
      title: "Product & Growth",
      description:
        "Reduce onboarding friction, create adoption rhythms, and tie product decisions to measurable growth outcomes.",
      icon: <Columns className="w-5 h-5 text-white" />,
    },
    {
      title: "Narrative & Content",
      description:
        "Build thoughtful narratives around internet culture, influence, and modern attention with an operator’s clarity.",
      icon: <PenTool className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <motion.section
      id="focus"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden bg-[#fffefb] py-24 px-6 text-slate-950"
    >
      <div className="absolute right-12 top-16 h-28 w-28 rounded-[2.5rem] bg-[#151515]/10" />
      <div className="absolute left-16 top-52 h-20 w-20 rounded-full bg-[#d6c2a3]/70" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.95fr] xl:items-center">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-600 mb-4">Current focus</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">Where I spend my time.</h2>
            <p className="mt-5 text-base text-slate-700 leading-relaxed">
              I move between systems, product, and narrative with a clear aesthetic: practical, bold, and rooted in real adoption.
            </p>
          </div>

          <div className="relative rounded-[3rem] border border-slate-200/70 bg-black text-white p-12 shadow-[0_35px_90px_rgba(0,0,0,0.08)]">
            <div className="absolute -right-10 top-10 h-24 w-24 rounded-full bg-[#d6c2a3]/50" />
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Studio frame</p>
            <h3 className="mt-6 text-3xl font-semibold">Operational work with editorial care.</h3>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Fewer landing pages, more meaningful systems. I build the conditions for teams and stories to scale together.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-10">
          {focusAreas.map((area) => (
            <div key={area.title} className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950">
                {area.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-950">{area.title}</h3>
                <p className="mt-2 text-slate-700 leading-relaxed">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;

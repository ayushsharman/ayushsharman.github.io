import { motion } from "framer-motion";

const Resume = () => {
  const thinking = [
    {
      title: "Adoption matters more than features",
      type: "Essay",
      summary:
        "A practical framework for prioritizing product habits, onboarding, and the systems that turn new users into repeat users.",
    },
    {
      title: "Scaling hospital implementation systems",
      type: "Case note",
      summary:
        "How operational clarity, repeatable handoffs, and simple playbooks lower risk when scaling across clinical partners.",
    },
    {
      title: "Why narrative shapes trust faster than roadmaps",
      type: "Video insight",
      summary:
        "The role of narrative in early-stage product adoption, team alignment, and the way audiences perceive capability.",
    },
    {
      title: "Designing teams for execution at speed",
      type: "Framework",
      summary:
        "A concise operating model for product teams that need direction, accountability, and momentum without noise.",
    },
  ];

  const principles = [
    "Adoption beats feature velocity.",
    "Systems outperform motivation.",
    "Most scaling problems are operational, not technical.",
    "Narrative is the frame that makes strategy understandable.",
  ];

  return (
    <motion.section
      id="thinking"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-[#fffdf9] py-24 px-6 text-slate-950"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] xl:items-center">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-600 mb-4">Selected thinking</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">Essays, frameworks, and observations.</h2>
            <p className="mt-5 text-base text-slate-700 leading-relaxed">
              A compact collection of thinking from the edge of operations, product adoption, and digital narrative.
            </p>
          </div>

          <div className="relative rounded-[2.5rem] border border-black/10 bg-slate-950 px-10 py-12 text-white overflow-hidden">
            <div className="absolute -right-8 top-10 h-24 w-24 rounded-full bg-[#d6c2a3]/30" />
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Editorial lens</p>
            <h3 className="mt-6 text-3xl font-semibold leading-tight">Ideas that feel as sharp as systems.</h3>
            <p className="mt-5 text-base text-slate-200 leading-relaxed">
              Clear, structural thinking for founders, operators, and teams that need tension without noise.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-12">
          {thinking.map((item) => (
            <div key={item.title} className="space-y-2 border-b border-slate-200/80 pb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.type}</p>
              <h3 className="text-2xl font-semibold text-slate-950">{item.title}</h3>
              <p className="text-slate-700 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle} className="rounded-[2rem] border border-slate-300/70 bg-[#f7ede0] px-6 py-6">
              <p className="text-base text-slate-950">{principle}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Resume;

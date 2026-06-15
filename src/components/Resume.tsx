import { motion } from "framer-motion";

const Resume = () => {
  const thinking = [
    {
      title: "Your North Star Metric won't save you",
      type: "LinkedIn Post",
      summary:
        "The North Star is useful, but the real work begins with the L1 metrics that feed it — appointment bookings, retention, show-up rates, and operational rhythm.",
      url: "https://www.linkedin.com/posts/ayush-sharman_productmanagement-northstarmetrics-strategy-activity-7471046731036577792-SHPz",
    },
    {
      title: "The only unfair advantage you actually control",
      type: "LinkedIn Post",
      summary:
        "A morning routine isn't about hustle; it's about removing low-level distractions so energy can stay focused on meaningful work.",
      url: "https://www.linkedin.com/posts/ayush-sharman_writer-content-startup-activity-7467772396779773952-wy9z",
    },
    {
      title: "Nothing gets done until someone does the work",
      type: "LinkedIn Post",
      summary:
        "When work piles up, the best move is simple: finish one thing, then the next. Momentum solves more than overthinking.",
      url: "https://www.linkedin.com/posts/ayush-sharman_founder-writer-ayush-activity-7460179901090807808-O_I5",
    },
    {
      title: "Stop thinking like an employee if you want to freelance",
      type: "Video Playlist",
      summary:
        "A curated workshop on building freelance momentum, client work, and independent execution.",
      url: "https://www.youtube.com/playlist?list=PL2sJZ4Zbn0xtsblnJRqKLrp1HwF-Y9PCo",
    },
  ];

  const principles = [
    "Adoption is the only feature that matters.",
    "Systems outperform motivation.",
    "Most scaling problems are operational, not technical.",
    "Every metric has a human behavior underneath it.",
  ];

  return (
    <motion.section
      id="thoughts"
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
            <a
              key={item.title}
              href={item.url}
              className="block space-y-2 border-b border-slate-200/80 pb-8 transition-opacity duration-300 hover:opacity-75"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.type}</p>
              <h3 className="text-2xl font-semibold text-slate-950 hover:text-[#c1440e] transition-colors">{item.title}</h3>
              <p className="text-slate-700 leading-relaxed">{item.summary}</p>
            </a>
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

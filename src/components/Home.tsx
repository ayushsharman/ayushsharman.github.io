import '../assets/styles/Home.css';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const floatA = useTransform(scrollYProgress, [0, 0.15], [0, 20]);
  const floatB = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

  return (
    <section id="hero" className="relative bg-[#f5f0e8] text-slate-950 overflow-hidden">
      {/* ─── HERO GRID ──────────────────────────────────── */}
      <div className="grid min-h-screen lg:grid-cols-[1fr_1fr]">

        {/* LEFT — text */}
        <div className="flex flex-col justify-center px-12 pt-28 pb-16 lg:px-16 relative z-10">
          <p className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-[#c1440e]">
            <span className="text-base">✳</span>
            Operator · Thinker · Creator
          </p>

          <h1 className="text-[clamp(5rem,9vw,8rem)] font-black leading-[0.85] tracking-[-0.05em] mb-6">
            <span className="block">AYUSH</span>
            <span className="block text-[#c1440e]">SHARMA</span>
          </h1>

          <p className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-slate-950">
            <span className="text-[#c1440e]">✳</span>
            Systems. Storytelling. Execution.
          </p>

          <p className="mb-10 max-w-[420px] text-base leading-relaxed text-slate-600">
            I work at the intersection of operations, product thinking, and digital narratives.
            Currently helping scale healthcare systems at{' '}
            <span className="text-[#c1440e] font-medium">Medoc</span>{' '}
            while creating analytical content around internet culture, psychology, and modern influence.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="work"
              smooth duration={600}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Work <ArrowUpRight size={14} />
            </Link>
            <Link
              to="thoughts"
              smooth duration={600}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-slate-950 bg-transparent px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Watch Content <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="relative overflow-hidden">
          {/* Big decorative circle */}
          <motion.div
            style={{ y: floatA }}
            className="absolute right-[-80px] top-1/2 -translate-y-1/2 h-[540px] w-[540px] rounded-full bg-[#d9cfc0] z-0"
          />

          {/* Small accent circle */}
          <motion.div
            style={{ y: floatB }}
            className="absolute left-10 bottom-24 h-20 w-20 rounded-full bg-[#ede5d8] z-0"
          />

          {/* Photo — no white container, just the image */}
          <img
            src="/professional image bg removed.png"
            alt="Ayush Sharma"
            className="absolute bottom-0 right-0 h-[92%] w-auto object-cover object-bottom z-10"
          />

          {/* Floating info card — LEFT edge of right column */}
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-20 w-[248px] rounded-[24px] border border-slate-200/60 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
            {[
              { icon: '⚕', label: 'Healthcare Systems', text: 'Scaling operations at Medoc' },
              { icon: '💡', label: 'Product & Ops', text: 'Building systems that drive real adoption' },
              { icon: '▶', label: 'Content Creator', text: 'Analytical videos on internet culture, psychology & more' },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 py-4 ${i < 2 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c1440e]/30 text-[#c1440e] text-xs">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 mb-1">{item.label}</p>
                  <p className="text-[12px] font-semibold text-slate-950 leading-snug">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll button — right edge, vertically centered, in front of everything */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c1440e] text-white shadow-lg">
              <ChevronDown size={16} />
            </div>
            <div className="rounded-full border border-slate-300 bg-white/90 px-3 py-3">
              <span className="[writing-mode:vertical-rl] text-[9px] tracking-[0.3em] uppercase text-slate-700 font-medium">
                Scroll ↓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STATS BAR ───────────────────────────────────── */}
      <div className="bg-white border-t border-slate-100">
        <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-3 xl:grid-cols-5">
          {/* Cell 1 */}
          <div className="p-8">
            <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 mb-3">At Medoc</p>
            <p className="text-sm font-medium text-slate-950 leading-snug">
              Building the operating layer for modern healthcare.
            </p>
          </div>
          {/* Cell 2 */}
          <div className="p-8 text-left">
            <p className="text-4xl font-black tracking-tight text-slate-950">20+</p>
            <p className="mt-1 text-sm text-slate-500">Hospital Partnerships</p>
          </div>
          {/* Cell 3 */}
          <div className="p-8 text-left">
            <p className="text-4xl font-black tracking-tight text-slate-950">10K+</p>
            <p className="mt-1 text-sm text-slate-500">Patients Impacted</p>
          </div>
          {/* Cell 4 */}
          <div className="p-8">
            <p className="text-2xl font-black text-slate-950">Systems</p>
            <p className="mt-1 text-sm text-slate-500">Over Features</p>
          </div>
          {/* Cell 5 — quote */}
          <div className="bg-[#f5f0e8] p-8">
            <p className="text-3xl font-serif text-[#c1440e] leading-none mb-2">"</p>
            <p className="text-sm font-semibold text-slate-950 leading-snug">
              Most problems aren't technical.{' '}
              <span className="text-[#c1440e]">They're operational.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ─── TRUSTED BY ──────────────────────────────────── */}
      <div className="bg-[#f5f0e8] border-t border-slate-200/60 px-12 py-5 flex items-center gap-12 overflow-x-auto">
        <span className="shrink-0 text-[9px] uppercase tracking-[0.35em] text-slate-400">Trusted By</span>
        <div className="flex items-center gap-10 opacity-60">
          {['✳ medoc', '⚕ MAX Healthcare', 'manipalhospitals', "Rainbow Children's Hospital", 'COLUMBIA ASIA'].map((logo) => (
            <span key={logo} className="shrink-0 text-xs font-bold tracking-wide text-slate-600 whitespace-nowrap">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
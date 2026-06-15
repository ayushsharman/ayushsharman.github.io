import "../assets/styles/Home.css";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll";

const Home = () => {
  const { scrollYProgress } = useScroll();

  const floatA = useTransform(scrollYProgress, [0, 0.15], [0, 20]);
  const floatB = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#f5f0e8] text-slate-950"
    >
      {/* ───────────────── BACKGROUND ───────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg.png"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />

        {/* warm tint */}
        <div className="absolute inset-0 bg-[#f5f0e8]/55" />

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.04))]" />
      </div>

      {/* ───────────────── HERO GRID ───────────────── */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1fr_1fr]">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 pt-20 pb-36 sm:px-10 lg:px-20 relative z-10">

          <p className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-[#c1440e]">
            <span className="text-base">✳</span>
            Operator · Thinker · Creator
          </p>

          <h1 className="mb-6 text-[clamp(5rem,9vw,8rem)] font-black leading-[0.85] tracking-[-0.06em]">
            <span className="block">AYUSH</span>
            <span className="block text-[#c1440e]">SHARMA</span>
          </h1>

          <div className="mb-8 flex items-center gap-4 border-b border-black/10 pb-8">
            <span className="text-[#c1440e] text-lg">✳</span>

            <p className="text-[12px] uppercase tracking-[0.35em] text-slate-900 font-medium">
              Systems. Storytelling. Execution.
            </p>
          </div>

          <p className="mb-8 max-w-[520px] sm:max-w-[620px] text-[19px] leading-[1.9] text-slate-700">
            I work at the intersection of operations, product thinking,
            and digital narratives. Currently helping scale healthcare
            systems at{" "}
            <span className="font-semibold text-[#c1440e]">
              Medoc
            </span>{" "}
            while creating analytical content around internet culture,
            psychology, and modern influence.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="work"
              smooth
              duration={600}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-black"
            >
              View Work
              <ArrowUpRight size={15} />
            </Link>

            <Link
              to="thoughts"
              smooth
              duration={600}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/15 bg-white/60 px-8 py-4 text-sm font-semibold text-slate-950 backdrop-blur-md transition-all duration-300 hover:bg-white"
            >
              Watch Content
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative overflow-hidden min-h-[560px] md:min-h-[660px] lg:min-h-full">

          {/* BIG AMBIENT CIRCLE */}
          <motion.div
            style={{ y: floatA }}
            className="absolute right-[-110px] top-1/2 z-0 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#d9cfc0]/70 md:right-[-100px] md:h-[620px] md:w-[620px] lg:right-[-120px] lg:h-[780px] lg:w-[780px]"
          />

          {/* DOT PATTERN */}
          <div
            className="absolute right-[20%] top-[12%] z-0 h-[280px] w-[280px] opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(#c1440e 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* SMALL FLOATING CIRCLE */}
          <motion.div
            style={{ y: floatB }}
            className="absolute bottom-28 left-8 z-0 h-24 w-24 rounded-full bg-[#ede5d8]"
          />

          {/* PORTRAIT */}
          <img
            src="/professional image bg removed.png"
            alt="Ayush Sharma"
            className="absolute bottom-0 right-0 z-10 h-[58vh] max-h-[700px] w-auto max-w-full object-cover object-bottom sm:h-[72vh] lg:h-[92%]"
          />

          {/* FLOATING INFO CARD */}
          <div className="absolute left-4 top-1/2 z-20 w-[calc(100%-32px)] max-w-[320px] -translate-y-1/2 rounded-[28px] border border-white/40 bg-white/75 p-5 backdrop-blur-xl shadow-[0_25px_70px_-20px_rgba(15,23,42,0.2)] lg:left-[20px] lg:w-[260px]">
            {[
              {
                icon: "⚕",
                label: "Healthcare Systems",
                text: "Scaling operations at Medoc",
              },
              {
                icon: "💡",
                label: "Product & Ops",
                text: "Building systems that drive real adoption",
              },
              {
                icon: "▶",
                label: "Content Creator",
                text: "Analytical videos on internet culture, psychology & more",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 py-5 ${i < 2 ? "border-b border-black/6" : ""
                  }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c1440e]/30 text-[#c1440e] text-xs">
                  {item.icon}
                </div>

                <div>
                  <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-slate-400">
                    {item.label}
                  </p>

                  <p className="text-[13px] font-semibold leading-snug text-slate-950">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ───────────────── OVERLAY STATS BAR ───────────────── */}
      <div className="relative z-30 -mt-[200px]">

        <div className="border-y border-white/30 bg-white/20 backdrop-blur-xl overflow-x-auto">

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 min-w-full">

            {/* 1 */}
            <div className="border-r border-black/10">
              <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-12">

                <p className="mb-2 text-[8px] sm:text-[10px] uppercase tracking-[0.35em] text-slate-500">
                  At Medoc
                </p>

                <p className="max-w-[220px] text-[14px] sm:text-[18px] leading-relaxed text-slate-900">
                  Building the operating layer for modern healthcare.
                </p>

              </div>
            </div>

            {/* 2 */}
            <div className="border-r border-black/10">
              <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-12">

                <p className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
                  20+
                </p>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">
                  Hospital Partnerships
                </p>

              </div>
            </div>

            {/* 3 */}
            <div className="border-r border-black/10">
              <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-12">

                <p className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
                  10K+
                </p>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">
                  Patients Impacted
                </p>

              </div>
            </div>

            {/* 4 */}
            <div className="border-r border-black/10">
              <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-12">

                <p className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
                  Systems
                </p>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">
                  Over Features
                </p>

              </div>
            </div>

            {/* 5 */}
            <div className="bg-[#f5f0e8]/60 backdrop-blur-xl">
              <div className="flex h-full flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-12">



                <p className="max-w-[260px] text-[16px] sm:text-[24px] font-black leading-[1.02] tracking-[-0.05em] text-slate-950">
                  “ Most problems aren&apos;t technical.{" "}
                  <span className="text-[#c1440e]">
                    They&apos;re operational.
                  </span>
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ───────────────── TRUSTED BY ───────────────── */}
      {/* <div className="relative z-20 border-t border-black/5 bg-[#f5f0e8]/80 px-10 py-8 backdrop-blur-md">
        <div className="flex items-center gap-14 overflow-x-auto">

          <span className="shrink-0 text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Trusted By
          </span>

          <div className="flex items-center gap-16 opacity-70">
            {[
              "✳ medoc",
              "⚕ MAX Healthcare",
              "manipalhospitals",
              "Rainbow Children's Hospital",
              "COLUMBIA ASIA",
            ].map((logo) => (
              <span
                key={logo}
                className="shrink-0 whitespace-nowrap text-sm font-bold tracking-wide text-slate-700"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Home;
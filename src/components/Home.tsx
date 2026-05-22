import '../assets/styles/Home.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const floatA = useTransform(scrollYProgress, [0, 0.2], [0, 60]);
  const floatB = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 px-6 overflow-hidden bg-white text-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: floatA }}
          className="absolute left-8 top-28 h-28 w-28 rounded-[2.5rem] bg-slate-950"
        />
        <motion.div
          style={{ y: floatB }}
          className="absolute right-10 top-44 h-20 w-20 rounded-3xl border-4 border-black bg-[#d6c2a3]"
        />
        <div className="absolute left-1/2 top-24 h-20 w-20 rounded-full bg-black/10" />
        <div className="absolute right-32 top-10 h-24 w-24 rounded-[2rem] bg-[#d6c2a3]/75" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-5xl"
      >
        <div className="mb-10 text-sm uppercase tracking-[0.35em] text-slate-600">
          Startup operator · product thinker · content strategist
        </div>

        <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-[5rem] font-bold leading-[0.9] text-slate-950 tracking-tight">
              AYUSH SHARMA
            </h1>
            <p className="mt-8 max-w-2xl text-xl md:text-2xl text-slate-700 leading-relaxed">
              I shape premium operational systems, product storytelling, and cultural thinking that land in the market. Right now I’m helping Medoc scale healthcare adoption while translating attention and influence into clear strategic language.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                to="experience"
                smooth={true}
                duration={600}
                offset={-80}
                className="inline-flex items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                View work
              </Link>
              <Link
                to="thinking"
                smooth={true}
                duration={600}
                offset={-80}
                className="inline-flex items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Read thinking
              </Link>
            </div>
          </div>

          <div className="hidden xl:flex flex-col items-end gap-6 text-right">
            <div className="w-1.5 h-24 bg-black" />
            <div className="relative rounded-[2rem] border border-black bg-slate-950 px-8 py-8 text-white">
              <div className="absolute -right-10 top-4 h-24 w-24 rounded-full bg-[#d6c2a3]/50" />
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Positioning</p>
              <p className="mt-5 text-lg font-semibold">
                Modern operating partner with creator instincts.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;



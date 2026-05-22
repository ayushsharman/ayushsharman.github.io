import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const contactItems = [
  {
    icon: <FaEnvelope size={24} />,
    title: "Email",
    text: "ashsharman123@gmail.com",
    link: "mailto:ashsharman123@gmail.com",
  },
  {
    icon: <FaLinkedin size={24} />,
    title: "LinkedIn",
    text: "ayush-sharman",
    link: "https://www.linkedin.com/in/ayush-sharman/",
  },
  {
    icon: <FaGithub size={24} />,
    title: "GitHub",
    text: "github.com/ayushsharman",
    link: "https://github.com/ayushsharman",
  },
  {
    icon: <FaInstagram size={24} />,
    title: "Instagram",
    text: "@analyticalayush",
    link: "https://www.instagram.com/analyticalayush/",
  },
];

const Contact = () => {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden py-24 px-6 bg-[#111111] text-white"
    >
      <div className="absolute -left-14 top-20 h-40 w-40 rounded-br-[100px] bg-[#c7b79a]/15" />
      <div className="absolute right-0 bottom-12 h-24 w-24 rounded-full bg-[#c7b79a]/20" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.25fr_0.85fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-4">Contact</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">Let’s make the next system feel inevitable.</h2>
            <p className="mt-5 text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Operator-led strategy, product systems, and narrative direction — delivered with precision and clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-sm"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Book time</p>
            <h3 className="mt-4 text-2xl font-semibold">Book a 1:1</h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Schedule a short conversation about product direction, operational levers, or narrative strategy.
            </p>
            <a
              href="https://calendar.app.google/fFx5NHCXzN3q1yew8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full border border-white/10 bg-[#c7b79a] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#d0c3a4]"
            >
              Reserve a slot
            </a>
          </motion.div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.05 * index }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#1a1a1a] p-6 transition hover:-translate-y-1 hover:border-[#c7b79a]/40"
            >
              <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-[#c7b79a]/10" />
              <div className="flex items-center gap-5 relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-[#111111] shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.title}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;

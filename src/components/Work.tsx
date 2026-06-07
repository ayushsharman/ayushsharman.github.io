import React from "react";
import { motion } from "framer-motion";

interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  location: string;
  skills: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Director, Experience",
    company: "Medoc",
    duration: "Aug 2025 - Present",
    location: "Mohali district, India · Hybrid",
    skills: "Product Operations • Go-to-Market",
    description: [
      "Designed a repeatable implementation framework for hospital adoption and product rollout.",
      "Aligned customer success, product, and growth around shared adoption metrics.",
      "Focused leadership on operational clarity instead of feature velocity.",
    ],
  },
  {
    id: 2,
    role: "Enterprise Account Executive",
    company: "ClearTax",
    duration: "Jan 2025 - Jul 2025",
    location: "Bengaluru, India · On-site",
    skills: "Enterprise GTM • Revenue Operations",
    description: [
      "Drove commercial conversations for tax-tech with CFOs and finance leaders.",
      "Built sales and onboarding processes that translated product value into executive confidence.",
      "Used customer insight to improve go-to-market messaging and adoption handoffs.",
    ],
  },
  {
    id: 3,
    role: "Chief Technology Officer",
    company: "Medoc",
    duration: "Apr 2024 - Jan 2025",
    location: "Remote · Hybrid",
    skills: "Team Leadership • Systems Design",
    description: [
      "Shifted the organization from reactive execution to a structured operating cadence.",
      "Built a core product team and introduced release governance with customer signals.",
      "Transformed technical planning into measurable business outcomes.",
    ],
  },
  {
    id: 4,
    role: "Product Head",
    company: "Medoc",
    duration: "Mar 2023 - Apr 2024",
    location: "Remote",
    skills: "Product Strategy • Workflow Design",
    description: [
      "Created clinical workflows for doctors across IPD, OPD, and surgery planning.",
      "Introduced a simple onboarding playbook to reduce adoption friction.",
      "Connected product decisions to retention, workflow efficiency, and revenue.",
    ],
  },
  {
    id: 5,
    role: "Founding Team Member",
    company: "Medoc",
    duration: "Jul 2022 - Mar 2023",
    location: "Remote",
    skills: "Early-stage Strategy • Execution",
    description: [
      "Joined when strategy lived on whiteboards and made it executable across teams.",
      "Launched Medoc’s early roadmap with a focus on repeatable implementation.",
      "Turned informal feedback into structured cycles for product learning.",
    ],
  },
];

const Work: React.FC = () => {
  return (
    <section id="work" className="relative overflow-hidden bg-[#efe5d7] py-24 px-6 text-slate-950">
      <div className="absolute right-0 top-24 h-40 w-40 rounded-[2.5rem] bg-black/10" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="sticky top-28 self-start space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-600">Experience</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">A layered journey across product, ops, and growth.</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Roles and transitions that moved from execution to systems leadership, with a focus on adoption, implementation, and narrative.
            </p>
          </div>

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="grid gap-6 md:grid-cols-[0.4fr_0.6fr]"
              >
                <div className="relative rounded-[2rem] bg-slate-950 p-10 text-white overflow-hidden">
                  <div className="absolute -right-10 top-10 h-24 w-24 rounded-full bg-[#d6c2a3]/70" />
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{exp.duration}</p>
                  <h3 className="mt-6 text-3xl font-semibold">{exp.role}</h3>
                  <p className="mt-4 text-base text-slate-200">{exp.company}</p>
                </div>

                <div className="rounded-[2rem] border border-slate-300/60 bg-white p-10">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{exp.location}</p>
                  <div className="mt-6 space-y-4 text-slate-700 text-sm leading-relaxed">
                    {exp.description.map((item, idx) => (
                      <p key={idx} className="flex gap-3">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-950" />
                        {item}
                      </p>
                    ))}
                  </div>
                  <p className="mt-8 text-xs uppercase tracking-[0.35em] text-slate-500">{exp.skills}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;

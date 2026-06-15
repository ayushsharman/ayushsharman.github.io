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
    role: "Product & Operations Lead",
    company: "Medoc",
    duration: "Aug 2025 - Present",
    location: "Sahibzada Ajit Singh Nagar, Punjab, India · On-site",
    skills: "Product Operations • Enterprise Implementation",
    description: [
      "Lead cross-functional execution across Product, Engineering, Sales, Customer Success, and Operations.",
      "Drive implementation strategy and customer onboarding for enterprise healthcare clients.",
      "Build operational systems, hiring frameworks, and training processes to improve execution quality.",
      "Work with leadership on product strategy, retention, revenue growth, and organizational scaling.",
      "Act as the bridge between customer feedback, business priorities, and product development.",
    ],
  },
  {
    id: 2,
    role: "Enterprise Account Executive",
    company: "Clear",
    duration: "Jan 2025 - Jul 2025",
    location: "Bengaluru, Karnataka, India · On-site",
    skills: "Enterprise Sales • Revenue Operations",
    description: [
      "Managed enterprise conversations with CFOs, Finance Heads, and business leaders across mid-market and enterprise organizations.",
      "Consistently ranked among top-performing SDRs and Account Executives during onboarding and ramp-up.",
      "Executed end-to-end sales cycles including prospecting, demos, stakeholder management, and deal closure.",
      "Developed a strong understanding of revenue operations, customer pain points, and B2B buying behavior.",
    ],
  },
  {
    id: 3,
    role: "Product Manager",
    company: "Medoc",
    duration: "Mar 2023 - Jan 2025",
    location: "Remote",
    skills: "Product Strategy • Healthcare Workflow",
    description: [
      "Owned product strategy and execution for DocAssist, a platform streamlining clinical and hospital workflows.",
      "Led design, prioritization, and rollout of OPD/IPD management, surgery workflows, clinical documentation, and AI-assisted prescription generation.",
      "Translated customer feedback into product improvements and scalable workflows with engineering and leadership.",
      "Established product processes, requirement frameworks, and cross-functional collaboration to improve delivery.",
      "Recruited, mentored, and managed an early product team that later transitioned into core product, operations, and technology roles.",
    ],
  },
  {
    id: 4,
    role: "Founding Member",
    company: "Medoc",
    duration: "Jul 2022 - Mar 2023",
    location: "Remote",
    skills: "Startup Execution • Product Delivery",
    description: [
      "Joined as an intern and contributed to early product development, feature delivery, and technical execution.",
      "Helped move the idea from whiteboards to customer-ready product using Flutter and rapid shipping.",
      "Built early product habits and delivery routines that supported the company’s first growth stage.",
    ],
  },
  {
    id: 5,
    role: "Flutter Developer",
    company: "Appable",
    duration: "Jul 2023 - Nov 2023",
    location: "Hybrid",
    skills: "Flutter • Product Execution",
    description: [
      "Delivered production-ready Flutter applications from design concepts to deployment for client-facing solutions.",
      "Collaborated directly with stakeholders to translate business requirements into scalable product experiences.",
      "Owned frontend, backend integration, testing, and deployment for lean mobile projects.",
    ],
  },
  {
    id: 6,
    role: "Content Team Lead",
    company: "Hackoverflow Society",
    duration: "Aug 2022 - Dec 2022",
    location: "Chandigarh, India",
    skills: "Content Strategy • Community Engagement",
    description: [
      "Led content and communication for one of the college’s largest technical communities.",
      "Coordinated design, operations, and event teams for marketing campaigns, workshops, and engagement drives.",
      "Managed content planning, execution, and stakeholder coordination for student-led initiatives.",
    ],
  },
  {
    id: 7,
    role: "Technical Content Writer",
    company: "Code With Harry",
    duration: "Sep 2022 - Oct 2022",
    location: "Remote",
    skills: "Web Content Writing • CSS",
    description: [
      "Created beginner-friendly HTML and CSS learning content for Code With Harry’s platform.",
      "Structured tutorials that simplified complex concepts for large audiences.",
      "Collaborated on educational resources used by aspiring developers across India.",
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
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-950">Career experience across product, operations, and enterprise delivery.</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Roles grounded in customer adoption, execution quality, and repeatable systems.
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

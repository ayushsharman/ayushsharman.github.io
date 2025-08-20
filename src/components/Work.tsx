import React from "react";
import { motion } from "framer-motion";

interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  background: string;
  skills: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Chief Technology Officer",
    company: "Medoc",
    type: "Full-time",
    duration: "March 2024 - May 2024 · 3 mos",
    location: "Hybrid",
    skills:
      "Mobile Enterprise · Software Construction · Technology Management · AWS · Mobile App Dev · Communication",
    background: "bg-gray-800",
  },
  {
    id: 2,
    role: "Project Intern",
    company: "Appable Technologies Pvt. Ltd.",
    type: "Freelance",
    duration: "Jul 2023 - Nov 2023 · 5 mos",
    location: "Delhi, India · Hybrid",
    skills: "REST APIs · Dart · MERN Stack · Flutter · Product Development",
    background: "bg-gray-800",
  },
  {
    id: 3,
    role: "Content Team Lead",
    company: "Hackoverflow Society",
    type: "Part-time",
    duration: "Oct 2022 - Jun 2023 · 9 mos",
    location: "Remote",
    skills: "SEO · Content Strategy · Team Leadership · Product Development",
    background: "bg-gray-800",
  },
  {
    id: 4,
    role: "Technical Content Writer",
    company: "Code With Harry",
    type: "Freelance",
    duration: "Sep 2022 - Oct 2022 · 2 mos",
    location: "",
    skills: "HTML · CSS · Cross-platform Dev · Product Development",
    background: "bg-gray-800",
  },
  {
    id: 5,
    role: "Writer",
    company: "Bay Studios, Kerala",
    type: "Freelance",
    duration: "May 2021 - Jun 2022 · 1 yr 2 mos",
    location: "Kerala, India",
    skills: "Film Production · Story Writing · Screenwriting",
    background: "bg-gray-800",
  },
  {
    id: 6,
    role: "Content Writer",
    company: "Making The Difference - NGO",
    type: "Internship",
    duration: "Feb 2022 - May 2022 · 4 mos",
    location: "",
    skills: "Content Strategy · Copywriting · Content Management",
    background: "bg-gray-800",
  },
];

const Work: React.FC = () => {
  return (
    <section id="work" className="bg-gray-900 py-20 px-4">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-12">
        Work Timeline
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* center line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-1 bg-gray-700"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center md:items-start gap-6`}
            >
              {/* connector dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-md"></div>

              {/* content card */}
              <div
                className={`${exp.background} text-gray-200 p-6 rounded-2xl shadow-lg w-full md:w-5/12`}
              >
                <h3 className="font-semibold text-xl text-cyan-300">
                  {exp.role}
                </h3>
                <p className="text-gray-300 mb-2">
                  <strong>{exp.company}</strong> · {exp.type}
                </p>
                <p className="text-sm text-gray-400 mb-1">{exp.duration}</p>
                {exp.location && (
                  <p className="text-sm text-gray-400 mb-2">{exp.location}</p>
                )}
                <p className="text-sm leading-snug">{exp.skills}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

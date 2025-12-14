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
  description: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Director, Experience",
    company: "Medoc",
    type: "Full-time",
    duration: "Aug 2025 - Present",
    location: "Mohali district, India · Hybrid",
    skills: "Technical Operations · Start-up Leadership",
    background: "bg-gray-800",
    description: [
      "Leading technical operations with a dual focus: making sure our tech team builds the right product, and our clients feel that confidence every step of the way.",
      "From aligning product roadmaps to engaging hospitals directly, I’m bridging the gap between what we build and what truly works.",
      "Also overseeing the entire product vertical—ensuring each feature ships with clarity, context, and conviction.",
    ],
  },
  {
    id: 2,
    role: "Enterprise Account Executive",
    company: "Clear",
    type: "Full-time",
    duration: "Jan 2025 - Jul 2025 · 7 mos",
    location: "Bengaluru, Karnataka, India · On-site",
    skills: "Technical Operations · Start-up Leadership",
    background: "bg-gray-800",
    description: [
      "Leading technical operations with a dual focus: making sure our tech team builds the right product, and our clients feel that confidence every step of the way.",
      "From aligning product roadmaps to engaging hospitals directly, I’m bridging the gap between what we build and what truly works.",
      "Also overseeing the entire product vertical—ensuring each feature ships with clarity, context, and conviction.",
      "Switched gears to learn the business side—sold tax-tech to CFOs like I’d built it myself.",
      "Closed one of the biggest deals on the team while still early in the role, and quickly became a top performer.",
      "From cold calls to boardrooms, I helped enterprises solve real taxation pain—one high-stakes conversation at a time.",
    ],
  },
  {
    id: 2,
    role: "Chief Technology Officer",
    company: "Medoc",
    type: "Full-time",
    duration: "Apr 2024 - Jan 2025 · 10 mos",
    location: "Mohali district, India · Hybrid",
    skills: "Team Leadership · AWS · Scalability",
    background: "bg-gray-800",
    description: [
      "As CTO, I led Medoc's tech vision—scaling solutions for hospitals and driving the development of 5+ innovative products.",
      "Managed a 20-member team, optimizing workflows, boosting efficiency, and making sure everything we built was architected for the future.",
      "More than just technology—this was about creating real-world, scalable impact with a killer team and forward-thinking infrastructure.",
    ],
  },
  {
    id: 3,
    role: "Product Head",
    company: "Medoc",
    type: "Full-time",
    duration: "Mar 2023 - Apr 2024 · 1 yr 2 mos",
    location: "Remote",
    skills: "Entrepreneurship · Product Management",
    background: "bg-gray-800",
    description: [
      "Led product for Medoc’s brainchild—DocAssist.",
      "Built and scaled end-to-end workflows for doctors: IPD/OPD flows, surgery planning, AI-driven prescription writing.",
      "Handpicked, trained, and led a team of 3 from scratch—each now powering key roles across industries.",
    ],
  },
  {
    id: 4,
    role: "Flutter Developer",
    company: "Medoc",
    type: "Full-time",
    duration: "Dec 2022 - Mar 2023 · 4 mos",
    location: "Remote",
    skills: "Cross-platform Development · Firebase",
    background: "bg-gray-800",
    description: [
      "Graduated from intern to in-house Flutter force.",
      "Took my early groundwork and scaled it—building and maintaining key modules for Medoc’s core platform.",
      "From handling app architecture to fixing last-minute production bugs, I’ve been part of the full dev cycle.",
    ],
  },
  {
    id: 5,
    role: "Founding Member",
    company: "Medoc",
    type: "Part-time",
    duration: "Jul 2022 - Dec 2022 · 6 mos",
    location: "Remote",
    skills: "C++ · Java · Flutter",
    background: "bg-gray-800",
    description: [
      "Was called an intern, but built like a co-founder.",
      "Joined Medoc when the idea was still on whiteboards.",
      "Learned Flutter on the go, shipped features fast, and contributed to the core product.",
    ],
  },
  {
    id: 6,
    role: "Branding and Business Growth Coordinator",
    company: "Mflux Universe",
    type: "Part-time",
    duration: "Nov 2022 - Apr 2024 · 1 yr 6 mos",
    location: "Remote",
    skills: "Content Marketing · Digital Marketing",
    background: "bg-gray-800",
    description: [
      "Call it matchmaking—but for brands and content creators.",
      "Part of the early team at MFlux, setting up campaigns, onboarding creators, and helping clients find the right influencer fit.",
    ],
  },
  {
    id: 7,
    role: "Flutter Developer",
    company: "Appable",
    type: "Freelance",
    duration: "Jul 2023 - Nov 2023 · 5 mos",
    location: "Hybrid",
    skills: "REST APIs · Problem Solving",
    background: "bg-gray-800",
    description: [
      "Alongside a teammate, took Flutter apps from figma-level ideas to fully published products.",
      "From front-end finesse to backend tweaks, we were the duo behind production-ready builds now used by actual businesses.",
    ],
  },
  {
    id: 8,
    role: "Content Team Lead",
    company: "Hackoverflow Society",
    type: "Part-time",
    duration: "Aug 2022 - Dec 2022 · 5 mos",
    location: "Chandigarh, India",
    skills: "Team Leadership · Content Strategy",
    background: "bg-gray-800",
    description: [
      "Ran event campaigns, coordinated with design and ops, and made sure every word on every platform had a purpose.",
      "Basically: creative direction, student energy, and startup-level chaos—all in one role.",
    ],
  },
  {
    id: 9,
    role: "Technical Content Writer",
    company: "Code With Harry",
    type: "Freelance",
    duration: "Sep 2022 - Oct 2022 · 2 mos",
    location: "Remote",
    skills: "Web Content Writing · CSS · HTML",
    background: "bg-gray-800",
    description: [
      "Built HTML & CSS tutorials from scratch—for the YouTube guy teaching half of India to code.",
      "Prepped clean, beginner-first lessons that made it to the main content stack, with a testimonial to back the craft.",
    ],
  },
  {
    id: 10,
    role: "Content Creator",
    company: "SuprSoul",
    type: "Internship",
    duration: "Jun 2022 - Jul 2022 · 2 mos",
    location: "Remote",
    skills: "Social Media Marketing · Creative Content",
    background: "bg-gray-800",
    description: [
      "Planned short-form content before “Reels” became a button.",
      "Handled the full content playbook—Instagram posts, mindful messaging, and visual storytelling.",
      "From daily captions to content calendars, I was the one connecting psychology and mental health.",
    ],
  },
  {
    id: 11,
    role: "Script Writer",
    company: "Bay Studios, Kerala",
    type: "Freelance",
    duration: "May 2021 - Jun 2022 · 1 yr 2 mos",
    location: "Remote",
    skills: "Film Production · Story Writing",
    background: "bg-gray-800",
    description: [
      "Crafted stories that crossed over from Google Docs to movie sets.",
      "Dived into screenplay writing, helped shape cinematic visions, and even had Netflix hovering around the drafts.",
      "Some scripts echoed through Kerala’s regional cinema—and I got a front-row seat to indie filmmaking done right.",
    ],
  },
  {
    id: 12,
    role: "Content Writer",
    company: "Mtdngo",
    type: "Internship",
    duration: "Feb 2022 - May 2022 · 4 mos",
    location: "Remote",
    skills: "Content Strategy · Copywriting",
    background: "bg-gray-800",
    description: [
      "Before AI started writing captions, I was already doing it for humans.",
      "Handled Instagram strategy, brand copy, and content ideas that clicked—even worked closely with influencers.",
      "One of the brains behind the content—think sharp, scroll-stopping, and always on-brand.",
    ],
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
              className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center md:items-start gap-6`}
            >
              {/* connector dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-md transform -translate-y-1/2 md:translate-y-0 mt-6 md:mt-0"></div>

              {/* content card */}
              <div
                className={`${exp.background} text-gray-200 p-6 rounded-2xl shadow-lg w-full md:w-5/12 border border-gray-800 hover:border-cyan-500/50 transition-colors duration-300`}
              >
                <div className="flex flex-col gap-1 mb-3">
                  <h3 className="font-bold text-xl text-cyan-300 leading-tight">
                    {exp.role}
                  </h3>
                  <p className="text-white font-medium text-lg">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <span>{exp.type}</span> • <span>{exp.duration}</span>
                  </p>
                  {exp.location && (
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  )}
                </div>

                <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-gray-300 leading-relaxed marker:text-cyan-500">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>
                      <span className="-ml-1">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-gray-700">
                  <p className="text-xs text-cyan-200/80 font-mono tracking-wide">
                    {exp.skills.split("·").join(" • ")}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

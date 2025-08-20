import React from "react";
import { Briefcase, Award, Download } from "lucide-react";

const About: React.FC = () => {
  return (
    <section
      id="services"
      className="min-h-screen flex flex-col justify-center px-6 py-20 bg-gray-950 text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
            Beyond Code, I Build Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            I'm <span className="text-cyan-300 font-semibold">Ayush Sharma</span>,
            a developer, creator, and entrepreneur who thrives at the intersection
            of <span className="text-cyan-400">technology, design, and strategy</span>.
            Here’s a glimpse of what I’ve achieved and how I can bring value to your vision.
          </p>
        </div>

        {/* Achievements + Services */}
        <div className="grid md:grid-cols-2 gap-16 items-start relative">
          {/* Cyan Glow divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/40 to-blue-600/40 blur-lg rounded-full"></div>

          {/* Achievements - Timeline Style */}
          <div className="relative">
            <h3 className="text-2xl font-semibold text-cyan-400 flex items-center gap-2 mb-8">
              <Award className="w-6 h-6 text-cyan-300" /> Achievements
            </h3>
            <div className="space-y-8 border-l border-cyan-700 pl-6">
              {[
                "Mentor at Girl Script Summer of Code 2024",
                "Letter of Recommendation by Head of Department, CSE (1st Year)",
                "Winner at SIH Internal Hackathon 2022",
                "Lead Coordinator: IICC 2022, Google DevFest 2022, Tekathon 2023, Hack-The-Fest 2022, Hackshield 2022",
                "15k+ following across LinkedIn, YouTube, Instagram, etc",
              ].map((item, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4]"></span>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services - Diversified */}
          <div>
            <h3 className="text-2xl font-semibold text-cyan-400 flex items-center gap-2 mb-8">
              <Briefcase className="w-6 h-6 text-cyan-300" /> Services I Provide
            </h3>
            <div className="grid gap-6">
              <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-cyan-500/60 transition">
                🔹 <span className="text-cyan-300 font-semibold">Software Development</span>
                (Full-stack apps, APIs, scalable systems)
              </div>
              <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-cyan-500/60 transition">
                🔹 <span className="text-cyan-300 font-semibold">Content Creation</span>
                (YouTube, research-backed storytelling, fact-checking)
              </div>
              <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-cyan-500/60 transition">
                🔹 <span className="text-cyan-300 font-semibold">Consultancy</span>
                (Tech strategy, system design, workflow automation)
              </div>
              <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-cyan-500/60 transition">
                🔹 <span className="text-cyan-300 font-semibold">Entrepreneurship</span>
                (Startup building, community initiatives, innovation)
              </div>
            </div>

            {/* Resume Download Button */}
          </div>
        </div>
          <div className="mt-10 flex justify-center">
            <a
              href="/Resume 2.0.pdf"
              download="Resume 2.0.pdf"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-cyan-500/40 transition"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition" />
              <span>Download Resume</span>
              <span className="absolute inset-0 rounded-xl bg-cyan-500 opacity-0 group-hover:opacity-20 transition"></span>
            </a>
          </div>
      </div>
    </section>
  );
};

export default About;

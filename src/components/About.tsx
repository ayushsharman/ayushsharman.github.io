import { Code, Rocket, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-6 py-16"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left side - Intro */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">About Me</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Hey 👋 I'm <span className="text-cyan-300 font-semibold">Ayush Sharma</span>,  
            a developer who loves turning ideas into clean, functional, and engaging digital products.  
            My journey blends <span className="text-cyan-400">code, design, and problem-solving </span> 
            to build experiences that actually matter.
          </p>
          <p className="text-gray-400 mb-8">
            Whether it’s experimenting with new frameworks, solving real-world problems,  
            or working on creative side-projects, I thrive where curiosity meets execution.
          </p>

          {/* Quick Highlights */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition">
              <Code className="mx-auto text-cyan-400 w-8 h-8 mb-2" />
              <p className="text-sm text-gray-300">Full-Stack Dev</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition">
              <Rocket className="mx-auto text-cyan-400 w-8 h-8 mb-2" />
              <p className="text-sm text-gray-300">Startup Builder</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition">
              <Lightbulb className="mx-auto text-cyan-400 w-8 h-8 mb-2" />
              <p className="text-sm text-gray-300">Problem Solver</p>
            </div>
          </div>
        </div>

        {/* Right side - Creative Visual */}
        <div className="relative flex justify-center items-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 animate-pulse blur-3xl absolute"></div>
          <div className="relative bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 text-center">
            <p className="text-cyan-300 font-mono">“Building systems that last longer than trends.”</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

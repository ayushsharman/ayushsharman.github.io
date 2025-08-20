// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import About from './components/About';
// import Work from './components/Work';
// import Resume from './components/Resume';
// import Project from './components/Project';
// import Contact from './components/Contact';

// export default function App() {
//   return (
//     <Router>
//       <div className='font-montserrat'>
        // <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/work" element={<Work />} />
//           <Route path="/resume" element={<Resume />} />
//           <Route path="/project" element={<Project />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }


import { useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import Navbar from './components/Navbar';

export default function App() {
  // const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen font-sans">
      <Navbar></Navbar>

      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center text-center min-h-screen px-4">
        <motion.img 
          src="src/assets/images/Circle Avatar.png"
          alt="profile"
          className="w-40 h-40 rounded-full border-4 border-teal-400 mb-6 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <h2 className="text-4xl font-bold">Hi, I'm <span className="text-teal-400">Ayush</span></h2>
        <p className="mt-2 text-lg text-gray-400">System Thinker | Developer | Storyteller</p>
        <div className="flex gap-4 mt-4">
          <a href="https://github.com/ayushsharman" className="px-4 py-2 bg-teal-500 text-black rounded-xl hover:bg-teal-400">GitHub</a>
          <a href="https://linkedin.com/in/yourprofile" className="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600">LinkedIn</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-teal-400 mb-4">About Me</h2>
        <p className="text-gray-300 leading-relaxed">
          I am a developer passionate about building scalable systems, content creation, and exploring the intersection of technology and storytelling.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-gray-900 py-20 px-4">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-10">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {["React", "Node.js", "JavaScript", "Python", "TailwindCSS", "Git"].map((skill) => (
            <div key={skill} className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-teal-500/40 text-center font-semibold">
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Achievements</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>Top 1% in XYZ Hackathon</li>
          <li>Speaker at TechFest 2024</li>
          <li>Launched YouTube channel with 10k+ subs</li>
        </ul>
      </section>

      {/* Work Timeline */}
      <section id="work" className="bg-gray-900 py-20 px-4">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-10">Work Timeline</h2>
        <div className="border-l-2 border-teal-500 max-w-2xl mx-auto space-y-10">
          <div className="ml-4">
            <h3 className="font-semibold text-xl">Software Intern @ XYZ</h3>
            <p className="text-gray-400">2024 - Present</p>
            <p className="text-gray-300">Worked on scalable APIs and dashboards.</p>
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-xl">Freelance Projects</h3>
            <p className="text-gray-400">2023</p>
            <p className="text-gray-300">Built client websites and automation tools.</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-teal-400 mb-8 text-center">Projects</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {[1,2,3].map((p) => (
            <div key={p} className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-teal-500/40">
              <h3 className="text-xl font-semibold mb-2">Project {p}</h3>
              <p className="text-gray-400 mb-4">Short description of the project highlighting tech and outcome.</p>
              <div className="flex gap-4">
                <a href="#" className="text-teal-400 hover:underline">GitHub</a>
                <a href="#" className="text-teal-400 hover:underline">Live Demo</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-900 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Contact Me</h2>
        <p className="text-gray-300 mb-6">Let's connect! Reach out via email or social links.</p>
        <a href="mailto:ayush@example.com" className="px-6 py-3 bg-teal-500 text-black rounded-xl hover:bg-teal-400">Email Me</a>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Ayush Sharma. All rights reserved.
      </footer>
    </div>
  );
}

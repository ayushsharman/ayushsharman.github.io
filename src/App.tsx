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


// import { useState } from "react";
// import { Link } from "react-scroll";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { motion } from "framer-motion";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Work from "./components/Work";
import Project from './components/Project';
import Contact from './components/Contact';
import Resume from './components/Resume';

export default function App() {

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen font-sans">
      <Navbar />
      <Home/>
      <About/>
      <Resume/>
      <Work/>
      <Project/>
      <Contact/>
      <footer className="mt-16 text-center pb-12 text-gray-500">
        <p className="text-sm">
          © {new Date().getFullYear()} Ayush Sharma. Built with ☕ & 💻
        </p>
      </footer>
    </div>
  );
}

import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Resume from './components/Resume';
import Work from "./components/Work";
import Project from './components/Project';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4efe5] text-slate-950 font-sans">
      <Navbar />
      <main className="mx-auto max-w-8xl ">
        <Home />
        <About />
        <Resume />
        <Work />
        <Project />
        <Contact />
      </main>
      <footer className="border-t border-slate-300/60 text-center py-10 text-slate-600 mx-6">
        <p className="text-sm">© {new Date().getFullYear()} Rights Reserved by Ayush Sharma.</p>
      </footer>
    </div>
  );
}

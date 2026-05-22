import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from "./components/About";
import Resume from './components/Resume';
import Work from "./components/Work";
import Project from './components/Project';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f2ede4] text-slate-950 font-sans">
      <Navbar />
      <main className="mx-auto max-w-7xl pb-24">
        <Home />
        <About />
        <Resume />
        <Work />
        <Project />
        <Contact />
      </main>
      <footer className="border-t border-slate-300/60 text-center py-10 text-slate-600 mx-6">
        <p className="text-sm">© {new Date().getFullYear()} Ayush Sharma. Portfolio built with subtlety.</p>
      </footer>
    </div>
  );
}

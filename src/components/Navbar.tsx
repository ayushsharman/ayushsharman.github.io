import { useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sections = ["focus", "thinking", "experience", "case-studies", "contact"];

  return (
    <nav className="fixed top-0 w-full bg-white/85 backdrop-blur-xl z-50 border-b border-slate-200/60 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="hero"
          smooth={true}
          duration={600}
          offset={-80}
          className="text-base font-semibold uppercase tracking-[0.35em] text-slate-900 cursor-pointer"
        >
          AYUSH
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-700">
          {sections.map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={600}
              offset={-80}
              className="cursor-pointer transition hover:text-slate-900 capitalize"
            >
              {section.replace('-', ' ')}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-slate-900 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 px-6 py-4 text-slate-700">
          {sections.map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={600}
              offset={-80}
              className="block py-3 text-sm transition hover:text-slate-900 capitalize"
              onClick={() => setIsOpen(false)}
            >
              {section.replace('-', ' ')}
            </Link>
          ))}
        </div>
      )}
    </nav>

  );
};

export default Navbar;

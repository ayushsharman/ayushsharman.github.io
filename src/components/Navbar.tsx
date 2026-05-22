import { useState } from "react";
import { Link } from "react-scroll";
import { ArrowRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "ABOUT", to: "about" },
  { label: "WORK", to: "work" },
  { label: "THOUGHTS", to: "thoughts" },
  { label: "EXPERIENCE", to: "experience" },
  { label: "CONTACT", to: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 z-[100] w-full border-b border-white/10 bg-[#f5ede4]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-10">
        
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-xs font-black tracking-widest text-white shadow-lg">
            AS
          </div>

          <span className="text-[13px] font-semibold tracking-[0.38em] text-[#111111]">
            AYUSH SHARMA
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-[0.2em] text-[#2d2d2d]">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={600}
              offset={-80}
              spy={true}
              className="cursor-pointer transition-all duration-300 hover:text-[#c1440e]"
              activeClass="text-[#c1440e]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT CTA */}
        <div className="flex items-center gap-4">
          <Link
            to="contact"
            smooth={true}
            duration={600}
            offset={-80}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-black hover:scale-[1.02]"
          >
            Let&apos;s Connect
            <ArrowRight size={15} />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#111111] backdrop-blur-md transition hover:bg-white md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-black/5 bg-[#f5ede4]/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={600}
                offset={-80}
                spy={true}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer rounded-2xl px-4 py-4 text-sm font-medium tracking-[0.2em] text-[#2d2d2d] transition-all duration-300 hover:bg-white/70 hover:text-[#c1440e]"
                activeClass="bg-white/60 text-[#c1440e]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="contact"
              smooth={true}
              duration={600}
              offset={-80}
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-black"
            >
              Let&apos;s Connect
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
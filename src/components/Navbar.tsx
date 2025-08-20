import { useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sections = ["about", "skills", "achievements", "work", "projects", "contact"];

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo / Name */}
        <h1 className="text-xl font-bold text-teal-400">Ayush Sharma</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {sections.map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={600}
              offset={-60}
              className="cursor-pointer hover:text-teal-300 capitalize"
            >
              {section}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-teal-400 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-6 pb-4 space-y-4">
          {sections.map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={600}
              offset={-60}
              className="block text-gray-200 hover:text-teal-300 capitalize"
              onClick={() => setIsOpen(false)} // close menu after click
            >
              {section}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

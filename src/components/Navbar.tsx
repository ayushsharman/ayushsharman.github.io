import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-5 md:flex md:justify-between md:items-center">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">ToDo</div>
        <div className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>
      <ul className={`md:flex md:items-center md:space-x-8 mt-4 md:mt-0 ${isOpen ? 'block' : 'hidden'}`}>
        <li className="mt-2 md:mt-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white text-lg bg-orange-500 rounded-full px-4 py-2 transition duration-500 ease-in-out"
                : "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="mt-2 md:mt-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white text-lg bg-orange-500 rounded-full px-4 py-2 transition duration-500 ease-in-out"
                : "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li className="mt-2 md:mt-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white text-lg bg-orange-500 rounded-full px-4 py-2 transition duration-500 ease-in-out"
                : "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/work"
          >
            Work
          </NavLink>
        </li>
        <li className="mt-2 md:mt-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white text-lg bg-orange-500 rounded-full px-4 py-2 transition duration-500 ease-in-out"
                : "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/resume"
          >
            Resume
          </NavLink>
        </li>
        <li className="mt-2 md:mt-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white text-lg bg-orange-500 rounded-full px-4 py-2 transition duration-500 ease-in-out"
                : "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/project"
          >
            Project
          </NavLink>
        </li>
        <li className="mt-2 md:mt-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-white text-lg bg-orange-500 rounded-full px-4 py-2 transition duration-500 ease-in-out"
                : "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
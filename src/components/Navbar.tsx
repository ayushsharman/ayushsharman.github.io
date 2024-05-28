import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="m-8 flex justify-center items-center bg-black p-5 rounded-full">
      <ul className="list-none flex space-x-48">
        <li>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "text-white text-lg bg-orange-500 rounded-full px-8 py-3 transition duration-500 ease-in-out" : 
                         "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "text-white text-lg bg-orange-500 rounded-full px-8 py-3 transition duration-500 ease-in-out" : 
                         "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "text-white text-lg bg-orange-500 rounded-full px-8 py-3 transition duration-500 ease-in-out" : 
                         "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/work"
          >
            Work
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "text-white text-lg bg-orange-500 rounded-full px-8 py-3 transition duration-500 ease-in-out" : 
                         "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/resume"
          >
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "text-white text-lg bg-orange-500 rounded-full px-8 py-3 transition duration-500 ease-in-out" : 
                         "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
            }
            to="/project"
          >
            Project
          </NavLink>
        </li>
        <li>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "text-white text-lg bg-orange-500 rounded-full px-8 py-3 transition duration-500 ease-in-out" : 
                         "text-white text-lg rounded-full hover:text-orange-500 transition duration-500 ease-in-out"
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

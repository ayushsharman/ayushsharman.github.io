import '../assets/styles/Home.css';
import { motion } from 'framer-motion';
import pic from "../assets/images/pic.png";

const Home = () => {
  return (
    <div className="justify-center items-center text-center md:text-left fade-in">
      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center text-center min-h-screen px-4">
        <motion.img  
          src={pic}
          alt="Ayush Sharma"
          className="w-40 h-40 rounded-full border-4 border-cyan-400 mb-6 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <h2 className="text-4xl font-bold">Hi, I'm <span className="text-cyan-400">Ayush</span></h2>
        <p className="mt-2 text-lg text-gray-400">System Thinker | Developer | Storyteller</p>
        <div className="flex gap-4 mt-4">
          <a href="https://github.com/ayushsharman" className="px-4 py-2 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400">GitHub</a>
          <a href="https://linkedin.com/in/ayushsharman" className="px-4 py-2 bg-gray-700 rounded-xl hover:bg-gray-600">LinkedIn</a>
        </div>
      </section>
    </div>
  );
}

export default Home;



import '../assets/styles/Home.css';
import profilePic from '../assets/images/professional_pic.png';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-between items-center text-center md:text-left fade-in">
      <div className="flex-1 p-8">
        <h1 className="text-4xl md:text-6xl font-bold">
          I'm <span className="text-orange-500">Ayush Sharma,</span>
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold">Software Developer</h1>
        <p className="mt-8 md:mt-16 text-lg md:text-xl font-serif italic">
          "I design and code beautifully simple things, and I love what I do."
        </p>
      </div>
      <div className="flex-1 w-full md:w-auto mt-8 md:mt-0 flex justify-center items-center relative bg-orange-400 rounded-t-full md:rounded-full md:h-[70vh]">
        <div className="flex flex-col items-center">
          <img
            src={profilePic}
            alt="Avatar"
            className="h-[50vh] md:h-[70vh] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

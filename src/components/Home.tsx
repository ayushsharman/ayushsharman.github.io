import '../assets/styles/Home.css';
import profilePic from '../assets/images/professional_pic.png';

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-between text-center fade-in">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold">
          I'm <span className="text-orange-500">Ayush Sharma,</span>
        </h1>
        <h1 className="text-6xl font-bold">Software Developer</h1>
        <div className="flex items-center justify-center mt-24 gap-96 space-x-96 font-serif italic">
          <p className='w-72'>"I design and code beautifully simple things, and I love what I do."</p>
          <p>2+ years experience</p>
        </div>
      </div>
      <div className="mx-72 relative h-[70vh] bg-orange-400 rounded-t-full flex justify-center items-center">
        <div className="absolute top-[-185px] flex flex-col items-center">
          <img
            src={profilePic}
            alt="Avatar"
            className="h-[80vh] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

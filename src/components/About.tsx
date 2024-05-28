const About = () => {
  return (
    <div className="p-8 fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
        Why <span className="text-orange-500">Hire me?</span>
      </h1>

      <section className="mb-12 p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">👨‍💻 About Me</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          I am a highly motivated and skilled Software Engineer with a strong foundation in computer science principles and a passion for creating innovative and user-friendly software solutions. I have experience in various programming languages and technologies, including Flutter, Dart, C++, Java, Web Development (MERN stack), DevOps, Python, Git & GitHub, and I am proficient in problem-solving, critical thinking, and teamwork. I am always eager to learn new things and expand my skillset, and I am confident in my ability to contribute to a team's success.
        </p>
        <a href="/resume" className="text-orange-500 font-bold hover:underline">You can view my resume here.</a>
      </section>

      <section className="mb-12 p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">⚙️ Skills</h2>
        <p className="text-base md:text-lg leading-relaxed mb-4">
          <strong>Programming Languages:</strong> Flutter (Dart), C++, Java, Python<br />
          <strong>Web Development:</strong> HTML, CSS, JavaScript<br />
          <strong>Frameworks/Libraries:</strong> MERN (MongoDB, Express.js, React, Node.js)<br />
          <strong>Version Control Systems:</strong> Git & GitHub<br />
          <strong>Cloud Services:</strong> AWS (Amazon Web Services)<br />
          <strong>Soft Skills:</strong> Public Speaking, Time Management, Leadership, Versatility, Problem Solving, Innovation
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">Flutter</span>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">C++</span>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">MongoDB</span>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">Express.js</span>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">React</span>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">Node.js</span>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">AWS</span>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full">Git</span>
        </div>
      </section>

      <section className="mb-12 p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">🏆 Achievements & Certifications</h2>
        <ul className="list-disc list-inside text-base md:text-lg leading-relaxed">
          <li>Winner at SIH Internal Hackathon 2022</li>
          <li>750+ Questions on LeetCode & Coding Ninjas</li>
          <li>Lead Coordinator: IICC 2022, Google DevFest 2022, Tekathon 2023, Hack-The-Fest 2022, Hackshield 2022</li>
          <li>Letter of Recommendation by Head of Department, CSE 1st year</li>
          <li>Angular Developer Program 2023 by Infosys Springboard</li>
        </ul>
      </section>
    </div>
  );
}

export default About;

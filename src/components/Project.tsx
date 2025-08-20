import React from "react";

const Project: React.FC = () => {
  const projects = [
    {
      title: "Feeleeria",
      year: "2023",
      description:
        "A Campus Social Media app to connect college students across various campuses.",
      details:
        "Built with Flutter, Firebase, and Cloudstore. Features include real-time messaging, campus event updates, student group collaborations, and personalized feeds.",
      link: "https://github.com/ayushsharman/campus_social_media",
    },
    {
      title: "Book Cricket",
      year: "2024",
      description: "A fun game app to play cricket but with random digits.",
      details: "Built on React.js with the intent to bring back our childhood.",
      link: "https://github.com/ayushsharman/Book-Cricket",
    },
    {
      title: "Screen Recorder",
      year: "2024",
      description: "Chrome Web Extension to record screen.",
      details:
        "Used the concept of popups, JS injection and manifest.json file management.",
      link: "https://github.com/ayushsharman/Screen-Recorder",
    },
  ];

  return (
    <div
      id="projects"
      className="relative py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400 tracking-wide">
          My Projects
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-gray-800/40 backdrop-blur-lg border border-gray-700 shadow-lg hover:shadow-cyan-500/30 transition duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h5 className="text-2xl font-semibold text-cyan-400 mb-2">
                    {project.title}
                  </h5>
                  <h3 className="text-md font-medium text-gray-400 mb-4">
                    {project.year}
                  </h3>
                  <p className="text-base text-gray-300 mb-3">
                    {project.description}
                  </p>
                  <p className="text-sm text-gray-400">{project.details}</p>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-center shadow-md hover:from-cyan-400 hover:to-cyan-400 transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;

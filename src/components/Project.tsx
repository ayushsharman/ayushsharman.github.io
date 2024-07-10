import React from 'react';

const Project: React.FC = () => {
  const projects = [
    {
      title: "Feeleeria",
      year: "2023",
      description: "A Campus Social Media app to connect college students across various campuses.",
      details: " Built with Flutter, Firebase, and Cloudstore features include real-time messaging, campus event updates, student group collaborations, and personalized feeds.",
      link: "https://github.com/ayushsharman/campus_social_media"
    },
    {
      title: "Book Cricket",
      year: "2024",
      description: "A fun game app to play cricket but with random digits",
      details: "Build on React Js with the intent to bring back our childhood.",
      link: "https://github.com/ayushsharman/Book-Cricket"
    },
    {
      title: "Screen Recorder",
      year: "2024",
      description: "Chrome Web Extension to record screen.",
      details: "Used the concept of popups, js injection and manifest.json file management.",
      link: "https://github.com/ayushsharman/Screen-Recorder"
    },
  ];

  return (
    <div className="container mx-auto p-6 fade-in">
      <section className="p-4">
        <h2 className="text-3xl font-semibold text-center mb-8">My Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md lg:h-full z-10 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h5 className="text-xl font-semibold leading-snug text-orange-500 mb-2">{project.title}</h5>
                  <h3 className="text-lg font-medium leading-snug text-gray-900 mb-4">{project.year}</h3>
                  <p className="text-base leading-relaxed text-gray-700 mb-4">{project.description}</p>
                  <p className="text-sm leading-relaxed text-gray-500">{project.details}</p>
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 py-2 px-4 rounded-lg bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors duration-300 inline-block">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Project;

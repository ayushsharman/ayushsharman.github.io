import React from 'react';

const Resume: React.FC = () => {
  return (
    <div className="container mx-auto p-6 fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Click to download my Resume</h1>
        <a
          href="/Resume 2.0.pdf"
          download="Resume 2.0.pdf"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
        >
          Download Resume
        </a>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">My Services</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <ServiceCard
          title="Flutter Developer"
          description={
            <>
              <ul className="list-disc pl-5">
                <li>Creating cross-platform mobile applications using Flutter.</li>
                <li>Building complex UIs with a focus on aesthetics and usability.</li>
                <li>Integrating with various APIs for data retrieval and manipulation.</li>
                <li>Managing app state effectively using state management libraries.</li>
                <li>Incorporating Google Maps integration for location-based services.</li>
              </ul>
            </>
          }
        />
        <ServiceCard
          title="Backend Developer"
          description={
            <>
              <ul className="list-disc pl-5">
                <li>Building robust and scalable backend systems.</li>
                <li>Designing and implementing complex routes for efficient data flow.</li>
                <li>Integrating websockets for real-time communication.</li>
                <li>Managing DevOps processes for deployment and maintenance.</li>
                <li>Working with databases such as PostgreSQL and MongoDB for data storage.</li>
              </ul>
            </>
          }
        />
        <ServiceCard
          title="UI/UX Designer"
          description={
            <>
              <ul className="list-disc pl-5">
                <li>Designing intuitive and engaging user interfaces.</li>
                <li>Crafting aesthetic UIs that prioritize user experience.</li>
                <li>Conducting thorough user research to inform design decisions.</li>
                <li>Creating wireframes and prototypes for iterative design processes.</li>
                <li>Optimizing for accessibility and usability across various devices.</li>
              </ul>
            </>
          }
        />
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/3 md:w-1/4 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-gray-700">{description}</div>
    </div>
  );
};

export default Resume;

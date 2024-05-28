import React from 'react';

const Resume: React.FC = () => {
  return (
    <div className="container mx-auto p-6 fade-in">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Resume Page</h1>
        <p className="text-lg mb-4">You can view my resume here:</p>
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
          description="Creating cross-platform mobile applications using Flutter."
        />
        <ServiceCard
          title="Backend Developer"
          description="Building robust and scalable backend systems."
        />
        <ServiceCard
          title="UI/UX Designer"
          description="Designing intuitive and engaging user interfaces."
        />
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/3 md:w-1/4 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default Resume;

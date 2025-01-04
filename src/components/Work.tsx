import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  background: string;
  skills: string;
}

const Work: React.FC = () => {
  const experiences = [
    {
      id: 1,
      role: "Chief Technology Officer",
      company: "Medoc",
      type: "Full-time",
      duration: "March 2024 - May 2024 · 3 mos",
      location: "Hybrid",
      skills: "Mobile Enterprise · Software Construction · Technology Management · Amazon Web Services (AWS) · Mobile Application Development · Communication",
      background: "bg-gray-400"
    },
    {
      id: 2,
      role: "Project Intern",
      company: "Appable Technologies Pvt. Ltd.",
      type: "Freelance",
      duration: "Jul 2023 - Nov 2023 · 5 mos",
      location: "Delhi, India · Hybrid",
      skills: "REST APIs · Problem Solving · Dart · Product Development · MERN Stack · Flutter",
      background: "bg-orange-500 text-white"
    },
    {
      id: 3,
      role: "Content Team Lead",
      company: "Hackoverflow Society",
      type: "Part-time",
      duration: "Oct 2022 - Jun 2023 · 9 mos",
      location: "Remote",
      skills: "Search Engine Optimization (SEO) · Web Content Writing · Content Strategy · Team Leadership · Content Curation · Product Development · Communication",
      background: "bg-gray-400"
    },
    {
      id: 4,
      role: "Technical Content Writer",
      company: "Code With Harry",
      type: "Freelance",
      duration: "Sep 2022 - Oct 2022 · 2 mos",
      location: "",
      skills: "Web Content Writing · Cross-platform Development · Cascading Style Sheets (CSS) · HTML · HTML5 · Product Development",
      background: "bg-orange-500 text-white"
    },
    {
      id: 5,
      role: "Writer",
      company: "Bay Studios, Kerala",
      type: "Freelance",
      duration: "May 2021 - Jun 2022 · 1 yr 2 mos",
      location: "Kerala, India",
      skills: "Multimedia · Film Production · Story Writing · Screenwriting · Product Development · Communication",
      background: "bg-gray-400"
    },
    {
      id: 6,
      role: "Content Writer",
      company: "Making The Difference - NGO",
      type: "Internship",
      duration: "Feb 2022 - May 2022 · 4 mos",
      location: "",
      skills: "Web Content Writing · Content Strategy · Content Management · Copywriting",
      background: "bg-orange-500 text-white"
    }
  ];

  const [scrollY, setScrollY] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const timeline = timelineRef.current;
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const offsetTop = rect.top + scrollTop;
      const totalHeight = timeline.scrollHeight - window.innerHeight;
      const percentage = (scrollTop - offsetTop) / totalHeight;
      setScrollY(Math.min(Math.max(percentage * 100, 0), 100));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mx-auto w-full h-full">
      <div ref={timelineRef} className="relative wrap overflow-hidden p-10 h-full">
        <div className="absolute border-gray-700 h-full border-2 left-1/2 transform -translate-x-1/2" style={{ opacity: 0.2 }}></div>
        <div className="absolute h-full left-1/2 transform -translate-x-1/2">
          <div className="h-full w-2 bg-orange-500" style={{ height: `${scrollY}%` }}></div>
          <div className="h-6 w-6 bg-orange-500 rounded-full transform -translate-x-1/2" style={{ transform: `translateY(${scrollY}%)` }}></div>
        </div>
        {experiences.map((exp, index) => (
          <ExperienceItem key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

interface ExperienceItemProps {
  exp: Experience;
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ exp, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'right-timeline' : 'left-timeline flex-row-reverse'}`}>
      <div className="order-1 w-5/12"></div>
      <div className={`z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="mx-auto font-semibold text-lg text-white">{exp.id}</h1>
      </div>
      <div className={`order-1 ${exp.background} rounded-lg shadow-xl w-5/12 px-6 py-4 transition-transform duration-1000 ${inView ? 'translate-x-0' : index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'}`}>
        <h3 className="mb-3 font-bold text-xl">{exp.role}</h3>
        <p className="mb-1"><strong>{exp.company}</strong></p>
        <p className="mb-1"><em>{exp.type}</em></p>
        <p className="mb-1"><em>{exp.duration}</em></p>
        <p className="mb-1"><em>{exp.location}</em></p>
        <p className="text-sm leading-snug tracking-wide">{exp.skills}</p>
      </div>
    </div>
  );
};

export default Work;

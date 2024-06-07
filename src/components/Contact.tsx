import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="flex flex-col items-center p-8 fade-in max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-orange-500">Contact</span> Me
      </h1>

      <div className="text-center text-gray-500 mb-12">
        Or you can just google Ayush Sharma Writer, the first LinkedIn link is mine, Lol.
      </div>

      <div className="mb-8 w-full">
        <AppointmentCard
          title="Schedule a Meeting:"
          link="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1fNx_v7M8-iBVye3LffUX83JYfU6ShnLzhkIHKXh6pOpv2iPmvekg9hR_Phvw1Rjl9CyYYiUzK?gv=true"
          text="Let's have a great conversation!"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <ContactCard
          icon={<FaEnvelope size={24} />}
          title="Mail me at:"
          link="mailto:ashsharman123@gmail.com"
          text="ashsharman123@gmail.com"
        />
        <ContactCard
          icon={<FaLinkedin size={24} />}
          title="DM me on LinkedIn:"
          link="https://www.linkedin.com/in/ayush-sharman/"
          text="linkedin.com/in/ayush-sharman"
        />
        <ContactCard
          icon={<FaGithub size={24} />}
          title="View my GitHub:"
          link="https://github.com/ayushsharman"
          text="github.com/ayushsharman"
        />
        <ContactCard
          icon={<FaInstagram size={24} />}
          title="Follow me on Instagram:"
          link="https://www.instagram.com/ayush_sharman/"
          text="ayush_sharman"
        />
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p className="text-sm">&copy; {new Date().getFullYear()} Ayush Sharma. All rights reserved.</p>
      </footer>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContactCard = ({ icon, title, link, text }: any) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-4 bg-gray-100 rounded-lg transition duration-300 hover:bg-gray-200"
    >
      <div className="mr-4">{icon}</div>
      <div className="text-left">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{text}</p>
      </div>
    </a>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppointmentCard = ({ title, link, text }: any) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-4 bg-orange-400 rounded-lg transition duration-300 hover:bg-orange-500"
    >
      <div className="mr-4">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M4 11H20M5 20H19M5 20H5M12 17h.01M8 21h.01M16 21h.01"></path>
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        </svg>
      </div>

      <div className="text-left flex items-center p-2 gap-12">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-white">{text}</p>
      </div>
    </a>
  );
};

export default Contact;

import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="flex flex-col items-center p-8 fade-in">
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-orange-500">Contact</span> Me
      </h1>

      <div className="text-center text-gray-700 mb-12">
        Or you can just google Ayush Sharma Writer, the first LinkedIn link is mine, Lol.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
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

      <div className="mt-12 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Availability</h2>
        <p className="text-lg leading-relaxed">
          <strong>Available Hours:</strong> Monday to Friday: 5:00 PM - 9:00 PM
        </p>
      </div>
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

export default Contact;

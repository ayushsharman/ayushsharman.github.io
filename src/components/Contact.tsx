import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact">
      <div className="flex flex-col items-center px-6 py-12 max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          <span className="text-cyan-500">Let’s</span> Connect
        </h1>
        <p className="text-center text-gray-500 max-w-xl mb-12">
          Whether you want to talk tech, brainstorm ideas, or just share something interesting —
          here’s how you can reach me.
        </p>

        {/* Appointment Card */}
        <AppointmentCard
          title="Book a 1:1"
          link="https://calendar.app.google/fFx5NHCXzN3q1yew8"
          text="Schedule a quick call with me"
        />

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full">
          <ContactCard
            icon={<FaEnvelope size={26} />}
            title="Drop an Email"
            link="mailto:ashsharman123@gmail.com"
            text="ashsharman123@gmail.com"
          />
          <ContactCard
            icon={<FaLinkedin size={26} />}
            title="LinkedIn Connect"
            link="https://www.linkedin.com/in/ayush-sharman/"
            text="/in/ayush-sharman"
          />
          <ContactCard
            icon={<FaGithub size={26} />}
            title="GitHub Repos"
            link="https://github.com/ayushsharman"
            text="github.com/ayushsharman"
          />
          <ContactCard
            icon={<FaInstagram size={26} />}
            title="Instagram Vibes"
            link="https://www.instagram.com/ayush_sharman/"
            text="@ayush_sharman"
          />
        </div>


      </div>
    </section>
  );
};

// Contact Card Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContactCard = ({ icon, title, link, text }: any) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-5 bg-gray-900/90 rounded-xl border border-gray-800 transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
    >
      <div className="text-cyan-500 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-200">{text}</p>
      </div>
    </a>
  );
};

// Appointment Card
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppointmentCard = ({ title, link, text }: any) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-6 w-full bg-gradient-to-r  from-cyan-500 to-teal-500 rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
    >
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-white/80">{text}</p>
      </div>
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3M16 7V3M4 11H20M5 20H19M5 20H5M12 17h.01M8 21h.01M16 21h.01"
        ></path>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
          ry="2"
          className="opacity-50"
        ></rect>
      </svg>
    </a>
  );
};

export default Contact;

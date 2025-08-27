import { useState } from "react";
import { BiFolder } from "react-icons/bi";
import { FaBell, FaGraduationCap, FaTasks, FaUniversity, FaUsers } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import CountUp from "react-countup";
export default function Home() {
    const features = [
        {
            icon: <BiFolder className="text-2xl text-white" />,
            title: "Centralized Data",
            desc: "All certificates and documents in one place.",
        },
        {
            icon: <GrSecure className="text-2xl text-white" />,
            title: "Secure Authentication",
            desc: "Login for students, teachers, and admins.",
        },
        {
            icon: <FaUniversity className="text-2xl text-white" />,
            title: "University Ready",
            desc: "Verified data easily uploaded to MAKAUT portal.",
        },
    ];

    const stats = [
        {
            icon: <FaUsers className="text-[#34699A]" size={25} />,
            value: 4,
            suffix: "+",
            title: "Institutes",
            desc: "Trusted by professionals and organizations across multiple sectors.",
        },
        {
            icon: <FaTasks className="text-[#34699A]" size={25} />,
            value: 8,
            suffix: "+",
            title: "Superadmins",
            desc: "Successfully delivered projects that enhance efficiency and productivity.",
        },
        {
            icon: <FaBell className="text-[#34699A]" size={25} />,
            value: 80,
            suffix: "+",
            title: "Teachers",
            desc: "A growing community staying up-to-date with latest updates & insights.",
        },
        {
            icon: <FaGraduationCap className="text-[#34699A]" size={25} />,
            value: 2159.012,
            suffix: "+",
            title: "Students",
            desc: "Empowering thousands of students and lifelong learners worldwide.",
        },
    ];

    const pricing = [
        {
            title: "Free Trial",
            subtitle: "Try for 100 students",
            price: "₹0",
            btnText: "Start Free",
            href: "/login",
            bg: "bg-[#FDF5AA]",
            textColor: "text-[#113F67]",
            subColor: "text-[#34699A]",
            btnBg: "bg-[#34699A]",
            btnHover: "hover:bg-[#113F67] hover:text-white",
        },
        {
            title: "Premium",
            subtitle: "For Colleges",
            price: "₹499/mo",
            btnText: "Subscribe",
            href: "/login",
            bg: "bg-[#FDF5AA]",
            textColor: "text-[#113F67]",
            subColor: "text-[#34699A]",
            btnBg: "bg-[#34699A]",
            btnHover: "hover:bg-[#113F67] hover:text-white",
        },
        {
            title: "Enterprise",
            subtitle: "Custom solutions for universities",
            price: "Contact Us",
            btnText: "Get in Touch",
            href: "login",
            bg: "bg-[#FDF5AA]",
            textColor: "text-[#113F67]",
            subColor: "text-[#34699A]",
            btnBg: "bg-[#34699A]",
            btnHover: "hover:bg-[#113F67] hover:text-white",
        },
    ]
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col text-[#113F67] bg-[#FDF5AA]">
            {/* Navbar */}
            <header
                className="fixed top-0 left-0 w-full flex justify-between items-center
                px-6 py-4 shadow border-[#34699A]/50 z-50
                bg-[rgba(88,160,200,0.85)] text-white
                backdrop-blur-sm"
            >
                <h1 className="text-xl md:text-2xl font-bold text-[#113F67]">
                    makautstudents.help
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 justify-center items-center">
                    <a href="#features" className="hover:text-[#FDF5AA] text-[#113F67] text-xl">
                        Features
                    </a>
                    <a href="#how" className="hover:text-[#FDF5AA] text-[#113F67] text-xl">
                        How It Works
                    </a>
                    <a href="#pricing" className="hover:text-[#FDF5AA] text-[#113F67] text-xl">
                        Pricing
                    </a>
                    <a href="#contact" className="hover:text-[#FDF5AA] text-[#113F67] text-xl">
                        Contact
                    </a>
                    <a
                        href="/login"
                        className="px-4 py-1 bg-[#34699A] text-[#FDF5AA] font-semibold rounded-sm hover:bg-[#113F67] transition"
                    >
                        Login
                    </a>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-[#113F67] focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
            </header>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-[#58A0C8] shadow-lg px-6 py-4 space-y-4 absolute top-16 left-0 w-full z-40">
                    <a
                        href="#features"
                        className="block text-[#113F67] hover:text-[#FDF5AA]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Features
                    </a>
                    <a
                        href="#how"
                        className="block text-[#113F67] hover:text-[#FDF5AA]"
                        onClick={() => setMenuOpen(false)}
                    >
                        How It Works
                    </a>
                    <a
                        href="#pricing"
                        className="block text-[#113F67] hover:text-[#FDF5AA]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Pricing
                    </a>
                    <a
                        href="#contact"
                        className="block text-[#113F67] hover:text-[#FDF5AA]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </a>
                    <a
                        href="/login"
                        className="block px-4 py-2 bg-[#34699A] text-[#FDF5AA] rounded-lg font-semibold hover:bg-[#113F67] hover:text-white text-center"
                        onClick={() => setMenuOpen(false)}
                    >
                        Login
                    </a>
                </div>
            )}

            {/* Hero */}
            <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-28 pb-16 gap-12">
                {/* Left Content */}
                <div className="max-w-lg text-center md:text-left">
                   <h2 className="text-3xl md:text-5xl font-bold text-[#113F67] mb-4">
  Simplify Student Activity{" "}
  <span className="text-blue-600">Submissions</span> 🚀
</h2>

                    <p className="text-[#34699A] mb-6 text-lg">
                        MakautStudents.help centralizes extra-curricular data uploads,
                        letting teachers and students securely submit and verify documents —
                        no more scattered WhatsApp/Google Forms mess.
                    </p>
                    <a
                        href="/login"
                        className="group inline-flex items-center gap-2 px-6 py-2 bg-[#34699A] text-[#FDF5AA] font-medium rounded-sm shadow-md hover:bg-[#113F67] transition-colors duration-300"
                    >
                        <span>Get Started</span>
                        <FaArrowRightLong className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Right Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full md:max-w-2xl">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col rounded-xl bg-gradient-to-br from-white to-[#FDF5AA] p-6 shadow-md hover:shadow-lg transition dark:bg-gray-800 dark:text-white/70"
                        >
                            {/* First line: Icon + Count + Title */}
                            <div className="flex items-center gap-3">
                                {/* Icon */}
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#34699A]/10">
                                    {stat.icon}
                                </div>

                                {/* Count + Title */}
                                <div className="flex items-baseline gap-2">
                                    <h1 className="text-xl md:text-2xl font-bold text-black/80 dark:text-white">
                                        <CountUp
                                            end={stat.value}
                                            suffix={stat.suffix}
                                            duration={2.5}
                                            separator=" "
                                        />
                                    </h1>
                                    <p className="text-base md:text-lg font-semibold text-[#113F67]">
                                        {stat.title}
                                    </p>
                                </div>
                            </div>

                            {/* Second line: Description */}
                            <p className="mt-2 text-m text-[#34699A]">{stat.desc}</p>
                        </div>

                    ))}
                </div>
            </section>


            {/* Features */}

            <section id="features" className="px-6 md:px-20 py-12">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#113F67]">
                    Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl shadow-md hover:shadow-xl  border-black transition bg-gradient-to-br from-white to-[#FDF5AA] text-white"
                        >
                            {/* Icon wrapper with bg */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#113F67] mb-4 ">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h4 className="font-bold text-xl mb-2 text-[#113F67]" >{feature.title}</h4>

                            {/* Description */}
                            <p className="text-l opacity-90 text-[#113F67]">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section id="how" className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center text-[#113F67]">
                        How It Works
                    </h2>

                    {/* Steps Array */}
                    {(() => {
                        const steps = [
                            {
                                title: "Students Upload",
                                desc: "Students upload certificates & documents in one place.",
                            },
                            {
                                title: "Teachers Verify",
                                desc: "Teachers check & approve submissions quickly.",
                            },
                            {
                                title: "Upload to University",
                                desc: "Verified data is uploaded directly to Makaut portal.",
                            },
                        ];

                        return (
                            <div className="relative">
                                {/* Mobile vertical line (sticks from 1st to last step) */}
                                <div className="absolute left-6 top-6 bottom-6 w-1 bg-[#113F67] md:hidden"></div>

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between relative">
                                    {/* Desktop horizontal line (sticks from 1st to last step) */}
                                    <div className="hidden md:block absolute top-6 left-6 right-6 h-1 bg-[#113F67] z-0"></div>

                                    {steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="relative z-10 flex items-start md:flex-col md:items-center w-full md:w-1/3 mb-12 md:mb-0"
                                        >
                                            {/* Circle */}
                                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#34699A] text-[#FDF5AA] font-bold shadow-lg relative z-10 md:mb-4">
                                                {index + 1}
                                            </div>
                                            {/* Text */}
                                            <div className="ml-6 md:ml-0">
                                                <p className="mt-2 text-lg text-center font-semibold text-[#113F67]">
                                                    {step.title}
                                                </p>
                                                <p className="text-[#113F67] text-sm mt-1">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>



            {/* Pricing */}
            <section id="pricing" className="px-6 md:px-20 py-12">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#113F67]">
                    Pricing
                </h3>

                {/* Pricing Plans */}
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    {pricing.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-6 border border-[#34699A] rounded-xl shadow w-72 md:w-80 text-center hover:shadow-lg transition ${plan.bg}`}
                        >
                            <h4 className={`font-bold mb-2 ${plan.textColor}`}>{plan.title}</h4>
                            <p className={`mb-4 ${plan.subColor}`}>{plan.subtitle}</p>
                            <p className={`text-2xl font-bold mb-4 ${plan.textColor}`}>
                                {plan.price}
                            </p>
                            <a
                                href={plan.href}
                                className={`px-4 py-[7px] rounded transition ${plan.btnBg} ${plan.btnHover} text-[#FDF5AA]`}
                            >
                                {plan.btnText}
                            </a>
                        </div>
                    ))}
                </div>
            </section>


            {/* Footer */}
          <footer className="rounded-t-3xl bg-[rgba(88,160,200,0.85)] text-[#113F67] px-6 md:px-20 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Column 1: Brand + Socials */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-3">MakautStudents.help</h2>
            <p className="flex justify-center md:justify-start gap-2 items-center font-medium mb-4">
              <MdEmail className="text-lg" /> support@makautstudents.help
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-[#113F67]">
              <a href="#" className="hover:text-white transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="text-center">
          
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Form */}
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
                const message = (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement).value;
                alert(`Email: ${email}\nMessage: ${message}`);
              }}
              className="bg-[#FDF5AA] shadow-md rounded-lg p-5 border border-[#34699A]"
            >
              <h3 className="text-lg font-semibold mb-3 text-[#113F67]">
                Send us a message
              </h3>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-3 py-2 border rounded-lg mb-2 text-[#113F67] focus:outline-none focus:ring-2 focus:ring-[#34699A]"
              />
              <textarea
                name="message"
                required
                placeholder="Your Message"
                rows={3}
                className="w-full px-3 py-2 border rounded-lg mb-3 text-[#113F67] focus:outline-none focus:ring-2 focus:ring-[#34699A]"
              />
              <button
                type="submit"
                className="w-full bg-[#34699A] text-[#FDF5AA] py-2 rounded font-semibold hover:bg-[#113F67] hover:text-white transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-[#34699A]/40 pt-4 text-center text-sm text-white">
          © {new Date().getFullYear()} MakautStudents.help · All rights reserved
        </div>
      </div>
    </footer>
        </div>
    );
}

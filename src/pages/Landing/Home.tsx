import { useEffect, useState } from "react";
import { BiFolder } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight, FaBell, FaGraduationCap, FaLightbulb, FaTasks, FaUniversity, FaUsers, FaWhatsapp } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import CountUp from "react-countup";
import { reviews } from "@/components/data/data";
import { pricing } from "@/components/data/data";
import { blogs } from "@/components/data/data";
export default function Home() {
    const features = [
        {
            icon: <BiFolder className="text-xl text-[#34699A]" />,
            title: "Centralized Data",
            desc: "All certificates and documents in one place.",
            label: "", // empty
        },
        {
            icon: <GrSecure className="text-xl text-[#34699A]" />,
            title: "Secure Authentication",
            desc: "Login for students, teachers, and admins.",
            label: "", // empty
        },
        {
            icon: <FaLightbulb className="text-xl text-[#34699A]" />,
            title: "Year-wise Suggestions",
            desc: "Students receive suggestions and guidance based on their year of study.",
            label: "", // empty
        },
        {
            icon: <FaUniversity className="text-xl text-[#34699A]" />,
            title: "University Ready",
            desc: "Verified data easily uploaded to MAKAUT portal.",
            label: "Coming Soon", // show label
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





    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; // how much scrolled
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(4);

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 640) setCardsPerView(1); // mobile
            else if (window.innerWidth < 1024) setCardsPerView(2); // tablet
            else if (window.innerWidth < 1280) setCardsPerView(3); // small desktop
            else setCardsPerView(4); // large screen
        };

        updateCardsPerView();
        window.addEventListener("resize", updateCardsPerView);
        return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    const nextSlide = () => {
        if (currentIndex < reviews.length - cardsPerView) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

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
            <div className="fixed  top-[60px] left-0 w-full h-[4px] bg-[rgba(88,160,200,0.85)] z-50">
                <div
                    className="h-full bg-[#34699A] transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden fixed bg-[rgba(88,160,200,0.85)] shadow-lg px-6 py-4 space-y-4 top-16 left-0 w-full z-40">
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
                        className="block px-4 py-2 bg-[#34699A] text-[#FDF5AA] rounded font-semibold hover:bg-[#113F67] hover:text-white text-center"
                        onClick={() => setMenuOpen(false)}
                    >
                        Login
                    </a>
                </div>
            )}


            {/* Hero */}
            <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-28 pb-16 gap-12 min-h-screen">
                {/* Left Content */}
                <div className="max-w-lg text-center md:text-left">
                    {/* Animated Attention Button */}
                    <div className="mb-6 flex  justify-center md:justify-start">
                        <button className="relative px-4 py-[4px] flex items-center justify-center font-semibold text-[#113F67] rounded-full group overflow-hidden">
                            {/* Animated border */}
                            <span className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-green-400 via-[#FDF5AA] to-purple-600 animate-border"></span>

                            {/* Button text */}
                            <span className="relative z-10 text-xs text-center whitespace-nowrap">
                                Where MAKAUT Students & Teachers Connect
                            </span>

                            <style>{`
    .animate-border {
      background-size: 200% 200%;
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: borderMove 2s linear infinite;
    }

    @keyframes borderMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
                        </button>


                    </div>

                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-5xl font-bold text-[#113F67] mb-4">
                        Simplify Student Activity <span className="text-blue-600">Submissions</span>
                    </h2>
                    {/* <div className="h-20 w-20 relative z-50">
                        <img src="/VectorGroup.png" alt="" className="rotate-140" />
                    </div> */}
                    <p className="text-[#34699A] mb-6 text-lg">
                        MakautStudents.help centralizes extra-curricular data uploads,
                        letting teachers and students securely submit and verify documents — no more scattered WhatsApp/Google Forms mess.
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
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#34699A]/10">
                                    {stat.icon}
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <h1 className="text-xl md:text-2xl font-bold text-black/80 dark:text-white">
                                        <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} separator=" " />
                                    </h1>
                                    <p className="text-base md:text-lg font-semibold text-[#113F67]">{stat.title}</p>
                                </div>
                            </div>
                            <p className="mt-2 text-m text-[#34699A]">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* Features */}

            <section id="features" className="px-6 md:px-20 py-12 ">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#113F67]">
                    Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative p-6 rounded-xl shadow-md hover:shadow-xl border-black transition bg-gradient-to-br from-white to-[#FDF5AA] text-white"
                        >
                            {/* Top-right label */}
                            {feature.label && (
                                <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                    {feature.label}
                                </span>
                            )}

                            {/* Icon wrapper with bg */}
                            <div className="flex">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full  bg-[#34699A]/10 mb-4">
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h4 className="font-bold text-m p-1 text-[#113F67] text-center justify-center  q">{feature.title}</h4></div>

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
                                title: "Download Reports",
                                desc: "Teachers can download individual or yearly student reports easily.",
                            },
                            {
                                title: "Upload to University",
                                desc: "Verified data is uploaded directly to Makaut portal.",
                            },
                        ];

                        // condition → use your actual cardsPerView value here
                        const isVertical = cardsPerView === 1 || cardsPerView === 2;

                        return (
                            <div className="relative">
                                {/* Line based on layout */}
                                {isVertical ? (
                                    <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#113F67]"></div>
                                ) : (
                                    <div className="absolute top-4 left-6 right-6 h-[2px] bg-[#113F67] z-0"></div>
                                )}

                                <div
                                    className={`flex relative ${isVertical
                                        ? "flex-col items-start" // vertical layout
                                        : "flex-row items-center justify-between" // horizontal layout
                                        }`}
                                >
                                    {steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className={`relative z-10 flex ${isVertical
                                                ? "items-center mb-12" // vertical step
                                                : "flex-col items-center w-full mb-0" // horizontal step
                                                }`}
                                        >
                                            {/* Circle */}
                                            <div className="w-8 aspect-square shrink-0 rounded-full flex items-center justify-center bg-[#34699A] text-[#FDF5AA] font-bold shadow-lg z-10 md:mb-4">
                                                {index + 1}
                                            </div>

                                            {/* Text */}
                                            <div
                                                className={`${isVertical ? "ml-4" : "mt-2 text-center"
                                                    }`}
                                            >
                                                <p className="text-lg font-semibold text-[#113F67]">
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
            <div className="px-6 py-16 space-y-20">
                {/* Reviews Section */}
                <section className="text-center px-4 md:px-10">
                    <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
                    <div className="relative w-full max-w-6xl mx-auto">
                        {/* Cards wrapper */}
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                                }}
                            >
                                {reviews.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-4"
                                    >
                                        <div className="p-6 rounded-2xl shadow-md bg-gradient-to-br from-white to-[#FDF5AA] text-left h-full">
                                            <p className="text-gray-600 mb-4">“{item.review}”</p>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">{item.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-40"
                            disabled={currentIndex === 0}
                        >
                            <FaArrowLeft />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-40"
                            disabled={currentIndex >= reviews.length - cardsPerView}
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </section>

                {/* Blogs Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-10">Latest Blogs</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {blogs.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl shadow-md overflow-hidden bg-white text-left"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.desc}</p>
                                    <a
                                        href={item.link}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2 z-50">
                {/* <span className="mb-1 text-sm bg-black text-white px-2 py-1 rounded opacity-80">
                    Chat with us
                </span> */}
                <a
                    href="https://wa.me/916296446556"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                >
                    <FaWhatsapp size={28} />
                </a>
            </div>



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

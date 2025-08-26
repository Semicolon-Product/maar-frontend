import { useState } from "react";
import { BiFolder } from "react-icons/bi";
import { FaUniversity } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { MdEmail } from "react-icons/md";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className=" min-h-screen flex flex-col text-[#16610E]">
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 shadow bg-[#FED16A] z-50">
                <h1 className="text-xl md:text-2xl font-bold text-[#F97A00]">
                    makautstudents.help
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#features" className="text-[#16610E] hover:text-[#F97A00]">
                        Features
                    </a>
                    <a href="#how" className="text-[#16610E] hover:text-[#F97A00]">
                        How It Works
                    </a>
                    <a href="#pricing" className="text-[#16610E] hover:text-[#F97A00]">
                        Pricing
                    </a>
                    <a href="#contact" className="text-[#16610E] hover:text-[#F97A00]">
                        Contact
                    </a>
                    <a
                        href="/login"
                        className="px-4 py-2 bg-[#F97A00] text-[#FFF4A4] font-semibold rounded-lg  hover:bg-[#16610E] transition"
                    >
                        Login
                    </a>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-[#16610E] focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
            </header>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-[#FED16A] shadow-lg px-6 py-4 space-y-4 absolute top-16 left-0 w-full z-40">
                    <a
                        href="#features"
                        className="block text-[#16610E] hover:text-[#F97A00]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Features
                    </a>
                    <a
                        href="#how"
                        className="block text-[#16610E] hover:text-[#F97A00]"
                        onClick={() => setMenuOpen(false)}
                    >
                        How It Works
                    </a>
                    <a
                        href="#pricing"
                        className="block text-[#16610E] hover:text-[#F97A00]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Pricing
                    </a>
                    <a
                        href="#contact"
                        className="block text-[#16610E] hover:text-[#F97A00]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </a>
                    <a
                        href="/login"
                        className="block px-4 py-2 bg-[#F97A00] text-[#FFF4A4] rounded-lg font-semibold hover:bg-[#FED16A] hover:text-[#16610E] text-center"
                        onClick={() => setMenuOpen(false)}
                    >
                        Login
                    </a>
                </div>
            )}

            {/* Hero */}
            <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-28 pb-16">
                <div className="max-w-lg text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F97A00] mb-4">
                        Simplify Student Activity Submissions 🚀
                    </h2>
                    <p className="text-[#16610E] mb-6">
                        MakautStudents.help centralizes extra-curricular data uploads,
                        letting teachers and students securely submit and verify documents —
                        no more scattered WhatsApp/Google Forms mess.
                    </p>
                    <a
                        href="/login"
                        className="px-6 py-3 bg-[#F97A00] text-[#FFF4A4] rounded-lg shadow hover:bg-[#16610E] transition"
                    >
                        Get Started
                    </a>
                </div>
                <img
                    src="/bg.png"
                    alt="Portal Illustration"
                    className="w-64 md:w-96 mt-8 md:mt-0"
                />
            </section>

            {/* Features */}
            <section id="features" className="px-6 md:px-20 py-12">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#F97A00]">
                    Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-[#FFF4A4] border border-[#F97A00] rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="font-bold mb-2  gap-2 text-[#F97A00]">
                            <BiFolder className="mt-1" /> Centralized Data
                        </h4>
                        <p className="text-[#16610E]">
                            All certificates and documents in one place.
                        </p>
                    </div>
                    <div className="p-6 bg-[#FFF4A4] border border-[#F97A00] rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="font-bold mb-2  gap-2 text-[#F97A00]">
                            <GrSecure className="mt-1" /> Secure Authentication
                        </h4>
                        <p className="text-[#16610E]">
                            Login for students, teachers, and admins.
                        </p>
                    </div>
                    <div className="p-6 bg-[#FFF4A4] border border-[#F97A00] rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="font-bold mb-2  gap-2 text-[#F97A00]">
                            <FaUniversity className="mt-1 text-black" size={30} /> University Ready
                        </h4>
                        <p className="text-[#16610E]">
                            Verified data easily uploaded to MAKAUT portal.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how" className="py-20 bg-[#FED16A]">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-12 text-[#F97A00]">
                        How It Works
                    </h2>
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 right-0 top-6 h-1 bg-[#F97A00] z-0"></div>
                        <div className="relative z-10 flex flex-col items-center w-1/3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F97A00] text-[#FFF4A4] font-bold shadow-lg">
                                1
                            </div>
                            <p className="mt-4 text-lg font-semibold text-[#16610E]">Students Upload</p>
                            <p className="text-[#16610E] text-sm mt-1">
                                Students upload certificates & documents in one place.
                            </p>
                        </div>
                        <div className="relative z-10 flex flex-col items-center w-1/3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F97A00] text-[#FFF4A4] font-bold shadow-lg">
                                2
                            </div>
                            <p className="mt-4 text-lg font-semibold text-[#16610E]">Teachers Verify</p>
                            <p className="text-[#16610E] text-sm mt-1">
                                Teachers check & approve submissions quickly.
                            </p>
                        </div>
                        <div className="relative z-10 flex flex-col items-center w-1/3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F97A00] text-[#FFF4A4] font-bold shadow-lg">
                                3
                            </div>
                            <p className="mt-4 text-lg font-semibold text-[#16610E]">Upload to University</p>
                            <p className="text-[#16610E] text-sm mt-1">
                                Verified data is uploaded directly to Makaut portal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="px-6 md:px-20 py-12">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#F97A00]">
                    Pricing
                </h3>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <div className="p-6 border border-[#F97A00] rounded-xl shadow w-72 md:w-80 text-center hover:shadow-lg transition bg-[#FFF4A4]">
                        <h4 className="font-bold mb-2 text-[#F97A00]">Free Trial</h4>
                        <p className="text-[#16610E] mb-4">Try for 100 students</p>
                        <p className="text-2xl font-bold mb-4">₹0</p>
                        <a
                            href="/login"
                            className="px-4 py-2 bg-[#F97A00] text-[#FFF4A4] rounded-lg hover:bg-[#FED16A] hover:text-[#16610E] transition"
                        >
                            Start Free
                        </a>
                    </div>
                    <div className="p-6 border border-[#F97A00] rounded-xl shadow w-72 md:w-80 text-center hover:shadow-lg transition bg-[#FED16A]">
                        <h4 className="font-bold mb-2 text-[#F97A00]">Premium</h4>
                        <p className="text-[#16610E] mb-4">For Colleges</p>
                        <p className="text-2xl font-bold mb-4">₹499/mo</p>
                        <a
                            href="/login"
                            className="px-4 py-2 bg-[#F97A00] text-[#FFF4A4] rounded-lg hover:bg-[#FED16A] hover:text-[#16610E] transition"
                        >
                            Subscribe
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                id="contact"
                className="bg-[#FED16A] text-center py-10 text-[#FFF4A4]"
            >
                <div className="mb-6">
                    <p className="flex justify-center gap-2 items-center font-medium">
                        <MdEmail className="text-lg text-[#FED16A]" /> support@makautstudents.help
                    </p>
                </div>

                {/* Contact Form */}
                <div className="max-w-md mx-auto px-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
                            const message = (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement).value;
                            alert(`Email: ${email}\nMessage: ${message}`);
                        }}

                        className="bg-[#FFF4A4] shadow-md rounded-lg p-6 border border-[#F97A00]"
                    >
                        <h3 className="text-lg font-semibold mb-4 text-[#F97A00]">
                            Send us a message
                        </h3>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Your Email"
                            className="w-full px-4 py-2 border rounded-lg mb-3 text-[#16610E] focus:outline-none focus:ring-2 focus:ring-[#F97A00]"
                        />
                        <textarea
                            name="message"
                            required
                            placeholder="Your Message"
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg mb-3 text-[#16610E] focus:outline-none focus:ring-2 focus:ring-[#F97A00]"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#F97A00] text-[#FFF4A4] py-2 rounded-lg font-semibold hover:bg-[#FED16A] hover:text-[#16610E] transition"
                        >
                            Send
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-sm text-[#16610E]">
                    © {new Date().getFullYear()} MakautStudents.help · All rights
                    reserved
                </p>
            </footer>
        </div>
    );
}
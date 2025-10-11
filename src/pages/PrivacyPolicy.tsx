import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-10">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <FaChevronLeft /> Back to Home
        </Link>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-10">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            At <strong>MakautStudents.help</strong>, we value your privacy. This Privacy 
            Policy explains how we collect, use, and protect your personal data when using our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <p>
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6">
            <li>Email address and name for account creation.</li>
            <li>Uploaded documents and activity submissions.</li>
            <li>Usage logs for security and analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6">
            <li>Facilitate communication between students and teachers.</li>
            <li>Verify activity submissions and maintain academic records.</li>
            <li>Improve platform performance and security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            Your data is securely stored and only accessible by authorized administrators and faculty. 
            We do not sell or share your information with third-party advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <p>
            You may request data deletion or modification by contacting us at 
            <strong> support@makautstudents.help</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
          <p>
            For any concerns regarding your privacy, please email us at 
            <strong> support@makautstudents.help</strong>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;

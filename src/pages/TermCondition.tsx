import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const TermCondition = () => {
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
      <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-10">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using <strong>MakautStudents.help</strong>, you agree to comply with these Terms & Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
          <p>
            You agree to provide accurate information and use the platform responsibly. Misuse, including submission of false or fraudulent data, may result in account suspension.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
          <p>
            All content, logos, and materials on this platform are the property of MakautStudents.help and may not be copied, reproduced, or distributed without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p>
            The platform is provided "as-is". We are not liable for any damages or loss arising from the use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
          <p>
            For any questions regarding these Terms & Conditions, contact us at <strong>support@makautstudents.help</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermCondition;

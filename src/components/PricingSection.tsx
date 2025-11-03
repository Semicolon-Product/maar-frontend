import React, { useState } from "react";
interface PricingSectionProps {
  data: any; // 👈 accept email as prop
}

const PricingSection: React.FC<PricingSectionProps> = ({ data }) => {
  const [students, setStudents] = useState<number>(0);

  const [transactionId, setTransactionId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const basePrice = 13;
  const discountedPrice = students > 400 ? 11 : basePrice;
  const totalCost = students * discountedPrice;

  const pricingTiers = [
    { min: 1, max: 400, price: 13 },
    { min: 401, max: 800, price: 12 },
    { min: 801, max: null, price: 11 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <section className="flex items-center justify-center min-h-screen px-4 py-12 transition-colors duration-300">
      <div className="relative max-w-4xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
        {/* Decorative SVG Background only inside card */}
        <div className="absolute inset-0 opacity-15 dark:opacity-10 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2003/svg"
            viewBox="0 0 600 600"
            fill="none"
            className="w-full h-full"
          >
            <circle
              cx="300"
              cy="300"
              r="200"
              stroke="url(#gradient)"
              strokeWidth="40"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="600" y2="600">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Card Content */}
        <div className="relative p-8 space-y-6">
          {/* Header */}
          <header>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Purchase Student Seats
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Choose how many student accounts you need and upload payment
              details below.
            </p>
          </header>

          {/* Form */}
          <form className="space-y-5">
            {/* Student Count */}
            <div>
              <label
                htmlFor="studentCount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Number of Students
              </label>
              <input
                id="studentCount"
                //type="number"
                min={1}
                value={students}
                onChange={(e) => setStudents(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Summary Box */}
            <div className="bg-gray-100 text-black dark:text-white dark:bg-gray-800/60 rounded-lg p-4 text-sm">
              <div className="flex justify-between mb-1">
                <span>Price per Student:</span>
                <span className="font-semibold">₹{discountedPrice}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Total Students:</span>
                <span className="font-semibold">{students}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 dark:border-gray-700 pt-2 text-base">
                <span className="font-medium">Total Cost:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  ₹{totalCost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Institute Name */}
            <div>
              <label
                htmlFor="institute"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Institute Name
              </label>
              <input
                id="institute"
                type="text"
                value={data?.institute?.name}
                //onChange={(e) => setInstitute(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Registered Email
              </label>
              <input
                id="email"
                type="email"
                value={data?.superadmin?.email}
                //onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label
                htmlFor="transactionId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Transaction ID
              </label>
              <input
                id="transactionId"
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="fileUpload"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Upload Payment Screenshot
              </label>
              <input
                id="fileUpload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="w-full text-gray-700 dark:text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                required
              />
              {file && (
                <p className="text-xs mt-2 text-green-600 dark:text-green-400">
                  Uploaded: {file.name}
                </p>
              )}
            </div>

            {/* QR Section */}
            <div className="flex flex-col items-center mt-6 space-y-2">
              <img
                src="/QR.jpeg"
                alt="UPI QR"
                className="w-50 h-55 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Scan & Pay using UPI
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                UPI ID:{" "}
                <span className="font-semibold">ghoshsekhar6296-1@okicici</span>
              </p>
            </div>

            {/* Pricing Tiers */}
            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-2">Pricing Tiers:</p>
              <ul className="list-disc list-inside space-y-1">
                {pricingTiers.map((tier, i) => (
                  <li key={i}>
                    {tier.max
                      ? `${tier.min}–${tier.max} students → ₹${tier.price}/student`
                      : `${tier.min}+ students → ₹${tier.price}/student`}
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition mt-4"
            >
              Submit Payment Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

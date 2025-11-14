import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "./CloseIcon";
import { FileUpload, handleDeleteFile, postApi } from "@/api";
import { useToast } from "@/contexts/ToastContext";
interface PricingSectionProps {
  data: any; // 👈 accept email as prop
}

const PricingSection: React.FC<PricingSectionProps> = ({ data }) => {
  const toast = useToast();
  const [students, setStudents] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [transactionId, setTransactionId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    key: string;
  } | null>(null);

  const basePrice = 13;

  const discountedPrice =
    students >= 1000
      ? 8.5
      : students >= 800
      ? 11
      : students >= 400
      ? 12
      : basePrice;

  const totalCost = students * discountedPrice;

  useEffect(() => {
    setAmount(totalCost);
  }, [totalCost]);

  const pricingTiers = [
    { min: 1, max: 399, price: 13 },
    { min: 400, max: 799, price: 12 },
    { min: 800, max: 999, price: 11 },
    { min: 1000, max: null, price: 8.5 },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const currentPaymentId = transactionId || Date.now();

      try {
        const res = await FileUpload("upload?type=payment", {
          superadminId: data?.superadmin?.id,
          paymentId: currentPaymentId,
          file: selectedFile,
        });

        setUploadedFile({ url: res.fileUrl, key: res.key });
        toast.success("File uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload file");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (!uploadedFile) {
        toast.error("Please upload a payment screenshot!");
        return;
      }

      const currentTransactionId = transactionId || Date.now().toString();

      const payload = {
        student_quota: students,
        transaction_id: currentTransactionId,
        schreenshot_url: uploadedFile.url,
        amount_paid: amount,
        email: data?.email,
      };

      const res = await postApi("superadmin/new-payment", payload);

      if (res?.success) {
        toast.success("Payment record added successfully!");
        setStudents(0);
        setTransactionId("");
        setFile(null);
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(
          res?.message || "Something went wrong while adding payment!"
        );
      }
    } catch (error) {
      toast.error("Server error! Please try again.");
    }
  };

  return (
    <section className="w-full transition-colors duration-300">
      <div className="relative max-w-5xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-2xl overflow-hidden">
        {/* Decorative Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 pointer-events-none"></div>

        {/* Card Content */}
        <div className="relative p-6 md:p-8 lg:p-10 space-y-6">
          {/* Header */}
          <header className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
              Purchase Student Seats
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Choose how many student accounts you need and upload payment
              details below
            </p>
          </header>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Count */}
            <div className="md:col-span-2">
              <label
                htmlFor="studentCount"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Number of Students
              </label>
              <input
                id="studentCount"
                type="number"
                min={1}
                value={students}
                onChange={(e) => setStudents(Number(e.target.value) || 0)}
                className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3.5 focus:border-blue-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-purple-500/20 transition-all outline-none font-medium"
                placeholder="Enter number of students"
                required
              />
            </div>

            {/* Summary Box - Full Width */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-700/50 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Price per Student:
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    ₹{discountedPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Total Students:
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {students}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-blue-300 dark:border-blue-700">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Total Cost:
                  </span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    ₹{totalCost.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Institute Name */}
            <div>
              <label
                htmlFor="institute"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Institute Name
              </label>
              <input
                id="institute"
                type="text"
                value={data?.institute?.name}
                readOnly
                className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3.5 focus:border-blue-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-purple-500/20 transition-all outline-none font-medium"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Registered Email
              </label>
              <input
                id="email"
                type="email"
                value={data?.superadmin?.email}
                readOnly
                className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3.5 focus:border-blue-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-purple-500/20 transition-all outline-none font-medium"
                required
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Amount Paid
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3.5 focus:border-blue-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-purple-500/20 transition-all outline-none font-medium"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label
                htmlFor="transactionId"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Transaction ID
              </label>
              <input
                id="transactionId"
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3.5 focus:border-blue-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-purple-500/20 transition-all outline-none font-medium"
                placeholder="Enter transaction ID"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="fileUpload"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Upload Payment Screenshot
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                id="fileUpload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="flex-1 text-gray-700 dark:text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:from-blue-700 hover:file:to-purple-700 file:shadow-lg file:transition-all cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-2 bg-gray-50 dark:bg-gray-800/50"
                required
              />
              {file && (
                <button
                  onClick={() => {
                    if (uploadedFile?.key) handleDeleteFile(uploadedFile?.key);
                    setFile(null);
                    setUploadedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-lg active:scale-95"
                >
                  <CloseIcon size={20} color="white" />
                </button>
              )}
            </div>
            {file && (
              <p className="text-xs mt-2 text-green-600 dark:text-green-400 font-medium">
                ✓ Uploaded: {file.name}
              </p>
            )}
          </div>

          {/* QR Section & Pricing Tiers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* QR Section */}
            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-700/50 shadow-lg">
              <img
                src="/QR.jpeg"
                alt="UPI QR"
                className="w-48 h-48 rounded-2xl border-4 border-white dark:border-gray-700 shadow-xl mb-4"
              />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Scan & Pay using UPI
              </p>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  UPI ID:
                </p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  ghoshsekhar6296-1@okicici
                </p>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-700/50 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Pricing Tiers
              </h3>
              <ul className="space-y-3">
                {pricingTiers.map((tier, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tier.max
                        ? `${tier.min}–${tier.max} students`
                        : `${tier.min}+ students`}
                    </span>
                    <span className="text-base font-bold text-green-600 dark:text-green-400">
                      ₹{tier.price}/student
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl py-4 transition-all shadow-xl hover:shadow-2xl active:scale-98 mt-6 text-lg"
          >
            Submit Payment Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

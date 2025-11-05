"use client";

import { getApi } from "@/api";
import type { Payment } from "@/components/types/superadminType";
import { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const getPaymentDetails = async () => {
    try {
      const res = await getApi("admin/payments");
      //console.log("Payments:", res);
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Payment Details
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-600 dark:bg-gray-800 text-white text-left">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Institute ID</th>
              <th className="px-4 py-3 font-medium">Amount Paid</th>
              <th className="px-4 py-3 font-medium">Student Quota</th>
              <th className="px-4 py-3 font-medium">Registered</th>
              <th className="px-4 py-3 font-medium">Paid On</th>
              <th className="px-4 py-3 font-medium">Valid Until</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.institute_id}</td>
                <td className="px-4 py-3">₹{p.amount_paid.toLocaleString()}</td>
                <td className="px-4 py-3">{p.student_quota}</td>
                <td className="px-4 py-3">{p.students_registered}</td>
                <td className="px-4 py-3">
                  {new Date(p.paid_on).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {new Date(p.valid_until).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                      p.is_approve
                        ? "bg-green-500 dark:bg-green-700"
                        : "bg-orange-500 dark:bg-amber-800"
                    }`}
                  >
                    {p.is_approve ? "Active" : "Not Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;

import type { Payment } from "@/components/types/superadminType";

export interface ProcessedPaymentData {
  totalStudentsRegistered: number;
  totalQuota: number;
  status: string;
  recentPayment: {
    paid_on: string;
    valid_until: string;
  };
}

export const processPaymentData = (
  payments: Payment[]
): ProcessedPaymentData => {
  if (!payments || payments.length === 0) {
    return {
      totalStudentsRegistered: 0,
      totalQuota: 0,
      status: "",
      recentPayment: {
        paid_on: "",
        valid_until: "",
      },
    };
  }

  // Sum all students_registered
  const totalStudentsRegistered = payments.reduce(
    (sum, payment) => sum + payment.students_registered,
    0
  );

  // Sum all student_quota
  const totalQuota = payments.reduce(
    (sum, payment) => sum + payment.student_quota,
    0
  );

  // Find the most recent payment based on paid_on date
  const sortedPayments = payments.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const recentPayment = sortedPayments[0];

  return {
    totalStudentsRegistered,
    totalQuota,
    status: recentPayment.status,
    recentPayment: {
      paid_on: recentPayment.paid_on,
      valid_until: recentPayment.valid_until,
    },
  };
};

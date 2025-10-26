// utils/auth.ts
export type UserRole = "student" | "teacher" | "superadmin";

export const getRole = (): UserRole | null => {
  try {
    const role = localStorage.getItem("role");
    if (role === "student" || role === "teacher" || role === "superadmin") {
      return role;
    }
    return null;
  } catch (error) {
    console.error("Failed to get role from localStorage:", error);
    return null;
  }
};

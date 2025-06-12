import {jwtDecode }from 'jwt-decode';
// utils/auth.ts


export const getLoggedInSuperadminId = (): number | null => {
  const token = localStorage.getItem('stoken');
  if (!token) return null;

  try {
    const decoded = jwtDecode<{ id: number }>(token);
    return decoded.id;
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
};

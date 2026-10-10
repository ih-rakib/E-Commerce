export const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl;
  if (import.meta.env.DEV) return "http://localhost:3000";
  return "https://e-commerce-backend-delta-eight.vercel.app";
};

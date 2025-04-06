import axios from "axios";

// ✅ Use deployed backend on Render
const BASE_URL = "https://mail-classifier-backend.onrender.com";

export const fetchEmails = async () => {
  const res = await axios.get(`${BASE_URL}/emails`);
  return res.data;
};

export const refreshEmails = async () => {
  await axios.get(`${BASE_URL}/refresh`);
};

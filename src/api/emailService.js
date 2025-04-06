import axios from "axios";
// job-email-sorter/src/api/emailService.js
const BASE_URL = "https://mail-classifier-backend.onrender.com";

// const API = "http://localhost:8080"; // your backend

// export const fetchEmails = async () => {
//   const res = await axios.get(`${API}/auth/google/callback`);
//   return res.data.emails; // array of classified emails
// };

export const fetchEmails = async () => {
  //   const res = await axios.get("http://localhost:8080/emails");
  const res = await axios.get(`${BASE_URL}/emails`);
  return res.data.emails;
};

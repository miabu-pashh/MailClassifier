import axios from "axios";

const API = "http://localhost:8080"; // your backend

// export const fetchEmails = async () => {
//   const res = await axios.get(`${API}/auth/google/callback`);
//   return res.data.emails; // array of classified emails
// };

export const fetchEmails = async () => {
  const res = await axios.get("http://localhost:8080/emails");
  return res.data.emails;
};

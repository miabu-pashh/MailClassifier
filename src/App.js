// ✅ Final Frontend with Refresh Button

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [emailsByDay, setEmailsByDay] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchEmails = () => {
    axios
      .get("https://mail-classifier-backend.onrender.com/emails")

      .then((res) => {
        setEmailsByDay(res.data);
        const days = Object.keys(res.data);
        if (days.length > 0) setSelectedDay(days[0]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleRefresh = () => {
    axios
      .get("https://mail-classifier-backend.onrender.com/refresh")
      .then(() => fetchEmails())
      .catch(console.error);
  };

  const filteredEmails = (emailsByDay[selectedDay] || []).filter(
    (email) =>
      email.subject.toLowerCase().includes(search.toLowerCase()) ||
      email.from.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["Rejection", "Interview", "LinkedIn", "Uncategorized"];
  const icons = {
    Rejection: "❌",
    Interview: "🗓️",
    LinkedIn: "🔗",
    Uncategorized: "📄",
  };

  const countByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredEmails.filter(
      (email) => email.classification === category
    ).length;
    return acc;
  }, {});

  const appliedCount = filteredEmails.length;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
            alt="Gmail"
            className="gmail-icon"
          />
          <h1>Classifier</h1>
        </div>
        <hr className="underline" />
        <h2 className="selected-day-heading">{selectedDay}</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Search subject or sender..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="day-dropdown"
          >
            {Object.keys(emailsByDay).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <button onClick={handleRefresh} className="refresh-button">
            🔁 Refresh Emails
          </button>
        </div>
      </header>

      <div className="summary-cards">
        <div className="card applied">
          <div className="card-title">Applied</div>
          <div className="card-count">{appliedCount}</div>
        </div>
        <div className="card rejection">
          <div className="card-title">Rejected</div>
          <div className="card-count">{countByCategory.Rejection}</div>
        </div>
        <div className="card interview">
          <div className="card-title">Interview</div>
          <div className="card-count">{countByCategory.Interview}</div>
        </div>
        <div className="card linkedin">
          <div className="card-title">LinkedIn</div>
          <div className="card-count">{countByCategory.LinkedIn}</div>
        </div>
      </div>

      <div className="email-lists">
        {categories.map((category) => (
          <div key={category} className="category-section">
            <h2 className="category-heading">
              {icons[category]} {category} ({countByCategory[category]})
            </h2>
            {filteredEmails.filter((e) => e.classification === category)
              .length === 0 ? (
              <p className="empty-message">No emails</p>
            ) : (
              filteredEmails
                .filter((e) => e.classification === category)
                .map((e, idx) => (
                  <div
                    key={idx}
                    className="email-card"
                    onClick={() =>
                      setExpandedIndex(idx === expandedIndex ? null : idx)
                    }
                  >
                    <div className="email-subject">{e.subject}</div>
                    <div className="email-from">{e.from}</div>
                    <div className="email-date">{e.date}</div>
                    {idx === expandedIndex && (
                      <div className="email-body">
                        Full email content can be shown here or a summary
                        placeholder.
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

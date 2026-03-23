"use client";

import { useState, useEffect } from "react";
import "./dash.css";
import { useRouter } from "next/navigation";

export default function StaffDashboard() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [status, setStatus] = useState("Pending");
  const [comment, setComment] = useState("");

  const handleCheckin = async () => {
    try {
      setMessage("Checking in...");
      setMessageType("info");
      setStatus("Pending");

      const response = await fetch("/api/staffcheckin", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Check-in successful");
        setMessageType("success");
        setStatus("Pending Approval");
      } else {
        setMessage(data.error || data.message || "Check-in failed");
        setMessageType("error");
        setStatus("Pending");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      setMessage("Something went wrong");
      setMessageType("error");
      setStatus("Pending");
    }
  };

  // Fetch the current check-in status when the component mounts
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/staffstatus", {
          cache: "no-store", // Ensure we get the latest status
        });
        const data = await res.json();

        if (res.ok) {
          setStatus(data.checkin.status);
          setComment(data.checkin.comment);
        } else {
          setStatus("Pending");
          setComment("");
        }
      } catch (error) {
        console.error("Failed to fetch status:", error);
      }
    };

    fetchStatus();
  }, []);

  //logout function

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      router.replace("/staff");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome!</h1>
        <p className="dashboard-subtitle">Here you can check in now</p>

        <button className="checkin-btn" onClick={handleCheckin}>
          Check In Now
        </button>

        {message && <p className={`message-box ${messageType}`}>{message}</p>}

        <div className="status-section">
          <p className="status-text">
            Check-in Status: <span>{status}</span>
          </p>

          {comment && (
            <div className="comment-box">
              <p className="comment-heading">Manager Comment</p>
              <p className="comment-text">{comment}</p>
            </div>
          )}
        </div>

        <button
          className="home-btn"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </button>

        <button className="button-group" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

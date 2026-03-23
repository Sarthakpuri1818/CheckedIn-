"use client";

import { useEffect, useState } from "react";
import "./man_dash.css";

type Checkin = {
  _id: string;
  staffName: string;
  status: string;
  comment: string;
  approvedBy: string;
  createdAt: string;
};

export default function ManagerDashboard() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const fetchCheckins = async () => {
    try {
      const response = await fetch("/api/staffcheckin");
      const data = await response.json();

      setCheckins(data.checkins || []);

      setComments((currentComments) => {
        const nextComments = { ...currentComments };

        data.checkins?.forEach((item: Checkin) => {
          if (!(item._id in nextComments)) {
            nextComments[item._id] = item.comment || "";
          }
        });

        return nextComments;
      });
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };

  const updateCheckin = async (
    id: string,
    status: string,
    comment: string
  ) => {
    try {
      const response = await fetch("/api/staffcheckin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status, comment }),
      });

      const data = await response.json();
      console.log("Update response:", data);

      if (!response.ok) {
        console.error(data.error || "Failed to update check-in");
        return;
      }

      await fetchCheckins();
    } catch (error) {
      console.error("Error updating check-in:", error);
    }
  };

  const deleteCheckin = async (id: string) => {
    try {
      const response = await fetch(`/api/staffcheckin/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("Delete response:", data);

      if (!response.ok) {
        console.error(data.error || "Failed to delete check-in");
        return;
      }

      await fetchCheckins();
    } catch (error) {
      console.error("Error deleting check-in:", error);
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  const pendingCheckins = checkins.filter((item) => item.status === "Pending");
  const approvedCheckins = checkins.filter((item) => item.status === "Approved");
  const rejectedCheckins = checkins.filter((item) => item.status === "Denied");

  const renderTable = (items: Checkin[], showActions = false) => (
    <table>
      <thead>
        <tr>
          <th>Staff Name</th>
          <th>Check-in Time</th>
          <th>Status</th>
          <th>Comment</th>
          {showActions && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr key={item._id}>
              <td>{item.staffName}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.status}</td>

              <td>
                {showActions ? (
                  <input
                    value={comments[item._id] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [item._id]: e.target.value,
                      })
                    }
                    placeholder="Add comment"
                  />
                ) : (
                  item.comment || "No comment"
                )}
              </td>

              {showActions && (
                <td>
                  <button
                    onClick={() =>
                      updateCheckin(
                        item._id,
                        "Approved",
                        comments[item._id] || ""
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateCheckin(
                        item._id,
                        "Denied",
                        comments[item._id] || ""
                      )
                    }
                  >
                    Reject
                  </button>

                  <button onClick={() => deleteCheckin(item._id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={showActions ? 5 : 4}>No records found</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="manager-dashboard">
      <h1>Welcome, Manager!</h1>
      <p>
        It's great to see you today 🙋🏻‍♂️ Here you can manage your team and review
        staff check-ins 🚀
      </p>

      <div className="checkin-section">
        <h2>Pending Check-ins ☑️</h2>
        {renderTable(pendingCheckins, true)}
      </div>

      <div className="checkin-section">
        <h2>Approved Check-ins ✅</h2>
        {renderTable(approvedCheckins)}
      </div>

      <div className="checkin-section">
        <h2>Rejected Check-ins ❌</h2>
        {renderTable(rejectedCheckins)}
      </div>

      <button onClick={() => (window.location.href = "/")}>
        Go Back To Home
      </button>
    </div>
  );
}





            


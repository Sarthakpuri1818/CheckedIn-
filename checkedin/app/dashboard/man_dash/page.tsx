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

  // adding toast notifications for better user feedback

  const [toastMessage, setToastMessage]= useState("");
  const [toastType, setToastType]= useState("");

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };


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
        showToast(data.error || "Failed to update check-in", "error");
        console.error(data.error || "Failed to update check-in");
        return;
      }

      await fetchCheckins();
      showToast(
        status === "Approved"
          ? "Check-in approved successfully!"
          : "Check-in rejected successfully!",
        "success"
      );
    } catch (error) {
      console.error("Error updating check-in:", error);
      showToast("An error occurred while updating the check-in", "error");
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
        showToast(data.error || "Failed to delete check-in", "error");
        console.error(data.error || "Failed to delete check-in");
        return;
      }

      await fetchCheckins();
      showToast("Check-in deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting check-in:", error);
      showToast("An error occurred while deleting the check-in", "error");
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  const pendingCheckins = checkins.filter(
    (item) => item.status?.toLowerCase() === "pending"
  );
  const approvedCheckins = checkins.filter(
    (item) => item.status?.toLowerCase() === "approved"
  );
  const rejectedCheckins = checkins.filter((item) => {
    const normalizedStatus = item.status?.toLowerCase();
    return normalizedStatus === "denied" || normalizedStatus === "rejected";
  });

  const renderTable = (
    items: Checkin[],
    showActions = false,
    showDeleteOnly = false
  ) => (
    <table>
      <thead>
        <tr>
          <th>Staff Name</th>
          <th>Check-in Time</th>
          <th>Status</th>
          <th>Comment</th>
          {(showActions || showDeleteOnly) && <th>Action</th>}
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
                      setComments((currentComments) => ({
                        ...currentComments,
                        [item._id]: e.target.value,
                      }))
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

              {showDeleteOnly && (
                <td>
                  <button onClick={() => deleteCheckin(item._id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={showActions || showDeleteOnly ? 5 : 4}>
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="manager-dashboard">
      {toastMessage && (
        <div className={`toast-message ${toastType}`}>
          {toastMessage}
        </div>
      )}

      <h1>Welcome, Manager!</h1>
      <p>
        It's great to see you today 🙋🏻‍♂️ Here you can manage your team and review
        staff check-ins 🚀
      </p>

      <div className="checkin-section">
        <h2>Pending Check-ins </h2>
        {renderTable(pendingCheckins, true)}
      </div>

      <div className="checkin-section">
        <h2>Approved Check-ins </h2>
        {renderTable(approvedCheckins, false, true)}
      
      </div>

      <div className="checkin-section">
        <h2>Rejected Check-ins </h2>
        {renderTable(rejectedCheckins, false, true)}
      </div>

      <button onClick={() => (window.location.href = "/")}>
        Go Back To Home
      </button>
    </div>
  );
}





            

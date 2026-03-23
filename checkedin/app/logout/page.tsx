"use client";
import "./logout.css";
import { useRouter } from "next/navigation";

export default function Logoutbutton() {
  const router = useRouter();

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
    <button onClick={handleLogout} className="logoutbutton">
      Logout
    </button>
  );
}

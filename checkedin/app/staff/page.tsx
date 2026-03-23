"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./staff.css";

export default function StaffPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // created a handle login function to handle the functionality

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (res.ok) {
      if (data.user.role === "staff") {
        router.push("/dashboard/staff");
      } else if (data.user.role === "manager") {
        router.push("/dashboard/man_dash");
      } else {
        alert("Unknown role");
      }
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="staff-container">
      <div className="staff-video">
        <video autoPlay muted loop playsInline preload="metadata">
          <source
            src="/Blue Illustrative Employee Training Presentation.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="staff-form-box">
        <h1> Login</h1>
        <p>Login to continue to your dashboard</p>

        <form className="staff-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
        </form>

        <p>
          <Link href="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

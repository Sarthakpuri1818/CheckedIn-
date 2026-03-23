"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./manager.css";

export default function ManagerPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/manager-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("MANAGER LOGIN RESPONSE:", data);

      if (res.ok) {
        router.push("/dashboard/man_dash");
      } else {
        alert(data.message || "Manager login failed");
      }
    } catch (error) {
      console.error("MANAGER LOGIN ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="manager-container">
     <div className="manager-video">
  <video autoPlay muted loop playsInline preload="metadata">
    <source src="/managerlogin.mp4" type="video/mp4" />
  </video>
</div>
      <div className="manager-form-box">
        <h1>Manager Login</h1>
        <p>Login to continue to your dashboard</p>

        <form className="manager-form" onSubmit={handleSubmit}>
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
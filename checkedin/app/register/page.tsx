//register page for users to register themselves as staff or manager
//it has a form for staff to register themselves and a form for managers to register themselves

"use client";

import Link from "next/link";
import "./register.css";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (res.ok) {
        alert("Registered successfully");
        // clearing all input fields after succesfull registeration
        setName("");
        setEmail("");
        setPassword("");
        setRole("staff");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="register-image-box">
        <img
          src="/register.png"
          alt="Register Image"
          className="register-image"
        />
      </div>

      <div className="register-form-box">
        <h1>Register To Get Started</h1>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link href="/staff">Login here</Link>
        </p>

        <p>
          <Link href="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      nav("/dashboard");
    } catch (err) {
      setMsg("Invalid login");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Welcome Back !! Login Here</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <form onSubmit={login} style={{ display: "grid", gap: 10, width: 280 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: 15, fontSize: 12, color: "#555" }}>
        Admin login: admin@skyline.com / Admin@123
      </div>
    </div>
  );
}
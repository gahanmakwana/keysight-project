import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", mobile: "", city: ""
  });
  const [msg, setMsg] = useState("");

  const onChange = (k, v) => setForm({ ...form, [k]: v });

  const register = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setMsg("Registered successfully! Please login.");
      setTimeout(() => nav("/login"), 700);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Register</h3>
      {msg && <p>{msg}</p>}

      <form onSubmit={register} style={{ display: "grid", gap: 10, width: 300 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => onChange("name", e.target.value)} />
        <input placeholder="Email" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => onChange("password", e.target.value)} />
        <input placeholder="Mobile" value={form.mobile} onChange={(e) => onChange("mobile", e.target.value)} />
        <input placeholder="City" value={form.city} onChange={(e) => onChange("city", e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
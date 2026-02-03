import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeLanding() {
  const nav = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Kingfisher Airlines</h1>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={() => nav("/register")}>Register</button>
        <button onClick={() => nav("/login")}>Login</button>
      </div>

      <div style={{ marginTop: 40, color: "#777" }}>Copyright @2026 - Kingfisher airlines pvt. ltd.</div>
    </div>
  );
}
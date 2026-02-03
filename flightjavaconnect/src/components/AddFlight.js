import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function AddFlight() {
  const nav = useNavigate();

  // ✅ Hooks must be called unconditionally
  const [flightNo, setFlightNo] = useState("");
  const [flightName, setFlightName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [deptTime, setDeptTime] = useState("");
  const [availSeats, setAvailSeats] = useState(30);
  const [price, setPrice] = useState(3000);
  const [logoUrl, setLogoUrl] = useState("");
  const [msg, setMsg] = useState("");

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    // ✅ redirect without breaking hook rules
    if (!localStorage.getItem("token")) {
      nav("/login");
      return;
    }
    if (!isAdmin) {
      nav("/dashboard");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setMsg("");

    // basic validation
    if (!flightNo || !source || !destination || !deptTime) {
      setMsg("Please fill Flight No, Source, Destination and Departure Time.");
      return;
    }

    try {
      await api("/flights/add", {
        method: "POST",
        body: JSON.stringify({
          flightNo,
          flightName,
          source,
          destination,
          deptTime,
          availSeats: Number(availSeats),
          price: Number(price),
          logoUrl: logoUrl || ""
        })
      });

      nav("/dashboard");
    } catch (err) {
      setMsg(err.message);
    }
  };

  // ✅ render protection AFTER hooks
  if (!isAdmin) {
    return <div style={{ padding: 20 }}>Admin only</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>Add Flight (Admin)</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <form onSubmit={save} style={{ display: "grid", gap: 10, width: 340 }}>
        <input
          placeholder="Flight No (e.g. SL101)"
          value={flightNo}
          onChange={(e) => setFlightNo(e.target.value)}
        />

        <input
          placeholder="Flight Name (optional)"
          value={flightName}
          onChange={(e) => setFlightName(e.target.value)}
        />

        <input
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          placeholder="Departure Time (e.g. 10:15 AM)"
          value={deptTime}
          onChange={(e) => setDeptTime(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Available Seats"
          value={availSeats}
          onChange={(e) => setAvailSeats(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Logo URL (optional)"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => nav("/dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
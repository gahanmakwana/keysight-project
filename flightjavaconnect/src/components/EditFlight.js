import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function EditFlight() {
  const { id } = useParams();
  const nav = useNavigate();

  // ✅ Hooks must be called unconditionally
  const [flightNo, setFlightNo] = useState("");
  const [flightName, setFlightName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [deptTime, setDeptTime] = useState("");
  const [availSeats, setAvailSeats] = useState(0);
  const [price, setPrice] = useState(0);
  const [msg, setMsg] = useState("");

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    // ✅ redirect non-admin without breaking hook rules
    if (!localStorage.getItem("token")) {
      nav("/login");
      return;
    }
    if (!isAdmin) {
      nav("/dashboard");
      return;
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const load = async () => {
    try {
      const data = await api(`/flights/${id}`);
      setFlightNo(data.flightNo || "");
      setFlightName(data.flightName || "");
      setSource(data.source || "");
      setDestination(data.destination || "");
      setDeptTime(data.deptTime || "");
      setAvailSeats(data.availSeats ?? 0);
      setPrice(data.price ?? 0);
    } catch (e) {
      setMsg(e.message);
    }
  };

  const update = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api(`/flights/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          flightNo,
          flightName,
          source,
          destination,
          deptTime,
          availSeats: Number(availSeats),
          price: Number(price),
          logoUrl: ""
        })
      });
      nav("/dashboard");
    } catch (e2) {
      setMsg(e2.message);
    }
  };

  // ✅ render protection AFTER hooks are declared
  if (!isAdmin) {
    return <div style={{ padding: 20 }}>Admin only</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>Edit Flight (Admin)</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <form onSubmit={update} style={{ display: "grid", gap: 10, width: 320 }}>
        <input
          placeholder="Flight No"
          value={flightNo}
          onChange={(e) => setFlightNo(e.target.value)}
        />
        <input
          placeholder="Flight Name"
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
          placeholder="Departure Time"
          value={deptTime}
          onChange={(e) => setDeptTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Available Seats"
          value={availSeats}
          onChange={(e) => setAvailSeats(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
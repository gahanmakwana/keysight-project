import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Dashboard() {
  const nav = useNavigate();
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAZ, setSortAZ] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);

  const name = localStorage.getItem("name") || "";
  const role = localStorage.getItem("role") || "";
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login");
      return;
    }
    load();
    // eslint-disable-next-line
  }, []);

  const load = async () => {
    const data = await api("/flights/getAll");
    setFlights(data || []);
  };

  const deleteFlight = async (id) => {
    await api(`/flights/${id}`, { method: "DELETE" });
    load();
  };

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  const filtered = useMemo(() => {
    let arr = [...flights];

    if (search.trim()) {
      const s = search.toLowerCase();
      arr = arr.filter(
        (f) =>
          (f.flightNo || "").toLowerCase().includes(s) ||
          (f.flightName || "").toLowerCase().includes(s)
      );
    }

    if (sortAZ) {
      arr.sort((a, b) => (a.flightNo || "").localeCompare(b.flightNo || ""));
    }

    if (sortPrice) {
      arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    return arr;
  }, [flights, search, sortAZ, sortPrice]);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Welcome {name}</h3>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => nav("/my-bookings")}>My Bookings</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          style={{ width: 420 }}
          placeholder="Search Flight.... by name or flight number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={() => { setSortAZ(true); setSortPrice(false); }}>
          sort Flights(A-Z)
        </button>
        <button onClick={() => { setSortPrice(true); setSortAZ(false); }}>
          sort by price
        </button>

        {isAdmin && (
          <button onClick={() => nav("/add-flight")}>Add Flight</button>
        )}
      </div>

      <div style={{ marginTop: 15 }}>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Flight_No</th>
              <th>Source</th>
              <th>Destination</th>
              <th>deptTime</th>
              <th>AvailSeats</th>
              <th>Price</th>
              <th>Book</th>
              {isAdmin && <th>Admin</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.map((f) => (
              <tr key={f.id}>
                <td>{f.logoUrl ? <img alt="logo" src={f.logoUrl} width="40" /> : "—"}</td>
                <td>{f.flightNo}</td>
                <td>{f.source}</td>
                <td>{f.destination}</td>
                <td>{f.deptTime}</td>
                <td>{f.availSeats}</td>
                <td>{f.price}</td>
                <td>
                  <button onClick={() => nav(`/passenger/${f.id}`)}>Book</button>
                </td>

                {isAdmin && (
                  <td>
                    <button onClick={() => nav(`/edit-flight/${f.id}`)}>Edit</button>{" "}
                    <button onClick={() => deleteFlight(f.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: 10, color: "#666" }}>
          {filtered.length} flights - try to pull data from the DB
        </p>
      </div>
    </div>
  );
}
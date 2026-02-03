import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function PassengerDetails() {
  const { flightId } = useParams();
  const nav = useNavigate();
  const [flight, setFlight] = useState(null);
  const [msg, setMsg] = useState("");

  const [passengerName, setPassengerName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState("Aadhaar");
  const [noOfPassengers, setNoOfPassengers] = useState(1);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const f = await api(`/flights/${flightId}`);
    setFlight(f);
  };

  const makePayment = async () => {
    setMsg("");
    try {
      const payload = {
        flightId: String(flightId),
        passengerName,
        idNumber,
        idType,
        noOfPassengers: String(noOfPassengers)
      };

      const res = await api("/bookings/createPending", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      // go to payment page with bookingId
      nav(`/payment/${res.bookingId}`, { state: { amount: res.amount } });
    } catch (err) {
      setMsg(err.message);
    }
  };

  if (!flight) return <div style={{ padding:20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h3>Passenger Details</h3>

      <div style={{ border:"1px solid #ccc", padding:10, width: 520 }}>
        <h4>Flight information to be displayed here</h4>
        <p><b>{flight.flightNo}</b> {flight.source} → {flight.destination} ({flight.deptTime})</p>
        <p>AvailSeats: {flight.availSeats} | Price: {flight.price}</p>
      </div>

      <div style={{ marginTop: 15, display:"grid", gap:10, width: 520 }}>
        <input placeholder="Name" value={passengerName} onChange={(e)=>setPassengerName(e.target.value)} />
        <input placeholder="ID Number" value={idNumber} onChange={(e)=>setIdNumber(e.target.value)} />

        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <label>ID Type:</label>
          <select value={idType} onChange={(e)=>setIdType(e.target.value)}>
            <option value="Aadhaar">Adhar</option>
            <option value="Passport">Passport</option>
          </select>
        </div>

        <input
          placeholder="No of Passengers"
          type="number"
          min="1"
          value={noOfPassengers}
          onChange={(e)=>setNoOfPassengers(Number(e.target.value))}
        />

        <button onClick={makePayment}>Make Payment</button>
        {msg && <p style={{ color:"red" }}>{msg}</p>}
      </div>
    </div>
  );
}
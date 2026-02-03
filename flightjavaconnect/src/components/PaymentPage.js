import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
//import qr from "../assets/qr.png";
import qr from "./image.png";
export default function PaymentPage() {
  const { bookingId } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount;

  const [status, setStatus] = useState("");

  const confirm = async () => {
    setStatus("Processing...");
    try {
      const res = await api(`/bookings/confirm/${bookingId}`, { method: "POST" });
      setStatus(`Booking id: ${res.bookingId} Successful!!!`);
      setTimeout(() => nav("/my-bookings"), 900);
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Payment Page</h3>

      <div style={{ border:"1px solid #ccc", padding:20, width: 520 }}>
        <h4>Amount: {amount}</h4>
        <div style={{ marginTop: 10 }}>
          <img src={qr} alt="QR Code" width="500" />
        </div>

        <button style={{ marginTop: 15 }} onClick={confirm}>Confirm</button>

        {status && <p style={{ marginTop: 10 }}>{status}</p>}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function MyBookings() {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await api("/bookings/my");
    setBookings(data || []);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>My Bookings</h3>
      <button onClick={() => nav("/dashboard")}>Back</button>

      <div style={{ marginTop: 15 }}>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Flight_No</th>
              <th>Route</th>
              <th>Passengers</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.flight?.flightNo}</td>
                <td>{b.flight?.source} → {b.flight?.destination}</td>
                <td>{b.noOfPassengers}</td>
                <td>{b.amount}</td>
                <td>{b.bookingStatus}</td>
                <td>{b.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
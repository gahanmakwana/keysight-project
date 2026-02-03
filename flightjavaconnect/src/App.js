import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeLanding from "./components/HomeLanding";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PassengerDetails from "./components/PassengerDetails";
import PaymentPage from "./components/PaymentPage";
import MyBookings from "./components/MyBookings";

import AddFlight from "./components/AddFlight";
import EditFlight from "./components/EditFlight";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLanding />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/passenger/:flightId" element={<PassengerDetails />} />
      <Route path="/payment/:bookingId" element={<PaymentPage />} />
      <Route path="/my-bookings" element={<MyBookings />} />

      {/* ✅ Admin routes */}
      <Route path="/add-flight" element={<AddFlight />} />
      <Route path="/edit-flight/:id" element={<EditFlight />} />
    </Routes>
  );
}
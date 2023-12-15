"use client";
import React, { useState } from "react";
import { addReservation } from "@/api/reservations";

const AddReservationForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    event_id: "",
    user_id: "",
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a reservation object
    const reservation = {
      event_id: event.id,
      user_id: formData.user_id,
      name: formData.name,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipCode: formData.zipCode,
    };

    // add reservation
    addReservation(reservation)
      .then((data) => {
        console.log("Reservation added:", data);
        onAddReservation();
      })
      .catch((error) => {
        console.error("Error adding reservation:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      });

    // close form
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-4 rounded-lg w-1/3 text-black"
      >
        <h2 className="text-2xl font-bold mb-4">
          Add Reservation for {event.name}
        </h2>
        {/* <label htmlFor="eventId">Event:</label> */}
        <input type="hidden" id="eventId" name="event_id" value={event.id} />
        {/* <label htmlFor="userId">User:</label> */}
        <input
          type="text"
          id="userId"
          name="user_id"
          value={formData.user_id}
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="state">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2"
        >
          Submit Reservation
        </button>
        {/* cancel button */}
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddReservationForm;

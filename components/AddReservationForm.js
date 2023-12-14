"use client";
import React, { useState } from "react";

const AddReservationForm = ({ event, onClose }) => {
  // get event_id from event
  const event_id = event.id;

  const [formData, setFormData] = useState({
    event_id: "",
    user_id: "",
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to submit the reservation data
    // (e.g., API call)
    console.log("Submitted reservation:", formData);
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
      <form onSubmit={handleSubmit} className="flex flex-col bg-white p-4 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          Add Reservation for {event.name}
        </h2>
        {/* <label htmlFor="eventId">Event:</label> */}
        <input type="hidden" id="eventId" name="event_id" value={event_id} />
        {/* <label htmlFor="userId">User:</label> */}
        <input
          type="hidden"
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
        <h3 className="text-lg font-bold mb-2">Address</h3>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="address.email"
          value={formData.address.email}
          onChange={handleAddressChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="state">Phone:</label>
        <input
          type="text"
          id="phone"
          name="address.phone"
          value={formData.address.phone}
          onChange={handleAddressChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="address.city"
          value={formData.address.city}
          onChange={handleAddressChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="address.zipCode"
          value={formData.address.zipCode}
          onChange={handleAddressChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
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

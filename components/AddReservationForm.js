"use client";
import { useState } from "react";
import { Alert } from "reactstrap";
import {
  addReservation,
  getReservationByUserAndEvent,
} from "@/api/reservations";
import { useRouter } from "next/navigation";

const AddReservationForm = ({ event, onClose, userId }) => {
  const router = useRouter();

  const [reservationMade, setReservationMade] = useState(false);

  const [formData, setFormData] = useState({
    event_id: "",
    user_id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
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
      user_id: userId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      zipCode: formData.zipCode,
    };

    // add reservation
    try {
      const data = addReservation(reservation);
      console.log("Reservation added:", data);
      setFormData({
        event_id: "",
        user_id: "",
        name: "",
        email: "",
        phone: "",
        city: "",
        zipCode: "",
      });
      router.push("/booked");
    } catch (error) {
      console.error("Error adding reservation:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      router.push("/events");
    }

    // close form
    onClose();
  };

  // check if reservation has been made using the user id
  // if reservation has been made, alert user that they have already made a reservation

  const checkReservation = async () => {
    const response = await fetch(
      getReservationByUserAndEvent(userId, event.id)
    );
    const data = await response.json();
    console.log("Reservation data:", data);

    if (data.length > 0) {
      setReservationMade(true);
      onClose();
    }
  };

  checkReservation();

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
        className="flex flex-col bg-white p-8 rounded-lg w-1/3 text-black"
      >
        <h2 className="text-2xl font-bold mb-4">
          Add Reservation for {event.name}
        </h2>
        {/* <label htmlFor="eventId">Event:</label> */}
        <input type="hidden" id="eventId" name="event_id" value={event.id} />
        {/* <label htmlFor="userId">User:</label> */}
        <input type="hidden" id="userId" name="user_id" value={userId} />
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
          type="email"
          id="email"
          name="email"
          placeholder="name@somebody.com"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <label htmlFor="state">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="123-456-7890"
          value={formData.phone}
          onChange={handleInputChange}
          required
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
          RSVP
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

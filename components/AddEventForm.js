"use client";
import React, { useState } from "react";
import { addEvent } from "@/api/events";
import { format } from "date-fns";

function AddEventForm({ onClose, onAddEvent }) {
  const formData = {
    name: "",
    image: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    description: "",
  };

  const [name, setName] = useState(formData.name);
  const [image, setImage] = useState(formData.image);
  const [date, setDate] = useState(formData.date);
  const [time, setTime] = useState(formData.time);
  const [venue, setVenue] = useState(formData.venue);
  const [category, setCategory] = useState(formData.category);
  const [description, setDescription] = useState(formData.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    // convert date and time to ISO format
    const eventDate = format(new Date(date), "yyyy-MM-dd");
    const eventTime = format(new Date(`2023-10-01T${time}`), "HH:mm:ss");

    // create event object
    const event = {
      name,
      image,
      date: eventDate,
      time: eventTime,
      venue,
      category,
      description,
    };

    // add event
    addEvent(event)
      .then((data) => {
        console.log("Event added:", data);
        onAddEvent();
      })
      .catch((error) => {
        console.error("Error adding event:", error);
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
        className="bg-white p-6 rounded-lg flex flex-col justify-center w-1/3 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-black">Add Event</h1>

        <input
          type="text"
          name="name"
          id="nameInput"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          name="image"
          id="imageInput"
          placeholder="Image Url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-black"
        />

        <input
          id="dateInput"
          type="date"
          name="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-black"
        />

        <input
          type="time"
          name="time"
          id="timeInput"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          name="venue"
          id="venueInput"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-black"
        />
        <select
          name="category"
          id="categoryInput"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-black bg-gray-300"
        >
          <option value="">Select Category</option>
          <option value="TECHNOLOGY">TECHNOLOGY</option>
          <option value="SPORTS">SPORTS</option>
          <option value="BUSINESS">BUSINESS</option>
          <option value="ENTERTAINMENT">ENTERTAINMENT</option>
          <option value="OTHER">OTHER</option>
        </select>
        <textarea
          name="description"
          id="descriptionInput"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded text-black"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
        {/* cancel button */}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddEventForm;

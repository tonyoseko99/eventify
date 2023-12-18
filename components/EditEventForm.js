import React, { useState } from "react";
import { editEvent } from "@/api/events";
import { id } from "date-fns/locale";

function EditEventForm({ event, onClose }) {
  const [formData, setFormData] = useState({
    id: event.id,
    name: event.name,
    date: event.date,
    location: event.venue,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editEvent(formData)
      .then(() => {
        setEvents((events) => {
          const index = events.findIndex((event) => event.id === formData.id);
          const newEvents = [...events];
          newEvents[index] = formData;
          return newEvents;
        });
        console.log("Event updated", formData);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
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
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          {/* Add other input fields for other event properties here */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="id"
          >
            ID:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
            type="text"
            name="id"
            value={formData.id}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other input fields for other event properties here */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Event
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditEventForm;

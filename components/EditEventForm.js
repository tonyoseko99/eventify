import React, { useState } from "react";
import { addEvent } from "@/api/events";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";

function EditEventForm({ event, showModal, setShowModal }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: event.id,
    name: event.name,
    date: event.date,
    venue: event.venue,
    category: event.category,
    description: event.description,
    image: event.image,
    time: event.time,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // create event object
    const updatedEvent = {
      id: formData.id,
      name: formData.name,
      date: formData.date,
      venue: formData.venue,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      time: formData.time,
    };

    // add event
    addEvent(updatedEvent)
      .then((data) => {
        console.log("Event added:", data);
        router.push("/events");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      });

    // close form
    setShowModal(false);
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
        <h1 className="text-2xl font-bold mb-4 text-black">Edit Event</h1>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
            type="hidden"
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
        {/* image */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        {/* description */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        {/* category */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category:
          </label>
          <select
            name="category"
            id="categoryInput"
            value={formData.category}
            onChange={handleInputChange}
            className="mb-2 p-2 border border-gray-300 rounded text-black bg-gray-300 w-full"
          >
            <option value="">Select Category</option>
            <option value="TECHNOLOGY">Technology</option>
            <option value="SPORTS">Sports</option>
            <option value="BUSINESS">Business</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="OTHER">Other</option>
          </select>
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
        {/* time */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="time"
          >
            Time:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Venue:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-700 transition-colors duration-200"
          type="submit"
        >
          Update Event
        </button>

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditEventForm;

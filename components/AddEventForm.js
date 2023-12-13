import React, { useState } from "react";

function AddEventForm({ onClose, onAddEvent}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    // close modal
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
        className="bg-white p-4 rounded-lg flex flex-col justify-center"
      >
        <h1 className="text-2xl font-bold mb-4 text-black">Add Event</h1>
        
        <input
          type="text"
          name="name"
          id="nameInput"
          placeholder="Name"
          value={name}
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
          className="mb-2 p-2 border border-gray-300 rounded text-white bg-black"
        >
          <option value="">Select Category</option>
          <option value="technology">TECHNOLOGY</option>
          <option value="sports">SPORTS</option>
          <option value="business">BUSINESS</option>
          <option value="other">OTHER</option>
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
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
        >
          Submit
        </button>
        {/* cancel button */}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddEventForm;

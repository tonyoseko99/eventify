"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllEvents, deleteEvent } from "@/api/events";
import Loader from "./Loader";
import EditEventForm from "./EditEventForm";

function EventList({ events, filteredEvents, userRole }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // convert date from timestamp to string
  const date = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US");
  };

  const handleEditClick = (id) => {
    const eventToEdit = eventsToRender.find((event) => event.id === id);
    setSelectedEvent(eventToEdit);
    setShowModal(true);
  };

  // if (loading) return <Loader />;

  const eventsToRender = filteredEvents.length > 0 ? filteredEvents : events;

  const sortEvents = (events) => {
    return [...events].sort((a, b) => a.category.localeCompare(b.category));
  };

  const handleDelete = (id) => {
    deleteEvent(id)
      .then((data) => {
        console.log("Event deleted:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  if (eventsToRender.length === 0) return <p>No events to show</p>;

  return (
    <div className="flex flex-wrap justify-center max-w-6xl mt-6 sm:w-full">
      {userRole === "ADMIN" ? (
        <>
          <table className="w-full bg-white shadow-lg rounded-lg striped">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-center font-bold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-center font-bold text-gray-600">
                  Description
                </th>
                <th className="px-6 py-3 text-center font-bold text-gray-600">
                  Date
                </th>
                <th className="px-6 py-3 text-center font-bold text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 text-center font-bold text-gray-600">
                  Ticket Price
                </th>
                <th className="px-6 py-3 text-center font-bold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {eventsToRender.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-left text-gray-700 truncate">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 text-left text-gray-700 truncate">
                    {event.description}
                  </td>
                  <td className="px-6 py-4 text-left text-gray-700 truncate">
                    {date(event.date)}
                  </td>
                  <td className="px-6 py-4 text-left text-gray-700 truncate">
                    {event.category}
                  </td>
                  <td className="px-6 py-4 text-left text-gray-700 truncate">
                    ${event.ticketPrice}.00
                  </td>
                  <td className="px-6 py-4 inline-flex space-x-2">
                    <button
                      className="font-bold text-blue-500"
                      onClick={() => handleEditClick(event.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-bold"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && selectedEvent && (
            <EditEventForm
              showModal={showModal}
              setShowModal={setShowModal}
              event={selectedEvent}
            />
          )}
        </>
      ) : (
        eventsToRender.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <div
              className="flex flex-col p-6 mt-6 text-left border rounded-lg shadow-md hover:shadow-xl focus:shadow-xl mx-4"
              style={{ width: "300px", height: "500px"}}
            >
              <Image
                loader={({ src, width, quality }) => {
                  return `${src}?w=${width}&q=${quality || 75}`;
                }}
                src={event.image}
                alt="Picture of the event"
                width={300}
                height={150} // Update height for better image proportions
              />
              <div className="w-full pl-4 flex flex-col justify-center">
                <h3 className="text-2xl font-bold h-5.5">{event.name}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-gray-600 mb-2">
                  <span className="mr-2 text-gray-400 font-light">Date:</span>{" "}
                  {date(event.date)}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="mr-2 text-gray-400 font-light">
                    Category:
                  </span>{" "}
                  {event.category}
                </p>
                {/* ticket price */}
                <p className="text-gray-600 mb-2">
                  <span className="mr-2 text-gray-400 font-light">
                    Ticket Price:
                  </span>{" "}
                  ${event.ticketPrice}.00
                </p>
                <button className="inline-flex items-center px-4 py-2 text-base font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                  View Event &rarr;
                  <svg
                    className="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 360C149.1 360 32 246.8 32 128c0-117.1 117.1-128 128-128s128 11.9 128 128c0 118.8-117.1 232-128 232zM135.2 106.4l141.5 141.5L102.4 331.2l70.7 70.7L368 256l-137.3-137.3z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default EventList;

"use client";
import { useState, useEffect } from "react";
import AddEventForm from "@/components/AddEventForm";
import EventList from "@/components/EventList";
import { getAllEvents } from "@/api/events";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="flex items-center justify-between w-1/3 text-center">
        <h1 className="text-2xl font-bold">Available Events</h1>
        <button
          className="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      </div>
      <EventList events={events} />
      {/* modal form */}
      {showModal && (
        <AddEventForm
          onClose={() => setShowModal(false)}
          onAddEvent={fetchEvents}
        />
      )}
    </div>
  );
}

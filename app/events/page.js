"use client";
import { useState, useEffect } from "react";
import AddEventForm from "@/components/AddEventForm";
import EventList from "@/components/EventList";
import { getAllEvents } from "@/api/events";
import Loader from "@/components/Loader";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchEvents, setSearchEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setEvents(events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // search events
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    const filteredEvents = events.filter((event) =>
      event.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchEvents(filteredEvents);
  };

  const handleAddEvent = () => {
    setShowModal(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="flex items-center justify-between w-1/2 text-center">
        <h1 className="text-2xl font-bold">Available Events</h1>

        {/* search bar */}
        <div className="flex items-center justify-center mt-4">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md p-2 mr-2 text-black"
          />
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button
          className="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      </div>
      <div className="flex flex-col items-center justify-between w-1/2 flex-1 px-20 text-center">
        <EventList events={events} filteredEvents={searchEvents} />
        {/* modal form */}
        {showModal && (
          <AddEventForm
            onClose={() => setShowModal(false)}
            onAddEvent={fetchEvents}
          />
        )}
      </div>
    </div>
  );
}

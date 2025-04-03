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
  const [sortOption, setSortOption] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setEvents(events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchEvents();
    setLoggedInUser(userRole);
  }, []);

  // search events
  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.value;
    setSearchValue(searchInput);
    let filteredEvents = events;
    if (searchInput !== "") {
      filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setSearchEvents(filteredEvents);
  };

  // handle sort
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    let sortedEvents = [...events];
    if (event.target.value === "TECHNOLOGY") {
      sortedEvents = sortedEvents.filter((event) => event.category === "TECHNOLOGY");
    } else if (event.target.value === "SPORTS") {
      sortedEvents = sortedEvents.filter((event) => event.category === "SPORTS");
    } else if (event.target.value === "BUSINESS") {
      sortedEvents = sortedEvents.filter((event) => event.category === "BUSINESS");
    } else if (event.target.value === "ENTERTAINMENT") {
      sortedEvents = sortedEvents.filter((event) => event.category === "ENTERTAINMENT");
    } else if (event.target.value === "OTHER") {
      sortedEvents = sortedEvents.filter((event) => event.category === "OTHER");
    }
    setSearchEvents(sortedEvents);
  };

  const handleAddEvent = () => {
    setShowModal(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="flex items-center justify-between w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Discover Events</h1>

        {/* search bar */}
        <div className="flex items-center justify-center mt-4">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search Events"
            value={searchValue}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md p-2 mr-2 text-gray-800"
          />
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* sort by category */}
        <div className="mt-4">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded bg-gray-200 text-gray-800"
          >
            <option value="">All Categories</option>
            <option value="TECHNOLOGY">Technology</option>
            <option value="SPORTS">Sports</option>
            <option value="BUSINESS">Business</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* add event button */}
        {/* check if user role === ADMIN, only ADMIN can add event */}
        {loggedInUser === "ADMIN" && (
          <button
            className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
         )}
      </div>
      <div className="flex flex-col items-center justify-between w-full flex-1 px-20 text-center">
        <EventList events={events} filteredEvents={searchEvents} userRole={loggedInUser}/>
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

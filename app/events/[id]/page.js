"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getEventById } from "@/api/events";
import AddReservationForm from "@/components/AddReservationForm";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import { addReservation } from "@/api/reservations";
import { set } from "date-fns";

function EventPage({ params }) {

  const [event, setEvent] = useState(null);
  const [booking, setBooking] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // convert date from timestamp to string
  const date = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US");
  };

  useEffect(() => {
    getEventById(params.id).then((data) => setEvent(data));
    setLoading(false);
  }, [params.id]);

  if (!event) {
    return <Loader />;
  }

  const eventId = params.id;

  const handleRegisterClick = async () => {
    try {
      const booking = await addReservation(eventId);
      setBooking(booking);
      setLoading(false);
      setSuccess(true);
      alert("Booking created successfully!");
    } catch (error) {
      console.error("Error creating a booking:", error);
    }
  };

  const user_id = localStorage.getItem("token");
  console.log(`user_id: `, user_id);

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center w-full min-h-screen px-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Event Details</h1>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row p-6 mt-6 shadow-lg rounded-lg">
        <div className="w-full mb-4 sm:mr-6">
          <Image
            src={event.image}
            alt="Picture of the event"
            width={500}
            height={300} // Updated height for better proportions
            className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow text-left ml-4 sm:ml-0">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {event.name}
            </h3>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <div className="flex items-center mb-2">
            <span className="text-gray-600 font-semibold">Date:</span>
            <span className="ml-2 text-gray-600">{date(event.date)}</span>
            <span className="ml-2 text-gray-600 font-semibold">Time:</span>
            <span className="ml-2 text-gray-600">{event.time}</span>
            </div>
            <p className="text-gray-600 mb-2">{event.venue}</p>
            <div className="flex justify-start mt-4">
            <button
              className={`event-btn ${
              success
                ? "bg-green-500 hover:bg-green-700"
                : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded`}
              onClick={handleRegisterClick}
              disabled={success}
            >
              {success ? "RSVP'd" : "Register"}
            </button>
            <Link href={`/events`}>
              <button className="event-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">
              Back
              </button>
            </Link>
            </div>
            {showForm && (
            <div className="mt-6">
              {/* Add reservation form */}
              <AddReservationForm
                event={event}
                onClose={() => setShowForm(false)}
                userId={user_id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventPage;

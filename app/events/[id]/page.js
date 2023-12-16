"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getEventById } from "@/api/events";
import AddReservationForm from "@/components/AddReservationForm";
import Loader from "@/components/Loader";

function EventPage({ params }) {
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(params.id).then((data) => setEvent(data));
    setLoading(false);
  }, [params.id]);

  if (!event) {
    return <Loader />;
  }

  const handleRegisterClick = () => {
    setShowForm(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Event Details</h1>
      <div className="flex flex-col items-center max-w-4xl mt-6 sm:w-full">
        <div
          key={event.id}
          className="flex flex-col sm:flex-row p-6 mt-6 text-left shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
        >
          <div className="mb-4 sm:mr-6">
            <Image
              src={event.image}
              alt="Picture of the event"
              width={500}
              height={100}
              className="rounded-md"
            />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {event.name}
            </h3>
            <p className="text-gray-600 mb-2">
              Description: {event.description}
            </p>
            <p className="text-gray-600 mb-2">Date: {event.date}</p>
            <p className="text-gray-600 mb-2">Time: {event.time}</p>
            <p className="text-gray-600 mb-4">Location: {event.venue}</p>
            <div className="flex justify-center">
              <button
                className="event-btn register-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRegisterClick}
              >
                Register
              </button>
              <Link href={`/events`}>
                <button className="event-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4">
                  Back
                </button>
              </Link>
            </div>

            {showForm && (
              <div>
                {/* Add reservation form */}
                <AddReservationForm
                  event={event}
                  onClose={() => {
                    setShowForm(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;

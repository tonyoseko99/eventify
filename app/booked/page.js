"use client";
import { useState, useEffect } from "react";
import { getReservationsByUser, deleteReservation } from "@/api/reservations";
import Loader from "@/components/Loader";
import Link from "next/link";

function Booked() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem("token");

  const handleUnrsvp = async (id) => {
    try {
      await deleteReservation(id);
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const reservations = await getReservationsByUser(user_id);
      console.log("Reservations:", reservations);
      setReservations(reservations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="bg-gray-100 shadow-lg rounded p-8 my-4 w-3/4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Booked Events</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 text-black py-3 bg-gray-200">Event</th>
              <th className="px-6 text-black py-3 bg-gray-200">Date</th>
              <th className="px-6 text-black py-3 bg-gray-200">Time</th>
              <th className="px-6 text-black py-3 bg-gray-200">Location</th>
              <th className="px-6 text-black py-3 bg-gray-200">Category</th>
              <th className="px-6 text-black py-3 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="bg-white border-b border-gray-200"
              >
                <td className="px-6 py-4 justify-center text-center">
                  {reservation.event_id.name}
                </td>
                <td className="px-6 py-4 justify-center text-center">
                  {reservation.event_id.date}
                </td>
                <td className="px-6 py-4 justify-center text-center">
                  {reservation.event_id.time}
                </td>
                <td className="px-6 py-4 justify-center text-center">
                  {reservation.event_id.venue}
                </td>
                <td className="px-6 py-4 justify-center text-center">
                  {reservation.event_id.category}
                </td>
                <td className="px-6 py-4 items-center justify-center flex">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
                    onClick={() => handleUnrsvp(reservation.id)}
                  >
                    UnRSVP
                  </button>
                  <Link
                    className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-gray"
                    href="/payments"
                  >
                    Pay
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Booked;

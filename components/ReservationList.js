"use client";
import { useState, useEffect } from "react";
import { getAllReservations, deleteReservation } from "@/api/reservations";
import Link from "next/link";
import Loader from "./Loader";

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // convert date from timestamp to string
  const date = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US");
  };

  const fetchReservations = async () => {
    try {
      const reservations = await getAllReservations();
      console.log(reservations);
      setReservations(reservations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setReservations(
        reservations.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-wrap flex-col items-center justify-center w-1/2 mt-6 sm:w-full">
      <div className="flex items-center justify-between w-1/2 text-center mb-4">
        <h1 className="text-2xl font-bold ">Available Reservations</h1>
      </div>
      <table className="w-1/2 bg-white shadow-lg rounded-lg striped">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Name of Attendant
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Event Name
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Category
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Time
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-6 py-4 text-left text-gray-700 truncate">
                  <Link href={`/reservations/${reservation.id}`}>
                    <span className="text-blue-500">{reservation.name}</span>
                  </Link>
                </td>
                <td className="px-6 py-4 text-left text-gray-700 truncate">
                  {reservation.event_id.name}
                </td>
                <td className="px-6 py-4 text-left text-gray-700 truncate">
                  {reservation.event_id.category}
                </td>
                <td className="px-6 py-4 text-left text-gray-700 truncate">
                  {date(reservation.event_id.date)}
                </td>
                <td className="px-6 py-4 text-left text-gray-700 truncate">
                  {reservation.event_id.time}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className=" mr-2"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2">
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;

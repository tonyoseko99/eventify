"use client";
import { useState, useEffect } from "react";
import { getAllReservations, deleteReservation } from "@/api/reservations";
import Link from "next/link";
import Loader from "./Loader";

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setReservations(reservations.filter((reservation) => reservation.id !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="flex items-center justify-between w-1/2 text-center">
        <h1 className="text-2xl font-bold text-blue-500">
          Available Reservations
        </h1>
      </div>
      <table className="table-auto mt-4 w-1/2">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200">Name of Attendant</th>
            <th className="px-4 py-2 bg-gray-200">Event Name</th>
            <th className="px-4 py-2 bg-gray-200">Category</th>
            <th className="px-4 py-2 bg-gray-200">Date</th>
            <th className="px-4 py-2 bg-gray-200">Time</th>
            <th className="px-4 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="border px-4 py-2">
                  <Link href={`/reservations/${reservation.id}`}>
                    <span className="text-blue-500">{reservation.name}</span>
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  {reservation.event_id.name}
                </td>
                <td className="border px-4 py-2">
                  {reservation.event_id.category}
                </td>
                <td className="border px-4 py-2">
                  {reservation.event_id.date}
                </td>
                <td className="border px-4 py-2">
                  {reservation.event_id.time}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Delete
                  </button>
                  <Link href={`/reservations/${reservation.id}/edit`}>
                    <button className="text-blue-500">Edit</button>
                  </Link>
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

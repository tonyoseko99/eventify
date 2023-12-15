"use client";
import { useState, useEffect } from "react";
import { getAllReservations } from "@/api/reservations";
import Image from "next/image";
import Link from "next/link";

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

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <div className="flex items-center justify-between w-1/3 text-center">
                <h1 className="text-2xl font-bold text-blue-500">Available Reservations</h1>
            </div>
            <table className="table-auto mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200">Name of Attendant</th>
                        <th className="px-4 py-2 bg-gray-200">Event Name</th>
                        <th className="px-4 py-2 bg-gray-200">Category</th>
                        <th className="px-4 py-2 bg-gray-200">Date</th>
                        <th className="px-4 py-2 bg-gray-200">Time</th>
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
                                <td className="border px-4 py-2">{reservation.event_id.name}</td>
                                <td className="border px-4 py-2">{reservation.event_id.category}</td>
                                <td className="border px-4 py-2">{reservation.event_id.date}</td>
                                <td className="border px-4 py-2">{reservation.event_id.time}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border px-4 py-2">
                                Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationList;

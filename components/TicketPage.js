"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loader from "./Loader";

function TicketPage() {
  const router = useRouter();
  //const { eventId, reservationId } = router.query || {};
  const [ticket, setTicket] = useState(null);

  const { reservationId, eventId } = useParams();
  console.log(reservationId, eventId);

  // convert date from timestamp to string
  const date = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US");
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bookings/rest/payments/list/${eventId}/${reservationId}`
        );
        console.log("Ticket data:", response.data);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [eventId, reservationId]);

  if (!ticket) {
    return <Loader />;
  }

  return (
    <>
      {/* display ticket data, styled with tailwind, make the page resemble an actual ticket */}
      <div className="flex flex-col items-center justify-center h-screen text-black">
        <div className="w-3/4 h-3/4 bg-white rounded-lg overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-gray-300 p-4 text-center rounded-t-lg">
            <h1 className="text-2xl font-bold text-white">Ticket</h1>
          </div>

          {/* User Details */}
          <div className="p-4 flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl font-bold">
              {ticket.reservation.name} - {ticket.reservation.phone}
            </h2>
            <h3 className="text-lg">{ticket.user.email}</h3>
          </div>

          {/* Event Details */}
          <div className="p-4 flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl font-bold">{ticket.event.name}</h2>
            <h3 className="text-lg">{date(ticket.event.date)}</h3>
            <h3 className="text-lg">{ticket.event.time}</h3>
            <h3 className="text-lg">{ticket.event.venue}</h3>
          </div>

          {/* Ticket ID */}
          <div className="bg-gray-300 p-4 text-center rounded-b-lg">
            <h4 className="text-lg">Ticket ID: {ticket.id}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketPage;

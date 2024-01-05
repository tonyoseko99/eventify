"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import QRCode from "qrcode.react";
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
      <div className="flex flex-col items-center justify-center h-screen p-8 bg-gray-100">
        <div className="w-1/2 h-3/4 bg-white rounded-lg overflow-hidden border border-gray-300 shadow-xl">
          {/* Ticket Header */}
          <div className="bg-gray-300 p-4 text-center rounded-t-lg">
            <h1 className="text-2xl font-bold text-gray-700">Ticket</h1>
          </div>

          {/* scan to view event details */}
          <div className="p-4 flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl font-bold">Scan to view event details</h2>
          </div>
          {/* QR Code */}
          <div className="p-4 flex flex-col items-center justify-center">
            <QRCode
              value={JSON.stringify({
                id: ticket.id,
                user: ticket.user.email,
                event: ticket.event.name,
                date: date(ticket.event.date),
                time: ticket.event.time,
                venue: ticket.event.venue,
              })}
              size={256}
              level={"H"}
              bgColor={"#f5f5f5"}
              fgColor={"#333333"}
            />
          </div>

          {/* User Details */}
          <div className="p-4 flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl font-bold">
              {ticket.reservation.name} - {ticket.reservation.phone}
            </h2>
            <h3 className="text-lg">{ticket.user.email}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketPage;

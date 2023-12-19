import React from "react";
import TicketPage from "@/components/TicketPage";

function page({ eventId, reservationId}) {
  return <TicketPage eventId={eventId} reservationId={reservationId} />;
}

export default page;

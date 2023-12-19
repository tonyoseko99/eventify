"use client";
import React, { useState } from "react";
import { addPayment } from "@/api/payment";
import { set } from "date-fns";

function AddPaymentForm({ setShowModal, showModal, setIsPaid, reservation }) {
  const userId = reservation.user_id.id;
  const reservationId = reservation.id;
  const eventId = reservation.event_id.id;
  const ticketPrice = reservation.event_id.ticketPrice;
  //   paymentDate as a timestamp (datetime(6)))
  const paymentDate = new Date().toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();

    // create payment object
    const payment = {
      user: { id: userId },
      reservation: { id: reservationId },
      event: { id: eventId },
      amount: ticketPrice,
      paymentDate: paymentDate,
    };

    // add payment
    try {
      const data = addPayment(payment);
      console.log("Payment added:", data);
      alert("Payment made successfully");
      setShowModal(false);
      setIsPaid(true);
    } catch (error) {
      console.error("Error adding payment:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }

    // close modal
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="user_id" className="block font-bold mb-2">
              User ID
            </label>
            <input
              type="text"
              readOnly
              id="user"
              name="user"
              value={userId}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reservation_id" className="block font-bold mb-2">
              Reservation ID
            </label>
            <input
              type="text"
              readOnly
              id="reservation"
              name="reservation"
              value={reservationId}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="event_id" className="block font-bold mb-2">
              Event ID
            </label>
            <input
              type="text"
              readOnly
              id="event"
              name="event"
              value={eventId}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block font-bold mb-2">
              Amount
            </label>
            <input
              type="number"
              readOnly
              id="amount"
              name="amount"
              value={ticketPrice}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentDate" className="block font-bold mb-2">
              Payment Date
            </label>
            <input
              type="text"
              readOnly
              id="paymentDate"
              name="paymentDate"
              value={paymentDate}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPaymentForm;

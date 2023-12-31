"use client";
import { useState, useEffect } from "react";
import { getReservationsByUser, deleteReservation } from "@/api/reservations";
import { getAllPayments } from "@/api/payment";
import Loader from "@/components/Loader";
import Link from "next/link";
import AddPaymentForm from "@/components/AddPaymentForm";
import { Alert } from "reactstrap";
import { is } from "date-fns/locale";
import MpesaPaymentForm from "@/components/MpesaPaymentForm";

function Booked() {
  const [payments, setPayments] = useState({});
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isPaid, setIsPaid] = useState({});

  const user_id = localStorage.getItem("token");

  // convert date from timestamp to string
  const date = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US");
  };

  const fetchPayments = async () => {
    const payments = await getAllPayments();
    console.log(`payments: `, payments);
    // check if payment is made
    const paidReservations = payments.reduce((acc, payment) => {
      acc[payment.reservation.id] = true;
      return acc;
    }, {});
    setIsPaid(paidReservations);
  };

  const handleUnrsvp = async (id) => {
    try {
      await deleteReservation(id);
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handlePayment = (id) => {
    const reservationToPay = reservations.find(
      (reservation) => reservation.id === id
    );
    setSelectedReservation(reservationToPay);
    setShowModal(true);
    setIsPaid({ ...isPaid, [id]: false });
  };

  const fetchReservations = async () => {
    try {
      const reservations = await getReservationsByUser(user_id);
      console.log("Booked Reservations :", reservations);
      setReservations(reservations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();

    fetchPayments();
  }, [selectedReservation]);

  {
    isPaid && <Alert color="success">Payment made successfully</Alert>;
  }

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
                <td className="px-6 py-4 justify-center text-center text-black">
                  {reservation.event_id.name}
                </td>
                <td className="px-6 py-4 justify-center text-center text-black">
                  {date(reservation.event_id.date)}
                </td>
                <td className="px-6 py-4 justify-center text-center text-black">
                  {reservation.event_id.time}
                </td>
                <td className="px-6 py-4 justify-center text-center text-black">
                  {reservation.event_id.venue}
                </td>
                <td className="px-6 py-4 justify-center text-center text-black">
                  {reservation.event_id.category}
                </td>
                <td className="px-6 py-4 items-center justify-start flex">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                    onClick={() => handleUnrsvp(reservation.id)}
                  >
                    UnRSVP
                  </button>
                  {isPaid[reservation.id] ? (
                    <>
                      <button
                        disabled
                        className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
                        // onClick={() => handlePayment(reservation.id)}
                      >
                        PAID
                      </button>
                      {/* TICKET button */}
                      <Link
                        href={`/ticket/${reservation.event_id.id}/${reservation.id}`}
                      >
                        <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green">
                          TICKET
                        </button>
                      </Link>
                    </>
                  ) : (
                    <button
                      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
                      onClick={() => handlePayment(reservation.id)}
                    >
                      PAY
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          // <AddPaymentForm
          //   setShowModal={setShowModal}
          //   showModal={showModal}
          //   reservation={selectedReservation}
          //   setIsPaid={setIsPaid}
          // />
          <MpesaPaymentForm
            setShowModal={setShowModal}
            showModal={showModal}
            reservation={selectedReservation}
            setIsPaid={setIsPaid}
          />
        )}
      </div>
    </div>
  );
}

export default Booked;

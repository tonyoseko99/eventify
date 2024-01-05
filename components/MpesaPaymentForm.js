"use client";
import { useState, useEffect } from "react";

function MpesaPaymentForm({ setShowModal, showModal, reservation, setIsPaid }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountReference, setAccountReference] = useState("");
  const [transactionDesc, setTransactionDesc] = useState(
    reservation.event_id.name
  );
  const [ticketPrice, setTicketPrice] = useState(
    reservation.event_id.ticketPrice
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenResponse = await fetch(
          "http://localhost:8080/bookings/rest/mpesa/token"
        );
        const fetchedToken = await tokenResponse.text();
        setToken(fetchedToken);
        console.log("fetchedtoken:", fetchedToken);
      } catch (error) {
        console.error("Error fetching M-Pesa token:", error);
      }
    };

    fetchToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payment = {
      phoneNumber,
      amount: ticketPrice,
      accountReference,
      transactionDesc,
    };

    try {
      const paymentResponse = await fetch(
        "http://localhost:8080/bookings/rest/mpesa/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.access_token,
          },
          body: JSON.stringify(payment),
        }
      );

      const data = await paymentResponse.json();
      console.log("Payment response:", data);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }

    setShowModal(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-green-500">
          M-Pesa Payment
        </h1>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 text-sm font-bold my-4"
          >
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
            required
          />
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold my-4"
          >
            Amount:
          </label>
          <input
            type="number"
            value={ticketPrice}
            readOnly
            name="amount"
            placeholder="Amount"
            required
          />
          <label
            htmlFor="accountReference"
            className="block text-gray-700 text-sm font-bold my-4"
          >
            Account Reference:
          </label>
          <input
            type="text"
            value={accountReference}
            onChange={(e) => setAccountReference(e.target.value)}
            placeholder="Account reference"
            name="accountReference"
            required
          />
          <label
            htmlFor="transactionDesc"
            className="block text-gray-700 text-sm font-bold my-4"
          >
            Event Information:
          </label>
          <input
            type="text"
            name="transactionDesc"
            value={transactionDesc}
            onChange={(e) => setTransactionDesc(e.target.value)}
            placeholder="Transaction description"
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}

export default MpesaPaymentForm;

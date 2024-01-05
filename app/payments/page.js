"use client";
import { useState, useEffect } from "react";
import { getAllPayments } from "@/api/payment";
import Loader from "@/components/Loader";

function Page() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // convert date from timestamp to string
  const date = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US");
  };

  const fetchPayments = async () => {
    const payments = await getAllPayments();
    console.log(`payments: `, payments);
    setPayments(payments);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center flex-wrap justify-center w-full mt-6 sm:w-full">
      <h1 className="text-2xl font-bold mb-4 text-start">Event Payments</h1>
      <table className="w-1/2 bg-white shadow-lg rounded-lg striped ">
        <thead className="bg-gray-200 ">
          <tr>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Payment ID
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Amount
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Payment Date
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Event Name
            </th>
            <th className="px-6 py-3 text-center font-bold text-gray-600">
              Attendant Name
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="px-6 py-4 text-center text-gray-700 truncate">
                {payment.id}
              </td>
              <td className="px-6 py-4 text-center text-gray-700 truncate">
                ${payment.amount}.00
              </td>
              <td className="px-6 py-4 text-center text-gray-700 truncate">
                {date(payment.paymentDate)}
              </td>
              <td className="px-6 py-4 text-center text-gray-700 truncate">
                {payment.event.name}
              </td>
              <td className="px-6 py-4 text-center text-gray-700 truncate">
                {payment.reservation.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;

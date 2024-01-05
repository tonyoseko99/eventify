const BASE_URL =
  "https://fe2f-102-135-169-115.ngrok-free.app/bookings/rest/mpesa";

// make payment
export const makePayment = async (payment) => {
  const response = await fetch(`${BASE_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });
  return response.json();
};

const BASE_URL = "http://localhost:8080/bookings/rest/payments";

// get all payments
export const getAllPayments = async () => {
  const response = await fetch(`${BASE_URL}/list`);
  return response.json();
};

// get payment by id
export const getPaymentById = async (id) => {
  const response = await fetch(`${BASE_URL}/list/${id}`);
  return response.json();
};

// add payment
export const addPayment = async (payment) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });
  return response.json();
};
// api/reservations.js
const BASE_URL = "http://localhost:8080/bookings/rest/reservations";

export const getAllReservations = async () => {
  const response = await fetch(`${BASE_URL}/list`);
  return response.json();
};

export const getReservationById = async (id) => {
  const response = await fetch(`${BASE_URL}/list/${id}`);
  return response.json();
};

export const addReservation = async (reservation) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });
  return response.json();
};

export const deleteReservation = async (id) => {
  const response = await fetch(`${BASE_URL}/list/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// show all reservations made by a user
export const getReservationsByUser = async (id) => {
  const response = await fetch(`${BASE_URL}/list/user`);
  return response.json();
};

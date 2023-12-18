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

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
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
  const response = await fetch(`${BASE_URL}/list/users/${id}`);
  return response.json();
};

// show all reservations by user_id and event_id (if reservation has been made)
export const getReservationByUserAndEvent = async (user_id, event_id) => {
  const response = await fetch(`${BASE_URL}/list/users/${user_id}/events/${event_id}`);
  return response.json();
};


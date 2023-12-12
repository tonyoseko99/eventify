// api/events.js
const BASE_URL = "http://localhost:8080/bookings/rest/events";

export const getAllEvents = async () => {
  const response = await fetch(`${BASE_URL}/list`);
  return response.json();
};

export const getEventById = async (id) => {
  const response = await fetch(`${BASE_URL}/list/${id}`);
  return response.json();
};


export const addEvent = async (event) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return response.json();
}
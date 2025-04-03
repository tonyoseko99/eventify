// api/events.js
const BASE_URL = "http://localhost:8080/api/v1/events";
const token = localStorage.getItem("token");


export const getAllEvents = async () => {
  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getEventById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};


export const addEvent = async (event) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return response.json();
}

export const deleteEvent = async (id) => {
  const response = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
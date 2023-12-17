const BASE_URL = "http://localhost:8080/bookings/rest/auth";

export const signup = async (username, password, confirmPassword, role) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, confirmPassword, role }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Something went wrong");
  }
};

export const signin = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Something went wrong");
  }
};

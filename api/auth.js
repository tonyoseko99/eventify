const BASE_URL = "http://localhost:8080/api/v1/auth";

export const signup = async (firstName, lastName, email, password, role) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password, role }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Something went wrong");
  }
};

export const signin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Something went wrong");
  }
};

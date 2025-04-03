"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// _app.js or _app.jsx
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    router.push("/"); // Redirect to home after login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <Component {...pageProps} isLoggedIn={isLoggedIn} token={token} onLogin={handleLogin} onLogout={handleLogout} />
  );
}

export default MyApp;

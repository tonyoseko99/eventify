"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { is } from "date-fns/locale";

function Navbar() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem("role");
      if (role) {
        setIsLoggedIn(true);
        setUsername(localStorage.getItem("username"));
        if (role === "ADMIN") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setIsUser(true);
        }
      } else {
        setIsLoggedIn(false);
        setUsername("");
        setIsAdmin(false);
        setIsUser(false);
      }
    };

    // Call the function once to set the initial state
    handleStorageChange();

    // Add the event listener
    window.addEventListener("storage", handleStorageChange);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
  };

  return (
    <nav className="bg-slate-200 p-6 text-black items-center justify-around">
      <div className="container mx-auto w-full">
        <ul className="flex text-xl">
          <li className="mr-6 font-bold">
            <Link
              className={`link ${pathname === "/" ? "active" : ""}`}
              href="/"
            >
              Eventify
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="mr-6">
                <Link
                  className={`link ${pathname === "/events" ? "active" : ""}`}
                  href="/events"
                >
                  Events
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  className={`link ${pathname === "/booked" ? "active" : ""}`}
                  href="/booked"
                >
                  Booked
                </Link>
              </li>
            </>
          )}
          <div className="ml-auto flex items-center">
            {!isLoggedIn && (
              <li className="mr-6">
                <Link
                  className={`link ${pathname === "/login" ? "active" : ""}`}
                  href="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li className="mr-6">Welcome, {username}</li>
                {isAdmin && (
                  <li className="mr-6">
                    <Link href="/admin">Admin Panel</Link>
                  </li>
                )}
                <li className="mr-6">
                  <Link href="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

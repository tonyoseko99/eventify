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
    <nav className="bg-gray-700 p-6 items-center justify-around">
      <div className="container mx-auto w-full">
        <ul className="flex text-xl">
          <li className="mr-6 font-bold text-2xl">
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
              {isUser && (
                <li className="mr-6">
                  <Link
                    className={`link ${pathname === "/booked" ? "active" : ""}`}
                    href="/booked"
                  >
                    Booked
                  </Link>
                </li>
              )}
              {isAdmin && (
                <>
                  <li className="mr-6">
                    <Link
                      className={`link ${
                        pathname === "/reservations" ? "active" : ""
                      }`}
                      href="/reservations"
                    >
                      Reservations
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      className={`link ${
                        pathname === "/payments" ? "active" : ""
                      }`}
                      href="/payments"
                    >
                      Payments
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
          <div className="ml-auto flex items-center">
            {!isLoggedIn && (
              <li className="mr-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                  <Link href="/login">Login</Link>
                </button>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li className="mr-6">
                  Welcome, <span className="font-semibold">{username}</span>
                </li>
                {isAdmin && (
                  <li className="mr-6">
                    <Link href="/admin">Admin Panel</Link>
                  </li>
                )}
                <li className="mr-6">
                  <Link href="/login" onClick={handleLogout}>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red">
                      Logout
                    </button>
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

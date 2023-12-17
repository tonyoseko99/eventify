"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem("role");
      if (role) {
        setIsLoggedIn(true);
        setUserRole(localStorage.getItem("role"));
      } else {
        setIsLoggedIn(false);
        setUserRole("");
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

  const token = localStorage.getItem("token");
  console.log(userRole);
  console.log(token);

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen overflow-hidden">
      <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full pt-40 sm:pt-20">
        <h1 className="text-6xl font-bold text-white sm:text-7xl text-shadow">
          Eventify
        </h1>
        <p className="mt-3 text-2xl text-white sm:text-3xl">
          Your one stop for all events and reservations
        </p>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-8 sm:w-full">
          {isLoggedIn && userRole === "ADMIN" ? (
            <a
              href="/reservations"
              onClick={handleLinkClick}
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:bg-gray-200 hover:text-blue-600 transition-colors focus:bg-gray-100 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold sm:text-3xl">
                Reservations &rarr;
              </h3>
              <p className="mt-4 text-xl">View all reservations</p>
            </a>
          ) : (
            <a
              href="/events"
              onClick={handleLinkClick}
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:bg-gray-200 hover:text-blue-600 transition-colors focus:bg-gray-100 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold sm:text-3xl">
                Events &rarr;
              </h3>
              <p className="mt-4 text-xl">Discover, explore, experience</p>
            </a>
          )}
        </div>
      </div>
      <div className="absolute inset-0">
        <Image
          loader={({ src, width, quality }) => {
            return `${src}?w=${width}&q=${quality || 75}`;
          }}
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A bustling crowd enjoying an event"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>
    </main>
  );
}

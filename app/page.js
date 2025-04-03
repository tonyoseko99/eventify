"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SignUpForm from "@/components/SignUpForm";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
      router.push("/admin");
    } else if (role === "USER") {
      router.push("/events");
    }
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const onSignup = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role); // Set user role after signup
    setIsLoggedIn(true);
    router.push("/login"); // Redirect to events page
  };

  return (
    <main className="relative flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen overflow-hidden">
      <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full pt-40 sm:pt-20">
        <h1 className="text-6xl font-bold text-white sm:text-7xl text-shadow">Eventify</h1>
        <p className="mt-3 text-2xl text-white sm:text-3xl">
          Your one-stop for all events and reservations
        </p>

        {isLoggedIn ? (
          <a
            href="/events"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:bg-gray-200 hover:text-white transition-colors focus:bg-gray-100 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold sm:text-3xl">Events &rarr;</h3>
            <p className="mt-4 text-xl">Discover, explore, experience</p>
          </a>
        ) : (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Sign Up to Get Started</h2>
            <SignUpForm onSignup={onSignup} />
          </div>
        )}
      </div>

      <div className="absolute inset-0">
        <Image
          loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"
          alt="A bustling crowd enjoying an event"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>
    </main>
  );
}

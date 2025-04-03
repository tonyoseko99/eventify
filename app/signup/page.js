"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignUpForm from "@/components/SignUpForm";

export default function page() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = (token) => {
    localStorage.setItem("token", token); // Store token after signup
    setIsLoggedIn(true);
    router.push("/login"); // Redirect to login page
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-12 mx-auto">
      <h1>Sign Up</h1>
      {!isLoggedIn ? <SignUpForm onLogin={onLogin} /> : <p>Signup successful! Redirecting...</p>}
    </main>
  );
}


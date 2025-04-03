"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignInForm from "@/components/SignInForm";

function page() {
  // return <SignInForm onLogin={onLogin} />;
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = (token) => {
    localStorage.setItem("token", token); // Store token after signup
    setIsLoggedIn(true);
    router.push("/events"); // Redirect to login page
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-12 mx-auto">
      {!isLoggedIn ? (
        <SignInForm onLogin={onLogin} />
      ) : (
        router.push("/events") // Redirect to events page
      )}
    </main>
  );
}

export default page;

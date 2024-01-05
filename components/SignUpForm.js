"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signup } from "@/api/auth";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER"); 
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signup(username, password, confirmPassword, role);
      
      if (data) {
        router.push("/login");
      } else {
        throw new Error("Password does not match");
      }


    } catch (error) {
      console.log(error);
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setRole("USER");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-200 shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-1/4">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="email"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Role:
            </label>
            <div>
              <input
                type="radio"
                id="admin"
                name="role"
                value="ADMIN"
                checked={role === "ADMIN"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="admin" className="mr-4">
                Admin
              </label>
              <input
                type="radio"
                id="user"
                name="role"
                value="USER"
                checked={role === "USER"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="user">User</label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <Link
              href="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account? Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;

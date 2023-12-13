"use client";
import { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Add your sorting logic here
  };

  return (
    <nav className="bg-black p-6 text-white border-b-2 border-orange-200 items-center justify-around">
      <div className="container mx-auto w-1/2">
        <ul className="flex">
          <li className="mr-6 font-bold">
            <Link href="/">Eventify</Link>
          </li>
          <li className="mr-6">
            <Link href="/events">Events</Link>
          </li>
          <li className="mr-6">
            <Link href="/reservations">Reservations</Link>
          </li>
          <div className="flex items-center">
            <li className="mr-6">
              <input
                type="text"
                placeholder="Search"
                className="px-2 py-1 border rounded bg-black text-white"
              />
            </li>
            <li className="mr-6">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="px-2 py-1 border rounded bg-black text-white"
              >
                <option value="">Categories</option>
                <option value="TECHNOLOGY">TECHNOLOGY</option>
                <option value="SPORTS">SPORTS</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                <option value="OTHER">OTHER</option>
              </select>
            </li>
          </div>
          <div className="ml-auto flex items-center">
            <li className="mr-6">
              <Link href="/login">Logout</Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

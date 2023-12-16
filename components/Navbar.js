"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <nav className="bg-stone-400 p-6 text-white items-center justify-around">
      <div className="container mx-auto w-1/2">
        <ul className="flex text-xl">
          <li className="mr-6 font-bold">
            <Link
              className={`link ${pathname === "/" ? "active" : ""}`}
              href="/"
            >
              Eventify
            </Link>
          </li>
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

          {/* reservations */}
          <li className="mr-6">
            <Link
              className={`link ${pathname === "/reservations" ? "active" : ""}`}
              href="/reservations"
            >
              Reservations
            </Link>
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

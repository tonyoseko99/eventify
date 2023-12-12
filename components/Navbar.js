'use client';
import { useState } from 'react';

function Navbar() {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Add your sorting logic here
  };

  return (
    <nav className="bg-black p-6 text-white border-b-2">
      <div className="container mx-auto">
        <ul className="flex">
          <li className="mr-6 font-bold">
            <a href="/">Eventify</a>
          </li>
          <li className="mr-6">
            <a href="/events">Events</a>
          </li>
          <li className="mr-6">
            <a href="/reservations">Reservations</a>
          </li>
          <div className="flex items-center">
            <li className="mr-6">
              <input type="text" placeholder="Search" className="px-2 py-1 border rounded" />
            </li>
            <li className="mr-6">
              <select value={sortOption} onChange={handleSortChange} className="px-2 py-1 border rounded">
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
            </li>
          </div>
          <div className="ml-auto flex items-center">
            <li className="mr-6">
              <a href="/login">Logout</a>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

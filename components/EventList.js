"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllEvents } from "@/api/events";

function EventList({events}) {
  
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <div className="w-1/2">
              <Image
                loader={({ src, width, quality }) => {
                  return `${src}?w=${width}&q=${quality || 75}`;
                }}
                src={event.image}
                alt="Picture of the event"
                width={200}
                height={100}
              />
            </div>
            <div className="w-1/2 pl-4">
              <Link href={`/events/${event.id}`}>
                <h3 className="text-2xl font-bold">{event.name} &rarr;</h3>
                <p className="text-gray-600 mb-2">{event.category}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllEvents } from "@/api/events";
import Loader from "./Loader";

function EventList({ events, filteredEvents }) {
  const eventsToRender = filteredEvents.length > 0 ? filteredEvents : events;

  if (eventsToRender.length === 0) return <p>No events to show</p>;

  return (
    <div className="flex flex-wrap justify-center max-w-4xl mt-6 sm:w-full">
      {eventsToRender.map((event) => (
        <Link href={`/events/${event.id}`} key={event.id}>
          <div
            className="flex flex-col p-6 mt-6 text-left border rounded-xl hover:text-blue-300 focus:text-blue-600 mx-4"
            style={{ width: "300px" }}
          >
            <div className="w-full">
              <Image
                loader={({ src, width, quality }) => {
                  return `${src}?w=${width}&q=${quality || 75}`;
                }}
                src={event.image}
                alt="Picture of the event"
                width={300}
                height={100}
              />
            </div>
            <div className="w-full pl-4 flex flex-col justify-center">
              <h3 className="text-2xl font-bold">{event.name} </h3>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-gray-600 mb-2">{event.date}</p>
              <p className="text-gray-600 mb-2">{event.category}</p>
              <span className="text-yellow-600 text-lg mb-2">
                View Event &rarr;
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventList;

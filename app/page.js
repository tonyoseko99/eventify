"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen">
      <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-6xl font-bold">Eventify</h1>
        <p className="mt-3 text-2xl">
          Your one stop for all events and reservations
        </p>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="/events"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Events &rarr;</h3>
            <p className="mt-4 text-xl">View all events</p>
          </a>
          <a
            href="/reservations"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Reservations &rarr;</h3>
            <p className="mt-4 text-xl">View all reservations</p>
          </a>
        </div>
      </div>
      <div className="absolute inset-0">
        <Image
          loader={({ src, width, quality }) => {
            return `${src}?w=${width}&q=${quality || 75}`;
          }}
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Picture of the event"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>
    </main>
  );
}

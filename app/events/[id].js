import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getEventById } from "@/api/events";

function EventPage() {
  const [event, setEvent] = useState({});
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  const fetchEvent = async () => {
    try {
      const event = await getEventById(id);
      setEvent(event);
      console.log("event", event);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (id) {
        try {
          const eventData = await getEventById(id);
          if (isMounted) {
            setEvent(eventData);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to cancel ongoing tasks
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
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
            <h3 className="text-2xl font-bold">{event.name}</h3>
            <p className="mt-4">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;

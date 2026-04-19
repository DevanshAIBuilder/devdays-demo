import Link from 'next/link';
import RsvpForm from './RsvpForm';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  venue: string;
  organizer: string;
}

async function getEvent(id: string): Promise<Event | null> {
  try {
    const res = await fetch(`http://localhost:3001/events/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function RsvpPage({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  const event = await getEvent(meetupId);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href={event ? `/events/${event.id}` : '/events'} className="text-indigo-600 hover:underline text-sm mb-6 inline-block">
          ← Back to event
        </Link>
        {event ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <p className="text-gray-500 mt-1">
              {event.date}
              {event.time ? ` · ${event.time}` : ''}
              {event.venue ? ` · ${event.venue}` : ''}
            </p>
            <p className="text-gray-700 mt-3">{event.description}</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Register for this event</h2>
            <RsvpForm eventId={event.id} />
          </>
        ) : (
          <p className="text-gray-500">Event not found. Make sure the API is running.</p>
        )}
      </div>
    </main>
  );
}

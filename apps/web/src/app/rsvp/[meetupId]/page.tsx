import Link from 'next/link';
import RsvpForm from './RsvpForm';

interface Meetup {
  id: number;
  title: string;
  date: string;
  description: string;
}

async function getMeetup(id: string): Promise<Meetup | null> {
  try {
    const res = await fetch(`http://localhost:3001/meetups`, { cache: 'no-store' });
    if (!res.ok) return null;
    const meetups: Meetup[] = await res.json();
    return meetups.find((m) => m.id === Number(id)) ?? null;
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
  const meetup = await getMeetup(meetupId);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
          ← Back to meetups
        </Link>
        {meetup ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900">{meetup.title}</h1>
            <p className="text-gray-500 mt-1">{meetup.date}</p>
            <p className="text-gray-700 mt-3">{meetup.description}</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Register for this meetup</h2>
            <RsvpForm meetupId={meetup.id} />
          </>
        ) : (
          <p className="text-gray-500">Meetup not found. Make sure the API is running.</p>
        )}
      </div>
    </main>
  );
}

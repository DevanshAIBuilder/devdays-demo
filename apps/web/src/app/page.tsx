import Link from 'next/link';

interface Meetup {
  id: number;
  title: string;
  date: string;
  description: string;
}

async function getMeetups(): Promise<Meetup[]> {
  try {
    const res = await fetch('http://localhost:3001/meetups', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const meetups = await getMeetups();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Meetups</h1>
        <p className="text-gray-500 mb-8">Find and RSVP to upcoming developer meetups.</p>
        {meetups.length === 0 ? (
          <p className="text-gray-400">No meetups found. Make sure the API is running.</p>
        ) : (
          <div className="grid gap-6">
            {meetups.map((meetup) => (
              <div
                key={meetup.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">{meetup.title}</h2>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{meetup.date}</span>
                </div>
                <p className="text-gray-600">{meetup.description}</p>
                <Link
                  href={`/rsvp/${meetup.id}`}
                  className="mt-2 self-start inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  RSVP →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

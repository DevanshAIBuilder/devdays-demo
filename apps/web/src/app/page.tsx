import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  _count?: { events: number };
}

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  status: string;
  isFeatured: boolean;
  tags: string;
  maxAttendees: number | null;
  category: Category | null;
}

interface EventsResponse {
  data: Event[];
  total: number;
}

async function getFeaturedEvents(): Promise<Event[]> {
  try {
    const res = await fetch(
      "http://localhost:3001/events?featured=true&limit=4",
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json: EventsResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const res = await fetch(
      "http://localhost:3001/events?status=upcoming&limit=6",
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json: EventsResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch("http://localhost:3001/categories", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function EventCard({ event }: { event: Event }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="p-6 flex flex-col flex-1 gap-3">
        {event.category && (
          <span
            className="self-start text-xs font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: event.category.color }}
          >
            {event.category.name}
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1">
          {event.description}
        </p>
        <div className="flex flex-col gap-1.5 text-sm text-gray-500">
          <p className="flex items-center gap-1.5">
            <span aria-hidden="true">📅</span>
            <span>
              {formatDate(event.date)}
              {event.time ? ` · ${event.time}` : ""}
            </span>
          </p>
          {event.venue && (
            <p className="flex items-center gap-1.5">
              <span aria-hidden="true">📍</span>
              <span className="truncate">{event.venue}</span>
            </p>
          )}
          {event.organizer && (
            <p className="flex items-center gap-1.5">
              <span aria-hidden="true">👤</span>
              <span className="truncate">{event.organizer}</span>
            </p>
          )}
        </div>
        <Link
          href={`/events/${event.id}`}
          className="mt-2 self-start inline-flex items-center gap-1 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}

export default async function Home() {
  const [featuredEvents, upcomingEvents, categories] = await Promise.all([
    getFeaturedEvents(),
    getUpcomingEvents(),
    getCategories(),
  ]);

  const apiOffline =
    featuredEvents.length === 0 && upcomingEvents.length === 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-indigo-200 text-sm font-medium uppercase tracking-widest mb-3">
            🏙️ City of Nawabs &amp; Technologists
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight">
            Tech Events in{" "}
            <span className="text-amber-300">Lucknow</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Discover upcoming meetups, conferences, workshops, and hackathons
            in Lucknow&apos;s growing tech ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/events"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors"
            >
              Browse All Events
            </Link>
          </div>
        </div>
      </section>

      {apiOffline && (
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm">
            ⚠️ Could not connect to the API (localhost:3001). Make sure the
            backend is running with <code className="font-mono">pnpm dev</code>.
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/events"
              className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              All Events
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/events?category=${cat.slug}`}
                className="px-4 py-2 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                style={{
                  borderColor: cat.color,
                  color: cat.color,
                  backgroundColor: `${cat.color}15`,
                }}
              >
                {cat.name}
                {cat._count ? ` (${cat._count.events})` : ""}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              ⭐ Featured Events
            </h2>
            <Link
              href="/events"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              🗓️ Upcoming Events
            </h2>
            <Link
              href="/events"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

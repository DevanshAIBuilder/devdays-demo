import Link from "next/link";
import { notFound } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  endDate: string | null;
  endTime: string | null;
  venue: string;
  address: string;
  city: string;
  organizer: string;
  organizerUrl: string | null;
  registrationUrl: string | null;
  maxAttendees: number | null;
  status: string;
  isFeatured: boolean;
  tags: string;
  category: Category | null;
  comments: Comment[];
  _count: { rsvps: number };
}

async function getEvent(id: string): Promise<Event | null> {
  try {
    const res = await fetch(`http://localhost:3001/events/${id}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const tags = event.tags ? event.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        href="/events"
        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
      >
        ← Back to all events
      </Link>

      <article>
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {event.category && (
              <span
                className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: event.category.color }}
              >
                {event.category.name}
              </span>
            )}
            {event.isFeatured && (
              <span className="text-sm text-amber-600 font-medium bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                ⭐ Featured
              </span>
            )}
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${
                event.status === "upcoming"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : event.status === "ongoing"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
            >
              {event.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {event.title}
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Description */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                About this event
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </section>

            {/* Tags */}
            {tags.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Topics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/events?search=${encodeURIComponent(tag)}`}
                      className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Comments */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Discussion ({event.comments.length})
              </h2>
              {event.comments.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No comments yet. Be the first to start the discussion!
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {event.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm text-gray-900">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Event details card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4">
              <dl className="flex flex-col gap-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Date &amp; Time
                  </dt>
                  <dd className="text-gray-900 font-medium">
                    {formatDate(event.date)}
                    {event.time && (
                      <span className="block text-gray-600">
                        {event.time}
                        {event.endTime ? ` – ${event.endTime}` : ""}
                      </span>
                    )}
                    {event.endDate && event.endDate !== event.date && (
                      <span className="block text-gray-600 text-xs mt-0.5">
                        Until {formatDate(event.endDate)}
                      </span>
                    )}
                  </dd>
                </div>

                {event.venue && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Venue
                    </dt>
                    <dd className="text-gray-900">
                      {event.venue}
                      {event.address && (
                        <span className="block text-gray-600 text-xs mt-0.5">
                          {event.address}
                        </span>
                      )}
                    </dd>
                  </div>
                )}

                {event.organizer && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Organiser
                    </dt>
                    <dd className="text-gray-900">
                      {event.organizerUrl ? (
                        <a
                          href={event.organizerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                        >
                          {event.organizer}
                        </a>
                      ) : (
                        event.organizer
                      )}
                    </dd>
                  </div>
                )}

                {event.maxAttendees && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Capacity
                    </dt>
                    <dd className="text-gray-900">
                      {event._count.rsvps} / {event.maxAttendees} registered
                    </dd>
                  </div>
                )}
              </dl>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Link
                  href={`/rsvp/${event.id}`}
                  className="w-full text-center bg-indigo-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  RSVP for this event
                </Link>
                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center border border-indigo-200 text-indigo-700 font-medium px-5 py-2.5 rounded-xl hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors text-sm"
                  >
                    Official Registration ↗
                  </a>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            {event.address && (
              <div className="bg-gray-100 rounded-2xl h-40 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                <div className="text-center">
                  <p className="text-2xl mb-1">🗺️</p>
                  <p>Lucknow, UP</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>
    </div>
  );
}

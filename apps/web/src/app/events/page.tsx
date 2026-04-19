import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  endDate: string | null;
  venue: string;
  address: string;
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
  page: number;
  limit: number;
  totalPages: number;
}

interface PageProps {
  searchParams: Promise<{
    category?: string;
    status?: string;
    search?: string;
    page?: string;
  }>;
}

async function getEvents(params: {
  category?: string;
  status?: string;
  search?: string;
  page?: string;
}): Promise<EventsResponse> {
  const empty: EventsResponse = {
    data: [],
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  };
  try {
    const qs = new URLSearchParams();
    if (params.category) qs.set("category", params.category);
    if (params.status) qs.set("status", params.status);
    if (params.search) qs.set("search", params.search);
    qs.set("page", params.page ?? "1");
    qs.set("limit", "12");

    const res = await fetch(`http://localhost:3001/events?${qs.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return empty;
    return res.json();
  } catch {
    return empty;
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
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          {event.category ? (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full text-white shrink-0"
              style={{ backgroundColor: event.category.color }}
            >
              {event.category.name}
            </span>
          ) : (
            <span />
          )}
          {event.isFeatured && (
            <span className="text-xs text-amber-600 font-medium bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
              ⭐ Featured
            </span>
          )}
        </div>
        <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
          {event.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1">
          {event.description}
        </p>
        <div className="flex flex-col gap-1 text-sm text-gray-500">
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
          Details →
        </Link>
      </div>
    </article>
  );
}

export default async function EventsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [eventsRes, categories] = await Promise.all([
    getEvents(params),
    getCategories(),
  ]);

  const { data: events, total, page, totalPages } = eventsRes;
  const currentPage = page;

  function buildPageUrl(p: number) {
    const qs = new URLSearchParams();
    if (params.category) qs.set("category", params.category);
    if (params.status) qs.set("status", params.status);
    if (params.search) qs.set("search", params.search);
    qs.set("page", String(p));
    return `/events?${qs.toString()}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          🗓️ All Tech Events in Lucknow
        </h1>
        <p className="text-gray-500 mt-1">
          {total > 0
            ? `${total} event${total === 1 ? "" : "s"} found`
            : "No events found"}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Search form */}
        <form method="GET" action="/events" className="flex gap-2">
          {params.category && (
            <input type="hidden" name="category" value={params.category} />
          )}
          {params.status && (
            <input type="hidden" name="status" value={params.status} />
          )}
          <label htmlFor="search" className="sr-only">
            Search events
          </label>
          <input
            id="search"
            type="search"
            name="search"
            defaultValue={params.search ?? ""}
            placeholder="Search events…"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-52"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Search
          </button>
          {params.search && (
            <Link
              href={`/events${params.category ? `?category=${params.category}` : ""}`}
              className="text-sm text-gray-500 hover:text-gray-700 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              ✕ Clear
            </Link>
          )}
        </form>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href={params.search ? `/events?search=${params.search}` : "/events"}
          className={`px-4 py-2 rounded-full text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
            !params.category
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-700"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => {
          const active = params.category === cat.slug;
          return (
            <Link
              key={cat.id}
              href={`/events?category=${cat.slug}${params.search ? `&search=${params.search}` : ""}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
              style={
                active
                  ? { backgroundColor: cat.color, borderColor: cat.color, color: "#fff" }
                  : {
                      borderColor: cat.color,
                      color: cat.color,
                      backgroundColor: `${cat.color}15`,
                    }
              }
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Events grid */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500">
            No events found.{" "}
            <Link href="/events" className="text-indigo-600 hover:underline">
              Clear filters
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Event pagination"
          className="mt-10 flex items-center justify-center gap-2"
        >
          {currentPage > 1 && (
            <Link
              href={buildPageUrl(currentPage - 1)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              ← Prev
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildPageUrl(p)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                p === currentPage
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-indigo-400 hover:text-indigo-700"
              }`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={buildPageUrl(currentPage + 1)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Next →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

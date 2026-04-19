import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lucknow.events – Tech Events in Lucknow",
  description:
    "Discover upcoming tech events, meetups, conferences, and workshops in Lucknow, Uttar Pradesh. Stay connected with Lucknow's growing tech community.",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "All Events" },
  { href: "/events?status=upcoming", label: "Upcoming" },
  { href: "/events?category=ai-ml", label: "AI / ML" },
  { href: "/events?category=startups", label: "Startups" },
  { href: "/events?category=web-dev", label: "Web Dev" },
];

const FOOTER_LINKS = {
  "Browse Events": [
    { href: "/events", label: "All Events" },
    { href: "/events?status=upcoming", label: "Upcoming Events" },
    { href: "/events?featured=true", label: "Featured Events" },
  ],
  "Categories": [
    { href: "/events?category=ai-ml", label: "AI / ML" },
    { href: "/events?category=web-dev", label: "Web Dev" },
    { href: "/events?category=startups", label: "Startups" },
    { href: "/events?category=devops", label: "DevOps" },
    { href: "/events?category=web3", label: "Web3 / Blockchain" },
    { href: "/events?category=open-source", label: "Open Source" },
    { href: "/events?category=python", label: "Python" },
    { href: "/events?category=cybersecurity", label: "Cybersecurity" },
  ],
  "Register": [
    { href: "/rsvp/1", label: "RSVP for an Event" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        {/* ── Top Navigation ── */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Primary row */}
            <div className="h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md shrink-0"
              >
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
                  lucknow.events
                </span>
              </Link>
              {/* Desktop links */}
              <div className="hidden sm:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Mobile scroll row */}
            <div className="sm:hidden flex items-center gap-1 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-xs font-medium text-gray-600 hover:text-indigo-600 bg-gray-100 hover:bg-indigo-50 px-3 py-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shrink-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        {/* ── Rich Footer ── */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
              {/* Brand column */}
              <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                <Link
                  href="/"
                  className="inline-block text-lg font-bold bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                >
                  lucknow.events
                </Link>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  The hub for Lucknow&apos;s tech community — discover meetups,
                  conferences, workshops, and hackathons.
                </p>
              </div>
              {/* Link columns */}
              {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                <div key={heading}>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {heading}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
              © 2026 lucknow.events &mdash; The hub for Lucknow&apos;s tech community
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

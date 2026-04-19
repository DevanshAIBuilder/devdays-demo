import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lucknow.events – Tech Events in Lucknow",
  description:
    "Discover upcoming tech events, meetups, conferences, and workshops in Lucknow, Uttar Pradesh. Stay connected with Lucknow's growing tech community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
                lucknow.events
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/events"
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded transition-colors"
              >
                All Events
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p>
              © 2026 lucknow.events &mdash; The hub for Lucknow&apos;s tech community
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

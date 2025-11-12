import Link from "next/link";
import "./globals.css"; // optional global styles

export const metadata = {
  title: "Lore Tracker",
  description: "Track worlds, characters, and factions!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #333" }}>
          <Link href="/">Home</Link> | <Link href="/worlds">Worlds</Link>
        </nav>
        <main style={{ padding: "1rem" }}>
          {children} {/* this renders the page.js content */}
        </main>
      </body>
    </html>
  );
}

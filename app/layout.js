import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventify",
  description: "Eventify is a platform for event management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
      {/* footer */}
      <footer className="bg-black text-white text-center text-xs p-3 absolute bottom-0 w-full">
        <p>&copy; {new Date().getFullYear()} Eventify - All Rights Reserved</p>
      </footer>
    </html>
  );
}

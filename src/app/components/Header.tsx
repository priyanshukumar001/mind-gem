"use client";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 mt-2 text-white p-6 shadow-lg rounded-full">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/" className="text-3xl font-extrabold hover:text-blue-200 transition-colors">

          Mind Gem

        </Link>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link href="/dashboard" className="hover:text-blue-200 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/playlist" className="hover:text-blue-200 transition-colors">
                    Playlist
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="hover:text-blue-200 transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth" className="hover:text-blue-200 transition-colors">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "../../utils/firebase";
import { signOut as firebaseSignOut, User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Import the useRouter hook

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data()?.name || "User");
          } else {
            console.error("No user document found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        setUser(null);
        setUserName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserName(null);
    router.push('/'); // Redirect to home page after sign out
  };

  return (
    <header className="bg-blue-600 mt-2 text-white p-6 shadow-lg rounded-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold hover:text-blue-200 transition-colors">
          Mind Gem
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <span className="font-bold text-blue-100">Hello, {userName || "User"}!</span>
              <button onClick={signOut} className="hover:text-blue-200 transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth" className="hover:text-blue-200 transition-colors">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

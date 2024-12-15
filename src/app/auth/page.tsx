// "use client";

// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../utils/firebase";
// import { useRouter } from "next/navigation";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter(); // Use next/navigation's useRouter

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User signed in successfully!");

//       // Redirect to the dashboard
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
//       <form onSubmit={handleSignIn} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Sign In
//         </button>
//       </form>
//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       <button
//         onClick={() => router.push("/auth/signup")}
//         className="mt-4 w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
//       >
//         Sign Up
//       </button>
//     </div>
//   );
// };

// export default SignIn;
"use client";

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Adjust the path as necessary
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Use next/navigation's useRouter

  // Check if the user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        router.push("/dashboard");
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User  signed in successfully!");

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <button
        onClick={() => router.push("/auth/signup")}
        className="mt-4 w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignIn;
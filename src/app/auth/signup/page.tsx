"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../utils/firebase"; // Import Firestore and Auth
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

const SignUp = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("prefer not to say");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Input validation
    if (!name || !age || parseInt(age, 10) <= 0) {
      setError("Please provide a valid name and age.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          age: parseInt(age, 10),
          gender,
          email,
          createdAt: new Date(),
        });
      } catch (err) {
        console.error("Error writing user document to Firestore:", err);
      }
      alert("Account created successfully!");

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error during sign up:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer not to say">Prefer not to say</option>
        </select>
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
          disabled={loading}
          className={`w-full p-2 rounded text-white transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default SignUp;

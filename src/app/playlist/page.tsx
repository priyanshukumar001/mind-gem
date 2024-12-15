'use client';
import React, { useState } from 'react';
import PlaylistDisplay from '@/app/components/PlaylistDisplay';
import { useRouter } from 'next/navigation';

const PlaylistPage = () => {
  const [mood, setMood] = useState<string>('happy'); // Default mood
  const router = useRouter(); // Use next/navigation's useRouter

  const handleMoodChange = (selectedMood: string) => {
    setMood(selectedMood);
  };

  const handleRedirect = () => {
    router.push('/dashboard'); // Redirect to the dashboard page
  };

  return (
    <div className="p-4 relative">
      <button
        onClick={handleRedirect}
        className="absolute top-4 left-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-4 mt-12">Mood-Based Playlist</h1>
      <PlaylistDisplay />
    </div>
  );
};

export default PlaylistPage;
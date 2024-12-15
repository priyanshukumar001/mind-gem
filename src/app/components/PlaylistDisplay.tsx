'use client';

import React, { useEffect, useState } from 'react';
import fetchMoodBasedSongs from '../../utils/youtubeMusicApi';
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube';
interface Song {
  title: string;
  artists: string[];
  videoId: string;
  url: string;
}

type PlaylistDisplayProps = {
  mood: string;
};
interface mood {
  mood: string;
}

const PlaylistDisplay: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mood = useSelector((state: mood) => state.mood);
  const [currentSong, setCurrentSong] = useState<string>('');

  useEffect(() => {
    const getSongs = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error state
        const data = await fetchMoodBasedSongs(mood); // Fetch mood-based songs from YouTube Music API
        console.log('Fetched songs:', data); // Debug: log the fetched data

        if (Array.isArray(data)) {
          setSongs(data); // Update state if valid data is received
        } else {
          throw new Error('Unexpected data structure from API');
        }
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError('Failed to fetch songs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getSongs();
  }, [mood]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mood-Based Songs for "<span className="text-blue-600">{mood}</span>"
      </h2>

      {isLoading ? (
        <p className="text-gray-600 text-center">Loading songs...</p>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : songs.length > 0 ? (
        <>
          <ul className="space-y-4">
            {songs.map((song, index) => (
              <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-md hover:shadow-lg">
                <div>
                  <p className="font-semibold text-lg">{song.title}</p>
                  <p className="text-sm text-gray-500">
                    {song.artists.join(', ')}
                  </p>
                </div>

                <button onClick={() => setCurrentSong(song.videoId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  Listen
                </button>

              </li>
            ))}
          </ul>
          {
            currentSong && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">Now Playing</h3>
                <div className='w-full lg:w-2/3 p-1 lg:p-4 mx-auto rounded-lg border-2'>
                  <YouTube className='h-auto w-full lg:h-[500px] rounded-lg' videoId={currentSong} opts={{ width: '100%', height: '500', playerVars: { autoplay: 1, } }} />
                </div>
              </div>
            )
          }

        </>
      ) : (
        <p className="text-gray-600 text-center">No songs found for the mood "{mood}".</p>
      )}
    </div>
  );
};

export default PlaylistDisplay;
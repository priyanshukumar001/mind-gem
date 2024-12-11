"use client"

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'

// Sample data for songs based on mood
const songsByMood = {
  Focused: [
    { title: 'Study Focus', artist: 'Relaxing Beats', youtubeId: 'oPVte6aMprI' },
    { title: 'Concentration', artist: 'Ambient Sounds', youtubeId: 'sjkrrmBnpGE' },
    { title: 'Focus Music', artist: 'Instrumental Music', youtubeId: 'jVpGUxoezWU' },
    { title: 'Study Music', artist: 'Relaxing White Noise', youtubeId: 'lkkGlVWvkLk' },
  ],
  Happy: [
    { title: 'Happy Day', artist: 'Sunshine Band', youtubeId: 'gRSOLhFqWh0' },
    { title: 'Joyful Noise', artist: 'Upbeat Tunes', youtubeId: 'MllhC0qyEjY' },
    { title: 'I Gotta Feeling', artist: 'The Black Eyed Peas', youtubeId: 'uSD4vsh1zDA' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', youtubeId: 'OPf0YbXqDm0' },
  ],
  Sad: [
    { title: 'Melancholy Melody', artist: 'Soulful Singer', youtubeId: 'p2zMXSXhZ9M' },
    { title: 'Rainy Day Blues', artist: 'Acoustic Ensemble', youtubeId: 'fk6zZcLdlZU' },
    { title: 'Someone Like You', artist: 'Adele', youtubeId: 'ngq5Aw0Q6rQ' },
    { title: 'Tears in Heaven', artist: 'Eric Clapton', youtubeId: 'JxPj3GAYYZ0' },
  ],
  Energetic: [
    { title: 'Power Up', artist: 'Electric Beats', youtubeId: '403FGqa-Uv8' },
    { title: 'Workout Anthem', artist: 'Fitness Jams', youtubeId: 'IjBAgWKW12Y' },
    { title: 'Eye of the Tiger', artist: 'Survivor', youtubeId: '_qDML_BCju8' },
    { title: 'Lose Yourself', artist: 'Eminem', youtubeId: '_Yhyp-_hX2s' },
  ],
  Calm: [
    { title: 'Peaceful Waves', artist: 'Ocean Sounds', youtubeId: 'bn9F19Hi1Lk' },
    { title: 'Zen Garden', artist: 'Meditation Masters', youtubeId: '6GxNJlmzqz4' },
    { title: 'Weightless', artist: 'Marconi Union', youtubeId: 'LlJwjeuBlYE' },
    { title: 'Clair de Lune', artist: 'Claude Debussy', youtubeId: 'WNcsUNKlAKw' },
  ],
  Relaxed: [
    { title: 'Chill Vibes', artist: 'Lounge Collective', youtubeId: '4T7HwLGNiuw' },
    { title: 'Lazy Sunday', artist: 'Acoustic Duo', youtubeId: 'zFhfksjf_mY' },
    { title: 'Sitting on the Dock of the Bay', artist: 'Otis Redding', youtubeId: '8kvkitq3MAU' },
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', youtubeId: 'ddLd0QRf7Vg' },
  ],
}

interface mood {
  mood: string;
}

const Playlist = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const mood = useSelector((state: mood) => state.mood);

  useEffect(() => {
    // In a real app, you'd fetch the selected mood from the server or state management
    // setSelectedMood('Happy')
    console.log(mood);
    setSelectedMood(mood);
  }, [])

  const handleSongSelect = (youtubeId: string) => {
    setCurrentSong(youtubeId)
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Your Playlist</h1>
      {selectedMood && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Songs for {selectedMood} Mood</h2>
          <ul className="space-y-4">
            {songsByMood[selectedMood as keyof typeof songsByMood].map((song, index) => (
              <li key={song.youtubeId + index} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-md">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{song.title}</h3>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                </div>
                <button
                  onClick={() => handleSongSelect(song.youtubeId)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {currentSong && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">Now Playing</h3>
          <div className='w-full lg:w-2/3 p-1 lg:p-4 mx-auto rounded-lg border-2'>
            <YouTube className='h-auto w-full lg:h-[500px] rounded-lg' videoId={currentSong} opts={{ width: '100%', height: '500', playerVars: { autoplay: 1, } }} />
          </div>
        </div>
      )}
    </div>
  );


  // return (
  //   <div className="space-y-8">
  //     <h1 className="text-3xl font-bold mb-4">Your Playlist</h1>
  //     {selectedMood && (
  //       <>
  //         <h2 className="text-2xl font-semibold mb-4">Songs for {selectedMood} Mood</h2>
  //         <ul className="space-y-4">
  //           {songsByMood[selectedMood as keyof typeof songsByMood].map((song) => (
  //             <li key={song.youtubeId} className="flex items-center justify-between">
  //               <div>
  //                 <h3 className="font-semibold">{song.title}</h3>
  //                 <p className="text-sm text-gray-600">{song.artist}</p>
  //               </div>
  //               <button
  //                 onClick={() => handleSongSelect(song.youtubeId)}
  //                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  //               >
  //                 Play
  //               </button>
  //             </li>
  //           ))}
  //         </ul>
  //       </>
  //     )}
  //     {currentSong && (
  //       <div className="mt-8">
  //         <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
  //         <YouTube videoId={currentSong} opts={{ width: '100%', height: '360' }} />
  //       </div>
  //     )}
  //   </div>
  // )
}

export default Playlist;
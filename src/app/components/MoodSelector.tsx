'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setMood } from '@/features/actions';


const moods = [
  { name: 'Focused', icon: '🧠' },
  { name: 'Happy', icon: '😊' },
  { name: 'Sad', icon: '😢' },
  { name: 'Energetic', icon: '⚡' },
  { name: 'Calm', icon: '😌' },
  { name: 'Relaxed', icon: '🧘' },
];

const quotes: Record<string, string> = {
  Focused: 'The successful warrior is the average man, with laser-like focus. - Bruce Lee',
  Happy: 'Happiness is not something ready-made. It comes from your own actions. - Dalai Lama',
  Sad: 'Even the darkest night will end and the sun will rise. - Victor Hugo',
  Energetic: 'Energy and persistence conquer all things. - Benjamin Franklin',
  Calm: 'Calm mind brings inner strength and self-confidence. - Dalai Lama',
  Relaxed: 'Your calm mind is the ultimate weapon against your challenges. - Bryant McGill',
};

type MoodSelectorProps = {
  onMoodSelect: (mood: string) => void;
};

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
    dispatch(setMood(mood));
  };

  const navigateToPlaylist = () => {
    router.push('/playlist');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
        How are you feeling today?
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {moods.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleMoodSelect(name)}
            className={`p-6 text-center rounded-lg transition-colors ${
              selectedMood === name ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span className="text-5xl">{icon}</span>
            <p className="mt-4 text-lg">{name}</p>
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="flex flex-col items-center mt-8 p-6 bg-yellow-100 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-center">
            {quotes[selectedMood]}
          </p>
          <button
            className="mt-4 rounded-lg bg-black text-white font-bold px-4 py-2 hover:bg-gray-800 transition-colors"
            onClick={navigateToPlaylist}
          >
            Suggest Song
          </button>
        </div>
      )}
    </div>
  );
}
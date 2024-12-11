"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setMood } from '@/features/actions';

const moods = [
  { name: 'Focused', icon: '🧠' },
  { name: 'Happy', icon: '😊' },
  { name: 'Sad', icon: '😢' },
  { name: 'Energetic', icon: '⚡' },
  { name: 'Calm', icon: '😌' },
  { name: 'Relaxed', icon: '🧘' },
]

const quotes = {
  Focused: "The successful warrior is the average man, with laser-like focus. - Bruce Lee",
  Happy: "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
  Sad: "Even the darkest night will end and the sun will rise. - Victor Hugo",
  Energetic: "Energy and persistence conquer all things. - Benjamin Franklin",
  Calm: "Calm mind brings inner strength and self-confidence. - Dalai Lama",
  Relaxed: "Your calm mind is the ultimate weapon against your challenges. - Bryant McGill",
}

type MoodSelectorProps = {
  onMoodSelect: (mood: string) => void
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [showQuote, setShowQuote] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    onMoodSelect(mood)
    setShowQuote(true)
    dispatch(setMood(mood));
  }

  // return (
  //   <div>
  //     <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
  //     <div className="grid grid-cols-3 gap-4">
  //       {moods.map((mood) => (
  //         <button
  //           key={mood.name}
  //           onClick={() => handleMoodSelect(mood.name)}
  //           className={`p-4 text-center rounded-lg transition-colors ${selectedMood === mood.name ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
  //             }`}
  //         >
  //           <span className="text-4xl">{mood.icon}</span>
  //           <p className="mt-2">{mood.name}</p>
  //         </button>
  //       ))}
  //     </div>
  //     {showQuote && selectedMood && (
  //       <div className="flex justify-around mt-6 p-4 bg-yellow-100 rounded-lg">
  //         <p className="text-lg font-semibold">{quotes[selectedMood as keyof typeof quotes]}</p>
  //         <button className='rounded-lg bg-black text-white font-bold p-2' onClick={() => router.push('/playlist')}>Suggest Song</button>
  //       </div>
  //     )}
  //   </div>
  // )

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">How are you feeling today?</h2>
      <div className="grid grid-cols-3 gap-6">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => handleMoodSelect(mood.name)}
            className={`p-6 text-center rounded-lg transition-colors ${selectedMood === mood.name ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            <span className="text-5xl">{mood.icon}</span>
            <p className="mt-4 text-lg">{mood.name}</p>
          </button>
        ))}
      </div>
      {showQuote && selectedMood && (
        <div className="flex justify-around mt-8 p-6 bg-yellow-100 rounded-lg shadow-md">
          <p className="text-lg font-semibold">{quotes[selectedMood as keyof typeof quotes]}</p>
          <button className="rounded-lg bg-black text-white font-bold p-3 hover:bg-gray-800 transition-colors" onClick={() => router.push('/playlist')}>
            Suggest Song
          </button>
        </div>
      )}
    </div>
  );

}


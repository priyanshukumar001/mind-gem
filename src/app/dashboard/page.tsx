'use client'

import { useState } from 'react'
import MoodSelector from '../components/MoodSelector'
import TaskManager from '../components/TaskManager'

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Mind Gem!</h1>
      <MoodSelector onMoodSelect={setSelectedMood} />
      <TaskManager />
    </div>
  )
}


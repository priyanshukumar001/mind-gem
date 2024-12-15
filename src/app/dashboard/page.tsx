'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import MoodSelector from '../components/MoodSelector'
import TaskManager from '../components/TaskManager'

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is authenticated, redirect to home page
        router.push('/')
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return <p>Loading...</p> // Show loading while checking auth state
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Mind Gem!</h1>
      <MoodSelector onMoodSelect={setSelectedMood} />
      <TaskManager />
    </div>
  )
}

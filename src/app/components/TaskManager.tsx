
"use client"
import { useState } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TimeOfDay = 'Morning' | 'Evening' | 'Night';

const initialTasks: Record<TimeOfDay, Task[]> = {
  Morning: [
    { id: 1, text: 'Meditate for 10 minutes', completed: false },
    { id: 2, text: 'Eat a healthy breakfast', completed: false },
  ],
  Evening: [
    { id: 3, text: 'Go for a walk', completed: false },
    { id: 4, text: 'Read a book for 30 minutes', completed: false },
  ],
  Night: [
    { id: 5, text: 'Reflect on the day', completed: false },
    { id: 6, text: 'Practice gratitude', completed: false },
  ],
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Record<TimeOfDay, Task[]>>(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [selectedTime, setSelectedTime] = useState<TimeOfDay>('Morning');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks((prev) => ({
        ...prev,
        [selectedTime]: [
          ...prev[selectedTime],
          { id: Date.now(), text: newTask.trim(), completed: false },
        ],
      }));
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => ({
      ...prev,
      [selectedTime]: prev[selectedTime].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => ({
      ...prev,
      [selectedTime]: prev[selectedTime].filter((task) => task.id !== id),
    }));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Daily Tasks</h2>
      <div className="flex space-x-4 mb-6 justify-center">
        {(['Morning', 'Evening', 'Night'] as TimeOfDay[]).map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded-full ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'
              } transition-colors`}
          >
            {time}
          </button>
        ))}
      </div>
      <form onSubmit={addTask} className="mb-6 flex justify-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-r-full hover:bg-green-600 transition-colors">
          Add Task
        </button>
      </form>
      <ul className="space-y-4">
        {tasks[selectedTime].map((task) => (
          <li key={task.id} className="flex items-center bg-blue-50 p-4 rounded-lg shadow-md">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-4"
            />
            <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>{task.text}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-auto px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

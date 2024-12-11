// import Link from 'next/link'

// export default function Home() {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6">Welcome to Mind Gem</h1>
//       <p className="text-xl mb-4">Your personal mental health companion</p>
//       <div className="space-y-6">
//         <section>
//           <h2 className="text-2xl font-semibold mb-2">Mental Health Awareness</h2>
//           <p>Mental health is an essential part of overall well-being. It affects how we think, feel, and act as we cope with life. It also helps determine how we handle stress, relate to others, and make choices.</p>
//         </section>
//         <section>
//           <h2 className="text-2xl font-semibold mb-2">How Mind Gem Can Help</h2>
//           <ul className="list-disc list-inside">
//             <li>Track your mood and get personalized song recommendations</li>
//             <li>Manage your daily tasks to maintain a healthy routine</li>
//             <li>Access inspirational quotes tailored to your current mood</li>
//           </ul>
//         </section>
//         <Link href="/auth" className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
//           Get Started
//         </Link>
//       </div>
//     </div>
//   )
// }


import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-blue-700">Welcome to Mind Gem</h1>
      <p className="text-xl mb-6 text-center text-gray-700">Your personal mental health companion</p>
      <div className="space-y-8">
        <section className="p-4 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">Mental Health Awareness</h2>
          <p className="text-lg text-gray-800">Mental health is an essential part of overall well-being. It affects how we think, feel, and act as we cope with life. It also helps determine how we handle stress, relate to others, and make choices.</p>
        </section>
        <section className="p-4 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">How Mind Gem Can Help</h2>
          <ul className="list-disc list-inside text-lg text-gray-800">
            <li>Track your mood and get personalized song recommendations</li>
            <li>Manage your daily tasks to maintain a healthy routine</li>
            <li>Access inspirational quotes tailored to your current mood</li>
          </ul>
        </section>
        <div className="text-center">
          <Link href="/auth" className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors shadow-lg">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

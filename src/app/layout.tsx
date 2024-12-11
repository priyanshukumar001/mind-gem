import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
// import { Provider } from 'react-redux'
import ClientProvider from './clientProvider'
import store from './store.js'
import { AuthProvider } from './components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mind Gem',
  description: 'Your personal mental health app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <AuthProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </AuthProvider>
        </ClientProvider>
      </body>
    </html>
  )
}


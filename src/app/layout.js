import { Inter, Press_Start_2P } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})

export const metadata = {
  title: 'PokerMella',
  description: 'Juego de poker online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${pressStart.variable} bg-gray-100`}>
        {children}
      </body>
    </html>
  )
}

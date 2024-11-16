import type { Metadata } from 'next'
import LoginPage from './LoginPage'  // Your client component

export const metadata: Metadata = {
  title: "Login",
  description: "Join Donutello to explore and discover your next favorite anime series. A unique blend of martial arts and delicious entertainment.",
  openGraph: {
    title: "Login | Donutello",
    description: "Join Donutello to explore and discover your next favorite anime series",
    images: [
      {
        url: "/donutV.jpg",
        width: 1200,
        height: 630,
        alt: "Donutello - Martial Arts Donut"
      }
    ]
  }
}

export default function Page() {
  return <LoginPage />
}
import { Hero } from '@/components/sections/Hero'
import { Navbar } from '@/components/Navbar'

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
    </div>
  )
}

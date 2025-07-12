
import { Header } from "@/components/navigation/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturedArtists } from "@/components/landing/featured-artists"
import { CategoriesSection } from "@/components/landing/categories-section"
import { StatsSection } from "@/components/landing/stats-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { Footer } from "@/components/navigation/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedArtists />
        <StatsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}

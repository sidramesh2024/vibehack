
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/firebase-types"
import { Header } from "@/components/navigation/header"
import { ArtistPortfolio } from "@/components/artist/artist-portfolio"
import { Loader2 } from "lucide-react"

export default function ArtistPortfolioPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login?callbackUrl=/artist/portfolio")
        return
      }

      if (user.role !== UserRole.ARTIST) {
        router.push("/dashboard")
        return
      }
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== UserRole.ARTIST) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <ArtistPortfolio />
      </main>
    </div>
  )
}

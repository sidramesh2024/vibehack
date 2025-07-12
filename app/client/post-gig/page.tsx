
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/firebase-types"
import { Header } from "@/components/navigation/header"
import { PostGigForm } from "@/components/client/post-gig-form"
import { Loader2 } from "lucide-react"

export default function PostGigPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login?callbackUrl=/client/post-gig")
        return
      }

      if (user?.role !== UserRole.CLIENT) {
        router.push("/dashboard")
        return
      }
    }
  }, [loading, user, user, router])

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

  if (!user || user?.role !== UserRole.CLIENT) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Post a New Gig</h1>
            <p className="text-muted-foreground mt-2">
              Find the perfect creative talent for your project in Brooklyn.
            </p>
          </div>
          <PostGigForm />
        </div>
      </main>
    </div>
  )
}

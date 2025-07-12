"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/firebase-types"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login?callbackUrl=/dashboard")
        return
      }

      // Redirect to role-specific dashboard
      if (user?.role === UserRole.ARTIST) {
        router.push("/artist/dashboard")
      } else if (user?.role === UserRole.CLIENT) {
        router.push("/client/dashboard")
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

  return null
}

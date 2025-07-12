
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { Header } from "@/components/navigation/header"
import { ArtistDashboard } from "@/components/artist/artist-dashboard"

export default async function ArtistDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/artist/dashboard")
  }

  if (session.user.role !== UserRole.ARTIST) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ArtistDashboard />
    </div>
  )
}


import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { Header } from "@/components/navigation/header"
import { AIGigRecommendations } from "@/components/artist/ai-gig-recommendations"

export default async function ArtistRecommendationsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/artist/recommendations")
  }

  if (session.user.role !== UserRole.ARTIST) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">AI-Powered Gig Recommendations</h1>
            <p className="text-muted-foreground">
              Discover gigs perfectly matched to your skills and portfolio
            </p>
          </div>
          <AIGigRecommendations />
        </div>
      </div>
    </div>
  )
}

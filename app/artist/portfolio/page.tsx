
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { Header } from "@/components/navigation/header"
import { ArtistPortfolio } from "@/components/artist/artist-portfolio"

export default async function ArtistPortfolioPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/artist/portfolio")
  }

  if (session.user.role !== UserRole.ARTIST) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ArtistPortfolio />
    </div>
  )
}


import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { Header } from "@/components/navigation/header"
import { PostGigForm } from "@/components/client/post-gig-form"

export default async function PostGigPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/client/post-gig")
  }

  if (session.user.role !== UserRole.CLIENT) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Post a New Gig</h1>
            <p className="text-muted-foreground">
              Find the perfect Brooklyn creative for your project
            </p>
          </div>
          <PostGigForm />
        </div>
      </div>
    </div>
  )
}

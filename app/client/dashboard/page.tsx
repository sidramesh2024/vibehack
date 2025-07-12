
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { Header } from "@/components/navigation/header"
import { ClientDashboard } from "@/components/client/client-dashboard"

export default async function ClientDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/client/dashboard")
  }

  if (session.user.role !== UserRole.CLIENT) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ClientDashboard />
    </div>
  )
}

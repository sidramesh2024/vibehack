
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/dashboard")
  }

  // Redirect to role-specific dashboard
  if (session.user.role === UserRole.ARTIST) {
    redirect("/artist/dashboard")
  } else {
    redirect("/client/dashboard")
  }
}

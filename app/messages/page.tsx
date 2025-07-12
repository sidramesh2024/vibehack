
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Header } from "@/components/navigation/header"
import { MessagesView } from "@/components/messages/messages-view"

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/messages")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MessagesView />
    </div>
  )
}

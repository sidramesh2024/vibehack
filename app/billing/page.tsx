
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Header } from "@/components/navigation/header"
import { SubscriptionManager } from "@/components/payments/subscription-manager"

export default async function BillingPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/billing")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Billing & Subscriptions</h1>
            <p className="text-muted-foreground">
              Manage your subscription and payment methods
            </p>
          </div>
          <SubscriptionManager />
        </div>
      </div>
    </div>
  )
}

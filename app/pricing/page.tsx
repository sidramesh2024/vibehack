
import { Header } from "@/components/navigation/header"
import { SubscriptionManager } from "@/components/payments/subscription-manager"
import { Footer } from "@/components/navigation/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <SubscriptionManager />
      </div>
      <Footer />
    </div>
  )
}

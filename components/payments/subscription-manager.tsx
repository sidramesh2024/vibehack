
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Crown, 
  Check, 
  Zap, 
  Shield, 
  TrendingUp,
  Star,
  Users,
  MessageSquare
} from "lucide-react"
import { motion } from "framer-motion"
// Mock useBilling hook for development
const useBilling = () => ({
  createCheckoutSession: null,
  catalog: null
})

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Basic portfolio showcase',
      'Browse and apply to gigs',
      'Standard messaging',
      '5% transaction fee',
      'Community support'
    ],
    limitations: [
      'Limited to 3 portfolio items',
      'No priority listing',
      'No verification badge'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    description: 'For serious creatives',
    popular: true,
    features: [
      'Unlimited portfolio items',
      'Verified profile badge',
      'Priority gig listings',
      'Advanced AI matching',
      '3% transaction fee (vs 5%)',
      'Priority customer support',
      'Analytics dashboard',
      'Featured artist listing'
    ],
    cta: 'Start Pro Trial'
  }
]

export function SubscriptionManager() {
  const [isLoading, setIsLoading] = useState(false)
  const { createCheckoutSession, catalog } = useBilling()

  const handleUpgrade = async (planId: string) => {
    if (planId === 'free') return
    
    setIsLoading(true)
    try {
      // Mock upgrade flow for development
      // In production, this would integrate with FlowGlad
      console.log(`Upgrading to ${planId} plan`)
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to billing page
      window.location.href = '/billing?success=true'
    } catch (error) {
      console.error('Upgrade error:', error)
      // Fallback: redirect to billing page
      window.location.href = '/billing'
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock premium features and grow your creative business with our Pro plan
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className={`relative ${plan.popular ? 'border-red-200 shadow-lg' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white px-3 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      {plan.interval !== 'forever' && (
                        <span className="text-lg font-normal text-muted-foreground">
                          /{plan.interval}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    Included Features
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground">
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <span className="mr-2 mt-0.5">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isLoading || plan.id === 'free'}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : plan.id === 'free'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {plan.id === 'free' ? 'Current Plan' : plan.cta || 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
        <Card className="text-center p-6">
          <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Verified Badge</h3>
          <p className="text-sm text-muted-foreground">
            Build trust with clients through our verification process
          </p>
        </Card>
        
        <Card className="text-center p-6">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Priority Matching</h3>
          <p className="text-sm text-muted-foreground">
            Get matched to the best gigs before other artists
          </p>
        </Card>
        
        <Card className="text-center p-6">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Featured Listings</h3>
          <p className="text-sm text-muted-foreground">
            Showcase your work prominently to attract more clients
          </p>
        </Card>
      </div>
    </div>
  )
}

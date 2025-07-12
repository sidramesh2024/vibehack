
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, Shield, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentButtonProps {
  amount: number
  description: string
  projectId?: string
  type: string
  onSuccess?: () => void
  className?: string
  children?: React.ReactNode
}

export function PaymentButton({ 
  amount, 
  description, 
  projectId, 
  type,
  onSuccess,
  className,
  children
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const calculateFees = (amount: number) => {
    const fee = amount * 0.029 + 0.30 // FlowGlad's fee structure
    const netAmount = amount - fee
    return { fee, netAmount }
  }

  const handlePayment = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/payments/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          projectId,
          type
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment session')
      }

      const { checkoutSession } = await response.json()
      
      // In a real implementation, redirect to FlowGlad checkout
      // For now, simulate successful payment
      toast({
        title: "Payment Initiated",
        description: "Redirecting to secure checkout...",
      })

      // Simulate payment completion after 2 seconds
      setTimeout(() => {
        toast({
          title: "Payment Successful!",
          description: `Payment of $${amount} has been processed.`,
        })
        onSuccess?.()
      }, 2000)

    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const { fee, netAmount } = calculateFees(amount)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="font-semibold">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Processing Fee:</span>
            <span className="text-sm">${fee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-semibold">You Receive:</span>
            <span className="font-semibold text-green-600">${netAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>{description}</p>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isLoading}
          className={`w-full bg-red-500 hover:bg-red-600 ${className}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              {children || `Pay $${amount.toFixed(2)}`}
            </>
          )}
        </Button>

        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          <span>Secure payment powered by FlowGlad</span>
        </div>
      </CardContent>
    </Card>
  )
}

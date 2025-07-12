
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, amount, projectId, description } = await request.json()

    // Validate input
    if (!type || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid payment data" }, { status: 400 })
    }

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        projectId: projectId || null,
        amount: amount,
        fee: amount * 0.029 + 0.30, // FlowGlad's 2.9% + 30¢ fee structure
        netAmount: amount - (amount * 0.029 + 0.30),
        status: "PENDING",
        description: description || `Payment for ${type}`,
        metadata: {
          type,
          sessionId: session.user.id,
          timestamp: new Date().toISOString()
        }
      }
    })

    // In a real implementation, you would integrate with FlowGlad's checkout session API
    // For now, we'll simulate the payment process
    
    // Simulate FlowGlad checkout session creation
    const checkoutSession = {
      id: `cs_${Date.now()}`,
      url: `/billing?payment=${payment.id}`,
      paymentId: payment.id,
      amount: amount,
      status: 'open'
    }

    return NextResponse.json({
      checkoutSession,
      paymentId: payment.id,
      message: "Payment session created successfully"
    })

  } catch (error) {
    console.error('Payment session creation error:', error)
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    )
  }
}

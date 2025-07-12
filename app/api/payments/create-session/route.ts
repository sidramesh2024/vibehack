
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"
import { setDoc, doc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { PaymentStatus } from "@/lib/firebase-types"

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(token)
    
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { type, amount, projectId, description } = await request.json()

    // Validate input
    if (!type || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid payment data" }, { status: 400 })
    }

    // Generate payment ID
    const paymentId = doc(db, 'payments', 'temp').id

    // Create payment record in Firebase
    const paymentData = {
      id: paymentId,
      userId: decodedToken.uid,
      projectId: projectId || null,
      amount: amount,
      fee: amount * 0.029 + 0.30, // FlowGlad's 2.9% + 30¢ fee structure
      netAmount: amount - (amount * 0.029 + 0.30),
      status: PaymentStatus.PENDING,
      description: description || `Payment for ${type}`,
      metadata: {
        type,
        sessionId: decodedToken.uid,
        timestamp: new Date().toISOString()
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }

    await setDoc(doc(db, 'payments', paymentId), paymentData)

    // In a real implementation, you would integrate with FlowGlad's checkout session API
    // For now, we'll simulate the payment process
    
    // Simulate FlowGlad checkout session creation
    const checkoutSession = {
      id: `cs_${Date.now()}`,
      url: `/billing?payment=${paymentId}`,
      paymentId: paymentId,
      amount: amount,
      status: 'open'
    }

    return NextResponse.json({
      checkoutSession,
      paymentId: paymentId,
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

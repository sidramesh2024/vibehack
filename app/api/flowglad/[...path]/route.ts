
import { NextRequest, NextResponse } from "next/server"

// Mock FlowGlad API route handler for development
// In production, this would use the real FlowGlad handler
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "FlowGlad API - GET" })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "FlowGlad API - POST" })
}

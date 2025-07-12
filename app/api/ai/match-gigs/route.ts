
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"
import { findArtistProfile, findOpenGigs, getArtistPortfolios, getPortfolioItems } from "@/lib/firebase-db"
import { UserRole, GigStatus } from "@/lib/firebase-types"

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

    // Check if user is an artist (you may need to store role in custom claims or fetch from Firestore)
    // For now, we'll fetch the user data to check role
    const { findUserById } = await import('@/lib/firebase-db')
    const userData = await findUserById(decodedToken.uid)
    
    if (!userData || userData.role !== UserRole.ARTIST) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get artist profile and portfolio
    const artistProfile = await findArtistProfile(decodedToken.uid)

    if (!artistProfile) {
      return NextResponse.json({ error: "Artist profile not found" }, { status: 404 })
    }

    // Get available gigs
    const availableGigs = await findOpenGigs()

    // Get artist portfolios and prepare data for AI analysis
    const portfolios = await getArtistPortfolios(artistProfile.id)
    const portfolioData = await Promise.all(
      portfolios.map(async (portfolio) => {
        const items = await getPortfolioItems(portfolio.id)
        return items.map((item) => ({
          title: item.title,
          description: item.description,
          category: item.category,
          tags: item.tags
        }))
      })
    ).then(results => results.flat())

    const artistData = {
      skills: artistProfile.skills || [],
      experienceYears: artistProfile.experienceYears,
      portfolioItems: portfolioData,
      location: artistProfile.location,
      hourlyRate: artistProfile.hourlyRate
    }

    const gigsData = availableGigs.map(gig => ({
      id: gig.id,
      title: gig.title,
      description: gig.description,
      category: gig.category,
      budget: gig.budget,
      skills: gig.skills || [],
      requirements: gig.requirements || [],
      location: gig.location,
      timeline: gig.timeline
    }))

    // Call AI matching service
    const matchingResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [{
          role: 'user',
          content: `You are an AI matching system for a creative marketplace. Analyze this artist's profile and suggest the best matching gigs.

Artist Profile:
${JSON.stringify(artistData, null, 2)}

Available Gigs:
${JSON.stringify(gigsData, null, 2)}

Please respond in JSON format with the following structure:
{
  "matches": [
    {
      "gigId": "gig_id",
      "matchScore": 85,
      "reasons": ["Specific reason 1", "Specific reason 2"],
      "recommendation": "Brief explanation why this is a good match"
    }
  ]
}

Consider:
1. Skill alignment between artist capabilities and gig requirements
2. Portfolio relevance to the gig category and description  
3. Experience level appropriateness
4. Budget compatibility with artist's rate
5. Location proximity (Brooklyn neighborhoods)
6. Timeline feasibility

Rank matches by score (0-100) and include only gigs with score >= 60.
Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`
        }],
        response_format: { type: "json_object" },
        max_tokens: 2000
      }),
    })

    if (!matchingResponse.ok) {
      throw new Error(`AI service error: ${matchingResponse.status}`)
    }

    const aiResult = await matchingResponse.json()
    const matches = JSON.parse(aiResult.choices[0].message.content)

    // Enrich matches with full gig data
    const enrichedMatches = matches.matches.map((match: any) => {
      const gig = availableGigs.find(g => g.id === match.gigId)
      return {
        ...match,
        gig: gig ? {
          id: gig.id,
          title: gig.title,
          description: gig.description,
          category: gig.category,
          budget: gig.budget,
          budgetType: gig.budgetType,
          timeline: gig.timeline,
          location: gig.location,
          clientName: 'Client', // Simplified for now - can fetch client data separately if needed
          neighborhood: null, // Simplified for now - can fetch neighborhood data separately if needed
          createdAt: gig.createdAt,
          deadline: gig.deadline
        } : null
      }
    }).filter((match: any) => match.gig !== null)

    return NextResponse.json({ 
      matches: enrichedMatches,
      totalAnalyzed: availableGigs.length,
      artistId: artistProfile.id
    })

  } catch (error) {
    console.error('AI matching error:', error)
    return NextResponse.json(
      { error: "Failed to generate gig matches" },
      { status: 500 }
    )
  }
}

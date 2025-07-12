
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, TrendingUp, MapPin, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Match {
  gigId: string
  matchScore: number
  reasons: string[]
  recommendation: string
  gig: {
    id: string
    title: string
    description: string
    category: string
    budget: number
    budgetType: string
    timeline: string
    location: string
    clientName: string
    neighborhood: string
    createdAt: string
    deadline: string
  }
}

interface AIRecommendationsResponse {
  matches: Match[]
  totalAnalyzed: number
  artistId: string
}

export function AIGigRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendationsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/ai/match-gigs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
      }

      const data = await response.json()
      setRecommendations(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50"
    if (score >= 80) return "text-blue-600 bg-blue-50" 
    if (score >= 70) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-500" />
            <div>
              <h3 className="font-semibold">Analyzing Your Portfolio</h3>
              <p className="text-sm text-muted-foreground">
                Our AI is finding the perfect gigs for you...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-red-500 mb-4">Failed to load recommendations: {error}</p>
          <Button onClick={fetchRecommendations} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!recommendations || recommendations.matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-red-500" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            No matching gigs found right now. Check back later or update your portfolio to improve matches.
          </p>
          <Button onClick={fetchRecommendations} variant="outline">
            Refresh Recommendations
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-red-500" />
              <span>AI-Powered Recommendations</span>
            </div>
            <Badge variant="secondary" className="bg-red-50 text-red-700">
              {recommendations.matches.length} matches found
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your portfolio and skills, analyzed {recommendations.totalAnalyzed} available gigs
          </p>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {recommendations.matches.map((match, index) => (
          <motion.div
            key={match.gigId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold hover:text-red-500 transition-colors">
                        {match.gig.title}
                      </h3>
                      <Badge className={`px-2 py-1 ${getScoreColor(match.matchScore)}`}>
                        {match.matchScore}% match
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">by {match.gig.clientName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ${match.gig.budget.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {match.gig.budgetType} price
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {match.gig.description}
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Why this matches you:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {match.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-blue-700 mt-2 italic">
                    {match.recommendation}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{match.gig.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{match.gig.timeline}</span>
                    </div>
                    <Badge variant="outline">{match.gig.category}</Badge>
                  </div>
                  <span>Due {new Date(match.gig.deadline).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Posted {new Date(match.gig.createdAt).toLocaleDateString()}
                  </span>
                  <Link href={`/gigs/${match.gig.id}`}>
                    <Button className="bg-red-500 hover:bg-red-600">
                      View & Apply
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={fetchRecommendations} variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          Refresh Recommendations
        </Button>
      </div>
    </div>
  )
}

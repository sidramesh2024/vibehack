
"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Palette, 
  Eye, 
  MessageCircle, 
  DollarSign, 
  Star,
  TrendingUp,
  Calendar,
  Plus,
  Briefcase,
  Users
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const mockData = {
  stats: {
    portfolioViews: 1234,
    activeApplications: 3,
    totalEarnings: 5650,
    completedProjects: 12,
    averageRating: 4.8,
    newMessages: 2
  },
  recentGigs: [
    {
      id: "1",
      title: "Coffee Shop Mural Design",
      client: "Brooklyn Roasters",
      budget: 2500,
      deadline: "2025-01-20",
      status: "pending",
      category: "Muralist"
    },
    {
      id: "2", 
      title: "Wedding Photography",
      client: "Emma & James",
      budget: 1800,
      deadline: "2025-01-15",
      status: "accepted",
      category: "Photography"
    },
    {
      id: "3",
      title: "Restaurant Logo Design",
      client: "Pasta Palace",
      budget: 800,
      deadline: "2025-01-25",
      status: "applied",
      category: "Graphic Design"
    }
  ],
  suggestedGigs: [
    {
      id: "4",
      title: "Apartment Building Mural",
      location: "Williamsburg",
      budget: 3500,
      postedAgo: "2 hours ago",
      category: "Muralist",
      matchScore: 95
    },
    {
      id: "5",
      title: "Tech Startup Branding",
      location: "DUMBO", 
      budget: 2200,
      postedAgo: "1 day ago",
      category: "Graphic Design",
      matchScore: 87
    }
  ]
}

export function ArtistDashboard() {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your creative work</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Link href="/artist/portfolio">
            <Button className="bg-red-500 hover:bg-red-600">
              <Palette className="mr-2 h-4 w-4" />
              Manage Portfolio
            </Button>
          </Link>
          <Link href="/gigs">
            <Button variant="outline">
              <Briefcase className="mr-2 h-4 w-4" />
              Browse Gigs
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages {mockData.stats.newMessages > 0 && (
                <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                  {mockData.stats.newMessages}
                </Badge>
              )}
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{mockData.stats.portfolioViews.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Portfolio Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{mockData.stats.activeApplications}</p>
                  <p className="text-xs text-muted-foreground">Active Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">${mockData.stats.totalEarnings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{mockData.stats.completedProjects}</p>
                  <p className="text-xs text-muted-foreground">Completed Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{mockData.stats.averageRating}</p>
                  <p className="text-xs text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">+23%</p>
                  <p className="text-xs text-muted-foreground">Growth This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Gig Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Recent Applications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.recentGigs.map((gig) => (
                <div key={gig.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">{gig.title}</h4>
                    <p className="text-xs text-muted-foreground">{gig.client}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {gig.category}
                      </Badge>
                      <Badge 
                        variant={gig.status === 'accepted' ? 'default' : gig.status === 'pending' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {gig.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${gig.budget.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(gig.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              <Link href="/artist/applications">
                <Button variant="outline" className="w-full">
                  View All Applications
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AI-Suggested Gigs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>AI Recommendations</span>
                <Badge variant="secondary" className="ml-auto bg-red-50 text-red-700">AI Powered</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.suggestedGigs.map((gig) => (
                <div key={gig.id} className="p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-sm">{gig.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {gig.matchScore}% match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{gig.location}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {gig.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{gig.postedAgo}</span>
                      </div>
                      <p className="font-semibold text-sm">${gig.budget.toLocaleString()}</p>
                    </div>
                    <Link href={`/gigs/${gig.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              
              <div className="flex space-x-2">
                <Link href="/artist/recommendations" className="flex-1">
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View All AI Recommendations
                  </Button>
                </Link>
                <Link href="/gigs">
                  <Button variant="outline" className="flex-1">
                    <Plus className="mr-2 h-4 w-4" />
                    Browse All Gigs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

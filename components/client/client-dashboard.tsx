
"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Users, 
  Briefcase, 
  MessageCircle, 
  DollarSign, 
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  Star,
  Eye
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const mockData = {
  stats: {
    activeGigs: 5,
    totalApplications: 47,
    completedProjects: 8,
    totalSpent: 12450,
    averageRating: 4.9,
    newMessages: 3
  },
  activeGigs: [
    {
      id: "1",
      title: "Restaurant Logo Design",
      applications: 12,
      budget: 1500,
      deadline: "2025-01-20",
      status: "open",
      category: "Graphic Design",
      postedAgo: "3 days ago"
    },
    {
      id: "2",
      title: "Storefront Mural",
      applications: 8,
      budget: 3200,
      deadline: "2025-01-30",
      status: "in_progress",
      category: "Muralist",
      postedAgo: "1 week ago",
      selectedArtist: "Maya Rodriguez"
    },
    {
      id: "3",
      title: "Product Photography",
      applications: 15,
      budget: 800,
      deadline: "2025-01-18",
      status: "review",
      category: "Photography",
      postedAgo: "5 days ago"
    }
  ],
  recentApplications: [
    {
      id: "1",
      gigTitle: "Restaurant Logo Design",
      artistName: "James Chen",
      artistRating: 5.0,
      appliedAgo: "2 hours ago",
      proposedRate: 1200,
      status: "new"
    },
    {
      id: "2",
      gigTitle: "Product Photography",
      artistName: "Sarah Williams", 
      artistRating: 4.8,
      appliedAgo: "5 hours ago",
      proposedRate: 750,
      status: "new"
    },
    {
      id: "3",
      gigTitle: "Restaurant Logo Design",
      artistName: "Alex Thompson",
      artistRating: 4.9,
      appliedAgo: "1 day ago",
      proposedRate: 1400,
      status: "reviewed"
    }
  ]
}

export function ClientDashboard() {
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
          <p className="text-muted-foreground">Manage your projects and find amazing Brooklyn talent</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Link href="/client/post-gig">
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="mr-2 h-4 w-4" />
              Post New Gig
            </Button>
          </Link>
          <Link href="/artists">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Browse Artists
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
                <Briefcase className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{mockData.stats.activeGigs}</p>
                  <p className="text-xs text-muted-foreground">Active Gigs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{mockData.stats.totalApplications}</p>
                  <p className="text-xs text-muted-foreground">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
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
                <DollarSign className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">${mockData.stats.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Investment</p>
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
                  <p className="text-2xl font-bold">+35%</p>
                  <p className="text-xs text-muted-foreground">Response Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Gigs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Your Active Gigs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.activeGigs.map((gig) => (
                <div key={gig.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">{gig.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {gig.category}
                      </Badge>
                      <Badge 
                        variant={gig.status === 'in_progress' ? 'default' : gig.status === 'open' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {gig.status === 'in_progress' ? 'In Progress' : gig.status === 'open' ? 'Open' : 'Under Review'}
                      </Badge>
                    </div>
                    {gig.selectedArtist && (
                      <p className="text-xs text-green-600">Working with {gig.selectedArtist}</p>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-sm">${gig.budget.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {gig.applications} applications
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(gig.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              <Link href="/client/gigs">
                <Button variant="outline" className="w-full">
                  Manage All Gigs
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Recent Applications</span>
                <Badge variant="secondary" className="ml-auto">
                  {mockData.recentApplications.filter(app => app.status === 'new').length} New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.recentApplications.map((application) => (
                <div key={application.id} className="p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{application.gigTitle}</h4>
                        <p className="text-xs text-muted-foreground">by {application.artistName}</p>
                      </div>
                      <Badge 
                        variant={application.status === 'new' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {application.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{application.artistRating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{application.appliedAgo}</span>
                      </div>
                      <p className="font-semibold text-sm">${application.proposedRate.toLocaleString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
                        Review Application
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/client/applications">
                <Button variant="outline" className="w-full">
                  View All Applications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

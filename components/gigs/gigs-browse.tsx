
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, DollarSign, Search, Filter, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock data - in real app, this would come from API
const mockGigs = [
  {
    id: "1",
    title: "Coffee Shop Exterior Mural",
    description: "Looking for a vibrant mural for our new Brooklyn Roasters location. Should reflect coffee culture and local community vibes.",
    client: "Brooklyn Roasters",
    budget: 2500,
    budgetType: "fixed",
    category: "Muralist",
    location: "Red Hook",
    timeline: "2-3 weeks",
    postedAgo: "2 days ago",
    applications: 8,
    deadline: "2025-01-25",
    featured: true,
    skills: ["Mural Painting", "Weather-resistant paints", "Community engagement"]
  },
  {
    id: "2",
    title: "Tech Startup Brand Identity",
    description: "Complete brand identity package for our innovative tech startup. Need logo, business cards, and brand guidelines.",
    client: "InnovateNYC",
    budget: 1800,
    budgetType: "fixed",
    category: "Graphic Designer",
    location: "DUMBO",
    timeline: "2 weeks",
    postedAgo: "1 day ago",
    applications: 12,
    deadline: "2025-01-20",
    featured: false,
    skills: ["Logo Design", "Brand Identity", "Print Design", "Digital Assets"]
  },
  {
    id: "3",
    title: "Wedding Photography Package",
    description: "Seeking a photographer for an intimate Brooklyn wedding. Ceremony in Prospect Park, reception in Park Slope.",
    client: "Emma & James",
    budget: 1200,
    budgetType: "fixed",
    category: "Photographer",
    location: "Park Slope",
    timeline: "1 day event",
    postedAgo: "3 hours ago",
    applications: 5,
    deadline: "2025-01-15",
    featured: false,
    skills: ["Wedding Photography", "Event Photography", "Portrait Photography"]
  },
  {
    id: "4",
    title: "Restaurant Website Redesign",
    description: "Modern, mobile-responsive website for established Italian restaurant. Need online ordering and reservation system.",
    client: "Pasta Palace",
    budget: 3200,
    budgetType: "fixed",
    category: "Web Designer",
    location: "Carroll Gardens",
    timeline: "3-4 weeks",
    postedAgo: "1 week ago",
    applications: 15,
    deadline: "2025-01-30",
    featured: true,
    skills: ["Web Development", "E-commerce", "Restaurant Industry", "Mobile Design"]
  }
]

export function GigsBrowse() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")

  const filteredGigs = mockGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || 
                           gig.category.toLowerCase().includes(selectedCategory.toLowerCase())
    
    const matchesBudget = selectedBudget === "all" || 
                         (selectedBudget === "under1000" && gig.budget < 1000) ||
                         (selectedBudget === "1000-2500" && gig.budget >= 1000 && gig.budget <= 2500) ||
                         (selectedBudget === "over2500" && gig.budget > 2500)
    
    return matchesSearch && matchesCategory && matchesBudget
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Browse Gigs</h1>
          <p className="text-muted-foreground">
            Find your next creative opportunity in Brooklyn
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search gigs, skills, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="muralist">Muralist</SelectItem>
              <SelectItem value="graphic">Graphic Designer</SelectItem>
              <SelectItem value="photographer">Photographer</SelectItem>
              <SelectItem value="web">Web Designer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBudget} onValueChange={setSelectedBudget}>
            <SelectTrigger className="w-full md:w-48">
              <DollarSign className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="under1000">Under $1,000</SelectItem>
              <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
              <SelectItem value="over2500">Over $2,500</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Found {filteredGigs.length} gig{filteredGigs.length !== 1 ? 's' : ''}
        </div>

        {/* Gigs List */}
        <div className="space-y-6">
          {filteredGigs.map((gig, index) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold hover:text-red-500 transition-colors cursor-pointer">
                          {gig.title}
                        </h3>
                        {gig.featured && (
                          <Badge className="bg-red-500 text-white">Featured</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">by {gig.client}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${gig.budget.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {gig.budgetType} price
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {gig.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{gig.category}</Badge>
                    {gig.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {gig.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{gig.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{gig.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{gig.timeline}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due {new Date(gig.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{gig.applications} applications</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Posted {gig.postedAgo}
                    </span>
                    <Link href={`/gigs/${gig.id}`}>
                      <Button className="bg-red-500 hover:bg-red-600">
                        View Details & Apply
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No gigs found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedBudget("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

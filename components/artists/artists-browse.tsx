
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Verified, Search, Filter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

// Mock data - in real app, this would come from API
const mockArtists = [
  {
    id: "1",
    name: "Maya Rodriguez",
    businessName: "Maya Rodriguez Art",
    specialty: "Muralist",
    location: "Williamsburg",
    rating: 4.9,
    reviewCount: 23,
    hourlyRate: 85,
    portfolio: "https://i.pinimg.com/originals/3d/33/a7/3d33a780155df0085488328b0948b832.jpg",
    verified: true,
    description: "Specializing in large-scale community murals with vibrant, storytelling elements",
    skills: ["Street Art", "Murals", "Community Art", "Spray Paint"],
    completedProjects: 18
  },
  {
    id: "2",
    name: "James Chen",
    businessName: "Chen Design Studio",
    specialty: "Graphic Designer",
    location: "DUMBO",
    rating: 5.0,
    reviewCount: 17,
    hourlyRate: 75,
    portfolio: "https://i.pinimg.com/736x/03/91/c9/0391c944b74e3316f0509bab4095311c.jpg",
    verified: true,
    description: "Clean, modern branding for startups and local businesses",
    skills: ["Brand Identity", "Logo Design", "Print Design", "Digital Marketing"],
    completedProjects: 24
  },
  {
    id: "3",
    name: "Sarah Williams",
    businessName: "Williams Photography",
    specialty: "Photographer",
    location: "Park Slope",
    rating: 4.8,
    reviewCount: 31,
    hourlyRate: 120,
    portfolio: "https://i.pinimg.com/originals/f4/bb/ca/f4bbcaedc72794adde841bc843e68a7b.jpg",
    verified: true,
    description: "Event and portrait photography with a focus on authentic moments",
    skills: ["Event Photography", "Portraits", "Wedding Photography", "Commercial"],
    completedProjects: 42
  },
  {
    id: "4",
    name: "Alex Thompson",
    businessName: "Thompson Digital",
    specialty: "Web Designer",
    location: "Bushwick",
    rating: 4.9,
    reviewCount: 19,
    hourlyRate: 95,
    portfolio: "https://i.pinimg.com/originals/a2/7b/3e/a27b3eaa1a3dcd5e0ff4abe90684c050.jpg",
    verified: true,
    description: "Full-stack web design and development for creative businesses",
    skills: ["Web Development", "UI/UX Design", "E-commerce", "Responsive Design"],
    completedProjects: 16
  }
]

export function ArtistsBrowse() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const filteredArtists = mockArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || 
                           artist.specialty.toLowerCase().includes(selectedCategory.toLowerCase())
    
    const matchesLocation = selectedLocation === "all" || 
                           artist.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
    return matchesSearch && matchesCategory && matchesLocation
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
          <h1 className="text-3xl font-bold">Find Brooklyn Artists</h1>
          <p className="text-muted-foreground">
            Discover talented creatives in your neighborhood
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search artists, skills, or specialties..."
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

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brooklyn</SelectItem>
              <SelectItem value="williamsburg">Williamsburg</SelectItem>
              <SelectItem value="dumbo">DUMBO</SelectItem>
              <SelectItem value="park slope">Park Slope</SelectItem>
              <SelectItem value="bushwick">Bushwick</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Found {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}
        </div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={artist.portfolio}
                    alt={`${artist.name}'s portfolio work`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    {artist.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        <Verified className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-red-500 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {artist.businessName}
                    </p>
                    <p className="text-sm font-medium text-red-500">
                      {artist.specialty}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{artist.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{artist.rating}</span>
                      <span className="text-muted-foreground">({artist.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {artist.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">${artist.hourlyRate}</span>
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {artist.completedProjects} projects
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {artist.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {artist.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{artist.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Link href={`/artists/${artist.id}`}>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-red-50 group-hover:text-red-600 group-hover:border-red-200">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No artists found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLocation("all")
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

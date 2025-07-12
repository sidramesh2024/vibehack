
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Verified } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

const featuredArtists = [
  {
    id: "1",
    name: "Maya Rodriguez",
    specialty: "Muralist",
    location: "Williamsburg",
    rating: 4.9,
    reviewCount: 23,
    portfolio: "https://i.pinimg.com/originals/3d/33/a7/3d33a780155df0085488328b0948b832.jpg",
    verified: true,
    description: "Specializing in large-scale community murals with vibrant, storytelling elements",
  },
  {
    id: "2",
    name: "James Chen",
    specialty: "Graphic Designer",
    location: "DUMBO",
    rating: 5.0,
    reviewCount: 17,
    portfolio: "https://images.remotehub.com/f2452294a45511edaa00063b1469b0d8/original_thumb/be857947.jpg?version=1675492460",
    verified: true,
    description: "Clean, modern branding for startups and local businesses",
  },
  {
    id: "3",
    name: "Sarah Williams",
    specialty: "Photographer",
    location: "Park Slope",
    rating: 4.8,
    reviewCount: 31,
    portfolio: "https://i.pinimg.com/originals/f4/bb/ca/f4bbcaedc72794adde841bc843e68a7b.jpg",
    verified: true,
    description: "Event and portrait photography with a focus on authentic moments",
  },
  {
    id: "4",
    name: "Alex Thompson",
    specialty: "Web Designer",
    location: "Bushwick",
    rating: 4.9,
    reviewCount: 19,
    portfolio: "https://i.pinimg.com/originals/a2/7b/3e/a27b3eaa1a3dcd5e0ff4abe90684c050.jpg",
    verified: true,
    description: "Full-stack web design and development for creative businesses",
  },
]

export function FeaturedArtists() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Meet Brooklyn's <span className="text-red-500">Top Creatives</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verified artists with proven track records in our community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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

                  <Link href={`/artists/${artist.id}`}>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-red-50 group-hover:text-red-600 group-hover:border-red-200">
                      View Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/artists">
            <Button size="lg" className="bg-red-500 hover:bg-red-600">
              Explore All Artists
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

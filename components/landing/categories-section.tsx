
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Palette, Pen, Monitor, Film, Brush } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = [
  {
    icon: Brush,
    title: "Muralists",
    description: "Large-scale wall art and street murals",
    count: "150+ artists",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Pen,
    title: "Graphic Designers",
    description: "Logos, branding, and visual identity",
    count: "200+ artists",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Camera,
    title: "Photographers",
    description: "Events, portraits, and commercial photography",
    count: "180+ artists",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Monitor,
    title: "Web Designers",
    description: "Websites, apps, and digital experiences",
    count: "120+ artists",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Palette,
    title: "Illustrators",
    description: "Digital and traditional illustration",
    count: "90+ artists",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Film,
    title: "Video Editors",
    description: "Motion graphics and video production",
    count: "75+ artists",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Find The Perfect Creative <span className="text-red-500">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse by specialty to find exactly what your project needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${category.bgColor}`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg group-hover:text-red-500 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
                      <p className="text-sm font-medium text-red-500">
                        {category.count}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Link href={`/artists?category=${category.title.toLowerCase().replace(' ', '_')}`}>
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-red-50 group-hover:text-red-600">
                        Browse {category.title}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/artists">
            <Button size="lg" variant="outline" className="border-red-200 hover:bg-red-50">
              View All Categories
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

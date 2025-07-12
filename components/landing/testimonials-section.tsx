
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: "1",
    name: "Maria Santos",
    role: "Restaurant Owner",
    location: "Red Hook",
    rating: 5,
    avatar: "https://i.pinimg.com/736x/11/0a/d4/110ad49fe0756b804c35284ea2101968.jpg",
    content: "Brooklyn Creative Hub connected me with an amazing muralist who transformed my restaurant. The platform made it so easy to find local talent and manage the project.",
  },
  {
    id: "2",
    name: "David Kim",
    role: "Freelance Photographer",
    location: "Williamsburg",
    rating: 5,
    avatar: "https://i.pinimg.com/originals/67/28/eb/6728ebffa5cbcb6e05ec5403b8e4e835.png",
    content: "As a photographer, this platform has been game-changing. I've booked more shoots in 6 months than I did in the previous year. The local focus really works.",
  },
  {
    id: "3",
    name: "Jessica Rodriguez",
    role: "Tech Startup Founder",
    location: "DUMBO",
    rating: 5,
    avatar: "https://i.pinimg.com/originals/58/6b/97/586b970ea96eee2b0eb7e39020094898.jpg",
    content: "Found our brand designer through Brooklyn Creative Hub. The quality was exceptional and the process was seamless. Highly recommend for any creative project.",
  },
]

export function TestimonialsSection() {
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
            What Our <span className="text-red-500">Community</span> Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from artists and clients who've found success on our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="w-8 h-8 text-red-100 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground italic pl-6">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 pt-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

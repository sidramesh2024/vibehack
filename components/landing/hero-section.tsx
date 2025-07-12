
"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Palette, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="container mx-auto max-w-7xl px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Brooklyn's Creative Community</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Where Brooklyn's
                <span className="text-red-500 block">Creative Talent</span>
                Meets Opportunity
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with local muralists, graphic designers, and photographers. 
                Build your portfolio, find your next project, and grow your creative business.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register?role=artist">
                <Button size="lg" className="w-full sm:w-auto bg-red-500 hover:bg-red-600">
                  <Palette className="mr-2 h-5 w-5" />
                  I'm an Artist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/auth/register?role=client">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-red-200 hover:bg-red-50">
                  <Users className="mr-2 h-5 w-5" />
                  I'm Looking to Hire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">500+</div>
                <div className="text-sm text-muted-foreground">Active Artists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">1,200+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">25+</div>
                <div className="text-sm text-muted-foreground">Neighborhoods</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <Image
                src="https://i.pinimg.com/originals/3a/29/ad/3a29ad61d17081adfe5ea26b80f3cd10.jpg"
                alt="Brooklyn street artist creating a colorful mural"
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Palette className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Live Project</div>
                    <div className="text-xs text-muted-foreground">Williamsburg Mural</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

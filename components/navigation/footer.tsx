
import Link from "next/link"
import { Palette, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold">Brooklyn Creative Hub</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Connecting Brooklyn's creative community with opportunities and growth.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>Brooklyn, NY</span>
            </div>
          </div>

          {/* For Artists */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Artists</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/auth/register?role=artist" className="block hover:text-white transition-colors">
                Join as Artist
              </Link>
              <Link href="/artist/portfolio" className="block hover:text-white transition-colors">
                Build Portfolio
              </Link>
              <Link href="/gigs" className="block hover:text-white transition-colors">
                Find Gigs
              </Link>
              <Link href="/pricing" className="block hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          {/* For Clients */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Clients</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/auth/register?role=client" className="block hover:text-white transition-colors">
                Join as Client
              </Link>
              <Link href="/artists" className="block hover:text-white transition-colors">
                Browse Artists
              </Link>
              <Link href="/client/post-gig" className="block hover:text-white transition-colors">
                Post a Gig
              </Link>
              <Link href="/how-it-works" className="block hover:text-white transition-colors">
                How It Works
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/help" className="block hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="block hover:text-white transition-colors">
                Contact Us
              </Link>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@brooklyncreativehub.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Brooklyn Creative Hub. Building community through creativity.</p>
        </div>
      </div>
    </footer>
  )
}

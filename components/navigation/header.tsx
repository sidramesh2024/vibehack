
"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Palette, 
  User, 
  LogOut, 
  MessageSquare, 
  Briefcase,
  Camera,
  Search,
  Plus
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserRole } from "@prisma/client"

export function Header() {
  const { data: session, status } = useSession()

  const getInitials = (name?: string | null) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Palette className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">Brooklyn Creative Hub</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {session ? (
            // Authenticated Navigation
            <>
              {session.user.role === UserRole.ARTIST ? (
                <>
                  <Link href="/artist/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/artist/portfolio" className="text-sm font-medium hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                  <Link href="/gigs" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                    <Search className="h-4 w-4" />
                    <span>Find Gigs</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/client/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/artists" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                    <Search className="h-4 w-4" />
                    <span>Find Artists</span>
                  </Link>
                  <Link href="/client/post-gig">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Plus className="h-4 w-4" />
                      <span>Post Gig</span>
                    </Button>
                  </Link>
                </>
              )}
              
              <Link href="/messages" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
            </>
          ) : (
            // Unauthenticated Navigation
            <>
              <Link href="/artists" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Artists
              </Link>
              <Link href="/gigs" className="text-sm font-medium hover:text-primary transition-colors">
                Find Gigs
              </Link>
            </>
          )}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                    <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/billing" className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

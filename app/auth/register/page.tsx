
import { RegisterForm } from "@/components/auth/register-form"
import { Header } from "@/components/navigation/header"
import Link from "next/link"
import { Palette } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-md px-4 py-16">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Palette className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold">Join Brooklyn Creative Hub</h1>
            <p className="text-muted-foreground">
              Connect with Brooklyn's creative community
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm />

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login" className="text-red-500 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

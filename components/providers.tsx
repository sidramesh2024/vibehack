
"use client"

import { ThemeProvider } from "./theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { PropsWithChildren, useEffect, useState } from "react"

export function Providers({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}

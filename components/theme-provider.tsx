"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Using any as a workaround for typing issues during build
export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode 
} & Record<string, any>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 
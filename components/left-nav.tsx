"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Home, Settings, Flag, Zap } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/env-vars", label: "Environment Variables", icon: Settings },
  { href: "/flags-statsig", label: "Feature Flags (Statsig)", icon: Flag },
  { href: "/edge-config", label: "Edge Config", icon: Zap },
]

export function LeftNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Aggressively prefetch ALL routes on mount for instant navigation
  useEffect(() => {
    navItems.forEach((item) => {
      router.prefetch(item.href)
    })
  }, [router])

  // Prefetch on hover for extra assurance (handles any cache expiration)
  const handleMouseEnter = useCallback((href: string) => {
    router.prefetch(href)
  }, [router])

  return (
    <nav className="w-64 shrink-0 border-r border-border bg-sidebar p-4 flex flex-col h-screen sticky top-0">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-sidebar-foreground">Vercel Config Demo</h1>
        <p className="text-xs text-muted-foreground mt-1">Static vs Dynamic Configuration</p>
      </div>
      <ul className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={true}
                onMouseEnter={() => handleMouseEnter(item.href)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Theme</p>
        <ThemeToggle />
      </div>
    </nav>
  )
}

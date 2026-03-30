"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Settings, Flag, Zap } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/env-vars", label: "Environment Variables", icon: Settings },
  { href: "/flags-statsig", label: "Feature Flags (Statsig)", icon: Flag },
  { href: "/edge-config", label: "Edge Config", icon: Zap },
]

export function LeftNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 shrink-0 border-r border-border bg-sidebar p-4">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-sidebar-foreground">Vercel Config Demo</h1>
        <p className="text-xs text-muted-foreground mt-1">Static vs Dynamic Configuration</p>
      </div>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
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
    </nav>
  )
}

"use client";

import { Flag, Home, Settings, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/env-vars", label: "Environment Variables", icon: Settings },
  { href: "/flags-statsig", label: "Feature Flags (Statsig)", icon: Flag },
  { href: "/edge-config", label: "Edge Config", icon: Zap },
];

export function LeftNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Aggressively prefetch ALL routes on mount for instant navigation
  useEffect(() => {
    for (const item of navItems) {
      router.prefetch(item.href);
    }
  }, [router]);

  // Prefetch on hover for extra assurance (handles any cache expiration)
  const handleMouseEnter = useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router]
  );

  return (
    <nav className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-border border-r bg-sidebar p-4">
      <div className="mb-6">
        <h1 className="font-bold text-lg text-sidebar-foreground">
          Vercel Config Demo
        </h1>
        <p className="mt-1 text-muted-foreground text-xs">
          Static vs Dynamic Configuration
        </p>
      </div>
      <ul className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                href={item.href}
                onMouseEnter={() => handleMouseEnter(item.href)}
                prefetch={true}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-border border-t pt-4">
        <p className="mb-2 text-muted-foreground text-xs">Theme</p>
        <ThemeToggle />
      </div>
    </nav>
  );
}

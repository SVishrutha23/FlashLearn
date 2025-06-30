"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Languages } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  if (pathname === "/") return null

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Languages className="w-6 h-6" />
            <span className="font-bold text-xl">FLASH LEARN</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/flashcards" className="text-sm font-medium hover:text-primary">
              Flashcards
            </Link>
            <Link href="/quiz" className="text-sm font-medium hover:text-primary">
              Quiz Mode
            </Link>
            <Link href="/progress" className="text-sm font-medium hover:text-primary">
              Progress
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}


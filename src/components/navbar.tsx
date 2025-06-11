"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut, LayoutDashboard, Package, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (!role) {
      router.push("/")
      return
    }
    setUserRole(role)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    router.push("/")
  }

  if (!userRole) {
    return null
  }

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Slooze</h1>
          <div className="hidden md:flex items-center gap-4">
            {userRole === "manager" && (
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => router.push("/products")}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Products
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {userRole === "manager" && (
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => router.push("/products")}>
                <Package className="mr-2 h-4 w-4" />
                Products
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
} 
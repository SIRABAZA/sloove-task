"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function DashboardPage() {
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

  if (!userRole) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        {userRole === "manager" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Products</CardTitle>
                <CardDescription>Overview of your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
                <CardDescription>Items that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">23</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">56</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to view the dashboard. Please contact your manager for access.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </main>
    </div>
  )
} 
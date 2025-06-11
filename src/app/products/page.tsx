"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Plus } from "lucide-react"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Navbar } from "@/components/navbar"
import { AddProductDialog } from "@/components/add-product-dialog"
import { EditProductDialog } from "@/components/edit-product-dialog"

interface Product {
  id: number
  name: string
  category: string
  stock: number
  price: number
  image: string
}

// Placeholder image data
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3EProduct Image%3C/text%3E%3C/svg%3E"

// Sample product data
const initialProducts: Product[] = [
  { 
    id: 1, 
    name: "Gold Bar", 
    category: "Precious Metals", 
    stock: 100, 
    price: 1950.00,
    image: "/images/gold.jpg"
  },
  { 
    id: 2, 
    name: "Silver Coin", 
    category: "Precious Metals", 
    stock: 500, 
    price: 25.50,
    image: "/images/silver.jpg"
  },
  { 
    id: 3, 
    name: "Crude Oil", 
    category: "Energy", 
    stock: 1000, 
    price: 75.25,
    image: "/images/oil.jpg"
  },
  { 
    id: 4, 
    name: "Natural Gas", 
    category: "Energy", 
    stock: 750, 
    price: 3.50,
    image: "/images/gas.jpg"
  },
  { 
    id: 5, 
    name: "Copper Wire", 
    category: "Industrial Metals", 
    stock: 150, 
    price: 29.99,
    image: "/images/copper.jpg"
  },
]

export default function ProductsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (!role) {
      router.push("/")
      return
    }
    setUserRole(role)
  }, [router])

  const handleAddProduct = (newProduct: {
    name: string
    category: string
    stock: number
    price: number
    image: string
  }) => {
    const product: Product = {
      id: products.length + 1,
      ...newProduct,
    }
    setProducts([...products, product])
  }

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
  }

  if (!userRole) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your product catalog</CardDescription>
              </div>
              {userRole === "manager" && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {userRole === "manager" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative w-12 h-12">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative w-full h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stock:</span>
                          <span className="font-medium">{product.stock} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddProduct={handleAddProduct}
      />

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onEditProduct={handleEditProduct}
        />
      )}
    </div>
  )
} 
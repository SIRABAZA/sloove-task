"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  stock: number
  price: number
  image: string
}

interface EditProductDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditProduct: (product: Product) => void
}

export function EditProductDialog({
  product,
  open,
  onOpenChange,
  onEditProduct,
}: EditProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    image: "",
  })

  useEffect(() => {
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      price: product.price.toString(),
      image: product.image,
    })
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditProduct({
      ...product,
      name: formData.name,
      category: formData.category,
      stock: Number(formData.stock),
      price: Number(formData.price),
      image: formData.image,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
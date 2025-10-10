import { useEffect, useState } from "react"
import { Product, mockProducts } from "@/lib/mock-data"
import { productStore } from "@/lib/product-store"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = productStore.getProducts()
    return stored.length > 0 ? stored : mockProducts
  })

  useEffect(() => {
    // Initialize with mock data if empty
    if (productStore.getProducts().length === 0) {
      productStore.setProducts(mockProducts)
    }

    // Subscribe to changes
    const unsubscribe = productStore.subscribe((updatedProducts) => {
      setProducts(updatedProducts)
    })

    return unsubscribe
  }, [])

  const addProduct = (product: Omit<Product, "id" | "generatedCount">) => {
    return productStore.addProduct(product)
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    productStore.updateProduct(id, updates)
  }

  const deleteProduct = (id: number) => {
    productStore.deleteProduct(id)
  }

  const incrementGeneratedCount = (id: number) => {
    const product = products.find((p) => p.id === id)
    if (product) {
      productStore.updateProduct(id, { generatedCount: product.generatedCount + 1 })
    }
  }

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    incrementGeneratedCount,
  }
}

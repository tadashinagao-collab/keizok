import { Product } from "./mock-data"

// Simple event emitter for cross-component communication
type ProductListener = (products: Product[]) => void

class ProductStore {
  private products: Product[] = []
  private listeners: Set<ProductListener> = new Set()
  private nextId: number = 7 // Start after mock data

  constructor() {
    // Initialize with mock data
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("products")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          this.products = parsed
          this.nextId = Math.max(...parsed.map((p: Product) => p.id), 6) + 1
        } catch {
          // Ignore parse errors
        }
      }
    }
  }

  getProducts(): Product[] {
    return [...this.products]
  }

  addProduct(product: Omit<Product, "id" | "generatedCount">): Product {
    const newProduct: Product = {
      ...product,
      id: this.nextId++,
      generatedCount: 0,
    }
    this.products = [...this.products, newProduct]
    this.save()
    this.notifyListeners()
    return newProduct
  }

  updateProduct(id: number, updates: Partial<Product>): void {
    this.products = this.products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    this.save()
    this.notifyListeners()
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id)
    this.save()
    this.notifyListeners()
  }

  setProducts(products: Product[]): void {
    this.products = products
    this.save()
    this.notifyListeners()
  }

  subscribe(listener: ProductListener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.getProducts()))
  }

  private save(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(this.products))
    }
  }
}

export const productStore = new ProductStore()

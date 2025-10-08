"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, ExternalLink, Trash2, Edit, Sparkles } from "lucide-react"

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "サマーコレクション ワンピース",
    price: "¥8,900",
    category: "ファッション",
    url: "https://example.com/products/summer-dress",
    image: "/summer-dress.jpg",
    generatedCount: 12,
  },
  {
    id: 2,
    name: "オーガニックコットン Tシャツ",
    price: "¥3,500",
    category: "ファッション",
    url: "https://example.com/products/organic-tshirt",
    image: "/organic-cotton-tshirt.jpg",
    generatedCount: 8,
  },
  {
    id: 3,
    name: "レザーハンドバッグ",
    price: "¥15,800",
    category: "アクセサリー",
    url: "https://example.com/products/leather-bag",
    image: "/leather-handbag.jpg",
    generatedCount: 15,
  },
  {
    id: 4,
    name: "スニーカー ホワイト",
    price: "¥12,000",
    category: "シューズ",
    url: "https://example.com/products/white-sneakers",
    image: "/white-sneakers.jpg",
    generatedCount: 20,
  },
  {
    id: 5,
    name: "サングラス UV400",
    price: "¥6,800",
    category: "アクセサリー",
    url: "https://example.com/products/sunglasses",
    image: "/stylish-sunglasses.png",
    generatedCount: 5,
  },
  {
    id: 6,
    name: "デニムジャケット",
    price: "¥9,800",
    category: "ファッション",
    url: "https://example.com/products/denim-jacket",
    image: "/denim-jacket.jpg",
    generatedCount: 10,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Mock add functionality
    setIsAddDialogOpen(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">商品管理</h1>
          <p className="text-muted-foreground mt-2">ECサイトの商品を管理してAIコンテンツを生成</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              商品を追加
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>新しい商品を追加</DialogTitle>
              <DialogDescription>商品情報を入力するか、ECサイトのURLを貼り付けてください</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-url">商品URL</Label>
                <Input id="product-url" placeholder="https://example.com/products/item" />
                <p className="text-xs text-muted-foreground">URLを入力すると自動で商品情報を取得します</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">または手動で入力</span>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product-name">商品名</Label>
                  <Input id="product-name" placeholder="商品名を入力" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price">価格</Label>
                  <Input id="product-price" placeholder="¥0,000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">カテゴリー</Label>
                <Input id="product-category" placeholder="ファッション、アクセサリーなど" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">商品説明</Label>
                <Textarea id="product-description" placeholder="商品の特徴や魅力を入力してください" rows={4} />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button type="submit">追加</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="商品を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur">{product.category}</Badge>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{product.price}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>{product.generatedCount}件のコンテンツ生成済み</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    商品ページ
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">商品が見つかりませんでした</p>
        </Card>
      )}
    </div>
  )
}

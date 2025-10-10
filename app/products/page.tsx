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
import { Plus, Search, ExternalLink, Trash2, Edit, Sparkles, LinkIcon, Loader2 } from "lucide-react"
import { useProducts } from "@/hooks/use-products"

export default function ProductsPage() {
  const { products, addProduct, deleteProduct } = useProducts()

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [productUrl, setProductUrl] = useState("")
  const [isImporting, setIsImporting] = useState(false)
  const [importedProductInfo, setImportedProductInfo] = useState<{
    name: string
    price: string
    category: string
    description: string
    url: string
    image: string
  } | null>(null)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleImportProduct = async () => {
    if (!productUrl) return

    setIsImporting(true)
    // Mock API call to fetch product info
    setTimeout(() => {
      setImportedProductInfo({
        name: "サンプル商品名",
        price: "¥5,980",
        category: "ファッション",
        description: "この商品は高品質な素材を使用し、優れたデザインと機能性を兼ね備えています。",
        url: productUrl,
        image: "/placeholder.svg"
      })
      setIsImporting(false)
    }, 1500)
  }

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (importedProductInfo) {
      addProduct({
        name: importedProductInfo.name,
        price: importedProductInfo.price,
        category: importedProductInfo.category,
        description: importedProductInfo.description,
        url: importedProductInfo.url,
        image: importedProductInfo.image
      })
    }

    setIsAddDialogOpen(false)
    setProductUrl("")
    setImportedProductInfo(null)
  }

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id)
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
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="product-url"
                      placeholder="https://example.com/products/item"
                      className="pl-9"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImportProduct}
                    disabled={!productUrl || isImporting}
                  >
                    {isImporting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        取得中
                      </>
                    ) : (
                      "インポート"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">URLを入力すると自動で商品情報を取得します</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-name">商品名</Label>
                <Input
                  id="product-name"
                  placeholder="商品名を入力"
                  value={importedProductInfo?.name || ""}
                  onChange={(e) =>
                    setImportedProductInfo(
                      importedProductInfo
                        ? { ...importedProductInfo, name: e.target.value }
                        : { name: e.target.value, price: "", category: "", description: "", url: "", image: "/placeholder.svg" }
                    )
                  }
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product-price">価格</Label>
                  <Input
                    id="product-price"
                    placeholder="¥0,000"
                    value={importedProductInfo?.price || ""}
                    onChange={(e) =>
                      setImportedProductInfo(
                        importedProductInfo
                          ? { ...importedProductInfo, price: e.target.value }
                          : { name: "", price: e.target.value, category: "", description: "", url: "", image: "/placeholder.svg" }
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">カテゴリー</Label>
                  <Input
                    id="product-category"
                    placeholder="ファッション、アクセサリーなど"
                    value={importedProductInfo?.category || ""}
                    onChange={(e) =>
                      setImportedProductInfo(
                        importedProductInfo
                          ? { ...importedProductInfo, category: e.target.value }
                          : { name: "", price: "", category: e.target.value, description: "", url: "", image: "/placeholder.svg" }
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">商品説明</Label>
                <Textarea
                  id="product-description"
                  placeholder="商品の特徴や魅力を入力してください"
                  rows={4}
                  value={importedProductInfo?.description || ""}
                  onChange={(e) =>
                    setImportedProductInfo(
                      importedProductInfo
                        ? { ...importedProductInfo, description: e.target.value }
                        : { name: "", price: "", category: "", description: e.target.value, url: "", image: "/placeholder.svg" }
                    )
                  }
                />
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

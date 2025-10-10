"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, LinkIcon, Loader2, Download, Image, PlayCircle, Share2, Package } from "lucide-react"
import { useProducts } from "@/hooks/use-products"

type InputMethod = "product" | "new"
type GenerationType = "post" | "ad"
type PostContentType = "1:1" | "4:5" | "story" | "video"

const postContentOptions: Array<{
  value: PostContentType
  label: string
  ratio: string
  type: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  aspectRatio: string
  gradient: string
}> = [
  {
    value: "1:1",
    label: "1:1",
    ratio: "1:1",
    type: "画像",
    icon: Image,
    description: "1080 × 1080 px",
    aspectRatio: "1:1",
    gradient: "from-blue-400 to-purple-500"
  },
  {
    value: "4:5",
    label: "4:5",
    ratio: "4:5",
    type: "画像",
    icon: Image,
    description: "1080 × 1350 px",
    aspectRatio: "4:5",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    value: "story",
    label: "16:9",
    ratio: "16:9",
    type: "ストーリー",
    icon: PlayCircle,
    description: "1920 × 1080 px",
    aspectRatio: "16:9",
    gradient: "from-pink-400 to-rose-500"
  },
  {
    value: "video",
    label: "16:9",
    ratio: "16:9",
    type: "SNS動画",
    icon: PlayCircle,
    description: "1920 × 1080 px",
    aspectRatio: "16:9",
    gradient: "from-cyan-400 to-blue-500"
  }
]

export default function GeneratePage() {
  const { products, addProduct, incrementGeneratedCount } = useProducts()

  const [inputMethod, setInputMethod] = useState<InputMethod>("product")
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [generationType, setGenerationType] = useState<GenerationType>("post")
  const [postContentType, setPostContentType] = useState<PostContentType>("1:1")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  // New product fields
  const [productUrl, setProductUrl] = useState<string>("")
  const [isImporting, setIsImporting] = useState(false)
  const [newProductInfo, setNewProductInfo] = useState<{
    name: string
    price: string
    category: string
    description: string
    url: string
    image: string
  }>({
    name: "",
    price: "",
    category: "",
    description: "",
    url: "",
    image: ""
  })

  const handleImportProduct = async () => {
    if (!productUrl) return

    setIsImporting(true)
    // Mock API call to fetch product info
    setTimeout(() => {
      setNewProductInfo({
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

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGenerating(true)

    // If creating with new product, add it to the product store first
    let productId: number | null = null

    if (inputMethod === "new") {
      const newProduct = addProduct({
        name: newProductInfo.name,
        price: newProductInfo.price,
        category: newProductInfo.category,
        description: newProductInfo.description,
        url: newProductInfo.url,
        image: newProductInfo.image
      })
      productId = newProduct.id
    } else {
      productId = selectedProduct ? parseInt(selectedProduct) : null
    }

    // Mock generation process
    setTimeout(() => {
      setGeneratedContent("/instagram-post.jpg")
      setIsGenerating(false)

      // Increment generated count for the product
      if (productId) {
        incrementGeneratedCount(productId)
      }
    }, 3000)
  }

  const handleDownload = (index?: number) => {
    console.log("[v0] Downloading generated content", index)
  }

  const handleShare = () => {
    console.log("[v0] Sharing content")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-balance">新規作成</h1>
        <p className="text-muted-foreground text-lg">商品を選択または追加して投稿を作成</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">商品の選択方法</Label>
              <RadioGroup value={inputMethod} onValueChange={(value: InputMethod) => setInputMethod(value)}>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="product" id="product" />
                  <Label htmlFor="product" className="font-normal cursor-pointer flex-1">
                    登録済み商品から選択
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="font-normal cursor-pointer flex-1">
                    新規商品を追加して投稿を作成
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {inputMethod === "product" && (
              <div className="space-y-2">
                <Label htmlFor="product-select">商品を選択</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger id="product-select">
                    <SelectValue placeholder="商品を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProduct && (
                  <div className="mt-4 space-y-3">
                    <div className="aspect-square max-w-xs bg-muted rounded-lg overflow-hidden ring-1 ring-border">
                      <img
                        src={products.find((p) => p.id.toString() === selectedProduct)?.image || "/placeholder.svg"}
                        alt="Selected product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm font-medium">{products.find((p) => p.id.toString() === selectedProduct)?.name}</p>
                      <p className="text-sm text-muted-foreground">{products.find((p) => p.id.toString() === selectedProduct)?.price}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {inputMethod === "new" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-url">商品ページURL（オプション）</Label>
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
                  <p className="text-xs text-muted-foreground">URLから自動で商品情報を取得できます</p>
                </div>

                <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">商品名 <span className="text-destructive">*</span></Label>
                    <Input
                      id="product-name"
                      placeholder="商品名を入力"
                      value={newProductInfo.name}
                      onChange={(e) =>
                        setNewProductInfo({ ...newProductInfo, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="product-price">価格 <span className="text-destructive">*</span></Label>
                      <Input
                        id="product-price"
                        placeholder="¥0,000"
                        value={newProductInfo.price}
                        onChange={(e) =>
                          setNewProductInfo({ ...newProductInfo, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-category">カテゴリー <span className="text-destructive">*</span></Label>
                      <Input
                        id="product-category"
                        placeholder="ファッション、アクセサリーなど"
                        value={newProductInfo.category}
                        onChange={(e) =>
                          setNewProductInfo({ ...newProductInfo, category: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-description">商品説明</Label>
                    <Textarea
                      id="product-description"
                      placeholder="商品の特徴や魅力を入力してください"
                      value={newProductInfo.description}
                      onChange={(e) =>
                        setNewProductInfo({ ...newProductInfo, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    この商品は商品管理に自動的に追加されます
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Label className="text-base font-semibold">生成タイプを選択</Label>

              {/* Step 1: 投稿 or 広告 */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGenerationType("post")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    generationType === "post"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-center">
                    <p className={`font-medium ${generationType === "post" ? "text-primary" : ""}`}>投稿</p>
                    <p className="text-xs text-muted-foreground mt-1">SNS投稿用コンテンツ</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGenerationType("ad")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    generationType === "ad"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-center">
                    <p className={`font-medium ${generationType === "ad" ? "text-primary" : ""}`}>広告</p>
                    <p className="text-xs text-muted-foreground mt-1">広告用コンテンツ</p>
                  </div>
                </button>
              </div>

              {/* Step 2: 投稿の詳細タイプ選択 */}
              {generationType === "post" && (
                <div className="space-y-2 pt-2">
                  <Label className="text-sm text-muted-foreground">投稿フォーマット</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {postContentOptions.map((option) => {
                      const Icon = option.icon
                      const isSelected = postContentType === option.value

                      // アスペクト比に応じた表示を決定
                      let previewBox = "w-8 h-8" // 1:1
                      if (option.aspectRatio === "4:5") previewBox = "w-8 h-6" // 縦長
                      if (option.aspectRatio === "16:9") previewBox = "w-5 h-9" // 横長

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPostContentType(option.value)}
                          className={`relative p-3 rounded-lg border-2 transition-all hover:scale-[1.02] ${
                            isSelected
                              ? "border-primary shadow-md bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-center py-2">
                              <div className={`${previewBox} rounded border-2 ${isSelected ? "border-primary" : "border-muted-foreground/30"} flex items-center justify-center bg-muted`}>
                                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                              </div>
                            </div>
                            <div className="text-center space-y-0.5">
                              <p className={`text-xs font-medium leading-tight ${isSelected ? "text-primary" : ""}`}>
                                {option.ratio}
                              </p>
                              <p className={`text-xs font-medium leading-tight ${isSelected ? "text-primary" : ""}`}>
                                {option.type}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                              <svg
                                className="h-2.5 w-2.5 text-primary-foreground"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 広告選択時のプレースホルダー */}
              {generationType === "ad" && (
                <div className="p-8 text-center bg-muted/50 rounded-lg border border-dashed border-border">
                  <p className="text-sm text-muted-foreground">広告コンテンツの生成は準備中です</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">カスタムプロンプト（オプション）</Label>
              <Textarea
                id="prompt"
                placeholder="例: 夏のビーチで商品を使用しているシーン、明るく爽やかな雰囲気"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">空欄の場合、AIが自動で最適なプロンプトを生成します</p>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={
                isGenerating ||
                (inputMethod === "product" && !selectedProduct) ||
                (inputMethod === "new" && (!newProductInfo.name || !newProductInfo.price || !newProductInfo.category))
              }
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  コンテンツを生成
                </>
              )}
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">プレビュー</h2>
            {generatedContent ? (
              <div className="space-y-4">
                <div className="group relative aspect-square bg-muted rounded-lg overflow-hidden ring-1 ring-border">
                  <img
                    src={generatedContent || "/placeholder.svg"}
                    alt="Generated content"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white hover:bg-white/90"
                      onClick={() => handleDownload()}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white hover:bg-white/90"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={() => handleDownload()}>
                    <Download className="h-4 w-4 mr-2" />
                    ダウンロード
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Sparkles className="h-4 w-4 mr-2" />
                    再生成
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Sparkles className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {isGenerating ? "AIがコンテンツを生成中..." : "生成されたコンテンツがここに表示されます"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-muted/50 border-border/50">
        <h3 className="font-semibold mb-3">生成のヒント</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• 登録済み商品を選択するか、新規商品を追加して投稿を作成できます</li>
          <li>• 新規商品は商品管理ページに自動的に追加されます</li>
          <li>• カスタムプロンプトで具体的なシーンや雰囲気を指定できます</li>
          <li>• 動画生成には画像生成よりも時間がかかります（約30-60秒）</li>
          <li>• 生成されたコンテンツはギャラリーに自動保存されます</li>
        </ul>
      </Card>
    </div>
  )
}

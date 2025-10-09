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
import { Sparkles, Upload, LinkIcon, Loader2, Download, Instagram, Image, Video, PlayCircle, Megaphone, Share2 } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

type InputMethod = "upload" | "url" | "product"
type ContentType = "post" | "reel" | "story" | "ad"

const contentTypeOptions: Array<{
  value: ContentType
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  size: string
  gradient: string
}> = [
  {
    value: "post",
    label: "Instagram投稿",
    icon: Instagram,
    description: "1080 × 1350 px",
    size: "(4:5)",
    gradient: "from-blue-400 to-purple-500"
  },
  {
    value: "reel",
    label: "Instagramリール動画",
    icon: PlayCircle,
    description: "1080 × 1920 px",
    size: "(9:16)",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    value: "story",
    label: "Instagramストーリー",
    icon: Video,
    description: "1080 × 1920 px",
    size: "(9:16)",
    gradient: "from-pink-400 to-rose-500"
  },
  {
    value: "ad",
    label: "Instagram広告",
    icon: Megaphone,
    description: "1080 × 1350 px",
    size: "(4:5)",
    gradient: "from-cyan-400 to-purple-500"
  }
]

export default function GeneratePage() {
  const [inputMethod, setInputMethod] = useState<InputMethod>("product")
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [contentType, setContentType] = useState<ContentType>("post")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [productUrl, setProductUrl] = useState<string>("")
  const [isImporting, setIsImporting] = useState(false)
  const [importedProductInfo, setImportedProductInfo] = useState<{
    name: string
    price: string
    category: string
    description: string
  } | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGenerating(true)

    // Mock generation process
    setTimeout(() => {
      setGeneratedContent("/instagram-post.jpg")
      setIsGenerating(false)
    }, 3000)
  }

  const handleDownload = (index?: number) => {
    console.log("[v0] Downloading generated content", index)
  }

  const handleShare = () => {
    console.log("[v0] Sharing content")
  }

  const handleImportProduct = async () => {
    if (!productUrl) return

    setIsImporting(true)
    // Mock API call to fetch product info
    setTimeout(() => {
      setImportedProductInfo({
        name: "サンプル商品名",
        price: "¥5,980",
        category: "ファッション",
        description: "この商品は高品質な素材を使用し、優れたデザインと機能性を兼ね備えています。"
      })
      setIsImporting(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-balance">単発コンテンツ生成</h1>
        <p className="text-muted-foreground text-lg">特定の商品について今すぐ投稿を作成</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">入力方法を選択</Label>
              <RadioGroup value={inputMethod} onValueChange={(value: InputMethod) => setInputMethod(value)}>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="product" id="product" />
                  <Label htmlFor="product" className="font-normal cursor-pointer flex-1">
                    登録済み商品から選択
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload" className="font-normal cursor-pointer flex-1">
                    画像をアップロード
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url" className="font-normal cursor-pointer flex-1">
                    商品URLを入力
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
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProduct && (
                  <div className="mt-4 aspect-square max-w-xs bg-muted rounded-lg overflow-hidden ring-1 ring-border">
                    <img
                      src={mockProducts.find((p) => p.id.toString() === selectedProduct)?.image || "/placeholder.svg"}
                      alt="Selected product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {inputMethod === "upload" && (
              <div className="space-y-2">
                <Label htmlFor="image-upload">画像をアップロード</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {uploadedImage ? (
                      <div className="aspect-square max-w-xs mx-auto bg-muted rounded-lg overflow-hidden">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">クリックして画像を選択</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (最大10MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            )}

            {inputMethod === "url" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-url">商品ページURL</Label>
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
                  <p className="text-xs text-muted-foreground">URLから自動で商品情報を取得します</p>
                </div>

                {importedProductInfo && (
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">商品名</Label>
                      <Input
                        id="product-name"
                        value={importedProductInfo.name}
                        onChange={(e) =>
                          setImportedProductInfo({ ...importedProductInfo, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="product-price">価格</Label>
                        <Input
                          id="product-price"
                          value={importedProductInfo.price}
                          onChange={(e) =>
                            setImportedProductInfo({ ...importedProductInfo, price: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-category">カテゴリー</Label>
                        <Input
                          id="product-category"
                          value={importedProductInfo.category}
                          onChange={(e) =>
                            setImportedProductInfo({ ...importedProductInfo, category: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-description">説明</Label>
                      <Textarea
                        id="product-description"
                        value={importedProductInfo.description}
                        onChange={(e) =>
                          setImportedProductInfo({ ...importedProductInfo, description: e.target.value })
                        }
                        rows={3}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      この情報はプロンプトと一緒にAIに送信されます
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <Label className="text-base font-semibold">生成タイプを選択</Label>
              <div className="grid grid-cols-4 gap-2">
                {contentTypeOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = contentType === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setContentType(option.value)}
                      className={`relative p-3 rounded-lg border-2 transition-all hover:scale-[1.02] ${
                        isSelected
                          ? "border-primary shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className={`aspect-[9/16] rounded-md bg-gradient-to-br ${option.gradient} flex items-center justify-center relative overflow-hidden`}>
                          {option.value === "post" || option.value === "ad" ? (
                            <div className="aspect-[4/5] w-4/5 bg-white/10 rounded-sm" />
                          ) : (
                            <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-white/30 rounded-full">
                              <div className="w-1/3 h-full bg-white rounded-full" />
                            </div>
                          )}
                          <div className="absolute top-1.5 right-1.5 bg-white rounded-full p-0.5">
                            <Icon className="h-2.5 w-2.5 text-orange-500" />
                          </div>
                        </div>
                        <div className="text-left space-y-0.5">
                          <p className={`text-xs font-medium ${isSelected ? "text-primary" : ""}`}>
                            {option.label.replace("Instagram", "")}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 left-1.5 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
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

            <div className="space-y-2">
              <Label htmlFor="prompt">カスタムプロンプト（オプション）</Label>
              <Textarea
                id="prompt"
                placeholder="例: 夏のビーチで商品を使用しているシーン、明るく爽やかな雰囲気"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">空欄の場合、AIが自動で最適なプロンプトを生成します</p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isGenerating}>
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
          <li>• 高品質な商品画像を使用すると、より良い結果が得られます</li>
          <li>• カスタムプロンプトで具体的なシーンや雰囲気を指定できます</li>
          <li>• 動画生成には画像生成よりも時間がかかります（約30-60秒）</li>
          <li>• 生成されたコンテンツはギャラリーに自動保存されます</li>
        </ul>
      </Card>
    </div>
  )
}

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
import { Sparkles, Upload, LinkIcon, Loader2, Download, Instagram } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

type InputMethod = "upload" | "url" | "product"

export default function GeneratePage() {
  const [inputMethod, setInputMethod] = useState<InputMethod>("product")
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [contentType, setContentType] = useState<"image" | "video">("image")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

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

  const handleDownload = () => {
    console.log("[v0] Downloading generated content")
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
              <div className="space-y-2">
                <Label htmlFor="product-url">商品ページURL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="product-url" placeholder="https://example.com/products/item" className="pl-9" />
                </div>
                <p className="text-xs text-muted-foreground">URLから自動で商品情報を取得します</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="content-type">生成タイプ</Label>
              <Select value={contentType} onValueChange={(value: "image" | "video") => setContentType(value)}>
                <SelectTrigger id="content-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">画像</SelectItem>
                  <SelectItem value="video">動画</SelectItem>
                </SelectContent>
              </Select>
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
                <div className="aspect-square bg-muted rounded-lg overflow-hidden ring-1 ring-border">
                  <img
                    src={generatedContent || "/placeholder.svg"}
                    alt="Generated content"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    ダウンロード
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagramに投稿
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

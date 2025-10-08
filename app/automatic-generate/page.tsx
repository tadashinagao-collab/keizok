"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LinkIcon, CheckCircle2, AlertCircle, Zap, SettingsIcon, Instagram } from "lucide-react"

export default function SettingsPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [autoGenerate, setAutoGenerate] = useState(true)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-balance">自動コンテンツ生成</h1>
        <p className="text-muted-foreground text-lg">AIが自動でコンテンツを生成</p>
      </div>

      {/* ECサイト連携セクション */}
      <Card className="overflow-hidden border-2 border-primary/20">
        <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <LinkIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">ECサイト連携</h2>
              <p className="text-sm text-muted-foreground">商品情報を自動で取得して投稿を生成</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {!isConnected ? (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-blue-900 dark:text-blue-100">ECサイトを連携しましょう</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    ECサイトを連携すると、商品情報を自動で取得してAIが定期的に投稿コンテンツを生成します
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">ECプラットフォーム</Label>
                  <Select>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="プラットフォームを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="base">BASE</SelectItem>
                      <SelectItem value="stores">STORES</SelectItem>
                      <SelectItem value="makeshop">MakeShop</SelectItem>
                      <SelectItem value="other">その他（URL指定）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-url">ストアURL</Label>
                  <Input id="store-url" type="url" placeholder="https://your-store.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">APIキー（オプション）</Label>
                  <Input id="api-key" type="password" placeholder="より詳細な情報を取得する場合に入力" />
                  <p className="text-xs text-muted-foreground">
                    APIキーを設定すると、在庫情報や価格変更なども自動で反映されます
                  </p>
                </div>

                <Button size="lg" className="w-full gap-2" onClick={() => setIsConnected(true)}>
                  <LinkIcon className="h-4 w-4" />
                  連携する
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-green-900 dark:text-green-100">連携完了</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">https://your-store.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                    >
                      24商品を取得
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                    >
                      最終同期: 2時間前
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsConnected(false)}>
                  解除
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 自動生成設定 */}
      {isConnected && (
        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">自動生成設定</h2>
                <p className="text-sm text-muted-foreground">AIによる自動コンテンツ生成の設定</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-generate" className="text-base font-medium">
                  自動生成を有効化
                </Label>
                <p className="text-sm text-muted-foreground">商品情報から自動的に投稿コンテンツを生成します</p>
              </div>
              <Switch id="auto-generate" checked={autoGenerate} onCheckedChange={setAutoGenerate} />
            </div>

            {autoGenerate && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="frequency">生成頻度</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">毎日</SelectItem>
                      <SelectItem value="weekly">週1回</SelectItem>
                      <SelectItem value="biweekly">週2回</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-type">生成するコンテンツタイプ</Label>
                  <Select defaultValue="both">
                    <SelectTrigger id="content-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">画像と動画</SelectItem>
                      <SelectItem value="image">画像のみ</SelectItem>
                      <SelectItem value="video">動画のみ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">投稿スタイル</Label>
                  <Select defaultValue="modern">
                    <SelectTrigger id="style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">モダン</SelectItem>
                      <SelectItem value="minimal">ミニマル</SelectItem>
                      <SelectItem value="vibrant">ビビッド</SelectItem>
                      <SelectItem value="elegant">エレガント</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

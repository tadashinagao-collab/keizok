"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Calendar, Play, ImageIcon, ExternalLink } from "lucide-react"
import { mockGeneratedContent } from "@/lib/mock-data"

export default function GalleryPage() {
  const [contents, setContents] = useState(mockGeneratedContent)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all")
  const [selectedContent, setSelectedContent] = useState<(typeof contents)[0] | null>(null)

  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.productName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || content.type === filterType
    return matchesSearch && matchesType
  })

  const handleDownload = (content: (typeof contents)[0]) => {
    // Mock download functionality
    console.log("[v0] Downloading:", content.url)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">コンテンツギャラリー</h1>
        <p className="text-muted-foreground mt-2">AIが生成した画像・動画を管理</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="商品名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </Card>
        <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="タイプで絞り込み" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="image">画像のみ</SelectItem>
            <SelectItem value="video">動画のみ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredContents.map((content) => (
          <Card
            key={content.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedContent(content)}
          >
            <div className="aspect-square bg-muted relative group">
              <img
                src={content.thumbnail || "/placeholder.svg"}
                alt={content.productName}
                className="w-full h-full object-cover"
              />
              {content.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <Play className="h-12 w-12 text-white" fill="white" />
                </div>
              )}
              <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur">
                {content.type === "image" ? <ImageIcon className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                {content.type === "image" ? "画像" : "動画"}
              </Badge>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-1">{content.productName}</h3>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(content.createdAt)}</p>
            </div>
          </Card>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">コンテンツが見つかりませんでした</p>
        </Card>
      )}

      <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
        <DialogContent className="max-w-4xl">
          {selectedContent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedContent.productName}</DialogTitle>
                <DialogDescription>生成日時: {formatDate(selectedContent.createdAt)}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                  <img
                    src={selectedContent.url || "/placeholder.svg"}
                    alt={selectedContent.productName}
                    className="w-full h-full object-cover"
                  />
                  {selectedContent.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-16 w-16 text-white" fill="white" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">生成プロンプト</p>
                    <p className="text-sm mt-1">{selectedContent.prompt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedContent.status === "completed" ? "default" : "secondary"}>
                      {selectedContent.status === "completed" ? "完了" : "処理中"}
                    </Badge>
                    <Badge variant="outline">{selectedContent.type === "image" ? "画像" : "動画"}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => handleDownload(selectedContent)}>
                    <Download className="h-4 w-4 mr-2" />
                    ダウンロード
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    投稿予約
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

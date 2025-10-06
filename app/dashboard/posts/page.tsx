"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Clock, CheckCircle2, XCircle, Trash2, Edit, Instagram } from "lucide-react"
import { mockScheduledPosts, mockGeneratedContent } from "@/lib/mock-data"

export default function PostsPage() {
  const [posts, setPosts] = useState(mockScheduledPosts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedContentId, setSelectedContentId] = useState<string>("")

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Mock create functionality
    setIsCreateDialogOpen(false)
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            予約済み
          </Badge>
        )
      case "posted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            投稿済み
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            失敗
          </Badge>
        )
      default:
        return null
    }
  }

  const scheduledPosts = posts.filter((p) => p.status === "scheduled")
  const postedPosts = posts.filter((p) => p.status === "posted")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">投稿管理</h1>
          <p className="text-muted-foreground mt-2">Instagramへの投稿を予約・管理</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新規投稿予約
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>新規投稿を予約</DialogTitle>
              <DialogDescription>生成したコンテンツをInstagramに投稿予約します</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-select">コンテンツを選択</Label>
                <Select value={selectedContentId} onValueChange={setSelectedContentId}>
                  <SelectTrigger id="content-select">
                    <SelectValue placeholder="生成済みコンテンツから選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGeneratedContent.map((content) => (
                      <SelectItem key={content.id} value={content.id.toString()}>
                        {content.productName} - {content.type === "image" ? "画像" : "動画"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedContentId && (
                <div className="aspect-square max-w-xs mx-auto bg-muted rounded-lg overflow-hidden">
                  <img
                    src={
                      mockGeneratedContent.find((c) => c.id.toString() === selectedContentId)?.thumbnail ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt="Selected content"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="caption">キャプション</Label>
                <Textarea
                  id="caption"
                  placeholder="投稿のキャプションを入力してください&#10;&#10;#ハッシュタグも追加できます"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">最大2,200文字まで入力できます</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="schedule-date">投稿日</Label>
                  <Input id="schedule-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-time">投稿時刻</Label>
                  <Input id="schedule-time" type="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">プラットフォーム</Label>
                <Select defaultValue="instagram">
                  <SelectTrigger id="platform">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button type="submit">予約する</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">予約済み投稿</h2>
          {scheduledPosts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scheduledPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={post.thumbnail || "/placeholder.svg"}
                      alt={post.productName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">{getStatusBadge(post.status)}</div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold line-clamp-1">{post.productName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.scheduledDate)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.caption}</p>
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.platform}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="h-3 w-3 mr-1" />
                        編集
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">予約済みの投稿はありません</p>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">投稿履歴</h2>
          {postedPosts.length > 0 ? (
            <div className="space-y-3">
              {postedPosts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold line-clamp-1">{post.productName}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{post.caption}</p>
                        </div>
                        {getStatusBadge(post.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.scheduledDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Instagram className="h-3 w-3" />
                          <span>{post.platform}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">投稿履歴はありません</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

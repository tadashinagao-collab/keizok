export interface Product {
  id: number
  name: string
  price: string
  category: string
  url: string
  image: string
  generatedCount: number
  description?: string
}

export interface GeneratedContent {
  id: number
  productId: number
  productName: string
  type: "image" | "video"
  url: string
  thumbnail: string
  createdAt: string
  prompt: string
  status: "completed" | "processing" | "failed"
}

export interface ScheduledPost {
  id: number
  contentId: number
  productName: string
  platform: "instagram"
  scheduledDate: string
  status: "scheduled" | "posted" | "failed"
  caption: string
  thumbnail: string
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "サマーコレクション ワンピース",
    price: "¥8,900",
    category: "ファッション",
    url: "https://example.com/products/summer-dress",
    image: "/summer-dress-fashion.jpg",
    generatedCount: 12,
    description: "軽やかな素材で夏にぴったりのワンピース",
  },
  {
    id: 2,
    name: "オーガニックコットン Tシャツ",
    price: "¥3,500",
    category: "ファッション",
    url: "https://example.com/products/organic-tshirt",
    image: "/organic-cotton-tshirt.jpg",
    generatedCount: 8,
    description: "環境に優しいオーガニックコットン100%",
  },
  {
    id: 3,
    name: "レザーハンドバッグ",
    price: "¥15,800",
    category: "アクセサリー",
    url: "https://example.com/products/leather-bag",
    image: "/leather-handbag-luxury.jpg",
    generatedCount: 15,
    description: "上質なレザーを使用した高級ハンドバッグ",
  },
  {
    id: 4,
    name: "スニーカー ホワイト",
    price: "¥12,000",
    category: "シューズ",
    url: "https://example.com/products/white-sneakers",
    image: "/white-sneakers-casual.jpg",
    generatedCount: 20,
    description: "どんなスタイルにも合わせやすい定番スニーカー",
  },
  {
    id: 5,
    name: "サングラス UV400",
    price: "¥6,800",
    category: "アクセサリー",
    url: "https://example.com/products/sunglasses",
    image: "/sunglasses-uv-protection.jpg",
    generatedCount: 5,
    description: "UV400カットで目を守るスタイリッシュなサングラス",
  },
  {
    id: 6,
    name: "デニムジャケット",
    price: "¥9,800",
    category: "ファッション",
    url: "https://example.com/products/denim-jacket",
    image: "/denim-jacket-vintage.jpg",
    generatedCount: 10,
    description: "ヴィンテージ風の加工が施されたデニムジャケット",
  },
]

export const mockGeneratedContent: GeneratedContent[] = [
  {
    id: 1,
    productId: 1,
    productName: "サマーコレクション ワンピース",
    type: "image",
    url: "/summer-dress-instagram-post.jpg",
    thumbnail: "/summer-dress-instagram-post.jpg",
    createdAt: "2025-10-06T10:30:00",
    prompt: "夏のビーチでワンピースを着た女性、爽やかな雰囲気",
    status: "completed",
  },
  {
    id: 2,
    productId: 1,
    productName: "サマーコレクション ワンピース",
    type: "video",
    url: "/summer-dress-video.jpg",
    thumbnail: "/summer-dress-video-thumb.jpg",
    createdAt: "2025-10-06T09:15:00",
    prompt: "ワンピースが風になびく動画、スローモーション",
    status: "completed",
  },
  {
    id: 3,
    productId: 2,
    productName: "オーガニックコットン Tシャツ",
    type: "image",
    url: "/organic-tshirt-lifestyle.jpg",
    thumbnail: "/organic-tshirt-lifestyle.jpg",
    createdAt: "2025-10-05T14:20:00",
    prompt: "カフェでリラックスした雰囲気のTシャツコーディネート",
    status: "completed",
  },
  {
    id: 4,
    productId: 3,
    productName: "レザーハンドバッグ",
    type: "image",
    url: "/leather-bag-luxury-lifestyle.jpg",
    thumbnail: "/leather-bag-luxury-lifestyle.jpg",
    createdAt: "2025-10-05T11:45:00",
    prompt: "高級感のあるレザーバッグ、都会的な背景",
    status: "completed",
  },
  {
    id: 5,
    productId: 4,
    productName: "スニーカー ホワイト",
    type: "image",
    url: "/white-sneakers-street-style.jpg",
    thumbnail: "/white-sneakers-street-style.jpg",
    createdAt: "2025-10-04T16:30:00",
    prompt: "ストリートスタイルのスニーカーコーディネート",
    status: "completed",
  },
  {
    id: 6,
    productId: 4,
    productName: "スニーカー ホワイト",
    type: "video",
    url: "/placeholder.svg?height=800&width=800",
    thumbnail: "/placeholder.svg?height=400&width=400",
    createdAt: "2025-10-04T15:00:00",
    prompt: "スニーカーで歩く足元の動画、都会の街並み",
    status: "completed",
  },
]

export const mockScheduledPosts: ScheduledPost[] = [
  {
    id: 1,
    contentId: 1,
    productName: "サマーコレクション ワンピース",
    platform: "instagram",
    scheduledDate: "2025-10-08T10:00:00",
    status: "scheduled",
    caption:
      "夏の新作ワンピース入荷しました！\n軽やかな素材で暑い日も快適に過ごせます✨\n\n#ファッション #ワンピース #夏コーデ",
    thumbnail: "/summer-dress-instagram-post.jpg",
  },
  {
    id: 2,
    contentId: 3,
    productName: "オーガニックコットン Tシャツ",
    platform: "instagram",
    scheduledDate: "2025-10-09T15:00:00",
    status: "scheduled",
    caption:
      "環境に優しいオーガニックコットンTシャツ🌿\n肌触りが良く、毎日着たくなる一枚です\n\n#オーガニック #サステナブル #Tシャツ",
    thumbnail: "/organic-tshirt-lifestyle.jpg",
  },
  {
    id: 3,
    contentId: 4,
    productName: "レザーハンドバッグ",
    platform: "instagram",
    scheduledDate: "2025-10-10T12:00:00",
    status: "scheduled",
    caption:
      "上質なレザーハンドバッグで大人の余裕を👜\nビジネスシーンにもカジュアルにも使える万能アイテム\n\n#レザーバッグ #ハンドバッグ #大人コーデ",
    thumbnail: "/leather-bag-luxury-lifestyle.jpg",
  },
]

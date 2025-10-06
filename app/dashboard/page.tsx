import { Card } from "@/components/ui/card"
import { Package, ImageIcon, Sparkles, ArrowRight, LinkIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    {
      title: "登録商品数",
      value: "24",
      icon: Package,
      href: "/dashboard/products",
    },
    {
      title: "生成コンテンツ",
      value: "156",
      icon: ImageIcon,
      href: "/dashboard/gallery",
    },
    {
      title: "今月の生成数",
      value: "42",
      icon: Sparkles,
      href: "/dashboard/gallery",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-balance">ダッシュボード</h1>
        <p className="text-muted-foreground text-lg">SNSマーケティングを自動化して、ビジネスを加速</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="relative p-8 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">自動生成モード</h2>
              <p className="text-muted-foreground leading-relaxed">
                ECサイトを連携すると、商品情報を自動で取得してAIが定期的に投稿コンテンツを生成します。手間なく継続的なSNS運用が可能に。
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/settings" className="w-full">
                <Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
                  ECサイトを連携する
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <span>Shopify、BASE、STORESなどに対応</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent" />
          <div className="relative p-8 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">単発生成モード</h2>
              <p className="text-muted-foreground leading-relaxed">
                特定の商品について今すぐ投稿を作成したい時に。商品画像をアップロードまたはURLを入力するだけで、AIが魅力的なコンテンツを生成します。
              </p>
            </div>
            <Link href="/dashboard/generate" className="block">
              <Button size="lg" variant="outline" className="w-full gap-2 group-hover:border-primary/50 bg-transparent">
                今すぐ生成する
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="group relative overflow-hidden p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <Icon className="h-5 w-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card className="overflow-hidden border-border/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">最近の生成コンテンツ</h2>
            <Link href="/dashboard/gallery">
              <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
                すべて見る
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-xl bg-muted overflow-hidden ring-1 ring-border/50 hover:ring-primary/50 transition-all"
              >
                <img
                  src={`/product-.jpg?height=200&width=200`}
                  alt={`Generated content ${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

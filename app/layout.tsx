import type React from "react"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// })

export const metadata: Metadata = {
  title: "Keizok",
  description: "SNSマーケティング自動化ツール",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      {/* <body className={`font-sans ${inter.variable} ${GeistMono.variable} antialiased`}> */}
      <body className={` ${GeistMono.variable} antialiased`}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 p-6 md:p-8 lg:p-10">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
          </div>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  )
}



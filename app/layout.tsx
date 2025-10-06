import type React from "react"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// })

export const metadata: Metadata = {
  title: "Keizok - Instagram マーケティングオートメーション",
  description: "ECサイト向けSNSマーケティング自動化ツール",
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
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

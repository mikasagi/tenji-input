import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "点字入力・翻訳ツール｜リアルタイム点字変換",
  description: "点字表を見なくても点字の内容を即座に確認できる、点字翻訳ツール。入力パッドで点字入力して即変換。ひらがな・数字・英字に対応。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8DR3K10VH5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-8DR3K10VH5');
          `,
          }}
      />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

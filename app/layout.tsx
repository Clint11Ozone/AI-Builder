"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import { EditorProvider } from "../context/EditorContext";


const inter = Inter({ subsets: ["latin"] })

<<<<<<< HEAD
// export const metadata = {
//   title: "Minimal Prompt UI Editor",
//   description: "Create and customize your AI chat interface",
// }
=======
>>>>>>> fa74179 (initial)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
      <EditorProvider> {children}</EditorProvider>
        </body>
    </html>
  )
}


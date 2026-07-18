import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/providers/query-provider"
import { AuthProviderWrapper } from "@/providers/auth-provider-wrapper"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Campus+ - Transform Your Campus Experience with AI",
  description: "Connect, learn, and grow with AI-powered campus events, clubs, scholarships, and volunteer opportunities. Your journey to success starts here.",
  keywords: ["campus", "events", "clubs", "scholarships", "volunteer", "AI mentor", "student", "college", "university", "career"],
  authors: [{ name: "Campus+" }],
  openGraph: {
    title: "Campus+ - Transform Your Campus Experience with AI",
    description: "Connect, learn, and grow with AI-powered campus events, clubs, scholarships, and volunteer opportunities.",
    type: "website",
    url: "https://www.theskytechnology.in",
    siteName: "Sky Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus+ - Transform Your Campus Experience with AI",
    description: "Connect, learn, and grow with AI-powered campus events, clubs, scholarships, and volunteer opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProviderWrapper>
                {children}
              </AuthProviderWrapper>
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

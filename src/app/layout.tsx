import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Task Master",
  description: "A modern, user-based task manager.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex min-h-screen flex-col">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

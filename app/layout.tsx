// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNavbar } from "@/components/component/Topnavbar";
import { SideNavbar } from "@/components/component/SideNavbar";
import { ChatProvider } from "@/app/contexts/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot",
  description: "A Chatbot powered by Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatProvider>
          <div className="flex flex-col h-screen">
            <TopNavbar />
            <div className="flex flex-1 overflow-hidden">
              <SideNavbar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </ChatProvider>
      </body>
    </html>
    
  );
}
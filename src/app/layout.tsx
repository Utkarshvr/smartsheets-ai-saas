import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { cookies } from "next/headers";

import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.variable}`}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="flex-1">{children}</main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

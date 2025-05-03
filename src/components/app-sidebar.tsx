"use client";
import {
  FileQuestion,
  Home,
  Search,
  Settings,
  StickyNote,
  WandSparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { UserButton, UserProfile } from "@clerk/nextjs";

// Menu items.
const items = [
  {
    title: "Worksheet",
    url: "/generate/worksheet",
    icon: StickyNote,
  },
  {
    title: "Questions on a Text",
    url: "/generate/questions-on-a-text",
    icon: FileQuestion,
  },
  {
    title: "Answer Key",
    url: "/generate/answer-key",
    icon: Search,
  },
  {
    title: "Summary",
    url: "/generate/summary",
    icon: WandSparkles,
  },
];

export function AppSidebar() {
  const sidebarState = useSidebar();
  const isExpanded = sidebarState.state === "expanded";

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          {/* <Logo /> */}
          <div className="flex flex-row items-center gap-2 p-2">
            <Image
              src="/logo-black.svg"
              alt="SmartSheets AI"
              width={24}
              height={24}
            />
            {isExpanded && (
              <div className="flex flex-col">
                <h1 className="font-semibold text-md">
                  {process.env.NEXT_PUBLIC_APP_NAME || "SmartSheets AI"}
                </h1>
                <span className="text-xs text-muted-foreground">
                  {process.env.NEXT_PUBLIC_APP_TAGLINE || "Made for Teachers"}
                </span>
              </div>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={"/"}>
                      <Home />
                      <span>{"Home"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Generate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: 36,
                  height: 36,
                },
                userButtonBox: {
                  flexDirection: "row-reverse",
                },
              },
            }}
          />

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={"#"}>
                  <Settings />
                  <span>{"Settings"}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {sidebarState.isMobile && sidebarState.openMobile && (
            <SidebarTrigger />
          )}
          {!sidebarState.isMobile && <SidebarTrigger />}
        </SidebarFooter>
      </Sidebar>
      {sidebarState.isMobile && !sidebarState.openMobile && (
        <SidebarTrigger className="z-[5000000] fixed bottom-2 left-2" />
      )}
    </>
  );
}

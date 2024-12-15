"use client";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { InboxIcon, MailsIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({ subsets: ["greek"], weight: "300" });

export function Sidebar() {
  const { open } = useSidebar();

  return (
    <SidebarComponent collapsible="icon">
      <SidebarHeader className="p-0 items-center py-2">
        <Link
          className={cn(
            `flex w-full items-center space-x-4 px-4 transition-all`,
            {
              "px-2": !open,
            }
          )}
          href="/"
        >
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          {open && (
            <div
              className={cn(
                "text-[1.625rem] tracking-wide font-sans font-light text-primary"
              )}
            >
              CUBYL
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup title="Dashboard">
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Link href="/emails" className="flex items-center w-full">
                  <MailsIcon size={24} /> Emails
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
}

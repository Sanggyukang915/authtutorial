"use client"

import * as React from "react"

import { Folder } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLoginButton } from "@/components/auth/nav-login-button"
import { MainSection } from "./main-section"
import { Separator } from "@/components/ui/separator"
import { PersonalSection } from "./personal-section"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/use-current-user"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useCurrentUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarContent className="flex-row items-center">
          <Link href='/' className="flex items-center gap-4">
            <Folder />
            <span className="text-xl">Directory</span>
          </Link>
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent>
        <Separator />
        <MainSection />
        <Separator />
        {user && <PersonalSection />}
      </SidebarContent>
      <SidebarFooter>
        <NavLoginButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

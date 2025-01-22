"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { TeamSwitcher } from "@/components/team-switcher"
import { Folder } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLoginButton } from "@/components/auth/nav-login-button"
// This is sample data.

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: any
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarContent className="flex-row items-center">
            <Folder className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-lg font-semibold">Directory</span>
            </div>
          </SidebarContent>
        </SidebarHeader>
        <SidebarContent>
          <TeamSwitcher teams={user?.teams} />
          <NavProjects projects={user?.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavLoginButton user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
}

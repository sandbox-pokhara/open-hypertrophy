"use client";

import * as React from "react";
import {
  BicepsFlexed,
  Bot,
  Github,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCoreApiRetrieveCurrentUser, UserSchema } from "@/gen";
import { useNavigate } from "react-router-dom";

const loadingUser: UserSchema = {
  id: null,
  last_login: null,
  is_superuser: false,
  username: "Loading...",
  first_name: "Loading...",
  last_name: null,
  email: null,
  is_staff: false,
  is_active: false,
  date_joined: "2024-11-30T08:18:21.060Z",
  groups: [],
  user_permissions: [],
};

const data = {
  navMain: [
    {
      title: "Analytics",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "One Rep Max",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Database",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Lifts",
          url: "/admin/core/lift/",
        },
        {
          title: "Exercises",
          url: "/admin/core/exercise/",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Password",
          url: "/admin/password_change/",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "https://github.com/sandbox-pokhara/open-hypertrophy",
      icon: LifeBuoy,
    },
    {
      title: "GitHub",
      url: "https://github.com/sandbox-pokhara/open-hypertrophy",
      icon: Github,
    },
    {
      title: "Feature Request",
      url: "https://github.com/sandbox-pokhara/open-hypertrophy/issues",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  let navigate = useNavigate();
  const user = useCoreApiRetrieveCurrentUser();
  if (user.error && user.error.detail === "Unauthorized") {
    navigate("/login/");
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BicepsFlexed className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Open Hypertrophy
                  </span>
                  <span className="truncate text-xs">
                    An open-source strength app
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user.isSuccess ? user.data : loadingUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

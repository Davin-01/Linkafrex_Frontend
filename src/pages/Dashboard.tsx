"use client"

import type React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Package,
  MapPin,
  Clock,
  Users,
  Settings,
  BarChart3,
  Truck,
  Home,
  Bell,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  Shield,
  Globe,
} from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "customer" | "carrier" | "admin" | "regional-agent"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const getMenuItems = () => {
    switch (userType) {
      case "customer":
        return [
          {
            title: "Dashboard",
            url: "/dashboard/customer",
            icon: Home,
          },
          {
            title: "Book Shipment",
            url: "/dashboard/book-shipment",
            icon: Package,
          },
          {
            title: "Track Package",
            url: "/dashboard/track",
            icon: MapPin,
          },
          {
            title: "Shipment History",
            url: "/dashboard/history",
            icon: Clock,
          },
          {
            title: "Billing",
            url: "/dashboard/billing",
            icon: CreditCard,
          },
        ]
      case "carrier":
        return [
          {
            title: "Dashboard",
            url: "/dashboard/carrier",
            icon: Home,
          },
          {
            title: "My Deliveries",
            url: "/dashboard/carrier/deliveries",
            icon: Truck,
          },
          {
            title: "Earnings",
            url: "/dashboard/carrier/earnings",
            icon: CreditCard,
          },
          {
            title: "Performance",
            url: "/dashboard/carrier/performance",
            icon: BarChart3,
          },
        ]
      case "admin":
        return [
          {
            title: "Dashboard",
            url: "/dashboard/admin",
            icon: Home,
          },
          {
            title: "Shipments",
            url: "/dashboard/admin/shipments",
            icon: Package,
          },
          {
            title: "Users",
            url: "/dashboard/admin/users",
            icon: Users,
          },
          {
            title: "Carriers",
            url: "/dashboard/admin/carriers",
            icon: Truck,
          },
          {
            title: "Analytics",
            url: "/dashboard/admin/analytics",
            icon: BarChart3,
          },
          {
            title: "Regions",
            url: "/dashboard/admin/regions",
            icon: Globe,
          },
        ]
      case "regional-agent":
        return [
          {
            title: "Dashboard",
            url: "/dashboard/regional-agent",
            icon: Home,
          },
          {
            title: "Regional Shipments",
            url: "/dashboard/regional-agent/shipments",
            icon: Package,
          },
          {
            title: "Manage Carriers",
            url: "/dashboard/regional-agent/carriers",
            icon: Truck,
          },
          {
            title: "Regional Analytics",
            url: "/dashboard/regional-agent/analytics",
            icon: BarChart3,
          },
          {
            title: "Service Areas",
            url: "/dashboard/regional-agent/areas",
            icon: MapPin,
          },
        ]
      default:
        return []
    }
  }

  const getUserTypeLabel = () => {
    switch (userType) {
      case "customer":
        return "Customer"
      case "carrier":
        return "Carrier"
      case "admin":
        return "Administrator"
      case "regional-agent":
        return "Regional Agent"
      default:
        return "User"
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-amber-200">
        <SidebarHeader>
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-maroon-600 to-amber-600 bg-clip-text text-transparent">
              LinkaFrex
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-maroon-700">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {getMenuItems().map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="hover:bg-amber-50 hover:text-maroon-700">
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-maroon-700">Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-amber-50 hover:text-maroon-700">
                    <Link href="/help">
                      <HelpCircle className="h-4 w-4" />
                      <span>Help Center</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-amber-50 hover:text-maroon-700">
                    <Link href="/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="hover:bg-amber-50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-gradient-to-r from-maroon-500 to-maroon-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-gray-500">{getUserTypeLabel()}</span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-amber-200 px-4">
          <SidebarTrigger className="text-maroon-600" />
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-maroon-600 hover:bg-amber-50">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-amber-50/30 to-white">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

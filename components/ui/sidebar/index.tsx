"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar"
import { Icons } from "../Icons"
import { Breadcrumbs } from "../breadcrumbs"
import { SignOutButton, useUser } from "@clerk/nextjs"


interface SidebarItem {
    title: string
    url: string
    icon: keyof typeof Icons
    isActive?: boolean
    items?: SidebarItem[]
}

interface SidebarData {
    navMain: SidebarItem[]
    navSecondary: SidebarItem[]
}

const data: SidebarData = {

  navMain: [
    {
        title: "Dashboard",
        url: "/menu",
        icon: "home",
        isActive: true,
    },
    {
      title: "Pedidos",
      url: "/menu/pedidos",
      icon: "squareTerminal",
      isActive: true,
    },
    {
      title: "Veículos",
      url: "/menu/veiculos",
      icon: "bot",
    },
    {
      title: "Clientes",
      url: "/menu/clientes",
      icon: "bookOpen",
    },
    {
      title: "Acompanhamentos",
      url: "/menu/acompanhamentos",
      icon: "settings2",
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: "lifeBuoy",
    },
    {
      title: "Feedback",
      url: "#",
      icon: "send",
    },
  ],
}

  function SidebarComponent({children}: {children: React.ReactNode}) {
  const {user} = useUser()
  
  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="flex-1">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Icons.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Tratuc</span>
                    <span className="truncate text-xs">Empresarial</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => {
                 const IconComponent = Icons[item.icon];
                return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <IconComponent />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <Icons.chevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              )})}
            </SidebarMenu>
          </SidebarGroup>
          {/* <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MoreHorizontal />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup> */}
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => {
                  const IconComponent = Icons[item.icon];
                  return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="sm">
                      <a href={item.url}>
                        <IconComponent /> 
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  )})}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.imageUrl}
                        alt={user?.fullName ?? ""}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.fullName}
                      </span>
                      <span className="truncate text-xs">
                        {user?.emailAddresses[0].emailAddress}
                      </span>
                    </div>
                    <Icons.chevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user?.imageUrl}
                          alt={user?.fullName ?? ""}
                        />
                        <AvatarFallback className="rounded-lg">
                          {user?.fullName?.charAt(0) ?? ""}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.fullName ?? ""}
                        </span>
                        <span className="truncate text-xs">
                          {user?.emailAddresses[0].emailAddress ?? ""}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Icons.sparkles />
                      Assine um plano
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Icons.badgeCheck />
                      Conta
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icons.creditCard />
                      Faturamento
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icons.bell />
                      Notificações
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <SignOutButton>
                    <DropdownMenuItem>
                      <Icons.logOut />
                      Sair
                    </DropdownMenuItem>
                  </SignOutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export {SidebarProvider, SidebarComponent as default}

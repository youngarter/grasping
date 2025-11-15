"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Rss,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  Package,
  Settings2,
  FileArchive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function UserLayout({
  userName,
  role,
  children,
}: {
  userName: string;
  role: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Actualités", href: "/actualites", icon: Rss },
    { name: "Reports", href: "/reports", icon: Package },
    { name: "Réclamations", href: "/claims", icon: FileArchive },
    { name: "Settings", href: "/settings", icon: Settings2 },
    // if admin profile show this links
  ];

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* SIDEBAR */}
      <aside
        className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border fixed left-0 top-0 h-full transition-all duration-300 ease-out z-50 flex flex-col ${
          open ? "w-64 px-6" : "w-20 px-3"
        }`}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between py-6 border-b border-sidebar-border">
          {open && <h1 className="text-xl font-bold">MyLogo</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="hover:bg-sidebar-accent"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 py-6 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                title={!open ? item.name : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {open && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom accent bar */}
        <div className="h-1 bg-gradient-to-r from-sidebar-primary to-sidebar-accent rounded-full mb-6" />
      </aside>

      {/* MAIN CONTENT AREA */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          open ? "ml-64" : "ml-20"
        }`}
      >
        {/* TOP NAVBAR */}
        <header className="border-b border-border bg-background sticky top-0 z-40 shadow-sm">
          <div className="flex items-center justify-between px-8 py-4 gap-6">
            {/* Left: Search */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              {/* the username and role */}
              <Button
                variant="outline"
                className="flex flex-col items-start gap-0.5 px-4 py-2"
              >
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">{role}</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <Bell className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="hover:bg-muted"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* CHILDREN */}
        <main className="flex-1 overflow-auto p-8 bg-background">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {children}
        </main>
      </div>
    </div>
  );
}

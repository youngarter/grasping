'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User } from "lucide-react";

// This component renders a private navbar for the app layout
export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Tableau de bord", href: "/dashboard", icon: Home },
    { name: "Actualités", href: "/actualites", icon: Search },
    { name: "Incidents & événements", href: "/profile", icon: User },
    { name: "Rapports", href: "/reports", icon: 'package-open' },
    { name: "Réclamations", href: "/claims", icon: 'file-text' },
    { name: "Paramètres", href: "/settings", icon: 'settings' },
  ];

  return (
    <nav className="w-full fixed bottom-0 left-0 bg-white border-t shadow-lg flex justify-around py-3 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center text-sm transition-all ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CartSheet } from "@/components/cart/cart-sheet";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ModeLogout } from "./auth/ModeLogout";
import { Copyright } from "lucide-react";
import { buttonVariants } from "./ui/button";

export const Footer = () => {

  return (
    <div
      className="w-full flex justify-between items-center px-5 py-2"
    >
      <div className="flex items-center">
        <Copyright size={20} />
        2025 Tu Tienda Bien Fina.
      </div>
      <p>Desarrollado por
        <a
          href="https://audaz.site/"
          className={buttonVariants({ variant: "link" })}
        >
          Audaz
        </a>
      </p>
    </div>
  );
}
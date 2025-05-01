'use client';

import { useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CartSheet } from "@/components/cart/cart-sheet";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ModeLogout } from "./auth/ModeLogout";
import { fetchSettings } from "@/api/setting";
import { usePathname } from "next/navigation"; // Importa usePathname

export const Navbar = () => {
  const { cart, settings } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname(); // Obtén la ruta actual

  // Calcula el total de productos en el carrito
  const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

  // Accede a la URL del logo
  const logo = settings?.media.find(item => item.collection_name === "logo")?.original_url;

  // Verifica si el usuario está en la ruta "/"
  const isHomePage = pathname === "/";

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-5 py-3 shadow bg-white z-50">
      {logo && (
        <img
          src={logo}
          alt={settings.app_name} // Usa el nombre de la app como alt
          className="border-0 w-auto h-16 object-cover"
        />
      )}

      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Inicio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {isAuthenticated ? (
              <>
                <Link href="/orders" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pedidos
                  </NavigationMenuLink>
                </Link>
                <Link href="/auth/profile" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Perfil
                  </NavigationMenuLink>
                </Link>

                <ModeLogout className={navigationMenuTriggerStyle()} />
              </>
            ) : (
              <>
                <Link href="/auth/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Iniciar sesión
                  </NavigationMenuLink>
                </Link>
                <Link href="/auth/register" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Registro
                  </NavigationMenuLink>
                </Link>
              </>
            )}
          </NavigationMenuItem>

                {!isHomePage && totalProducts > 0 && (
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <div className="relative">
                {/* Mostrar CartSheet solo si hay productos en el carrito y no estamos en la página de inicio */}
                  <>
                    <CartSheet />
                    <Badge
                      className="absolute -top-2 -right-2 translate-x-1/2 -translate-y-1/2 "
                      variant="destructive">
                      {totalProducts}
                    </Badge>
                  </>
              </div>
            </NavigationMenuLink>
          </NavigationMenuItem>
                )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
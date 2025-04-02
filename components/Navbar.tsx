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

export const Navbar = () => {
    const { cart } = useCart();
    const { isAuthenticated, logout } = useAuth(); // Obtén el estado de autenticación y la función de logout

    // Calcula el total de productos en el carrito
    const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div
            className="fixed top-0 left-0 w-full flex justify-between items-center px-5 py-2 shadow bg-white z-50"
          >
            <Image
              src="https://socadocafe.com/wp-content/uploads/2023/10/SOCADO_Imagotipo-01.svg"
              alt="logo"
              width={100}
              height={100}
            />

            <NavigationMenu className="hidden sm:block">
              <NavigationMenuList >
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Inicio
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  {isAuthenticated ? (
                    <ModeLogout />
                  ) : (
                    <Link href="/auth/login" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Iniciar sesión
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <div className="relative">

                      <CartSheet />
                      <Badge
                        className="absolute -top-2 -right-2 translate-x-1/2 -translate-y-1/2 bg-white"
                        variant="outline">
                        {totalProducts}
                      </Badge>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
    );
}
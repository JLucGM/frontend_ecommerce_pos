"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/context/CartContext";
import { CartCardProducts } from "./cartcardproducts";
import { ShoppingCart } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button, buttonVariants } from "../ui/button";
import { SheetCardProducts } from "./sheet-card-products";
import Link from "next/link";

interface CartSheetProps {

    className?: string;
}

export const CartSheet = ({ className }: CartSheetProps) => {
    const { cart, removeFromCart, clearCart } = useCart();

    const subtotal = cart.reduce((total, item) => total + item.product_price * item.quantity, 0);
    const total = subtotal // + taxes; // Si decides usar impuestos, descomenta esta línea

    return (


        <Sheet>
            <SheetTrigger>
                <ShoppingCart className="size-5 text-black" />
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[600px] p-0">
                <SheetHeader >
                    <SheetTitle>Tu carrito</SheetTitle>
                    <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
                </SheetHeader>
                    <ScrollArea className="max-h-6/10 px-2">

                        <div className="space-y-4">
                            {cart.map((item) => (
                                <SheetCardProducts
                                    key={`${item.id}-${JSON.stringify(item.selectedAttributes || {})}`}
                                    data={{
                                        id: item.id,
                                        name: item.product_name,
                                        price: item.product_price,
                                        quantity: item.quantity,
                                        selectedAttributes: item.selectedAttributes,
                                        removeFromCart: () => removeFromCart(item.id),
                                        imageUrl: item.imageUrl, // Asegúrate de que `imageUrl` esté disponible
                                    }}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                <SheetFooter className="h-auto z-10">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">subtotal</p>
                        <span>€{subtotal.toFixed(2)}</span> {/* Muestra el subtotal dinámico */}
                        </div>
                    <div className="flex justify-between items-center">
                        <p className="font-bold">total</p>
                        <span>${total.toFixed(2)}</span> {/* Muestra el total dinámico */}
                    </div>
                    <Link href="/checkout" className={buttonVariants({ variant: "default" })}>
                        Verificar pedido
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
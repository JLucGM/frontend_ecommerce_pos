"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CartCardProducts } from "@/components/cart/cartcardproducts";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcula el subtotal sumando el precio * cantidad de cada producto
  const subtotal = cart.reduce((total, item) => total + item.product_price * item.quantity, 0);

  // Define los impuestos como un porcentaje del subtotal (por ejemplo, 18%)
  // const taxRate = 0.18; // 18%
  // const taxes = subtotal * taxRate;

  // Calcula el total sumando el subtotal y los impuestos
  // const total = subtotal + taxes;
  const total = subtotal // + taxes; // Si decides usar impuestos, descomenta esta línea

  return (
    <div className="pt-26">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <ShoppingBag className="h-16 w-16 text-gray-500 mb-4" />
          <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="text-gray-600">Agrega productos para comenzar a comprar.</p>
        </div>
      ) : (
        <div>
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              Mi Carrito
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Lista de productos */}
              <div className="flex-1">
                {cart.map((item) => (
                  <CartCardProducts
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

              {/* Resumen del pedido */}
              <div className="w-full lg:w-1/3">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="text-lg">Resumen del pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span> {/* Muestra el subtotal dinámico */}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envío</span>
                      <span>Gratis</span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Impuestos</span>
                      <span>€{taxes.toFixed(2)}</span> 
                    </div> */}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>€{total.toFixed(2)}</span> {/* Muestra el total dinámico */}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/checkout" className={buttonVariants({ variant: "default" }) + ' w-full'} >Proceder al pago</Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
          <Button
            onClick={clearCart}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
          >
            Vaciar carrito
          </Button>
        </div>
      )}
    </div>
  );
}
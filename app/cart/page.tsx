"use client";

import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CartCardProducts } from "@/components/cart/cartcardproducts";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="pt-21">
      {/* <Title title="Carrito de compras" /> */}
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
                      
                      // imageUrl: item.product_image,
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
                    <span>€389.97</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impuestos</span>
                    <span>€81.89</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>€471.86</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Proceder al pago</Button>
                </CardFooter>
              </Card>

            </div>
            </div>
          </div>
          {/* {cart.map((item) => (
            <div key={item.id} className="border p-4 mb-4 rounded">
              <h2 className="text-lg font-bold">{item.product_name}</h2>
              <p>Precio: ${item.product_price}</p>
              <p>Cantidad: {item.quantity}</p>
              {item.selectedAttributes && (
                <div>
                  <h3 className="font-semibold">Combinaciones seleccionadas:</h3>
                  <ul>
                    {Object.entries(item.selectedAttributes).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button
                variant={"destructive"}
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </Button>
            </div>
          ))} */}
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
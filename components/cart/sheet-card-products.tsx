"use client";

import * as React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

interface CartCardProductsProps {
  data: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string; // URL de la imagen del producto
    quantity?: number;
    removeFromCart?: () => void;
    updateQuantity?: (quantity: number) => void;
    selectedAttributes?: {
      [key: string]: string;
    };
  };
}

export const SheetCardProducts = ({ data }: CartCardProductsProps) => {
  const { updateQuantity, removeFromCart, settings } = useCart(); // Accede al contexto directamente en el componente

  const incrementar = () => {
    updateQuantity(data.id, (data.quantity || 1) + 1, data.selectedAttributes);
  };

  const decrementar = () => {
    if ((data.quantity || 1) > 1) {
      updateQuantity(data.id, (data.quantity || 1) - 1, data.selectedAttributes);
    }
  };
  // console.log("CartCardProducts data:", data);
  
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-">
        <div className="flex items-center gap-2">
          {/* Imagen del producto */}
          <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border">
            <img
              src={data.imageUrl || "/placeholder.svg"} // Usa la URL de la imagen o un marcador de posición
              alt={data.name}
              width={80}
              height={80}
              className="object-cover h-full w-full"
            />
          </div>

          {/* Información del producto */}
          <div className="flex flex-col flex-1 w-full min-w-0">
            <div className="flex justify-between">

            <h3 className="font-medium text-sm sm:text-base block">{data.name}</h3>
            </div>
            {data.selectedAttributes && (
              <ul>
                {Object.entries(data.selectedAttributes).map(([key, value]) => (
                  <li key={key}>
                    <p className="text-xs text-muted-foreground">
                      {key}: {value}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-1 text-sm font-medium">{settings?.default_currency}{data.price}</div>
          {/* Controles de cantidad */}
          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={decrementar}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm">{data.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={incrementar}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">{settings?.default_currency}{(data.price * (data.quantity || 1)).toFixed(2)}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(data.id, data.selectedAttributes)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          </div>

        </div>
      </CardContent>
      <Separator className="mt-" />
    </Card>
  );
};
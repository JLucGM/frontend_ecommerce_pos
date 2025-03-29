import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export const CardProductshorizontal = () => {
  return (
    <Card className="flex flex-row overflow-hidden max-w-2xl">
      <div className="relative w-1/3 min-w-[150px]">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="Imagen del producto"
          width={200}
          height={200}
          className="object-cover h-full"
        />
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Nuevo</Badge>
      </div>
      <div className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>Auriculares Inalámbricos Premium</CardTitle>
          <CardDescription>Sonido de alta calidad con cancelación de ruido</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Disfruta de una experiencia auditiva excepcional con estos auriculares de última generación. Batería de
              larga duración y diseño ergonómico para máxima comodidad.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">€129.99</span>
              <span className="text-sm text-muted-foreground line-through">€159.99</span>
              <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                -19%
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">(42)</span>
          </div>
          <Button className="gap-1">
            <ShoppingCart className="h-4 w-4" />
            Añadir
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}


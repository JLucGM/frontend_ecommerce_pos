"use client"

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { Store } from "@/interfaces/Store";

interface CardInfoStoreProps {
    data: Store; // Cambia el tipo a Store
    className?: string;
    showButton?: boolean; // Nueva propiedad para controlar la visibilidad del botón
}

function CardInfoStore({
    className,
    data,
    showButton = true, // Valor por defecto es true
    ...props
}: CardInfoStoreProps) {
    return (
        <Card className="border-0 shadow hover:shadow-2xl bg-white p-4">
            <CardHeader className="p-0">
                <CardTitle className="flex">
                    <h2 className="text-2xl uppercase font-bold text-gray-800 bg-primary-foreground px-4 py-2 rounded-full">{data.store_name}</h2>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <div className="border-b-2 border-gray-700 mb-6 pb-6">
                    <div className="flex gap-6">
                        <MapPin size={32} />
                        <div>
                            <h3 className="text-lg font-bold">Dirección</h3>
                            <p>{data.store_direction}</p>
                        </div>
                    </div>
                </div>

                <div className="border-b-2 border-gray-700 mb-6 pb-6">
                    <div className="flex gap-6">
                        <PhoneCall size={32} />
                        <div>
                            <h3 className="text-lg font-bold">Teléfono</h3>
                            <p>{data.store_phone}</p>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-center">
                {showButton && ( // Renderiza el botón solo si showButton es true
                    <Link href={`/store/${data.slug}`}>
                        <Button className="text-xl" size="lg">
                            Ver tienda
                            <ArrowUpRight />
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    )
}

export { CardInfoStore }

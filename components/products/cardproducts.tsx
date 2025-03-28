import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/interfaces/Product";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TextInnerHtml } from "../ui/text-inner-html";

interface Props {
    product: Product;
    addToCart: (item: {
        id: number;
        product_name: string;
        product_price: number;
        quantity: number;
    }) => void;
    handleAttributeChange: (attributeName: string, value: string) => void;
    handleAddVariableProduct: (product: Product) => void;
    selectedAttributes: { [key: string]: string };
}

export const CardProducts = ({ product, addToCart, handleAttributeChange, handleAddVariableProduct }: Props) => {
    const [displayImage, setDisplayImage] = useState(product.media[0]?.original_url);

    return (
        <Dialog>
            {/* Trigger para abrir el Dialog */}
            <DialogTrigger className="p-0 bg-transparent hover:bg-gray-100">
                <Card className="p-0 cursor-pointer h-full">
                    <CardHeader className="p-0 h-auto">
                        <img
                            src={displayImage || product.media[0]?.original_url}
                            alt={product.product_name}
                            className="aspect-square h-auto rounded-md rounded-tl-lg rounded-tr-lg object-cover"
                            onMouseEnter={() => setDisplayImage(product.media[1]?.original_url)}
                            onMouseLeave={() => setDisplayImage(product.media[0]?.original_url)}
                        />
                        <CardTitle className="text-start px-6">{product.product_name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <CardDescription className="text-start min-h-[60px]">
                    {product.product_description ? (
                                <TextInnerHtml
                                className="line-clamp-3"
                                    data={product.product_description}
                                />
                            ) : (null)}

                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <p>${product.product_price}</p>
                    </CardFooter>
                </Card>
            </DialogTrigger>

            {/* Contenido del Dialog */}
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{product.product_name}</DialogTitle>
                </DialogHeader>

                {product.product_description ? (
                    <TextInnerHtml
                        data={product.product_description}
                    />
                ) : (null)}

                {/* Si el producto tiene combinaciones, muestra los selectores */}
                {product.combinations.length > 0 && (
                    <>
                        {product.combinations[0]?.combination_attribute_value.map((attr: any) => {
                            const attributeName = attr.attribute_value.attribute.attribute_name;
                            const attributeValues = Array.from(
                                new Set(
                                    product.combinations.flatMap((comb: any) =>
                                        comb.combination_attribute_value
                                            .filter(
                                                (a: any) =>
                                                    a.attribute_value.attribute.attribute_name ===
                                                    attributeName
                                            )
                                            .map((a: any) => a.attribute_value.attribute_value_name)
                                    )
                                )
                            );

                            return (
                                <div key={attributeName} className="mb-4">
                                    <Label>{attributeName}</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            handleAttributeChange(attributeName, value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={`Selecciona ${attributeName}`}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {attributeValues.map((value) => (
                                                <SelectItem key={value} value={value}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            );
                        })}
                    </>
                )}

                {/* Botón para agregar al carrito */}
                <DialogFooter className="items-center gap-4 mt-4">
                    <Button
                        onClick={() => {
                            if (product.combinations.length === 0) {
                                // Si no tiene combinaciones, agrega directamente
                                addToCart({
                                    id: product.id,
                                    product_name: product.product_name,
                                    product_price: parseFloat(product.product_price),
                                    quantity: 1,
                                });
                            } else {
                                // Si tiene combinaciones, maneja la lógica de agregar con atributos
                                handleAddVariableProduct(product);
                            }
                        }}
                        className="bg-blue-500 text-white"
                    >
                        Agregar al carrito
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
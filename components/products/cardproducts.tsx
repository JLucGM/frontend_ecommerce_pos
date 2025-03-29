import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Product } from "@/interfaces/Product";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TextInnerHtml } from "../ui/text-inner-html";
import { ScrollArea } from "../ui/scroll-area";
import { AspectRatio } from "../ui/aspect-ratio";

interface Props {
    product: Product;
    addToCart: (item: {
        id: number;
        product_name: string;
        product_price: number;
        quantity: number;
        selectedAttributes?: { [key: string]: string }; // Agrega esta propiedad opcional
    }) => void;
    handleAttributeChange: (attributeName: string, value: string) => void;
    handleAddVariableProduct: (product: Product) => void;
    selectedAttributes: { [key: string]: string };
}

export const CardProducts = ({ product, addToCart, handleAttributeChange, handleAddVariableProduct, selectedAttributes }: Props) => {
    const [displayImage, setDisplayImage] = useState(product.media[0]?.original_url);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        if (product.combinations.length === 0) {
            addToCart({
                id: product.id,
                product_name: product.product_name,
                product_price: parseFloat(product.product_price),
                quantity: 1,
            });
        } else {
            addToCart({
                id: product.id,
                product_name: product.product_name,
                product_price: parseFloat(product.product_price),
                quantity: 1,
                selectedAttributes: { ...selectedAttributes }, // Incluye las combinaciones seleccionadas
            });
        }

        setAddedToCart(true);

        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    };

    return (
        <Dialog>

            <DialogTrigger className="p-0 bg-transparent hover:bg-gray-100">
                <Card className="p-0 cursor-pointer h-full">

                    <CardHeader className="p-0 h-auto">
                        <AspectRatio ratio={1 / 1}>
                            <img
                                src={displayImage || product.media[0]?.original_url}
                                alt={product.product_name}
                                className="aspect-square h-full rounded-md rounded-tl-lg rounded-tr-lg object-cover"
                                onMouseEnter={() => setDisplayImage(product.media[1]?.original_url)}
                                onMouseLeave={() => setDisplayImage(product.media[0]?.original_url)}
                            />
                        </AspectRatio>
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

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{product.product_name}</DialogTitle>
                </DialogHeader>

                <ScrollArea className=" max-h-96 overflow-y-auto ">
                    <div className="border rounded-xl px-4 mb-4 bg-foreground/10">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-md">Descripción</AccordionTrigger>
                                <AccordionContent>
                                    {product.product_description ? (
                                        <TextInnerHtml
                                            data={product.product_description}
                                        />
                                    ) : (null)}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

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
                                    <div key={attributeName} className="mb-4 space-y-2">
                                        <Label className="capitalize text-md">{attributeName}</Label>
                                        <Select
                                            onValueChange={(value) =>
                                                handleAttributeChange(attributeName, value)
                                            }
                                        >
                                            <SelectTrigger className="w-full ">
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
                </ScrollArea>
                <DialogFooter className="items-center gap-4 mt-4">
                    <Button
                        onClick={handleAddToCart}
                        className={`text-white ${addedToCart ? 'bg-green-500' : 'bg-blue-500'}`}
                    >
                        {addedToCart ? "¡Listo!" : "Agregar al carrito"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
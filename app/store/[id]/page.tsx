"use client";

import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { Title } from "@/components/title";
import { Product } from "@/interfaces/Product";

export default function Store() {
  const { id } = useParams(); // Obtén el id de la URL
  const [products, setProducts] = useState<Product[]>([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const { addToCart } = useCart(); // Accede a la función para agregar productos al carrito
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({}); // Atributos seleccionados


  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) return; // Asegúrate de que id esté definido
      setLoading(true); // Inicia la carga
      try {
        const response = await fetch(`https://pos.test/api/stores/${id}/products`); // Usa el id en la URL
        const data = await response.json();
        setProducts(data); // Asumiendo que la API devuelve un array de productos
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProducts();
  }, [id]);

  //   if(id === 'mystore') {
  // console.error("ID de tienda no definido");
  // // return null; // Maneja el caso donde id no está definido
  // }

  // Maneja la selección de atributos
  const handleAttributeChange = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  // Encuentra la combinación seleccionada basada en los atributos
  const findSelectedCombination = (product: any) => {
    return product.combinations.find((combination: any) =>
      combination.combination_attribute_value.every(
        (attr: any) =>
          selectedAttributes[attr.attribute_value.attribute.attribute_name] ===
          attr.attribute_value.attribute_value_name
      )
    );
  };

  // Agrega un producto variable al carrito
  const handleAddVariableProduct = (product: any) => {
    const selectedCombination = findSelectedCombination(product);

    if (!selectedCombination) {
      alert("Por favor selecciona una combinación válida antes de agregar al carrito.");
      return;
    }

    addToCart({
      id: product.id,
      product_name: product.product_name,
      product_price: parseFloat(selectedCombination.combination_price),
      quantity: 1,
      combination_id: selectedCombination.id,
      attributes: selectedAttributes,
    });

    setSelectedAttributes({}); // Limpia los atributos seleccionados
  };

  return (
    <div className="pt-21  w-auto">

      {loading ? (
        <div>Cargando productos...</div>
      ) : (
        <Tabs defaultValue="allProducts" className="w-auto relatives pt-4">
          <TabsList>
            <TabsTrigger value="allProducts">Todos los productos</TabsTrigger>
          </TabsList>
          <TabsContent value="allProducts" className="py-8 px-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id}>
                  <Card className="p-0">
                    <CardHeader className="p-0 h-auto">
                      <img
                        src={product.media[0]?.original_url || "https://via.placeholder.com/150"}
                        alt={product.product_name}
                        className="aspect-square h-auto rounded-md rounded-tl-lg rounded-tr-lg object-cover"
                      />
                      <CardTitle className="text-start px-6">{product.product_name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-start">
                        {product.product_description || "Sin descripción"}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p>${product.product_price}</p>
                      {product.combinations.length === 0 ? (
                        <Button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              product_name: product.product_name,
                              product_price: parseFloat(product.product_price),
                              quantity: 1,
                            })
                          }
                          className="bg-blue-500 text-white"
                        >
                          Agregar
                        </Button>
                      ) : (
                        <Dialog>
                          <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
                            Seleccionar
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>{product.product_name}</DialogTitle>
                            </DialogHeader>
                            {/* <form> */}
                            {/* Renderiza un selector por cada atributo */}
                            {product.combinations[0]?.combination_attribute_value.map(
                              (attr: any) => {
                                const attributeName =
                                  attr.attribute_value.attribute.attribute_name;
                                const attributeValues = Array.from(
                                  new Set(
                                    product.combinations.flatMap((comb: any) =>
                                      comb.combination_attribute_value
                                        .filter(
                                          (a: any) =>
                                            a.attribute_value.attribute.attribute_name ===
                                            attributeName
                                        )
                                        .map(
                                          (a: any) =>
                                            a.attribute_value.attribute_value_name
                                        )
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
                              }
                            )}
                            <DialogFooter className="items-center gap-4 mt-4">
                              <Button
                                onClick={() => handleAddVariableProduct(product)}
                                className="bg-blue-500 text-white"
                              >
                                Agregar al carrito
                              </Button>
                            </DialogFooter>
                            {/* </form> */}
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
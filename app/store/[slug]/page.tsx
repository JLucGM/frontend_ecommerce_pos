"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Product } from "@/interfaces/Product";
import { CardProducts } from "@/components/products/cardproducts";
import { useFetchProducts } from "@/hook/useFetchProducts";
import { useState } from "react";

export default function Store() {
  const { slug } = useParams(); // Obtén el slug de la URL
  const validSlug = typeof slug === 'string' ? slug : '';

  const { products, loading, error } = useFetchProducts(validSlug); // Usa el hook personalizado
  const { addToCart } = useCart(); // Accede a la función para agregar productos al carrito
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({}); // Atributos seleccionados

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
      selectedAttributes: selectedAttributes,
    });

    setSelectedAttributes({}); // Limpia los atributos seleccionados
  };

  return (
    <div className="pt-21 mx-5 w-auto">
      {loading ? (
        <div>Cargando productos...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Tabs defaultValue="allProducts" className="w-auto relatives pt-4">
          <TabsList>
            <TabsTrigger value="allProducts">Todos los productos</TabsTrigger>
          </TabsList>
          <TabsContent value="allProducts" className="py-8 px-28s">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <CardProducts
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  handleAddVariableProduct={handleAddVariableProduct}
                  handleAttributeChange={handleAttributeChange}
                  selectedAttributes={selectedAttributes}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
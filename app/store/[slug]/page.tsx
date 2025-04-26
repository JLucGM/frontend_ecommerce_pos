"use client";

import { CardProducts } from "@/components/products/cardproducts";
import { CardInfoStore } from "@/components/ui/card-info-store";
import { Loader } from "@/components/ui/loader-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useFetchProducts } from "@/hook/useFetchProducts";
import { useFetchStore } from "@/hook/useFetchStore";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

export default function Store() {
  const { slug } = useParams(); // Obtén el slug de la URL
  const validSlug = typeof slug === "string" ? slug : "";

  if (!validSlug) {
    return notFound(); // Redirige a una página de error si el slug no es válido
  }

  const { products, loading, error } = useFetchProducts(validSlug); // Usa el hook personalizado
  const { store } = useFetchStore(validSlug); // Obtén la tienda usando el slug
  const { addToCart, settings } = useCart(); // Accede a la función para agregar productos al carrito
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({}); // Atributos seleccionados
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all"); // Categoría seleccionada

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Verifica que products sea un array antes de usar flatMap
  const categories = Array.isArray(products) ? Array.from(
    new Set(
      products.flatMap((product) =>
        product.categories.map((category: any) => category.category_name)
      )
    )
  ) : [];

  // Filtrar productos por categoría
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : Array.isArray(products) ? products.filter((product) =>
        product.categories.some(
          (category: any) => category.category_name === selectedCategory
        )
      ) : [];

  // Maneja la selección de atributos
  const handleAttributeChange = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  return (
    <div className="pt-21 mx-5 w-auto">
      <Tabs defaultValue="all" className="w-auto relatives pt-4">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => setSelectedCategory("all")}
          >
            Todos los productos
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedCategory || "all"} className="py-8 px-28s">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-4">
                <p>No hay productos disponibles en esta categoría.</p>
              </div>
            ) : (
              Array.isArray(filteredProducts) && filteredProducts.map((product) => (
                <CardProducts
                  key={product.id}
                  product={product}
                  currency={settings ? settings.default_currency : "USD"} 
                  addToCart={addToCart}
                  handleAttributeChange={handleAttributeChange}
                  selectedAttributes={selectedAttributes}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-21 mx-5 w-auto">
        {store && (
          <CardInfoStore
            key={store.id}
            data={store}
            showButton={false} // Cambia a true si deseas mostrar el botón
          />
        )}
      </div>
    </div>
  );
}
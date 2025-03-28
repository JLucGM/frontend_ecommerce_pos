"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Product } from "@/interfaces/Product";
import { CardProducts } from "@/components/products/cardproducts";

export default function Store() {
  const { slug } = useParams(); // Obtén el slug de la URL
  const [products, setProducts] = useState<Product[]>([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const { addToCart } = useCart(); // Accede a la función para agregar productos al carrito
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({}); // Atributos seleccionados


  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) return; // Asegúrate de que slug esté definslugo
      setLoading(true); // Inicia la carga
      try {
        const response = await fetch(`https://pos.test/api/stores/${slug}/products`); // Usa el slug en la URL
        const data = await response.json();
        console.log(data); // Verifica la respuesta de la API
        setProducts(data); // Asumiendo que la API devuelve un array de productos
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProducts();
  }, [slug]);

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
    <div className="pt-21 mx-5 w-auto">

      {loading ? (
        <div>Cargando productos...</div>
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
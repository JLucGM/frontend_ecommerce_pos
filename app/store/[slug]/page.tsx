"use client";

import { CardProducts } from "@/components/products/cardproducts";
import { Button } from "@/components/ui/button";
import { CardInfoStore } from "@/components/ui/card-info-store";
import { Loader } from "@/components/ui/loader-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useFetchProducts } from "@/hook/useFetchProducts";
import { useFetchStore } from "@/hook/useFetchStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Store() {
  const { slug } = useParams(); // Obtén el slug de la URL
  const validSlug = typeof slug === "string" ? slug : "";

  if (!validSlug) {
    return notFound(); // Redirige a una página de error si el slug no es válido
  }

  const { products, loading, error } = useFetchProducts(validSlug);
  const { store } = useFetchStore(validSlug);
  const { addToCart, settings } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");

  const tabsListRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const scrollLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Get categories safely
  const categories = Array.isArray(products)
    ? Array.from(
      new Set(
        products.flatMap((product) =>
          product.categories.map((category: any) => category.category_name)
        )
      )
    )
    : [];

  useEffect(() => {
    const handleScroll = () => {
      if (tabsListRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth);
        // console.log("handleScroll called:", { scrollLeft, scrollWidth, clientWidth });
      }
    };

    if (tabsListRef.current) {
      // console.log("Adding scroll event listener");
      tabsListRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      console.log("tabsListRef.current is null");
    }

    return () => {
      if (tabsListRef.current) {
        // console.log("Removing scroll event listener");
        tabsListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [categories, loading]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : Array.isArray(products)
        ? products.filter((product) =>
          product.categories.some(
            (category: any) => category.category_name === selectedCategory
          )
        )
        : [];

  const handleAttributeChange = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  return (
    <div className="pt-21 mx-5 w-auto">
      <Tabs defaultValue="all" className="w-auto relative pt-4">
        {/* Botón para desplazarse a la izquierda */}
        {showLeftButton && (
          <Button
            onClick={scrollLeft}
            size={"icon"}
            variant="default"
            className="absolute left-0 top-0 mt-9 transform -translate-y-1/2 z-10 p-2"
          >
            <ChevronLeft size={20} />
          </Button>
        )}
        <div
          ref={tabsListRef}
          className="overflow-x-auto flex items-center space-x-4 scrollbar-hide relative"
        >
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
        </div>

        {/* Botón para desplazarse a la derecha */}
        {showRightButton && (
          <Button
            onClick={scrollRight}
            size={"icon"}
            variant="default"
            className="absolute right-0 top-0 mt-9 transform -translate-y-1/2 z-10 p-2 shadow-md"
          >
            <ChevronRight size={20} />
          </Button>
        )}

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
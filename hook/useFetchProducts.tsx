import { useState, useEffect } from "react";
import { fetchProductsByStore } from "@/api/products";
import { Product } from "@/interfaces/Product";

export const useFetchProducts = (slug: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProductsByStore(slug);
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  return { products, loading, error };
};
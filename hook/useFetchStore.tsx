import { useState, useEffect } from "react";
import { Store } from "@/interfaces/Store";
import { fetchStoreSlug } from "@/api/fetchStore";

export const useFetchStore = (slug: string) => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchStoreSlug(slug);
        setStore(data[0]);
        // console.log("store data", data); // Muestra la tienda en la consola para depuración
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchStore();
    }
  }, [slug]);

  return { store, loading, error };
};
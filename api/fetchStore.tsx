// Lista el store especificado en el slug
import { API_URL } from "@/service/apiConfig"; // Asegúrate de que la ruta sea correcta
export const fetchStoreSlug = async (slug: string) => {
    if (!slug) throw new Error("El slug de la tienda no está definido");
  
    const response = await fetch(`${API_URL}stores/${slug}`);
    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.statusText}`);
    }
  
    const data = await response.json();
    console.log('fetch store',data); // Muestra los productos en la consola
    return data; // Devuelve los productos
  };
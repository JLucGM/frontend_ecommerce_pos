// Lista todos los store
import { API_URL } from "@/service/apiConfig"; // Asegúrate de que la ruta sea correcta

export const fetchStores = async () => {
  try {
    const response = await fetch(`${API_URL}stores`); // Usa la URL de tu API
    if (!response.ok) {
      throw new Error(`Error fetching stores: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Asegúrate de que esto devuelva la estructura correcta
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
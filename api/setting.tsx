import { API_URL } from "@/service/apiConfig"; // Asegúrate de que la ruta sea correcta

export const fetchSettings = async () => {
  try {
    const response = await fetch(`${API_URL}settings`); // Usa la URL de tu API
    if (!response.ok) {
      throw new Error(`Error fetching settings: ${response.statusText}`);
    }
    const data = await response.json();
    // console.log("Settings data:", data); // Para depuración
    return data; // Asegúrate de que esto devuelva la estructura correcta
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
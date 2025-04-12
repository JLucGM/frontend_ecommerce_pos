import { API_URL } from "@/service/apiConfig";

export const createOrder = async (orderData: any) => {
  console.log('Datos de la orden:', orderData); // Muestra los datos de la orden en la consola
  // Asegúrate de que orderData contenga los datos correctos para la API
    try {
      const response = await fetch(`${API_URL}orders-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${document.cookie
          //   .split('; ')
          //   .find((row) => row.startsWith('myToken='))
          //   ?.split('=')[1]}`, // Incluye el token si es necesario
        },
        body: JSON.stringify(orderData), // Convierte los datos de la orden a JSON
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al crear la orden:', errorData);
        throw new Error(`Error al crear la orden: ${response.statusText}`);
    }
  
      const data = await response.json();
      console.log('Orden creada:', data); // Muestra la respuesta en la consola
      return data; // Devuelve la respuesta de la API
    } catch (error) {
      console.error('Error al crear la orden:', error);
      throw error;
    }
  };
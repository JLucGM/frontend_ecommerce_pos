// src/api/fetchOrder.ts
import { Order } from "@/interfaces/Order";
import { API_URL } from "@/service/apiConfig"; // Asegúrate de que la ruta sea correcta

export const fetchOrder = async (id: string, token?: string): Promise<Order> => {
  try {
    const response = await fetch(`${API_URL}orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Si necesitas un token de autenticación, descomenta la siguiente línea
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la orden');
    }

    const data: Order = await response.json();
    // console.log(data)
    return data; // Devuelve los datos de la orden
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
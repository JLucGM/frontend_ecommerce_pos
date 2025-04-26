// src/api/fetchUser Orders.ts
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta sea correcta
import { API_URL } from "@/service/apiConfig"; // Asegúrate de que la ruta sea correcta

export const fetchOrders = async (id: number): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_URL}orders-list/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Si necesitas un token de autenticación, puedes agregarlo aquí
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las órdenes');
    }

    const data: Order[] = await response.json();
    console.log('orderlis', data)
    return data; // Devuelve los datos de las órdenes
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
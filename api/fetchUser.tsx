// src/api/fetchUser .ts
import { User } from "@/interfaces/User"; // Asegúrate de que la ruta sea correcta
import { API_URL } from "@/service/apiConfig"; // Asegúrate de que la ruta sea correcta

export const fetchUser  = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Si necesitas un token de autenticación, puedes agregarlo aquí
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el usuario');
    }

    const data: User = await response.json();
    // console.log('User  data:', data);
    return data; // Devuelve los datos del usuario
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};
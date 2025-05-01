import { User } from "@/interfaces/User";
import { API_URL } from "@/service/apiConfig";

// Nueva función para actualizar el usuario
export const updateUser  = async (id: number, updatedData: Partial<User>): Promise<User> => {
    console.log('Datos a actualizar:', updatedData); // Muestra los datos a actualizar en la consola
    try {
      const response = await fetch(`${API_URL}users/${id}`, {
        method: 'PUT', // O 'PATCH' si solo actualizas algunos campos
        headers: {
          'Content-Type': 'application/json',
          // Si necesitas un token de autenticación, puedes agregarlo aquí
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData), // Convierte los datos a JSON
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
  
      const data: User = await response.json();
      // console.log('Usuario actualizado:', data);
      return data; // Devuelve los datos actualizados del usuario
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error; // Lanza el error para que pueda ser manejado en el componente
    }
  };
import { API_URL } from "@/service/apiConfig";

export const fetchPaymentMethods = async () => {
    try {
      const response = await fetch(`${API_URL}payment-methods`);
  
      if (!response.ok) {
        throw new Error(`Error al obtener métodos de pago: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data); // Muestra los métodos de pago en la consola
      return data.paymentMethod || [];
    } catch (error) {
      console.error("Error al obtener métodos de pago:", error);
      throw error;
    }
  };
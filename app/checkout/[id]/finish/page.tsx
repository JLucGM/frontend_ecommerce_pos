"use client";

import { useAuth } from "@/context/AuthContext";
import { CircleCheckBig } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchOrder } from "@/api/fetchOrder"; // Importa la función
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta y la interfaz sean correctas

export default function FinishPage() {
  const { id } = useParams(); // Obtén el id de la URL
  const validId = typeof id === "string" ? id : ""; // Verifica que id sea una cadena
  if (!validId) {
    notFound(); // Si no es válido, redirige a la página 404
  }
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); 

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrder(validId); // Llama a la función fetchOrder
        const clientId = user?.id; // Obtén el ID del cliente autenticado

        // Verifica si la orden existe y pertenece al cliente
        if (data && data.user_id === clientId) {
          setOrder(data);
        } else {
          router.push('/404'); // Redirige a una página de error o a la página principal
        }
      } catch (err) {
        console.error('Error al obtener la orden:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        router.push('/404'); // Redirige a una página de error
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, router, user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircleCheckBig className="text-green-500 mb-4" size={64} />
      <p className="text-2xl font-bold mb-4">¡Compra exitosa!</p>
      <p className="text-2xl font-bold mb-4">¡Gracias por tu compra!</p>
      <p className="">Nro. de la orden: {order?.id}</p>
    </div>
  );
}
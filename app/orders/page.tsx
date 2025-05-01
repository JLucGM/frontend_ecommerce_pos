"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Asegúrate de que este hook te dé acceso al usuario logueado
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta sea correcta
import { fetchOrders } from "@/api/ordersList"; // Asegúrate de que la ruta sea correcta
import { columns } from "./columns"; // Asegúrate de que la ruta sea correcta
import { DataTable } from "@/components/orders/DataTable";
import { Title } from "@/components/title";

export default function OrdersPage() {
  const { user } = useAuth(); // Obtén el usuario logueado
  const [orders, setOrders] = useState<Order[]>([]); // Especifica el tipo de estado como Order[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user || !user.id) {
        setError("User  not logged in");
        setLoading(false);
        return;
      }

      try {
        const ordersData = await fetchOrders(user.id); // Llama a la función fetchOrders
        setOrders(ordersData); // Asigna los datos de las órdenes al estado
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Accede al mensaje del error
        } else {
          setError("Error desconocido"); // Manejo de errores desconocidos
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  // if (error) {
  //   return <p className="bg-red-500 mt-52">Error: {error}</p>; // Muestra el mensaje de error
  // }

  return (
    <>
      <div className="pt-21 mx-auto w-auto max-w-5xl">

        <Title
               title="Pedidos"
               />
        {orders.length > 0 ? (
          <DataTable columns={columns} data={orders} /> // Usa el DataTable aquí
        ) : (
          <p>No hay órdenes disponibles.</p>
        )}
      </div>
    </>
  );
}
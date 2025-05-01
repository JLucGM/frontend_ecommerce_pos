"use client";

import { useAuth } from "@/context/AuthContext";
import { CircleCheckBig } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchOrder } from "@/api/fetchOrder"; // Importa la función
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta y la interfaz sean correctas
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Title } from "@/components/title";

export default function FinishPage() {
  const { id } = useParams(); // Obtén el id de la URL
  const { settings } = useCart();
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
  // console.log(order); // Verifica el contenido de la orden
  return (
    <div className="flex flex-col items-center justify-center h-screen ">

      <CircleCheckBig className="text-green-500 mb-4" size={64} />
      <Title
       title="¡Compra exitosa!"
       subtitle="¡Gracias por tu compra!"
       />
      {/* <p className="text-2xl font-bold mb-4">¡Compra exitosa!</p>
      <p className="text-2xl font-bold mb-4">¡Gracias por tu compra!</p> */}
      {/* <p className="mb-4">Nro. de la orden: {order?.id}</p> */}

      {order && (
        <div className="w-full max-w-lg">
          <div className="mb-5 ">
            <div className="flex justify-between items-center col-span-full">
              <p className="font-bold text-lg">Pedido # {order.id}</p>
              <p>{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between items-center col-span-full">

              {order.stores.length > 0 ? (
                <div>
                  {order.stores.map((store) => (
                    <div key={store.id}>
                      <p>{store.store_name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay tiendas asociadas a esta orden.</p>
              )}
              <Badge>
                {order.status}
              </Badge>
            </div>
          </div>
          <Table>
            <TableBody>
              {order.order_items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.name_product}
                    {item.product_details && (
                      <p>
                        {(() => {
                          try {
                            const details: Record<string, any> = JSON.parse(item.product_details);
                            return (
                              <span>
                                {Object.entries(details).map(([key, value]) => (
                                  <span key={key}>
                                    {key}<br/> {value}{" "}
                                  </span>
                                ))}
                              </span>
                            );
                          } catch (error) {
                            return <span>Error al cargar detalles</span>;
                          }
                        })()}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>x {item.quantity}</TableCell>
                  <TableCell>{settings?.default_currency}{item.price_product}</TableCell>
                  <TableCell>{settings?.default_currency}{item.subtotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Subtotal</TableCell>
                <TableCell>{settings?.default_currency}{parseFloat(order.subtotal).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-lg" colSpan={3}>Total</TableCell>
                <TableCell className="text-lg">{settings?.default_currency}{parseFloat(order.total).toFixed(2)}</TableCell>
              </TableRow>
              {/* <p>Descuentos totales: {order.totaldiscounts}</p> */}
            </TableFooter>
          </Table>
        </div>
      )
      }
    </div>
  );
}
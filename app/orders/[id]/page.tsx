// src/pages/OrderPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOrder } from "@/api/fetchOrder"; // Asegúrate de que la ruta sea correcta
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta sea correcta

export default function OrderPage() {
    const { id } = useParams(); // Obtén el ID de la orden desde los parámetros de la URL
    const [order, setOrder] = useState<Order | null>(null); // Estado para almacenar la orden
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado de error

    useEffect(() => {
        const loadOrder = async () => {
            if (!id || Array.isArray(id)) {
                setError("ID de la orden no proporcionado o es inválido."); // Maneja el caso donde el ID es undefined o un arreglo
                setLoading(false);
                return;
            }

            try {
                const orderData = await fetchOrder(id); // Llama a la función fetchOrder
                setOrder(orderData); // Asigna los datos de la orden al estado
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message); // Accede al mensaje del error
                } else {
                    setError("Error desconocido"); // Manejo de errores desconocidos
                }
            } finally {
                setLoading(false); // Cambia el estado de carga a false
            }
        };

        loadOrder(); // Llama a la función para cargar la orden
    }, [id]); // Dependencia del ID

    if (loading) {
        return <p>Cargando orden...</p>; // Mensaje de carga
    }

    if (error) {
        return <p>Error: {error}</p>; // Mensaje de error
    }

    return (
        <div className="pt-21 mx-5 w-auto">
            <h1>Detalles de la Orden</h1>
            {order ? (
                <div>
                    <p>Orden ID: {order.id}</p>
                    <p>Estado: {order.status}</p>
                    <p>Total: {order.total}</p>
                    <p>Subtotal: {order.subtotal}</p>
                    <p>Dirección de entrega: {order.direction_delivery}</p>
                    {/* Muestra más detalles de la orden según sea necesario */}

                    <h2>Método de Pago</h2>
                    {order.payment_method ? (
                        <div>
                            <p>Método: {order.payment_method.payment_method_name}</p>
                        </div>
                    ) : (
                        <p>No hay información del método de pago.</p>
                    )}


                    <h2>Artículos de la Orden</h2>
                    {order.order_items.length > 0 ? (
                        <ul>
                            {order.order_items.map((item) => (
                                <li key={item.id}>
                                    <p>Producto: {item.name_product}</p>
                                    <p>Precio: {item.price_product}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Subtotal: {item.subtotal}</p>
                                    {item.product_details && (
                                        <p>Detalles del producto: {item.product_details}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay artículos en esta orden.</p>
                    )}

                    <h2>Tiendas</h2>
                    {order.stores.length > 0 ? (
                        <ul>
                            {order.stores.map((store) => (
                                <li key={store.id}>
                                    <p>Nombre de la tienda: {store.store_name}</p>
                                    {/* <p>Teléfono: {store.store_phone}</p>
                                    <p>Dirección: {store.store_direction}</p> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay tiendas asociadas a esta orden.</p>
                    )}
                </div>
            ) : (
                <p>No se encontró la orden.</p>
            )}


        </div>
    );
}
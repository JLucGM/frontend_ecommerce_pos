// src/pages/OrderPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOrder } from "@/api/fetchOrder"; // Asegúrate de que la ruta sea correcta
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta sea correcta
import { Table, TableBody, TableCell, TableFooter, TableRow, } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

export default function OrderPage() {
    const { id } = useParams(); // Obtén el ID de la orden desde los parámetros de la URL
    const { settings } = useCart();
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
        <div className="pt-21 w-full max-w-5xl mx-auto ">
            {order ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                        <div className="">
                            <div className="mb-5 border p-4 rounded-lg shadow">
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
                            <div className="border p-4 rounded-lg shadow">
                                <div className="">
                                    <h3 className="font-semibold text-lg">Dirección de entrega</h3>
                                    {order.direction_delivery}
                                </div>
                                <h3 className="font-semibold text-lg">Pago</h3>
                                {order.payment_method ? (
                                    <div>
                                        <p>{order.payment_method.payment_method_name}</p>
                                    </div>
                                ) : (
                                    <p>No hay información del método de pago.</p>
                                )}
                                <div className="col-span-full">

                                    {order?.user ? (
                                        <div>
                                            <h3 className="font-semibold text-lg">Información del cliente</h3>
                                            <p>{order.user.name}</p>
                                            <p>{order.user.email}</p>
                                            <p>{order.user.phone}</p>
                                        </div>
                                    ) : (
                                        <p>No hay información del usuario.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="border p-4 rounded-lg shadow">
                                {order.order_items.length > 0 ? (
                                    <div className="">
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
                                                                                            {key}: {value}{" "}
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
                                ) : (
                                    <p>No hay artículos en esta orden.</p>
                                )}


                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>No se encontró la orden.</p>
            )}



        </div>
    );
}
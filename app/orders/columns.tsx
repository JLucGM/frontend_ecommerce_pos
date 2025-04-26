// src/orders/columns.ts
import { Badge } from "@/components/ui/badge";
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta sea correcta
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id", // Usamos un id personalizado para esta columna
    header: "Orden ID",
    // cell: ({ row }) => {
    //   const orderId = row.original.id; // Obtén el ID de la orden
    //   return (
    //     <Link href={`/orders/${orderId}`} className="text-blue-500 hover:underline">
    //       {orderId} {/* Solo muestra el ID como texto dentro del enlace */}
    //     </Link>
    //   );
    // },
  },
  //   {
  //     accessorKey: "client_id",
  //     header: "Cliente ID",
  //   },
  // {
  //   accessorKey: "user_id",
  //   header: "Usuario ID",
  // },
  {
    id: "productCount", // Usamos un id personalizado para esta columna
    header: "Cantidad de Productos",
    cell: ({ row }) => {
      const orderItems = row.original.order_items; // Accede a los items de la orden
      const totalQuantity = orderItems.reduce((sum, item) => sum + parseInt(item.quantity), 0); // Suma las cantidades
      return <span>{totalQuantity} productos</span>; // Muestra la cantidad total
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    id: "storeName", // Usamos un id personalizado para esta columna
    header: "Tienda",
    cell: ({ row }) => {
      const stores = row.original.stores; // Accede a las tiendas de la orden
      return stores.length > 0 ? stores[0].store_name : "Sin tienda"; // Muestra el nombre de la tienda o un mensaje si no hay
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status; // Obtén el estado de la orden
      return (
        <Badge variant={status === "Finalizado" ? "outline" : "destructive"}>
          {status}
        </Badge>
      ); // Muestra el badge con el estado
    },
  },
  {
    id: "createdAt", // Usamos un id personalizado para esta columna
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.created_at); // Convierte la fecha a un objeto Date
      return <span>{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}</span>; // Muestra la fecha y hora
    },
  },
];
import { Store } from "./Store";

// src/interfaces/Order.ts
export interface OrderItem {
    id: number;
    name_product: string;
    price_product: string;
    quantity: string; // O puedes usar number si prefieres
    subtotal: string;
    order_id: number;
    product_details: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface Order {
    id: number;
    status: string;
    total: string;
    subtotal: string;
    totaldiscounts: string;
    direction_delivery: string | null;
    order_origin: string;
    payments_method_id: number;
    user_id: number;
    client_id: number | null;
    created_at: string;
    updated_at: string;
    stores: Store[];
    order_items: OrderItem[]; // Asegúrate de incluir esta propiedad
    client?: any; // Si tienes un tipo específico para el cliente, cámbialo aquí
    user?: {
      id: number;
      name: string;
      slug: string;
      email: string;
      identification: string | null;
      status: string;
      phone: string;
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
    };
    payment_method?: {
      id: number;
      payment_method_name: string;
      slug: string;
      created_at: string;
      updated_at: string;
    };
  }
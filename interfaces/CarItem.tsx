export interface CartItem {
    id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    combination_id?: number; // ID de la combinación seleccionada (opcional)
    attributes?: { [key: string]: string }; // Atributos seleccionados (opcional)
  }
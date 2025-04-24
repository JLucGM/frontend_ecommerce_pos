interface MediaItem {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversions_disk: string;
    size: number;
    manipulations: any[];
    custom_properties: any[];
    generated_conversions: any[];
    responsive_images: any[];
    order_column: number;
    created_at: string;
    updated_at: string;
    original_url: string;
    preview_url: string;
  }
  
  interface Settings {
    id: number;
  app_name: string;
  slug: string;
  default_currency: string;
  admin_email: string;
  admin_phone: string;
  shipping_base_price: string;
  created_at: string;
  updated_at: string;
  media: MediaItem[];
  }
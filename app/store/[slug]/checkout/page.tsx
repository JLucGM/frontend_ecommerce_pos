"use client";

import { useEffect, useState } from "react";
import { CartCardProducts } from "@/components/cart/cartcardproducts";
import { useCart } from "@/context/CartContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/context/AuthContext";
import { fetchPaymentMethods } from "@/api/payment-methods";
import { Button, buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/title";
import { createOrder } from "@/api/createOrder";
import { useParams, useRouter } from "next/navigation";
import { fetchStoreSlug } from "@/api/fetchStore";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, settings } = useCart();
  const { user, isAuthenticated } = useAuth(); // Obtén el estado de autenticación y la función de logout
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar el Dialog
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null); // Estado para el método seleccionado
  const [storeId, setStoreId] = useState<number | null>(null); // Estado para el ID del store
  
  const router = useRouter(); // Obtén el router
  const { slug } = useParams(); // Obtén el slug de la URL
  const validSlug = typeof slug === "string" ? slug : "";

  // console.log('cartslug',validSlug)

  const subtotal = cart.reduce((total, item) => total + item.product_price * item.quantity, 0);
  const total = subtotal // + taxes; // Si decides usar impuestos, descomenta esta línea

  const handleLoginSuccess = () => {
    setIsDialogOpen(false); // Cierra el Dialog después del login exitoso
  };

  useEffect(() => {
    const getStoreData = async () => {
      try {
        const storeData = await fetchStoreSlug(validSlug);
        console.log('Datos del store:', storeData); // Verifica los datos del store
        if (storeData.length > 0) {
          setStoreId(storeData[0].id); // Accede al primer elemento del array
        } else {
          console.error("No se encontraron datos para el store.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del store:", error);
      }
    };

    if (validSlug) {
      getStoreData();
    }
  }, [validSlug]);

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        const methods = await fetchPaymentMethods();
        setPaymentMethods(methods);
      } catch (error) {
        console.error("Error al cargar los métodos de pago:", error);
      }
    };

    getPaymentMethods();
  }, []);

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      alert("Por favor, inicia sesión para continuar.");
      return;
    }

    if (!selectedMethod) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    if (storeId === null || storeId === undefined) {
      alert("El ID de la tienda no está disponible. Por favor, intenta de nuevo.");
      return;
    }

    const orderData = {
      user_id: user?.id,
      payments_method_id: selectedMethod,
      totaldiscounts: "0",
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      direction_delivery: (document.getElementById("direction") as HTMLTextAreaElement)?.value || null,
      order_origin: "Ecommerce",
      status: "Pendiente",
      store_id: storeId, // Usa el ID del store obtenido
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity.toString(),
        combination_id: item.combination_id || null,
        price: item.product_price.toFixed(2),
        details: item.selectedAttributes || null,
      })),
    };

    try {
      const response = await createOrder(orderData);
      router.push(`/store/${validSlug}/checkout/${response.id}/finish`);
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al crear la orden. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="pt-26">
      <div className="w-full max-w-6xl mx-auto">
      <Title
        title="Carrito de Compras"
        subtitle="Revisa los productos que has agregado a tu carrito."
      />
        <div className="w-full">
          {cart.length > 0 ? (

            <div className="mx-4 md:flex items-start gap-4">
              <div className="px-3 md:w-7/12 rounded-xl border shadow">
                <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                  {cart.map((item) => (
                    <CartCardProducts
                      key={`${item.id}-${JSON.stringify(item.selectedAttributes || {})}`}
                      data={{
                        id: item.id,
                        name: item.product_name,
                        price: item.product_price,
                        quantity: item.quantity,
                        selectedAttributes: item.selectedAttributes,
                        removeFromCart: () => removeFromCart(item.id),
                        imageUrl: item.imageUrl, // Asegúrate de que `imageUrl` esté disponible
                      }}
                    />
                  ))}
                </div>
                <div className="mb-6 pb-6 border-gray-200 text-gray-800">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">{settings?.default_currency} {subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  {/* <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Taxes (GST)</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">{settings?.default_currency} 19.09</span>
                  </div>
                </div> */}
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Delivery</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">{settings?.default_currency} {settings?.shipping_base_price}</span>
                    </div>
                  </div>
                  <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                    <div className="w-full flex items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">Total</span>
                      </div>
                      <div className="pl-3">
                        {/* <span className="font-semibold text-gray-400 text-sm">USD</span>{" "} */}
                        <span className="font-semibold">{settings?.default_currency} {total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  {isAuthenticated ? (
                    <div className="">
                      <Button
                        className="w-full"
                        onClick={handleCreateOrder}
                      >
                        Finalizar el pedido
                      </Button>
                    </div>
                  ) : (
                    <div className="">
                      <p className="text-bold text-gray-600 ">
                        Inicie sesión para finalizar el pedido.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:w-5/12">
                <div className="w-full mx-auto shadow-lg rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                  {isAuthenticated ? (
                    <div className="">
                      <h3 className="text-lg font-semibold mb-4">Datos del cliente</h3>
                      {/* <p>{user?.id}</p> */}
                      <p>{user?.name}</p>
                      <p>{user?.email}</p>
                    </div>
                  ) : (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger className={buttonVariants({ variant: "default" }) + ' w-full'}>
                        Iniciar sesión
                      </DialogTrigger>
                      <DialogContent >
                        <DialogHeader>
                          {/* <DialogTitle>Login</DialogTitle>
                          <DialogDescription>
                            Please log in to continue to checkout.
                          </DialogDescription> */}
                        </DialogHeader>
                        <LoginForm
                          redirectTo={`${validSlug}/checkout`}
                          className="w-full max-w-sm mx-auto"
                          onLoginSuccess={handleLoginSuccess} // Pasa la función al LoginForm
                        />
                      </DialogContent>
                    </Dialog>
                  )}

                </div>
                <div className="w-full mx-auto shadow-lg rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                  <h3 className="text-lg font-semibold mb-4">Delivery</h3>
                  <div>
                    <Label htmlFor="direction">Dirección</Label>
                    <Textarea id="direction" />
                  </div>
                </div>

                <div className="w-full shadow-lg mx-auto border rounded-lg font-light mb-6 p-4">
                  <h3 className="text-lg font-semibold mb-4">Métodos de Pago</h3>
                  <Accordion type="single" collapsible>
                    {Array.isArray(paymentMethods) && paymentMethods.length > 0 ? (
                      paymentMethods.map((method: any) => (
                        <AccordionItem key={method.id} value={`method-${method.id}`}>
                          <AccordionTrigger
                            className="flex items-center justify-between"
                            onClick={() => setSelectedMethod(method.id)} // Selecciona el método al hacer clic
                          >
                            <div className="flex items-center gap-2">
                              {/* Checkbox sincronizado con el estado */}
                              <input
                                type="checkbox"
                                id={`checkbox-${method.id}`}
                                className="w-4 h-4"
                                checked={selectedMethod === method.id} // Sincroniza el estado del checkbox
                                onChange={() => setSelectedMethod(method.id)} // Cambia el estado al seleccionar
                              />
                              <label htmlFor={`checkbox-${method.id}`} className="cursor-pointer">
                                {method.payment_method_name}
                              </label>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="mt-2">
                              {method.details && method.details.length > 0 ? (
                                <div className="mt-4">
                                  <h3 className="text-md font-semibold">Detalles Relacionados:</h3>
                                  <div className="pl-5">
                                    {method.details.map((detail: any) => (
                                      <div key={detail.id}>
                                        <p><strong>{detail.payments_method_details_data_types}:</strong> {detail.payments_method_details_value}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <p className="mt-4">No hay detalles adicionales para este método de pago.</p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <p>No hay métodos de pago disponibles.</p>
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Title
                title="Tu carrito está vacío"
                subtitle="Agrega productos para continuar con tu compra."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
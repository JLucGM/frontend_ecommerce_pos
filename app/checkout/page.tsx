"use client";

import { useState } from "react";
import { CartCardProducts } from "@/components/cart/cartcardproducts";
import { useCart } from "@/context/CartContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación y la función de logout
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar el Dialog

  const handleLoginSuccess = () => {
    setIsDialogOpen(false); // Cierra el Dialog después del login exitoso
  };

  return (
    <div className="pt-26">
      <div className="w-full max-w-3xl mx-auto">
        <div className="w-full">
          <div className="-mx-3 md:flex items-start">
            <div className="px-3 md:w-7/12 lg:pr-10">
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
              <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                <div className="w-full flex mb-3 items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Subtotal</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">$190.91</span>
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Taxes (GST)</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">$19.09</span>
                  </div>
                </div>
              </div>
              <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Total</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold text-gray-400 text-sm">AUD</span>{" "}
                    <span className="font-semibold">$210.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                    {isAuthenticated ? (
                      null
                    ) : (
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger >
                          {/* <button
                        className="text-indigo-500 underline"
                        onClick={() => setIsDialogOpen(true)}
                      > */}
                          Open
                          {/* </button> */}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Login</DialogTitle>
                            <DialogDescription>
                              Please log in to continue to checkout.
                            </DialogDescription>
                          </DialogHeader>
                          <LoginForm
                            redirectTo="/checkout"
                            className="w-full max-w-sm mx-auto"
                            onLoginSuccess={handleLoginSuccess} // Pasa la función al LoginForm
                          />
                        </DialogContent>
                      </Dialog>

                    )}
                {/* <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-semibold">Contact</span>
                  </div>
                  <div className="flex-grow pl-3">
                    <span>Scott Windon</span>
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-semibold">Billing Address</span>
                  </div>
                  <div className="flex-grow pl-3">
                    <span>123 George Street, Sydney, NSW 2000 Australia</span>
                  </div>
                </div> */}
              </div>
              <div className="w-full mx-auto rounded-lg font-light mb-6">
                <div className="w-full p-3 border-b ">
                  <div className="w-full p-3">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type2"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      width="80"
                      className="ml-3"
                    />
                  </div>
                </div>
                <div>
                  <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
                    <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
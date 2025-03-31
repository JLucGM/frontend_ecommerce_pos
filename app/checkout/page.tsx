"use client";

import { CartCardProducts } from "@/components/cart/cartcardproducts";
import { useCart } from "@/context/CartContext";


export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

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
              {/* <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="-mx-2 flex items-end justify-end">
                    <div className="flex-grow px-2 lg:max-w-xs">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                      <div>
                        <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                      </div>
                    </div>
                    <div className="px-2">
                      <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                    </div>
                  </div>
                </div> */}
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
                    <span className="font-semibold text-gray-400 text-sm">AUD</span> <span className="font-semibold">$210.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-3 items-center">
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
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg font-light mb-6">
                <div className="w-full p-3 border-b ">

                  <div className="w-full p-3">
                    <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" className="ml-3" />
                  </div>
                </div>
                <div>
                  <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
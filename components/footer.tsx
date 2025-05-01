'use client'

import { Copyright } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useCart } from "@/context/CartContext";

export const Footer = () => {
  const { settings } = useCart();

  const logofooter = settings?.media.find(item => item.collection_name === "logofooter")?.original_url;

  return (
    <>
      <div className="flex justify-center mb-5  mt-10">

        {logofooter && (
          <img
            src={logofooter}
            alt={settings.app_name} // Usa el nombre de la app como alt
            className="border-0 w-auto h-16 object-cover"
          />
        )}
      </div>
      <div
        className="w-full flex justify-between items-center px-5 py-2"
      >
        <div className="flex items-center">
          <Copyright size={20} />
          2025
          <p className="mx-1 font-semibold text-lg">
            {settings?.app_name || "Logo"} 
            </p>
          Todos los derechos reservados.
        </div>
        <p>
          Desarrollado por
          <a
            href="https://audaz.site/"
            className={buttonVariants({ variant: "link" })}
          >
            Audaz
          </a>
        </p>
      </div>
    </>
  );
}
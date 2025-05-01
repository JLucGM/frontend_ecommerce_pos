"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@/interfaces/Store";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchStores } from "@/api/fetchStores"; // Importa la función
import { Loader } from "@/components/ui/loader-page";
import { CardInfoStore } from "@/components/ui/card-info-store";
import { useCart } from "@/context/CartContext";
import { ArrowDown } from "lucide-react";
import { Title } from "@/components/title";

export default function Home() {
  const { settings } = useCart();
  const [stores, setStores] = useState<Store[]>([]); // Aplica el tipo aquí
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const storesContainerRef = useRef<HTMLDivElement>(null);

  // Fetch data from the API
  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores(); // Llama a la función fetchStores
        // console.log(data); // Asegúrate de que los datos se están obteniendo correctamente
        setStores(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching stores:", error);
        setError("Error al cargar las tiendas."); // Manejo de errores
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    loadStores(); // Llama a la función para cargar las tiendas
  }, []);

  const scrollToStores = () => {
    storesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <Loader />; // Muestra un mensaje de carga
  }

  if (error) {
    return <div className="pt-52 bg-red-400">{error}</div>; // Muestra un mensaje de error
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-around items-center object-cover py-10 bg-no-repeat bg-center bg-[url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">


        <h1 className="text-white text-5xl font-bold drop-shadow ">
          {settings?.app_name}
        </h1>

        <div className="flex flex-wrap w-2/4 justify-center items-center p-4 gap-4">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/store/${store.slug}`}
              className={buttonVariants({ variant: "default", size: "lg" }) + " text-xl px-10"}
            >
              {store.store_name}
            </Link>
          ))}
        </div>


        {/* <Button size={'icon'} className="border-2 border-white bg-white/30 backdrop-blur-sm text-white rounded-full animate-bounce" onClick={scrollToStores}>
          <ArrowDown /> 
          </Button> */}

      </div>

      <div className="px-40 py-15 bg-gray-100" ref={storesContainerRef}>{/* mover aqui*/}
        <Title
          title="Nuestras tiendas"
        />
        <Separator className="bg-gray-700 p-0.5 my-4 " />
        <div className="grid grid-cols-2 gap-4">
          {stores.map((store) => (
            <CardInfoStore
              key={store.id}
              data={store}
              className="border-0 shadow-none"
            />
          ))}
        </div>
      </div>
    </>
  );
}

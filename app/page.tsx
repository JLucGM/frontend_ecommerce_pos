"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Store } from "@/interfaces/Store";
import { Clock, Mail, MapPin, PhoneCall, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [stores, setStores] = useState<Store[]>([]); // Apply the type here

  // Fetch data from the API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("https://pos.test/api/stores/"
          //   , {
          //   'mode': 'cors',
          //   'headers': {
          //     	'Access-Control-Allow-Origin': '*',
          // 	}
          // }
        );
        const data = await response.json();
        console.log(data);
        setStores(data); // Assuming the API returns an array of stores
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <>

      <div className="h-screen flex flex-col justify-center items-center object-cover bg-no-repeat bg-center bg-[url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <h1 className="text-white text-5xl font-bold drop-shadow-xl mb-20">
          tu tienda bien fina
        </h1>
        <div className="flex flex-wrap w-2/4 justify-center items-center p-4 gap-4">

          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/store/${store.slug}`}
              className={buttonVariants({ variant: "outline", size: "lg" }) + " text-xl bg-gray-200"}
            >
              {store.store_name}
            </Link>
          ))}

        </div>
      </div>

      <div className="px-40 py-15">

        <h1 className="text-5xl font-bold">
          Nuestras tiendas
        </h1>
        <Separator className="bg-gray-700 p-0.5 my-4 " />
        <div className="grid grid-cols-2 gap-4">

          {stores.map((store) => (
            <Card key={store.id} className="border-0 shadow-none">
              <CardHeader className="p-0">
                <CardTitle>
                  <h2 className="text-2xl font-bold text-gray-800">{store.store_name}</h2>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="border-b-2 border-gray-700 mb-6 pb-6">
                  <div className="flex gap-6">
                    <MapPin size={32} />
                    <div>
                      <h3 className="text-xl font-semibold">Dirección</h3>
                      <p>{store.store_direction}</p>
                    </div>
                  </div>
                </div>

                <div className="border-b-2 border-gray-700 mb-6 pb-6">
                  <div className="flex gap-6">
                    <PhoneCall size={32} />
                    <div>
                      <h3 className="text-xl font-semibold">Teléfono</h3>
                      <p>{store.store_phone}</p>
                    </div>
                  </div>
                </div>

                {/* <div className="border-b-2 border-gray-700 mb-6 pb-6">
                  <div className="flex gap-6">
                    <Mail size={32} />
                    <div>
                      <h3 className="text-xl font-semibold">Email</h3>
                      <p>{store.email}</p>
                    </div>
                  </div>
                </div>

                <div className="border-b-2 border-gray-700 mb-6 pb-6">
                  <div className="flex gap-6">
                    <Clock size={32} />
                    <div>
                      <h3 className="text-xl font-semibold">Horario</h3>
                      <p>{store.schedule}</p>
                    </div>
                  </div>
                </div> */}
              </CardContent>

              <CardFooter className="flex justify-center">
                <Link href={`/store/${store.slug}`}>
                  <Button className="text-xl" size="lg">
                    Ver tienda
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}





        </div>
      </div>
      <h1>
        footer
      </h1>
    </>
  );
}

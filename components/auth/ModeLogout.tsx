"use client"

import * as React from "react"
import { logout as serviceLogout } from "@/service/auth" // Renombramos para evitar confusión
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext" // Importa el contexto de autenticación
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"


export function ModeLogout({className}: any) {
    const router = useRouter()
    const { logout: contextLogout } = useAuth() // Obtén la función `logout` del contexto

    const handleLogout = async () => {
        const token = localStorage.getItem("token"); // Este debe ser el token de Laravel
        console.log("Token:", token); // Verifica el token aquí
        if (token) {
            try {
                await serviceLogout(token); // Llama a la función de servicio para cerrar sesión
                localStorage.removeItem("token"); // Elimina el token del almacenamiento local
                contextLogout(); // Actualiza el estado global de autenticación
                router.push("/"); // Redirige a la página principal
            } catch (err) {
                console.error("Logout failed", err);
            }
        }
    };

    return (
        <Button className={` ${className}`} variant={'link'} onClick={handleLogout}>
            Cerrar sesión
        </Button>
    )
}
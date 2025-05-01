"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces/User"; // Asegúrate de que la ruta sea correcta
import { fetchUser } from "@/api/fetchUser";
import { updateUser } from "@/api/updateUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Title } from "@/components/title";

export default function ProfilePage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [fetchedUser, setFetchedUser] = useState<User | null>(null); // Estado para almacenar el usuario obtenido
    const [loading, setLoading] = useState(true); // Estado de carga
    // const [avatar, setAvatar] = useState<string>(""); // Estado para el avatar
    const [name, setName] = useState<string>(""); // Estado para el nombre
    const [email, setEmail] = useState<string>(""); // Estado para el email
    const [identification, setIdentification] = useState<string>(""); // Estado para la identificación
    const [phone, setPhone] = useState<string>(""); // Estado para el teléfono
    const [error, setError] = useState<string>(""); // Estado para manejar errores

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //       router.push("/auth/login");
    //     }
    //   }, [isAuthenticated, router]);

    useEffect(() => {
        const getUser = async () => {
            if (isAuthenticated && user) {
                try {
                    const userData = await fetchUser(user.id); // Llama a fetchUser   con user.id
                    setFetchedUser(userData); // Almacena los datos del usuario
                    // setAvatar(userData.avatar || ""); // Asegúrate de que no sea undefined
                    setName(userData.name); // Inicializa el estado del nombre
                    setEmail(userData.email); // Inicializa el estado del email
                    setIdentification(userData.identification || ""); // Asegúrate de que no sea null
                    setPhone(userData.phone || ""); // Asegúrate de que no sea null
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                } finally {
                    setLoading(false); // Cambia el estado de carga a false
                }
            }
        };

        getUser(); // Llama a la función
    }, [isAuthenticated, user]);

    // Muestra un loader mientras se determina el estado de autenticación
    // if (loading) {
    //     return <div>Cargando...</div>;
    // }

    // Si el usuario no está autenticado, no renderiza nada (el redireccionamiento ya ocurrió)
    // if (!isAuthenticated) {
    //     return <h1 className="mt-40">no estas logueado</h1>;
    // }

    // Función para manejar la actualización del usuario
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setError(""); // Resetea el estado de error

        if (!user) {
            setError("Usuario no encontrado");
            return;
        }

        try {
            const updatedData: Partial<User> = { name, email, identification, phone }; // Datos a actualizar
            // console.log('Datos a actualizar enviado desde la vista:', updatedData); // Muestra los datos a actualizar en la consola
            const updatedUser = await updateUser(user.id, updatedData); // Llama a updateUser       
            setFetchedUser(updatedUser); // Actualiza el estado con los datos del usuario actualizado
            // console.log('Usuario actualizado:', updatedUser);
        } catch (error) {
            setError('Error al actualizar el usuario'); // Manejo de errores
            console.error('Error al actualizar el usuario:', error);
        }
    };

    // Renderiza el contenido del perfil si el usuario está autenticado
    return (
        
        <div className="pt-25 items-center md:mt-0 justify-center min-h-screen w-3xl  mx-auto">
            {isAuthenticated ? (
                <>
            <Title
                title="Perfil"
            />

            <form onSubmit={handleUpdate} className="border p-4 rounded-md shadow">
                {/* <label className="mr-4">Avatar</label>
                <div className="flex items-center mb-4">

                    <Avatar className="w-24 h-24 mr-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <Input
                        type="file"
                        accept="image/*"
                        name="avatar"
                        className="w-4/10"
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                </div> */}

                <div className="grid grid-cols-2 gap-4 -4">
                    <div className="">
                        <label>Nombre</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="">
                        <label>Identificación</label>
                        <Input
                            type="text"
                            value={identification}
                            onChange={(e) => setIdentification(e.target.value)}
                            className="w-full"
                        />
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="">
                        <label>Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="">
                        <label>Teléfono</label>
                        <Input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Muestra el error si existe */}
                {error && <p className="text-destructive">{error}</p>}

                <div className="text-end">

                    <Button variant={'outline'} >
                        Actualizar
                    </Button>
                </div>
            </form>
            </>

) : (
    <>
            <div className="pt-25 items-center md:mt-0 justify-center min-h-screen w-3xl  mx-auto">

      no estas logueadoss
        </div>
    </>
  )}

        </div>
        
    );
}
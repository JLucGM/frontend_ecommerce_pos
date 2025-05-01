"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zod";
import { login } from "@/service/auth";
import { useAuth } from "@/context/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  redirectTo?: string; // Prop opcional para definir la ruta de redirección
  onLoginSuccess?: () => void; // Nuevo prop opcional
}

export function LoginForm({
  className,
  redirectTo = "/", // Valor predeterminado: "/"
  onLoginSuccess,
  ...props
}: LoginFormProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const { login: setAuthenticated, setUser } = useAuth(); // Agrega `setUser` del contexto

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");

    try {
      const data = await login(values.email, values.password);
      if (data.token) {
        localStorage.setItem("token", data.token);

        // Actualiza el estado del contexto con los datos del usuario
        setUser({ email: data.user.email, name: data.user.name });

        setAuthenticated(); // Marca al usuario como autenticado
        onLoginSuccess?.(); // Llama a la función si está definida
        router.push(redirectTo); // Usa el prop `redirectTo` para redirigir
      } else {
        setError("No se recibió un token de autenticación.");
      }
    } catch (err) {
      setError("Credenciales inválidas");
      console.error("Error en el login:", err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Inicio de sesión</CardTitle>
          <CardDescription>
          Ingrese su correo electrónico a continuación para iniciar sesión en su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form} >
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="joedoe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
'use client'

import { useState, useEffect } from "react";
import { Id, toast } from "react-toastify";
import { login, logout } from "@/controllers/firebaseController";
import { getUserByEmail } from "@/controllers/userController";
import { UserType } from "@/models/userModels";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const afterToast = async (delay: number) => {
      await new Promise(resolve => setTimeout(resolve, delay));
      setLoading(false);
    }

    const handle_login = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      const logging = toast.loading("Iniciando sesión", {
        position: "top-center",
      });

      const user = await login(email, password);
      if (user) {
        handle_login_successful(logging, user);
      } else {
        handle_login_incorrect(logging);
      }
    }

    const handle_login_successful = async (toastVar: Id, user: import("firebase/auth").User) => {
      const userData: UserType | null = await getUserByEmail(user.email!);
      if (!userData) {
        handle_login_incorrect(toastVar);
      }

      if (userData && userData.status == "disabled") {
        toast.update(toastVar, {
          render: "Cuenta deshabilitada",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        await afterToast(1500);
        return;
      }

      toast.update(toastVar, {
        render: "Sesión iniciada correctamente",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
      setEmail("");
      setPassword("");
      await afterToast(1500);
      window.location.href = "/authenticated";
    }

    const handle_login_incorrect = async (toastVar: Id) => {
      toast.update(toastVar, {
        render: "Error al iniciar sesión",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
      await afterToast(1500);
    }

    useEffect(() => {
      logout();
    }, [])

    return (
        <div className="h-svh w-svw flex justify-center items-center bg-white">
            {/* Form Container */}
            <div className="flex flex-col gap-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <h1 className="text-6xl font-bold max-sm:text-4xl">Jalco</h1>
                </div>

                {/* Form */}
                <div className="flex flex-col w-72 gap-4 max-sm:w-60">
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {if (e.key === "Enter") { handle_login() }}}
                      className="text-[16px] rounded-md border-2 px-2 py-1"
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {if (e.key === "Enter") { handle_login() }}}
                      className="text-[16px] rounded-md border-2 px-2 py-1"
                    />
                </div>

                {/* Send Button */}
                <button
                  className="rounded-md bg-black text-white hover:cursor-pointer"
                  onClick={handle_login}
                >
                  <p className="py-1 max-sm:text-sm font-bold">Iniciar Sesión</p>
                </button>
            </div>
        </div>
    );
}


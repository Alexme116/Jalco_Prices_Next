'use client'

import { useState } from "react";
import { toast } from "react-toastify";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handle_login = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      const logging = toast.loading("Iniciando sesión", {
        position: "top-center",
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.dismiss(logging);
      setLoading(false);
    }

    return (
        <div className="h-svh w-svw flex justify-center items-center">
            {/* Form Container */}
            <div className="flex flex-col gap-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <h1 className="text-6xl font-bold max-sm:text-4xl">Jalco</h1>
                </div>

                {/* Form */}
                <div className="flex flex-col w-72 gap-4 max-sm:w-60">
                    <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {if (e.key === "Enter") { handle_login() }}}
                        className="text-[16px] rounded-md border-2 px-2 py-1"
                    />
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
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


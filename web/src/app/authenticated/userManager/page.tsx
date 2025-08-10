'use client';

import { useState } from "react"
import { toast } from "react-toastify"
import { createUserController } from "@/controllers/userController";
import { register } from "@/controllers/firebaseController";

export default function AddUserPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [rol, setRol] = useState("default")
    const [canAddUser, setCanAddUser] = useState(true)

    const clear_fields = () => {
        setEmail("")
        setPassword("")
        setRepeatPassword("")
        setRol("default")
    }

    const handleCreateUser = async () => {
        if (!canAddUser) {
            return;
        }
        setCanAddUser(false);
        const creatingUser = toast.loading("Creando Usuario", {
            position: "top-center",
        });

        try {
            checkUserFields(email, password, repeatPassword, rol)
            await register(email, password)
            await createUserController(email, rol)
            toast.update(creatingUser, {
                render: "Usuario creado exitosamente",
                type: "success",
                isLoading: false,
                autoClose: 1500
            })
            clear_fields()
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCanAddUser(true)
        } catch (error) {
            toast.update(creatingUser, {
                render: error instanceof Error ? error.message : "Error al crear usuario",
                type: "error",
                isLoading: false,
                autoClose: 1500
            })
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCanAddUser(true)
        }
    }

    const checkUserFields = (email: string, password: string, repeatPassword: string, rol: string) => {
        if (email.trim() == "" || password.trim() == "" || repeatPassword.trim() == "") {
            throw new Error("Completa todos los campos");
        }
        if (rol === "default") {
            throw new Error("Selecciona un rol");
        }
        if (password !== repeatPassword) {
            throw new Error("Las contraseñas no coinciden");
        }
        if (!email.includes("@") || !email.includes(".")) {
            throw new Error("El correo electrónico no es válido");
        }
        if (password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }
    }

    return (
        <section className="flex flex-col gap-10">
            {/* Title */}
            <h1 className="text-center text-2xl font-bold max-sm:text-lg">Agregar Usuario</h1>

            {/* Form Section */}
            <div className="flex justify-center">
                {/* Form Container */}
                <div className="flex flex-col gap-4">
                    {/* Email Input */}
                    <div className="flex flex-col w-72">
                        <h1 className="text-xs font-bold">Correo electrónico</h1>
                        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {if (e.key === "Enter") { handleCreateUser() }}}
                            className="text-[16px] rounded-md border-2 px-2 pb-[2px] bg-white"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col w-72">
                        <h1 className="text-xs font-bold">Contraseña</h1>
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {if (e.key === "Enter") { handleCreateUser() }}}
                            className="text-[16px] w-72 rounded-md border-2 px-2 pb-[2px] bg-white"
                        />
                    </div>

                    {/* Repeat Password Input */}
                    <div className="flex flex-col w-72">
                        <h1 className="text-xs font-bold">Repetir contraseña</h1>
                        <input type="password" placeholder="Repetir contraseña" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}
                            onKeyDown={(e) => {if (e.key === "Enter") { handleCreateUser() }}}
                            className="text-[16px] w-72 rounded-md border-2 px-2 pb-[2px] bg-white"
                        />
                    </div>

                    {/* Select Rol */}
                    <div className="flex flex-col">
                        <h1 className="text-xs font-bold">Rol</h1>
                        <select className={`rounded-md border-2 px-2 py-[3px] max-sm:text-sm border-black bg-white hover:cursor-pointer ${rol == "default" ? "text-gray-400" : "text-black"}`}
                            value={rol} onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="default" disabled className="text-gray-400">Selecciona un rol</option>
                            <option value="admin" className="text-black">Administrador</option>
                            <option value="user" className="text-black">Empleado</option>
                        </select>
                    </div>

                    {/*Add Button */}
                    <button
                        className="rounded-md mt-6 bg-black text-white hover:cursor-pointer"
                        onClick={handleCreateUser}
                    >
                        <p className="pb-2 pt-1 max-md:pt-0 max-md:pb-[6px] max-md:text-sm">Agregar</p>
                    </button>
                </div>
            </div>
        </section>
    )
}
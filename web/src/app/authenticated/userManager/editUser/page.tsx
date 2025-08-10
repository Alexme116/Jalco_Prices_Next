'use client';

import { useState } from "react"
import { toast } from "react-toastify"
import { editUserRolByEmailController } from "@/controllers/userController";

export default function AdminEditUser() {
    const [email, setEmail] = useState<string>("")
    const [rol, setRol] = useState<string>("default")
    const [canEditUser, setCanEditUser] = useState<boolean>(true)

    const handleChangeUserDetails = async () => {
        if (!canEditUser) {
            return;
        }
        setCanEditUser(false);

        const changingUserDetails = toast.loading("Cambiando detalles de usuario", {
            position: "top-center",
        });

        try {
            checkUserFields(email, rol);
            await editUserRolByEmailController(email, rol);
            toast.update(changingUserDetails, {
                render: "Detalles de usuario cambiados",
                type: "success",
                isLoading: false,
                autoClose: 1500
            });
            clearFields();
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCanEditUser(true);
        } catch (error) {
            toast.update(changingUserDetails, {
                render: error instanceof Error ? error.message : "Error al cambiar detalles de usuario",
                type: "error",
                isLoading: false,
                autoClose: 1500
            });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setCanEditUser(true);
        }
    }

    const checkUserFields = (email: string, rol: string) => {
        if (!email) {
            throw new Error("El correo electrónico es obligatorio");
        }
        if (rol === "default") {
            throw new Error("Selecciona un rol");
        }
        if (!email.includes("@") || !email.includes(".")) {
            throw new Error("El correo electrónico no es válido");
        }
    }

    const clearFields = () => {
        setEmail("");
        setRol("default");
    }

    return (
        <div className="flex-1 flex flex-col gap-10">
            {/* Title */}
            <h1 className="text-2xl text-center font-bold max-sm:text-lg">Cambiar Detalles de Usuario</h1>

            {/* Main Container */}
            <div className="flex-1 flex justify-center">
                {/* Form Section */}
                <div className="flex justify-center">
                    {/* Form Container */}
                    <div className="flex flex-col w-72 gap-4">
                        {/* Email Input */}
                        <div className="flex flex-col">
                            <h1 className="text-xs font-bold">Correo electrónico</h1>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => {if (e.key === "Enter") { handleChangeUserDetails() }}}
                                className="text-[16px] rounded-md border-2 px-2 pb-[2px] bg-white"
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

                        {/*Change Button */}
                        <button
                            className="rounded-md mt-6 bg-black text-white hover:cursor-pointer"
                            onClick={handleChangeUserDetails}>
                            <p className="py-2 max-md:text-sm">Cambiar</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
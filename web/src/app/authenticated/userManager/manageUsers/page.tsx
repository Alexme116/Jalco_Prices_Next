'use client';

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { getAllUsers, editUserStatusByEmailController } from "@/controllers/userController";
import { UserType } from "@/models/userModels"
import { ProgressSpinner } from "@/icons/Icons"

export default function AdminManageUsers() {
    const [users, setUsers] = useState<UserType[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | string | null>(null)
    const [canChangeStatus, setCanChangeStatus] = useState(true)
    const [refresh, setRefresh] = useState(false)

    const handleChangeUserStatus = async (email: string, status: "enabled" | "disabled") => {
        if (!canChangeStatus) {
            return
        }
        setCanChangeStatus(false)
        const changing_user_status = toast.loading("Cambiando Estado", {
            position: "top-center",
        });

        try {
            await editUserStatusByEmailController(email, status == "enabled" ? "disabled" : "enabled")
            toast.update(changing_user_status, {
                render: "Estado cambiado",
                type: "success",
                isLoading: false,
                autoClose: 1500
            })
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch {
            toast.update(changing_user_status, {
                render: error instanceof Error ? error.message : "Error al cambiar el estado",
                type: "error",
                isLoading: false,
                autoClose: 1500
            })
            await new Promise(resolve => setTimeout(resolve, 1500));
        } finally {
            setCanChangeStatus(true)
            setRefresh(!refresh)
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const usersData = await getAllUsers()
                setUsers(usersData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error obteniendo usuarios")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [refresh])

    return (
        <div className="flex-1 flex flex-col gap-10">
            {/* Title */}
            <h1 className="text-2xl text-center font-bold max-sm:text-lg">Administrar Usuarios</h1>

            {/* Loading */}
            {loading && (
                <div className="w-full flex justify-center">
                    <ProgressSpinner />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="w-full">
                    <h1 className="text-center">Error: {error instanceof Error ? error.message : error}</h1>
                </div>
                
            )}

            {/* Users List */}
            {!loading && !error &&
                <div className="flex justify-center">
                    {users && users?.length == 0 ?
                        <h1 className="text-center">No hay usuarios disponibles</h1>
                        :
                        <div className="overflow-auto w-fit">
                            <table className="bg-white shadow-md shadow-[#0000002c] border-2 border-[#dfdfdf]">
                                <thead className="bg-[#dfdfdf]">
                                    <tr>
                                        <th className="py-2">Email</th>
                                        <th className="py-2">Rol</th>
                                        <th className="py-2">Estado</th>
                                        <th className="py-2">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user, index) => (
                                        <tr key={index} className="border-t hover:bg-[#f1f1f1]">
                                            {/* Email Section */}
                                            <td className="px-4 py-2">
                                                <div className="flex items-center">
                                                    {user.email}
                                                </div>
                                            </td>

                                            {/* Rol Section */}
                                            <td className="px-4 py-2">
                                                <div className="flex items-center justify-center">
                                                    {user.rol == "admin" ? "Administrador" : "Empleado"}
                                                </div>
                                            </td>

                                            {/* Status Section */}
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center items-center gap-2">
                                                    <span>{user.status === "enabled" ? "Activado" : "Desactivado"}</span>
                                                    <div
                                                        className={`w-3 h-3 rounded-full mt-[2px] ${user.status === "enabled" ? "bg-green-500" : "bg-red-500"}`}
                                                    />
                                                </div>
                                            </td>

                                            {/* Action Section */}
                                            <td className="px-4 py-2">
                                                <button
                                                    className="px-3 pt-1 pb-[6px] rounded-lg bg-[#e4aa3d] text-white text-sm hover:cursor-pointer"
                                                    onClick={() => handleChangeUserStatus(user.email, user.status)}
                                                >
                                                    Cambiar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
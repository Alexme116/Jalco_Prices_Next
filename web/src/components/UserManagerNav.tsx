'use client';

export default function UserManagerNav(
    { actualWindow, handleChangeView } :
    { actualWindow: string, handleChangeView: (newWindow: string) => void }
) {
    return (
        <div className="flex flex-col gap-7 items-center">
            <div className="flex gap-7">
                {/* Add User Button */}
                <button
                    className={`px-3 py-2 text-white rounded-md max-sm:px-2 hover:cursor-pointer ${actualWindow == "/authenticated/userManager" ? "bg-[#e4aa3d]" : "bg-[#77797a]"}`}
                    onClick={() => handleChangeView("/authenticated/userManager")}
                >
                    <h1 className="max-sm:text-sm">
                        Agregar Usuario
                    </h1>
                </button>

                {/* Edit User Button */}
                <button
                    className={`px-3 py-2 text-white rounded-md max-sm:px-3 hover:cursor-pointer ${actualWindow == "/authenticated/userManager/editUser" ? "bg-[#e4aa3d]" : "bg-[#77797a]"}`}
                    onClick={() => handleChangeView("/authenticated/userManager/editUser")}
                >
                    <h1 className="max-sm:text-sm">
                        Editar Usuario
                    </h1>
                </button>
            </div>

            {/* Administrate Users Button */}
            <button
                className={`px-3 py-2 text-white rounded-md max-sm:px-2 hover:cursor-pointer ${actualWindow == "/authenticated/userManager/manageUsers" ? "bg-[#e4aa3d]" : "bg-[#77797a]"}`}
                onClick={() => handleChangeView("/authenticated/userManager/manageUsers")}
            >
                <h1 className="max-sm:text-sm">
                    Administrar Usuarios
                </h1>
            </button>
        </div>
    )
}
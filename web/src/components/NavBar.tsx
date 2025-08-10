'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter, usePathname } from "next/navigation";
import {
    IconTweak,
    IconUser,
    IconDashboard,
    IconAdd,
    IconMenu,
    MessageIcon,
    ReportIcon,
} from "@/icons/Icons";
import JalcoLogo from "@/assets/Images/logo_jalco.png";

export default function NavBar() {
    const { user, isDevice } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const [showSettings, setShowSettings] = useState(false);
    const [actualWindow, setActualWindow] = useState<string>("");

    const handleChangeView = (path: string) => {
        router.push(path);
        setShowSettings(false);
    };

    useEffect(() => {
        // Actualiza actualWindow según el pathname actual
        if (pathname.includes("/userManager")) {
            setActualWindow("/userManager");
        } else if (pathname.includes("/addProduct")) {
            setActualWindow("/addProduct");
        } else if (pathname.includes("/chat")) {
            setActualWindow("/chat");
        } else if (pathname.includes("/report")) {
            setActualWindow("/report");
        } else if (pathname.includes("/authenticated")) {
            setActualWindow("/authenticated");
        } else {
            setActualWindow("");
        }
    }, [pathname]);

    return (
        <section className="bg-white">
            <div className="flex items-center justify-between h-20 p-5 max-md:h-16">
                {/* Left Side */}
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <button
                        onClick={() => handleChangeView("/authenticated")}
                        className="hover:cursor-pointer"
                    >
                        <Image
                            src={JalcoLogo}
                            alt="Jalco"
                            className="h-14 w-auto max-md:h-10 rounded-lg"
                        />
                    </button>

                    <div
                        className={`flex items-center gap-10 transition-all duration-500 overflow-hidden ${user == null ? "w-0" : user.rol == "admin" ? "w-[290px]" : "w-[92px]"
                            }`}
                    >
                        {/* Dashboard Icon */}
                        {isDevice != "Mobile" && (
                            <button
                                onClick={() => handleChangeView("/authenticated")}
                                className="hover:cursor-pointer"
                            >
                                <IconDashboard
                                    color={actualWindow == "/authenticated" ? "#edbd63" : "#77797a"}
                                    w={"26px"}
                                    h={"26px"}
                                />
                            </button>
                        )}

                        {/* Add Product Icon */}
                        {isDevice != "Mobile" && user?.rol == "admin" && (
                            <button
                                onClick={() => handleChangeView("/authenticated/addProduct")}
                                className="hover:cursor-pointer"
                            >
                                <IconAdd
                                    color={actualWindow == "/addProduct" ? "#edbd63" : "#77797a"}
                                    w={"26px"}
                                    h={"26px"}
                                />
                            </button>
                        )}

                        {/* User Manager Icon */}
                        {isDevice != "Mobile" && user?.rol == "admin" && (
                            <button
                                onClick={() => handleChangeView("/authenticated/userManager")}
                                className="hover:cursor-pointer"
                            >
                                <IconUser
                                    color={actualWindow == "/userManager" ? "#edbd63" : "#77797a"}
                                    w={"26px"}
                                    h={"26px"}
                                />
                            </button>
                        )}

                        {/* Messages Chat */}
                        {isDevice != "Mobile" && (
                            <button
                                onClick={() => handleChangeView("/authenticated/chat")}
                                className="hover:cursor-pointer"
                            >
                                <MessageIcon
                                    color={actualWindow == "/chat" ? "#edbd63" : "#77797a"}
                                    w={"26px"}
                                    h={"26px"}
                                />
                            </button>
                        )}

                        {/* Report KPI's */}
                        {isDevice != "Mobile" && user?.rol == "admin" && (
                            <button
                                onClick={() => handleChangeView("/authenticated/report")}
                                className="hover:cursor-pointer"
                            >
                                <ReportIcon
                                    color={actualWindow == "/report" ? "#edbd63" : "#77797a"}
                                    w={"26px"}
                                    h={"26px"}
                                />
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex">
                    {/* Tweak or Menu Button */}
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="hover:cursor-pointer"
                    >
                        {isDevice != "Mobile" ? (
                            <IconTweak color="#77797a" w={"26px"} h={"26px"} />
                        ) : (
                            <IconMenu color="#77797a" w={"20px"} h={"20px"} />
                        )}
                    </button>
                </div>
            </div>

            {/* Settings */}
            {showSettings && user && (
                <>
                    <div className="z-30 absolute top-16 right-0 flex flex-col items-center gap-5 p-5 rounded-bl-lg bg-white">
                        {/* Settings Title */}
                        <h1 className="md:text-lg">
                            {user?.rol == "admin" ? "Administrador" : "Empleado"}
                        </h1>

                        {/* Settings Dashboard */}
                        {isDevice == "Mobile" && (
                            <button
                                className="flex gap-2 items-center hover:cursor-pointer"
                                onClick={() => handleChangeView("/authenticated")}
                            >
                                <div>
                                    <IconDashboard
                                        color={actualWindow == "/authenticated" ? "#edbd63" : "#77797a"}
                                        w={"20px"}
                                        h={"20px"}
                                    />
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Inicio</h1>
                            </button>
                        )}

                        {/* Settings Add Product */}
                        {isDevice == "Mobile" && user?.rol == "admin" && (
                            <button
                                className="flex gap-2 items-center hover:cursor-pointer"
                                onClick={() => handleChangeView("/authenticated/addProduct")}
                            >
                                <div>
                                    <IconAdd
                                        color={actualWindow == "/addProduct" ? "#edbd63" : "#77797a"}
                                        w={"20px"}
                                        h={"20px"}
                                    />
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Agregar</h1>
                            </button>
                        )}

                        {/* Settings User Manager */}
                        {isDevice == "Mobile" && user?.rol == "admin" && (
                            <button
                                className="flex gap-2 items-center hover:cursor-pointer"
                                onClick={() => handleChangeView("/authenticated/userManager")}
                            >
                                <div>
                                    <IconUser
                                        color={actualWindow == "/userManager" ? "#edbd63" : "#77797a"}
                                        w={"20px"}
                                        h={"20px"}
                                    />
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Usuarios</h1>
                            </button>
                        )}

                        {/* Settings Chat */}
                        {isDevice == "Mobile" && (
                            <button
                                className="flex gap-2 items-center hover:cursor-pointer"
                                onClick={() => handleChangeView("/authenticated/chat")}
                            >
                                <div>
                                    <MessageIcon
                                        color={actualWindow == "/chat" ? "#edbd63" : "#77797a"}
                                        w={"20px"}
                                        h={"20px"}
                                    />
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Mensajes</h1>
                            </button>
                        )}

                        {/* Settings Report */}
                        {isDevice == "Mobile" && user?.rol == "admin" && (
                            <button
                                className="flex gap-2 items-center hover:cursor-pointer"
                                onClick={() => handleChangeView("/authenticated/report")}
                            >
                                <div>
                                    <ReportIcon
                                        color={actualWindow == "/report" ? "#edbd63" : "#77797a"}
                                        w={"20px"}
                                        h={"20px"}
                                    />
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Reporte</h1>
                            </button>
                        )}

                        {/* Setting Logout */}
                        <button
                            className="w-full px-3 py-2 bg-black text-white rounded-lg shadow-r-0 hover:cursor-pointer"
                            onClick={() => handleChangeView("/")}
                        >
                            <h1 className="max-md:text-sm">Cerrar Sesión</h1>
                        </button>
                    </div>

                    <button
                        className="z-20 absolute h-svh w-svw"
                        onClick={() => setShowSettings(false)}
                    />
                </>
            )}
        </section>
    );
}

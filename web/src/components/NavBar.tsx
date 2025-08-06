'use client';

/* eslint-disable react/prop-types */
import Image from "next/image";
import { useState, useEffect } from "react"
import { IconTweak, IconUser, IconDashboard, IconAdd, IconMenu, MessageIcon, ReportIcon } from "@/icons/Icons";
import JalcoLogo from "@/assets/Images/logo_jalco.png";

export default function NavBar(
    { userType, isDevice } :
    { userType: string, isDevice: string }
) {
    const [windowChanged, setWindowChanged] = useState(false)
    const [actualWindow, setActualWindow] = useState<string>("")
    const [showSettings, setShowSettings] = useState(false)

    const handleChangeView = (path: string) => {
        window.location.href = path
        setWindowChanged(!windowChanged)
        setShowSettings(false)
    }

    const checkWindow = (path: string) => {
        if (path.includes("/usermanager")) {
            setActualWindow("usermanager")
        } else if (path.includes("/addproduct")) {
            setActualWindow("addproduct")
        } else if (path.includes("/chat")) {
            setActualWindow("chat")
        } else if (path.includes("/report")) {
            setActualWindow("report")
        } else if (path.includes("/chat")) {
            setActualWindow("chat")
        } else if (path.includes("/report")) {
            setActualWindow("report")
        } else if (path.includes("/dashboard")) {
            setActualWindow("dashboard")
        } else {
            setActualWindow("")
        }
    }

    useEffect(() => {
        checkWindow(window.location.pathname)
    })

    return(
        <>
            <div className="flex items-center justify-between h-20 p-5 max-md:h-16">
                {/* Left Side */}
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <button
                        onClick={() => handleChangeView("/dashboard")}
                        className="hover:cursor-pointer"
                    >
                        <Image src={JalcoLogo} alt="Jalco" className="h-14 w-auto max-md:h-10 rounded-lg"/>
                    </button>

                    {/* Dashboard Icon */}
                    {isDevice != "Mobile" &&
                        <button
                            onClick={() => handleChangeView("/dashboard")}
                            className="hover:cursor-pointer"
                        >
                            <IconDashboard color={actualWindow == "dashboard" ? "#edbd63" : "#77797a"} w={"26px"} h={"26px"}/>
                        </button>
                    }

                    {/* Add Product Icon */}
                    {isDevice != "Mobile" && userType == "admin" &&
                        <button
                            onClick={() => handleChangeView("/addproduct")}
                            className="hover:cursor-pointer"
                        >
                            <IconAdd color={actualWindow == "addproduct" ? "#edbd63" : "#77797a"} w={"26px"} h={"26px"}/>
                        </button>
                    }

                    {/* User Manager Icon */}
                    {isDevice != "Mobile" && userType == "admin" &&
                        <button
                            onClick={() => handleChangeView("/usermanager")}
                            className="hover:cursor-pointer"
                        >
                            <IconUser color={actualWindow == "usermanager" ? "#edbd63" : "#77797a"} w={"26px"} h={"26px"}/>
                        </button>
                    }

                    {/* Messages Chat */}
                    {isDevice != "Mobile" &&
                        <button
                            onClick={() => handleChangeView("/chat")}
                            className="hover:cursor-pointer"
                        >
                            <MessageIcon color={actualWindow == "chat" ? "#edbd63" : "#77797a"} w={"26px"} h={"26px"}/>
                        </button>
                    }

                    {/* Report KPI's */}
                    {isDevice != "Mobile" && userType == "admin" &&
                        <button
                            onClick={() => handleChangeView("/report")}
                            className="hover:cursor-pointer"
                        >
                            <ReportIcon color={actualWindow == "report" ? "#edbd63" : "#77797a"} w={"26px"} h={"26px"}/>
                        </button>
                    }
                </div>

                {/* Right Side */}
                <div className="flex">
                    {/* Tweak or Menu Button */}
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="hover:cursor-pointer"
                    >
                        {isDevice != "Mobile" ?
                            <IconTweak color="#77797a" w={"26px"} h={"26px"} />
                            :
                            <IconMenu color="#77797a" w={"20px"} h={"20px"}/>
                        }
                    </button>
                </div>
            </div>

            {/* Settings */}
            {showSettings &&
                <>
                    <div className="z-30 absolute top-16 right-0 flex flex-col items-center gap-5 p-5 rounded-bl-lg bg-white">
                        {/* Settings Title */}
                        <h1 className="md:text-lg">{userType == "admin" ? "Administrador" : "Empleado"}</h1>

                        {/* Settings Dashboard */}
                        {isDevice == "Mobile" &&
                            <button className="flex gap-2 items-center hover:cursor-pointer" onClick={() => handleChangeView("/dashboard")}>
                                <div>
                                    <IconDashboard color={actualWindow == "dashboard" ? "#edbd63" : "#77797a"}  w={"20px"} h={"20px"}/>
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Inicio</h1>
                            </button>
                        }

                        {/* Settings Add Product */}
                        {isDevice == "Mobile" && userType == "admin" &&
                            <button className="flex gap-2 items-center hover:cursor-pointer" onClick={() => handleChangeView("/addproduct")}>
                                <div>
                                    <IconAdd color={actualWindow == "addproduct" ? "#edbd63" : "#77797a"} w={"20px"} h={"20px"}/>
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Agregar</h1>
                            </button>
                        }

                        {/* Settings User Manager */}
                        {isDevice == "Mobile" && userType == "admin" &&
                            <button className="flex gap-2 items-center hover:cursor-pointer" onClick={() => handleChangeView("/usermanager")}>
                                <div>
                                    <IconUser color={actualWindow == "usermanager" ? "#edbd63" : "#77797a"} w={"20px"} h={"20px"}/>
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Usuarios</h1>
                            </button>
                        }

                        {/* Settings Chat */}
                        {isDevice == "Mobile" &&
                            <button className="flex gap-2 items-center hover:cursor-pointer" onClick={() => handleChangeView("/chat")}>
                                <div>
                                    <MessageIcon color={actualWindow == "chat" ? "#edbd63" : "#77797a"}  w={"20px"} h={"20px"}/>
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Mensajes</h1>
                            </button>
                        }

                        {/* Settings Report */}
                        {isDevice == "Mobile" && userType == "admin" &&
                            <button className="flex gap-2 items-center hover:cursor-pointer" onClick={() => handleChangeView("/report")}>
                                <div>
                                    <ReportIcon color={actualWindow == "report" ? "#edbd63" : "#77797a"}  w={"20px"} h={"20px"}/>
                                </div>
                                <h1 className="text-sm pt-[0.5px]">Reporte</h1>
                            </button>
                        }

                        {/* Setting Logout */}
                        <button className="w-full px-3 py-2 bg-black text-white rounded-lg" onClick={() => handleChangeView("/")}>
                            <h1 className="max-md:text-sm">Cerrar Sesión</h1>
                        </button>
                    </div>

                    <button className="z-20 absolute h-svh w-svw" onClick={() => setShowSettings(false)}/>
                </>
            }
        </>
    )
}
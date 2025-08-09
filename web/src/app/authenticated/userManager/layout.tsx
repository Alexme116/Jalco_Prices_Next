'use client';

import "../../globals.css";
import { useState, useEffect } from "react";
import UserManagerNav from "@/components/UserManagerNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [windowChanged, setWindowChanged] = useState(false)
    const [actualWindow, setActualWindow] = useState<string>("")

    const handleChangeView = (path: string) => {
        window.location.href = path
        setWindowChanged(!windowChanged)
    }

    useEffect(() => {
        setActualWindow(window.location.pathname)
    }, [windowChanged])

    return (
        <section className="p-5 flex flex-col gap-10">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center max-md:text-xl">Administrar Usuarios</h1>

            <UserManagerNav actualWindow={actualWindow} handleChangeView={handleChangeView} />

            {children}
        </section>
    );
}

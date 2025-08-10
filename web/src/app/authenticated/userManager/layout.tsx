'use client';

import "../../globals.css";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import UserManagerNav from "@/components/UserManagerNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const [windowChanged, setWindowChanged] = useState(false)
    const [actualWindow, setActualWindow] = useState<string>("")

    const handleChangeView = (path: string) => {
        router.push(path);
        setWindowChanged(!windowChanged)
    }

    useEffect(() => {
        setActualWindow(pathname)
    }, [pathname])

    return (
        <section className="p-5 flex flex-col gap-10">
            <UserManagerNav actualWindow={actualWindow} handleChangeView={handleChangeView} />

            {children}
        </section>
    );
}

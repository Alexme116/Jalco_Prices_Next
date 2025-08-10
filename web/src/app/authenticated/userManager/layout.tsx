/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import "../../globals.css";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { ProgressSpinner } from "@/icons/Icons";
import UserManagerNav from "@/components/UserManagerNav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useUser();
    const [windowChanged, setWindowChanged] = useState(false)
    const [actualWindow, setActualWindow] = useState<string>("")
    const [loadingUser, setLoadingUser] = useState(true)

    const router = useRouter();
    const pathname = usePathname();

    const handleChangeView = (path: string) => {
        router.replace(path);
        setWindowChanged(!windowChanged)
    }

    // Update Actual Window
    useEffect(() => {
        setActualWindow(pathname)
    }, [pathname])

    // Check User Permissions
    useEffect(() => {
        if (user) {
            if (user.rol != "admin") {
                router.replace("/authenticated");
            } else {
                setLoadingUser(false);
            }
        }
    }, [user]);

    return (
        <section className="p-5 flex flex-col gap-10">
            <UserManagerNav actualWindow={actualWindow} handleChangeView={handleChangeView} />

            {loadingUser || !user ? (
                <div className="flex justify-center">
                    <ProgressSpinner />
                </div>
            ) : (
                children
            )}
        </section>
    );
}

'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { getUserByEmail } from "@/controllers/userController";
import { UserType } from "@/models/userModels";

type UserContextType = {
    user: UserType | null;
    loading: boolean;
    isDevice: "Mobile" | "Tablet" | "Pc";
    setIsDevice: React.Dispatch<React.SetStateAction<"Mobile" | "Tablet" | "Pc">>;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    isDevice: "Mobile",
    setIsDevice: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDevice, setIsDevice] = useState<"Mobile" | "Tablet" | "Pc">("Mobile");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                window.location.href = "/";
                return;
            }

            if (firebaseUser.email) {
                try {
                    const userData = await getUserByEmail(firebaseUser.email);
                    setUser(userData);
                } catch (error) {
                    console.error("Error al obtener el usuario:", error);
                }
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) setIsDevice("Pc");
            else if (window.innerWidth > 600) setIsDevice("Tablet");
            else setIsDevice("Mobile");
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, isDevice, setIsDevice }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

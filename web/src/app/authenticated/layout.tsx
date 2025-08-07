'use client';

import "../globals.css";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { auth } from "@/configs/firebaseConfig";
import { getUserByEmail } from "@/controllers/userController";
import { UserType } from "@/models/userModels";
import { ProgressSpinner } from "@/icons/Icons";
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isDevice, setIsDevice] = useState('Mobile');

  // Check user authentication
  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (!user) {
        window.location.href = "/";
      }

      if (user && user.email) {
        const userData = await getUserByEmail(user.email);
        if (userData) {
          setUser(userData);
        }
      }
    });
  }, [auth]);

  // Check device type
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsDevice('Pc');
      } else if (window.innerWidth > 600 && window.innerWidth <= 1024) {
        setIsDevice('Tablet');
      } else {
        setIsDevice('Mobile');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, [])

  return (
    <section className="h-svh w-svw flex flex-col overflow-hidden">
      <NavBar user={user} isDevice={isDevice} />
      {user ?
        <section>
          {children}
        </section>
        :
        <section className="flex-1 flex items-center justify-center">
          <ProgressSpinner />
        </section>
      }
      <ToastContainer />
    </section>
  );
}

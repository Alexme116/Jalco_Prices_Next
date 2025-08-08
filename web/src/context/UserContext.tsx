'use client';

import { createContext, useContext } from "react";
import { UserType } from "@/models/userModels";

export const UserContext = createContext<UserType | null>(null);

export const useUser = () => useContext(UserContext);
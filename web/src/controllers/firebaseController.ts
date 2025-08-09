import { auth } from "@/configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (email: string, password: string): Promise<import("firebase/auth").User | undefined> => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user.user;
    } catch {
        return undefined;
    }
}

export const register = async (email: string, password: string): Promise<import("firebase/auth").User | undefined> => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user.user;
    } catch {
        return undefined;
    }
}

export const logout = async () => {
    await signOut(auth);
}
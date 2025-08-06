import { auth } from "@/configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const backendHost = process.env.NEXT_BACKEND_HOST;

export const login = async (email: string, password: string): Promise<import("firebase/auth").User | undefined> => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user.user;
    } catch (error) {
        return undefined;
    }
}

export const register = async (email: string, password: string): Promise<import("firebase/auth").User | undefined> => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user.user;
    } catch (error) {
        return undefined;
    }
}

export const logout = async () => {
    await signOut(auth);
}
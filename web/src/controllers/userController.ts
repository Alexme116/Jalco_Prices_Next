'use server'

import { UserType } from "@/models/userModels"

const { BACKEND_HOST, BACKEND_BEARER_TOKEN } = process.env;

export const getUserByEmail = async (email: string): Promise<UserType | null> => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/user/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
        }

        const { user } : { user: UserType } = await response.json();
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
}
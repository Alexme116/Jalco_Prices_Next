'use server'

import { UserType } from "@/models/userModels"

const { BACKEND_HOST, BACKEND_BEARER_TOKEN } = process.env;

export const getAllUsers = async (): Promise<UserType[]> => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al obtener usuarios");
        }

        return data.users;
    } catch (error) {
        throw error;
    }
}

export const getUserByEmail = async (email: string): Promise<UserType | null> => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/user/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Error al obtener usuario");
        }

        const { user } : { user: UserType } = data;
        return user;
    } catch (error) {
        throw error;
    }
}

export const createUserController = async (email: string, rol: string): Promise<UserType | null> => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify({ email, rol })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al crear usuario");
        }

        const { user } : { user: UserType } = data;
        return user;
    } catch (error) {
        throw error;
    }
}

export const editUserRolByEmailController = async (email: string, rol: string) => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/user/email/rol/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify({ rol })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al editar usuario");
        }

        const { user } : { user: UserType } = data;
        return user;
    } catch (error) {
        throw error;
    }
}

export const editUserStatusByEmailController = async (email: string, status: string) => {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/user/email/status/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify({ status })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al editar usuario");
        }

        const { user } : { user: UserType } = data;
        return user;
    } catch (error) {
        throw error;
    }
}
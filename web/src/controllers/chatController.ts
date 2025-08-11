'use server'

import { ChatType } from "@/models/chatModels";

const { BACKEND_HOST, BACKEND_BEARER_TOKEN } = process.env;

export async function getAllChatsController(): Promise<ChatType[]> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/chat`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch chats");
        }

        const { chats } : { chats: ChatType[] } = await response.json();
        return chats;
    } catch (error) {
        throw error;
    }
}

export async function createNewChatController(newChat: ChatType): Promise<ChatType> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify(newChat)
        });

        if (!response.ok) {
            throw new Error("Failed to create new chat");
        }

        const { chat } : { chat: ChatType } = await response.json();
        return chat;
    } catch (error) {
        throw error;
    }
}
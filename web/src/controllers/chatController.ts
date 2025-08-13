'use server'

import { ChatType, MessageType } from "@/models/chatModels";

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

export async function addMessageToChatController(chatId: string, message: MessageType): Promise<void> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/chat/${chatId}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify(message)
        });

        if (!response.ok) {
            throw new Error("Failed to add message to chat");
        }
    } catch (error) {
        throw error;
    }
}

export async function updateChatTitleAndStatusController(chatId: string, title: string, status: "normal" | "important"): Promise<void> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/chat/${chatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            },
            body: JSON.stringify({ title, status })
        });

        if (!response.ok) {
            throw new Error("Failed to update chat");
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteChatByIdController(chatId: string): Promise<void> {
    try {
        const response = await fetch(`${BACKEND_HOST}/api/chat/${chatId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BACKEND_BEARER_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete chat");
        }
    } catch (error) {
        throw error;
    }
}
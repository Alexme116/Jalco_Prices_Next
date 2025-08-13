'use client';

import { useState } from "react"
import { toast } from "react-toastify";
import { createNewChatController } from "@/controllers/chatController";
import { ChatType } from "@/models/chatModels";

export default function CreateChat(
    { setShowCreateChat, chats, setChats } :
    { setShowCreateChat: (show: boolean) => void, chats: ChatType[] | null, setChats: (chats: ChatType[]) => void }
) {
    const [title, setTitle] = useState("");
    const [createChatAvailable, setCreateChatAvailable] = useState(true);

    const handle_create_chat = async () => {
        if (!createChatAvailable) {
            return;
        }
        setCreateChatAvailable(false);
        const creatingChat = toast.loading("Creando Chat", {
            position: "top-center",
        });

        try {
            await createChat()
            toast.update(creatingChat, {
                render: "Chat creado",
                type: "success",
                isLoading: false,
                position: "top-center",
                autoClose: 1500
            });
            setShowCreateChat(false);
            setTitle("");
        } catch {
            toast.update(creatingChat, {
                render: "Error al crear el chat",
                type: "error",
                isLoading: false,
                position: "top-center",
                autoClose: 1500
            })
            await new Promise(resolve => setTimeout(resolve, 1500));
        } finally {
            setCreateChatAvailable(true);
        }
    }

    const createChat = async () => {
        if (!chats) {
            throw new Error("No chats available");
        }

        let ind = 1
        if (chats.length != 0) {
            ind = chats[0].ind + 1
        }
        
        const newChat = {
            ind: ind,
            title: title,
            messages: [],
            status: "normal" as "normal" | "important",
        }
        
        const chatCreated = await createNewChatController(newChat);
        setChats([chatCreated, ...chats]);
    }

    return (
        <div
            className="z-10 absolute top-0 left-0 h-full w-full flex justify-center items-center bg-[#00000096] cursor-default"
            onClick={() => { setShowCreateChat(false) } }
        >
            {/* Create Chat Container */}
            <div
                className="w-72 flex flex-col gap-3 p-3 rounded-lg bg-[rgb(239,243,246)] border-2 border-[#edbd63]"
                onClick={(e) => { e.stopPropagation() } }
            >
                {/* Title */}
                <h1 className="text-2xl font-bold text-center">Crear un chat</h1>

                {/* Title Input Container */}
                <div className="flex flex-col">
                    <h1 className="text-xs font-bold text-start pl-1">Titulo</h1>
                    <input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {if (e.key === "Enter") { handle_create_chat() }}}
                        className="
                            w-full rounded-md border-2 px-2 pb-[2px] outline-none
                            max-sm:text-sm
                        "
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-around mt-3">
                    {/* Cancel Button */}
                    <button className="py-1 px-2 rounded-lg bg-[#0000001a] hover:cursor-pointer"
                        onClick={() => setShowCreateChat(false)}
                    >
                        <h1 className="">Cancelar</h1>
                    </button>

                    {/* Confirm Button */}
                    <button className="py-1 px-2 rounded-lg bg-[#edbd63] hover:cursor-pointer"
                        onClick={() => handle_create_chat()}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}
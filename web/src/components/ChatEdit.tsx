'use client';

import { useState, useEffect } from "react"
import { ChatType } from "@/models/chatModels";
import { ArrowReturnIcon } from "@/icons/Icons";

export default function ChatEdit(
    { chat, setChatToEdit, handleEditChat } :
    { chat: ChatType | null, setChatToEdit: (chat: ChatType | null) => void, handleEditChat: (chat: ChatType) => void }
) {
    const [title, setTitle] = useState("");

    const handleSetImportant = (chat: ChatType) => {
        chat.status = chat.status == "normal" ? "important" : "normal";
        handleEditChat(chat);
    }

    useEffect(() => {
        if (chat) {
            setTitle(chat.title);
        }
    }, [chat]);

    return (
        <div className="relative h-full w-full p-3">
            {/* Return button */}
            <button onClick={() => setChatToEdit(null)} className="absolute top-5 left-5">
                <ArrowReturnIcon color="#77797a" w={"24px"} h={"24px"} />
            </button>

            {/* Main Container */}
            {chat &&
                <div className="h-full flex flex-col gap-10 items-center justify-center">
                    {/* Title Change */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center font-bold text-xl">Title</h1>
                        <input type="text" placeholder="Chat Title" value={title} onChange={(e) => setTitle(e.target.value)}
                            className="text-center w-72 outline-none border-2 rounded-lg"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    chat.title = title;
                                    handleEditChat(chat);
                                    setChatToEdit(null);
                                }
                            }}
                        />
                    </div>

                    {/* Change Chat Hover Color */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center font-bold text-xl">Color del fondo del chat</h1>
                        <div className="flex justify-center">
                            <button className="bg-[#edbd63] px-5 pt-2 pb-3 rounded-lg"
                                onClick={() => {handleSetImportant(chat)}}
                            >
                                <h1 className="text-white">
                                    {chat.status == "normal" ? "Cambiar a importante" : "Cambiar a normal"}
                                </h1>
                            </button>
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="flex justify-center">
                        <button className="bg-black px-5 pt-2 pb-3 rounded-lg"
                            onClick={() => {
                                chat.title = title;
                                handleEditChat(chat);
                                setChatToEdit(null);
                            }}
                        >
                            <h1 className="text-white">Guardar</h1>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
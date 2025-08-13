'use client';

import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from "react";
import { ChatType } from '@/models/chatModels';
import { CaretLeftIcon, DotsIcon, TrashIcon, EditIcon, ProgressSpinner } from "@/icons/Icons";

export default function ChatList(
    { chats, chatSelected, userType, handleSelectChat, setShowChatList, isDevice, setChatToEdit, handleDeleteChat, setShowCreateChat } :
    {
        chats: ChatType[] | null, chatSelected: ChatType | null, userType: "user" | "admin" | undefined, handleSelectChat: (chat: ChatType) => void,
        setShowChatList: (show: boolean) => void, isDevice: string, setChatToEdit: (chat: ChatType) => void, handleDeleteChat: (chat: ChatType) => void,
        setShowCreateChat: (show: boolean) => void
    }
) {
    const [chatHovered, setChatHovered] = useState<number | null>(null);
    const [chatTweaksSelected, setChatTweaksSelected] = useState<number | null>(null);
    const [showChatTweaks, setShowChatTweaks] = useState<boolean>(false);
    const tweaksRef = useRef<HTMLDivElement | null>(null);
    const tweaksRoot = typeof document !== "undefined" ? document.getElementById("portal-root") : null;
    const [tweaksPosition, setTweaksPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const handle_edit_chat = (e: React.MouseEvent, chat: ChatType) => {
        e.stopPropagation();
        setChatToEdit(chat);
        clearDotsSelection();
    }

    const handle_delete_chat_chatlist = (e: React.MouseEvent, chat: ChatType) => {
        e.stopPropagation();
        handleDeleteChat(chat);
        clearDotsSelection();
    }

    const clearDotsSelection = () => {
        setChatHovered(null);
        setChatTweaksSelected(null);
        setShowChatTweaks(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tweaksRef.current && !tweaksRef.current.contains(event.target as Node)) {
                setShowChatTweaks(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);

    return (
        <div className="h-full flex flex-col">
            {/* Add Chat Container */}
            <div className="flex justify-between">
                {/* Add Chat Button */}
                <button
                    className="px-4 pt-1 pb-[7px] rounded-lg bg-black hover:cursor-pointer"
                    onClick={() => setShowCreateChat(true)}
                >
                    <h1 className="text-white">Nuevo Chat</h1>
                </button>

                {/* Close Button */}
                { isDevice != "Pc" &&
                    <button
                        className='hover:cursor-pointer'
                        onClick={() => setShowChatList(false)}>
                        <CaretLeftIcon color="#77797a" w={"24px"} h={"24px"} />
                    </button>
                }
            </div>

            {/* Chats List */}
            <div className="overflow-auto flex-1 w-52 flex flex-col gap-2 mt-5">
                {(!chats || userType == undefined) && (
                    <div className="flex justify-center">
                        <ProgressSpinner />
                    </div>
                )}

                {chats && chats.length == 0 && userType != undefined && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-gray-500">Crea un nuevo chat</p>
                    </div>
                )}

                {chats && chats.length > 0 && userType != undefined && 
                    chats.map((chat, index) => (
                        <div
                            key={index}
                            className={`
                                relative flex justify-between items-center p-3 rounded-lg gap-2 hover:cursor-pointer
                                ${chat.status == "normal" ?
                                    chat.title == chatSelected?.title ? "bg-[#00000020]" : "bg-transparent hover:bg-[#00000010]"
                                    :
                                    chat.title == chatSelected?.title ? "bg-[#eece91]" : "bg-[#ffe6b7] hover:bg-[#eece91]"
                                }
                            `}
                            onClick={() => {
                                handleSelectChat(chat);
                                setShowChatList(false)
                            }}
                            onMouseEnter={() => setChatHovered(index)}
                            onMouseLeave={() => setChatHovered(null)}
                        >
                            {/* Chat Title */}
                            <h1 className='w-full text-start max-lg:text-sm truncate'>{chat.title}</h1>

                            {/* Dots Button */}
                            {((chatHovered === index || (showChatTweaks && chatTweaksSelected === index)) && isDevice == "Pc") &&
                                <button
                                    className='hover:cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setTweaksPosition({ top: rect.bottom - 5, left: rect.right });
                                        setChatTweaksSelected(index);
                                        setShowChatTweaks(true);
                                    }}
                                >
                                    <DotsIcon color="#77797a" w={"24px"} h={"24px"} />
                                </button>
                            }

                            {/* Chat Tweaks */}
                            {showChatTweaks && chatTweaksSelected == index && tweaksRoot &&
                                ReactDOM.createPortal(
                                    <div
                                        ref={tweaksRef}
                                        className="z-50 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-lg"
                                        style={{
                                            position: "fixed",
                                            top: tweaksPosition.top,
                                            left: tweaksPosition.left
                                        }}
                                    >
                                        {/* Edit Chat Button */}
                                        <button
                                            className="flex items-center gap-3 text-[#77797a] hover:cursor-pointer"
                                            onClick={(e) => handle_edit_chat(e, chat)}
                                        >
                                            <EditIcon color="#77797a" w={"18px"} h={"18px"} />
                                            <h1>Editar</h1>
                                        </button>

                                        {/* Delete Chat Button */}
                                        {userType == "admin" &&
                                            <button
                                                className="flex items-center gap-3 text-red-500 hover:cursor-pointer"
                                                onClick={(e) => handle_delete_chat_chatlist(e, chat)}
                                            >
                                                <TrashIcon color="#ef4444" w={"18px"} h={"18px"} />
                                                <h1>Eliminar</h1>
                                            </button>
                                        }
                                    </div>,
                                    tweaksRoot
                                )
                            }
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

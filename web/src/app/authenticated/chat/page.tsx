'use client';

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { getAllChatsController } from "@/controllers/chatController";
import { MessageType, ChatType } from "@/models/chatModels";
import { ProgressSpinner, CaretRightIcon, DotsIcon, EditIcon, TrashIcon } from "@/icons/Icons";
import ChatList from "@/components/ChatList";
import ChatDashboard from "@/components/ChatDashboard";
import ChatEdit from "@/components/ChatEdit";
import CreateChat from "@/components/CreateChat";

export default function ChatPage() {
    const { user, isDevice } = useUser();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [chats, setChats] = useState<ChatType[] | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [chatSelected, setChatSelected] = useState<ChatType | null>(null);
    const [showChatList, setShowChatList] = useState<boolean>(false);
    const [chatToEdit, setChatToEdit] = useState<ChatType | null>(null);
    const [showChatTweaks, setShowChatTweaks] = useState<boolean>(false);
    const [showCreateChat, setShowCreateChat] = useState<boolean>(false);
    const [deleteChatAvailable, setDeleteChatAvailable] = useState<boolean>(true);
    const [updateChatAvailable, setUpdateChatAvailable] = useState<boolean>(true);
    const tweaksRef = useRef<HTMLDivElement | null>(null);

    const handleSelectChat = (chat: ChatType) => {
        setMessages(chat.messages);
        setChatSelected(chat);
    }

    const handleSendText = async (text: string) => {
        if (!user) {
            return;
        }

        const newMessage: MessageType = {
            ind: messages.length + 1,
            text: text,
            email: user?.email,
            rol: user?.rol
        };

        try {
            sendText(newMessage);
            // await add_message_to_chat(chatSelected._id, newMessage);
        } catch {
            toast.error("Error al enviar el mensaje", {
                position: "top-center",
                autoClose: 1950
            });
            deleteLastMessage(newMessage.ind);
        }
    }

    const deleteLastMessage = (index: number) => {
        if (!chatSelected || !chats) {
            return;
        }

        const newMessageList = messages.filter((m) => m.ind != index);
        const newChat = {
            ...chatSelected,
            messages: newMessageList
        };
        const updatedChats = chats.map((c) => {
            if (c._id == chatSelected._id) {
                return newChat;
            }
            return c;
        });
        setChats(updatedChats);
        setChatSelected(newChat);
        setMessages(newMessageList);
    }

    const sendText = async (newMessage: MessageType) => {
        if (!chatSelected || !chats) {
            return;
        }

        const newMessageList = [...messages, newMessage];
        const newChat = {
            ...chatSelected,
            messages: newMessageList
        };
        const updatedChats = chats.map((c) => {
            if (c._id == chatSelected._id) {
                return newChat;
            }
            return c;
        });
        setChats(updatedChats);
        setChatSelected(newChat);
        setMessages(newMessageList);
    }

    const handleEditChat = async (chat: ChatType) => {
        if (!updateChatAvailable || !chats) {
            return;
        }
        setUpdateChatAvailable(false);
        const updatingChat = toast.loading("Editando Chat", {
            position: "top-center",
        })

        try {
            // await update_chat_edit(chat._id, chat.title, chat.status);
            const updatedChats = chats.map((c) => {
                if (c._id == chat._id) {
                    return { ...c, title: chat.title, status: chat.status };
                }
                return c;
            });
            setChats(updatedChats);
            setChatToEdit(null);
            handleSelectChat(chat);
            toast.update(updatingChat, {
                render: "Chat editado",
                type: "success",
                isLoading: false,
                position: "top-center",
                autoClose: 1500
            });
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch {
            toast.update(updatingChat, {
                render: "Error al editar el chat",
                type: "error",
                isLoading: false,
                position: "top-center",
                autoClose: 1500
            })
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } finally {
            setUpdateChatAvailable(true);
        }
    }

    const handleDeleteChat = async (chat: ChatType) => {
        if (!deleteChatAvailable) {
            return;
        }
        setDeleteChatAvailable(false);
        const deletingChat = toast.loading("Eliminando Chat", {
            position: "top-center",
        })

        try {
            await deleteChat(chat);
            setShowChatTweaks(false);
            setChatSelected(null);
            setShowChatList(true);
            toast.update(deletingChat, {
                render: "Chat eliminado",
                type: "success",
                isLoading: false,
                position: "top-center",
                autoClose: 1500
            });
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch {
            toast.update(deletingChat, {
                render: "Error al eliminar el chat",
                type: "error",
                isLoading: false,
                position: "top-center",
                autoClose: 1500
            })
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } finally {
            setDeleteChatAvailable(true);
        }
    }

    const deleteChat = async (chat: ChatType) => {
        if (chats) {
            // await delete_chat(chat._id);
            const newChats = chats.filter((c) => c._id != chat._id);
            setChats(newChats);
        }
    }

    // Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tweaksRef.current && !tweaksRef.current.contains(event.target as Node)) {
                setShowChatTweaks(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    // Chat Selection
    useEffect(() => {
        if (chatSelected) {
            setShowChatList(false);
        } else {
            setShowChatList(true);
        }
    }, [chatSelected]);

    // Fetch Chats
    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            try {
                const response = await getAllChatsController()
                setChats(response);
            } catch (error) {
                setError(error instanceof Error ? error : new Error("Unknown error"));
            } finally {
                setLoading(false);
            }
        };
        
        fetchChats();
    }, []);

    return (
        <section className="relative h-full w-full flex">
            {/* Loading */}
            {loading && !user && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ProgressSpinner />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="w-full pt-5">
                    <h1 className="text-center">Error: {error.message}</h1>
                </div>
                
            )}

            {/* Main Container */}
            {!loading && !error && user &&
                <>
                    {/* Show Chat List Button */}
                    {isDevice != "Pc" && !showChatList && !chatToEdit &&
                        <button
                            className="absolute top-3 left-2 hover:cursor-pointer"
                            onClick={() => setShowChatList(!showChatList)}
                        >
                            <CaretRightIcon color="#77797a" w={"24px"} h={"24px"} />
                        </button>
                    }

                    {/* Dots Mobile Button */}
                    {isDevice != "Pc" && !chatToEdit && chatSelected &&
                        <button
                            className="absolute top-3 right-5 hover:cursor-pointer"
                            onClick={() => setShowChatTweaks(true)}
                        >
                            <DotsIcon color="#77797a" w={"24px"} h={"24px"} />
                        </button>
                    }

                    {/* Chat Tweaks Menu */}
                    {isDevice != "Pc" && showChatTweaks && chatSelected &&
                        <div
                            ref={tweaksRef}
                            className="absolute top-12 right-0 flex flex-col gap-4 p-3 bg-white rounded-bl-lg shadow-lg"
                        >
                            {/* Edit Chat BG Button */}
                            <button
                                className="flex items-center gap-3 text-[#77797a] hover:cursor-pointer"
                                onClick={() => {setChatToEdit(chatSelected); setShowChatTweaks(false)}}
                            >
                                <EditIcon color="#77797a" w={"18px"} h={"18px"} />
                                <h1>Editar</h1>
                            </button>

                            {/* Delete Chat Button */}
                            {user.rol == "admin" &&
                                <button
                                    className="flex items-center gap-3 text-red-500 hover:cursor-pointer"
                                    onClick={() => handleDeleteChat(chatSelected)}
                                >
                                    <TrashIcon color="#ef4444" w={"18px"} h={"18px"} />
                                    <h1>Eliminar</h1>
                                </button>
                            }
                        </div>
                    }

                    {/* Left Section */}
                    {((showChatList && isDevice != "Pc") || isDevice == "Pc") &&
                        <div
                            className="
                                h-full p-3
                                max-xl:absolute max-xl:bg-white"
                        >
                            <ChatList
                                chats={chats}
                                chatSelected={chatSelected}
                                userType={user.rol}
                                handleSelectChat={handleSelectChat}
                                setShowChatList={setShowChatList}
                                isDevice={isDevice}
                                setChatToEdit={setChatToEdit}
                                handleDeleteChat={handleDeleteChat}
                                setShowCreateChat={setShowCreateChat}
                            />
                        </div>
                    }

                    {/* Right Section */}
                    <div
                        className="
                            flex-1 overflow-hidden m-5 ml-0 rounded-3xl bg-white shadow-[#8b8b8b71] shadow-[0px_0px_10px_3px]
                            max-xl:m-0 max-xl:rounded-none max-xl:bg-[#eff3f6]"
                    >
                        {/* Chat Selected State */}
                        {!chatToEdit &&
                            <ChatDashboard
                                userType={user.rol}
                                messages={messages}
                                chatSelected={chatSelected}
                                handleSendText={handleSendText}
                            />
                        }

                        {/* Chat Edit State */}
                        {chatToEdit &&
                            <ChatEdit
                                chat={chatToEdit}
                                setChatToEdit={setChatToEdit}
                                handleEditChat={handleEditChat}
                            />
                        }
                    </div>
                </>
            }
            
            {/* Create Chat Component */}
            {showCreateChat &&
                <CreateChat
                    setShowCreateChat={setShowCreateChat}
                    chats={chats}
                    setChats={setChats}
                />
            }
        </section>
    )
}
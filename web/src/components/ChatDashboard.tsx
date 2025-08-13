'use client';

import { useState, useEffect, useRef } from "react"
import { MessageType, ChatType } from "@/models/chatModels";
import ChatMessageContainer from "./ChatMessageContainer";

export default function ChatDashboard(
    { userType, messages, chatSelected, handleSendText } :
    { userType: "user" | "admin" | undefined; messages: MessageType[]; chatSelected: ChatType | null; handleSendText: (text: string) => Promise<void>; }
) {
    const [textInput, setTextInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const bottomChatRef = useRef<HTMLDivElement | null>(null);

    const handleInput = () => {
        if (!textareaRef.current) {
            return;
        }

        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "32px";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
        }
        setTextInput(textareaRef.current.value);
    };

    const handleSendMessage = async () => {
        if (!textareaRef.current) {
            return;
        }

        if (textInput.trim() === "") return;

        const message = textInput
        setTextInput("");
        await handleSendText(message);

        textareaRef.current.style.height = "32px";
    }

    useEffect(() => {
        bottomChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        bottomChatRef.current?.scrollIntoView({ behavior: 'auto' });
    }, []);

    return (
        <div className="h-full w-full">
            {/* Chat NOT Selected State */}
            {!chatSelected &&
                <div className="h-full flex justify-center items-center">
                    <h1 className="text-center text-gray-500">Selecciona un chat</h1>
                </div>
            }

            {/* Chat View */}
            {chatSelected &&
                <div className="h-full w-full flex flex-col">
                    {/* Title */}
                    <div className="flex justify-center p-3 bg-white">
                        <h1
                            className="
                                w-full px-32 text-center font-bold truncate
                                max-md:w-60 max-md:px-0
                            "
                        >
                            {chatSelected.title ? chatSelected.title : "Titulo"}
                        </h1>
                    </div>

                    {/* Message Container */}
                    <div className="overflow-auto flex-1 flex flex-col gap-3 p-3">
                        {messages.length > 0 &&
                            <ChatMessageContainer
                                messages={messages}
                                userType={userType}
                            />
                        }
                        <div ref={bottomChatRef} />
                    </div>

                    {/* Input Container */}
                    <div className="p-5">
                        <div
                            className="
                                flex p-3 items-center rounded-lg gap-2 bg-[#f5f5f5]
                                max-md:p-2
                                max-xl:bg-white"
                        >
                            {/* Input */}
                            <textarea
                                ref={textareaRef}
                                placeholder="Escribe un mensaje"
                                onInput={handleInput}
                                value={textInput}
                                className="
                                    text-[16px] self-start w-full h-8 px-2 py-1 outline-none bg-transparent resize-none
                                    overflow-auto max-h-[150px]"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />

                            {/* Send Button */}
                            <div className="self-end">
                                <button
                                    className="px-3 pt-1 pb-[7px] rounded-lg bg-black"
                                    onClick={handleSendMessage}
                                >
                                    <h1 className="text-white max-md:text-sm">Enviar</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
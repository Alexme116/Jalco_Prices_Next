'use client';

import { MessageType } from "@/models/chatModels";

export default function ChatMessageContainer(
    { messages, userType } :
    { messages: MessageType[]; userType: string; }
) {
    return (
        <>
            {messages.map((message) => (
                <div key={message._id} className={`flex ${message.rol == userType ? "justify-end" : ""}`}>
                    <div className={"flex flex-col max-w-[45%]"}>
                        {/* Message Header */}
                        <div
                            className={`p-2 rounded-t-lg border-b-2
                                ${message.rol == userType ? "bg-black text-white border-white" : "bg-[#e0e0e0] border-black"}
                            `}
                        >
                            <h1 className="text-xs font-bold truncate">{message.email}</h1>
                        </div>
                        <div
                            className={`flex p-2 rounded-b-lg
                                ${message.rol == userType ? "bg-[#404040] text-white justify-end" : "bg-[#f5f5f5] max-xl:bg-white"}
                            `}
                        >
                            <h1 className="text-sm">{message.text}</h1>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
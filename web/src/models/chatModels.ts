export type MessageType = {
    _id?: string;
    ind: number;
    text: string;
    email: string;
    rol: "user" | "admin";
};

export type ChatType = {
    _id?: string;
    ind: number;
    title: string;
    messages: MessageType[];
    status?: "normal" | "important";
};



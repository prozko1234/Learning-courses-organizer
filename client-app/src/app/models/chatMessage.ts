import { Profile } from "./profile";

export interface ChatMessage {
    id: number;
    messageText: Date;
    date: Date;
    author: Profile;
    chatId: string
    image: string;
}
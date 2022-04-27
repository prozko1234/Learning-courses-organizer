import { Profile } from "./profile";

export interface Chat {
    id: string,
    user: Profile,
    secondUser: Profile,
    lastMessage: string,
    lastMessageDate: Date
}
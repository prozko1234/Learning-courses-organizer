import { Chat } from "../models/chat";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import agent from "../api/agent";

export default class ChatStore {
    chats: Chat[] = []
    loading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    loadChats = async () => {
        this.loading = true;
        try {
            const chats = await agent.Chats.list();
            console.log(chats)
            chats.map(chat => {
                chat.lastMessageDate = new Date(chat.lastMessageDate)
                if (store.userStore.user?.username == chat.secondUser.username) {
                    var user = chat.user
                    var secondUser = chat.secondUser
                    chat.user = secondUser
                    chat.secondUser = user
                    return chat
                } else return chat
            });
            runInAction(() => {
                this.chats = chats
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (loading: boolean) => this.loading = loading;
}
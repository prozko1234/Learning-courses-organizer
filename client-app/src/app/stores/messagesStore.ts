import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatMessage } from "../models/chatMessage";
import { store } from "./store";

export default class MessagesStore {
    messages: ChatMessage[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    createHubConnection = (chatId: string) => {
        if (chatId) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_MESSENGER_URL + '?chatId=' + chatId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log("Error establishing the connection: ", error));

            this.hubConnection.on('LoadMessages', (messages: ChatMessage[]) => {
                runInAction(() => {
                    messages.forEach(message => {
                        message.date = new Date(message.date + 'Z');
                    })
                    this.messages = messages
                })
            })

            this.hubConnection.on('RecieveMessage', (message: ChatMessage) => {
                runInAction(() => {
                    console.log(message);
                    message.date = new Date(message.date)
                    this.messages.push(message)
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log("Error stopping connection: ", error));
    }

    clearMessages = () => {
        this.messages = [];
        this.stopHubConnection();
    }

    addMessage = async (values: any) => {
        try {
            console.log(values)
            await this.hubConnection?.invoke('SendMessage', values)
        } catch (error) {
            console.log(error);
        }
    }
}
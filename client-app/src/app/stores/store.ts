import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import ChatStore from "./chatStore";
import ComentStore from "./commentStore";
import CommonStore from "./commonStore";
import MessagesStore from "./messagesStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    activityStore: ActivityStore,
    commonStore: CommonStore,
    userStore: UserStore,
    modalStore: ModalStore,
    profileStore: ProfileStore,
    commentStore: ComentStore,
    chatStore: ChatStore,
    messagesStore: MessagesStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new ComentStore(),
    chatStore: new ChatStore(),
    messagesStore: new MessagesStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}
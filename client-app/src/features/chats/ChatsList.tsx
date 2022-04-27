import { formatDistanceToNow } from 'date-fns';
import { Field, FieldProps, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Comment, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store'
import ChatMessages from './ChatMessages';

export default observer(function ChatsList() {
    const { chatStore, messagesStore } = useStore();
    const { loading, loadChats, chats } = chatStore;

    const [chatId, setChatId] = useState<string | undefined>();
    const [seconUser, setSecondUser] = useState<Profile>();

    useEffect(() => {
        loadChats();
        if (chatId) {
            messagesStore.createHubConnection(chatId)
        }
        return () => {
            messagesStore.clearMessages();
        }
    }, [loadChats, messagesStore])

    function handleChatSelect(chatId: string, user:Profile) {
        setChatId(chatId)
        setSecondUser(user)
    }

    if (loading) return <LoadingComponent content='Loading chats...' />

    return (
        <Grid columns={2}>
            <Grid.Column width={5}>
                <Comment.Group>
                    {chats.map((chat) => (
                        <Comment className='chat-item' key={chat.id} onClick={() => handleChatSelect(chat.id, chat.secondUser)}>
                            <Comment.Avatar src={chat.secondUser.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author>{chat.secondUser.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>last message {formatDistanceToNow(chat.lastMessageDate)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{chat.lastMessage}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Grid.Column>
            <Grid.Column width={"11"}>
                {chatId && <ChatMessages chatId={chatId} chatMemberDisplayName={seconUser!.displayName} />}
            </Grid.Column>
        </Grid>
    )
})
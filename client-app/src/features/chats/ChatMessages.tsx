import { formatDistanceToNow } from 'date-fns'
import fi from 'date-fns/esm/locale/fi/index.js'
import { Field, FieldProps, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Comment, Header, Loader, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'
import { useStore } from '../../app/stores/store'

interface Props {
    chatId: string,
    chatMemberDisplayName: string
}

export default observer(function ChatMessages({ chatId, chatMemberDisplayName }: Props) {
    const { messagesStore, userStore } = useStore();

    useEffect(() => {
        console.log(chatId)
        if (chatId) {
            messagesStore.createHubConnection(chatId)
        }
        return () => {
            messagesStore.clearMessages();
        }
    }, [messagesStore, chatId])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat with {chatMemberDisplayName }</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {messagesStore.messages.map((message) => (
                        <Comment key={message.id}>
                            <Comment.Avatar src={message.author.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${message.author.username}`}>{message.author.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(message.date)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{message.messageText}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
                <Formik
                    onSubmit={(values, { resetForm }) => messagesStore.addMessage(values).then(() => resetForm())}
                    initialValues={{
                        authorUsername: userStore.user?.username,
                        chatId: chatId,
                        messageText: ""
                    }}
                    validationSchema={Yup.object({
                        chatId: Yup.string().required(),
                        authorUsername: Yup.string().required(),
                        messageText: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className='ui form'>
                            <Field name="messageText">
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder='Enter your message(Enter to submit, SHIFT + enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit()
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </>
    )
})
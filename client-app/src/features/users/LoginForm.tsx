import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Card, Header, Label, Image } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store'
import FacebookLogin from 'react-facebook-login';
import { UserFormValues } from '../../app/models/user'

export default observer(function LoginForm() {
    const { userStore } = useStore();

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({ name: '', email: '' });
    const [picture, setPicture] = useState('');

    const responseFacebook = async (response: any) => {
        const user: UserFormValues = {
            displayName: response.name,
            username: response.id,
            email: response.email,
            password: "Pa$$w0rd"
        }
        console.log(user);
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
            setLogin(true);
            await userStore.loginFacebook(user);
        } else {
            setLogin(false);
        }
    }
    return (
        <>
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                    setErrors({ error: 'Invalid email or password' }))}
            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h2' content='Login to UniverSocial' color='teal' textAlign='center' />
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        <ErrorMessage
                            name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                        />
                        <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                    </Form>
                )}
            </Formik>
            <Card style={{ width: '100%' }}>
                <div>
                    {!login &&
                        <FacebookLogin
                            appId="735761720751508"
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile,user_friends"
                            callback={responseFacebook}
                            icon="fa-facebook"
                            buttonStyle={{width: "100%"}}
                        />
                    }
                    {login &&
                        <Image src={picture} />
                    }
                </div>
                {login &&
                    <Card.Content>
                        <Card.Header>{data.name}</Card.Header>
                        <Card.Description>
                            {data.email}
                        </Card.Description>
                    </Card.Content>
                }
            </Card>
        </>

    )
})
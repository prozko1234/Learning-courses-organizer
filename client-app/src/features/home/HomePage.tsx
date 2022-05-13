import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button, Card } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as={'h1'} inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    UniverSocial
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to chat and do activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to chat and do activities!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} to='/login' size='huge' inverted>
                            Log in!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} to='/register' size='huge' inverted>
                            Register!
                        </Button>
                    </>
                )}

            </Container>
        </Segment>
    )
})
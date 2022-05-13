import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout, isLoggedIn } } = useStore();
    const { modalStore } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src="/assets/logo.png" alt="" style={{ marginRight: '10px' }} />
                    UniverSocial
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='activities' />
                <Menu.Item as={NavLink} to='/errors' name='errors' />
                <Menu.Item as={NavLink} to='/chats' name='chats' />
                <Menu.Item as={NavLink} to='/createactivity'>
                    <Button as={Link} to='/createactivity' positive content='Create Activity' />
                </Menu.Item>
                {isLoggedIn ? (
                    <>
                        <Menu.Item position='right'>
                            <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text="My profile" icon="user" />
                                    <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>) : (
                        <>
                            <Menu.Item position='right' onClick={() => modalStore.openModal(<LoginForm />)} to='/login'>Login</Menu.Item>
                            <Menu.Item position='right' onClick={() => modalStore.openModal(<RegisterForm />)} to='/register'>Register</Menu.Item>
                        </>
                    )
                }
            </Container>
        </Menu>
    )
})
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src="/assets/logo.png" alt="" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='activities' />
                <Menu.Item as={NavLink} to='/createactivity'>
                    <Button as={Link} to='/createactivity' positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
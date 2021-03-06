import React, {useContext, useState} from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth-context";

function Navbar() {
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, { name }) => setActiveItem(name )

    const { user, logout } = useContext(AuthContext);

    const menuBar = user ? (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name={user.username}
                active
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name='Home'
                active={activeItem === 'Home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Login'
                    active={activeItem === 'Login'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/login'
                />
                <Menu.Item
                    name='Register'
                    active={activeItem === 'Register'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/register'
                />
            </Menu.Menu>
        </Menu>
    )

    return menuBar;
}

export default Navbar;
